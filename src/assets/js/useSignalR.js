import { useEffect, useCallback, useRef } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = (hubUrl) => {
  const connectionRef = useRef(null);

  //Starting the connection
  const startConnection = useCallback(async () => {
    if (connectionRef.current) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connectionRef.current = connection;

    try {
      await connection.start();
      console.log("SignalR Connected.");
    } catch (err) {
      console.warn("SignalR Connection Error: ", err);
      setTimeout(startConnection, 5000);
    }
  }, [hubUrl]);

  //Stop connection
  const stopConnection = useCallback(async () => {
    if (connectionRef.current) {
      await connectionRef.current.stop();
      connectionRef.current = null;
      console.log("SignalR Disconnected.");
    }
  }, []);

  //OnReceive message
  const onReceiveMessage = useCallback((eventName, callback) => {
    if (connectionRef.current) {
      connectionRef.current.on(eventName, callback);
    }
  }, []);

  //Send message
  const sendMessage = useCallback(async (methodName, ...args) => {
    if (
      connectionRef.current &&
      connectionRef.current.statte === signalR.HubConnectionState.Connected
    ) {
      try {
        await connectionRef.current.invoke(methodName, ...args);
      } catch (err) {
        console.erroe("SignalR Send Message Error: ", err);
      }
    } else {
      console.error("Cannot send message: SignalR is not connected.");
    }
  });

  //handle connection close
  useEffect(() => {
    return () => {
      stopConnection();
    };
  }, [stopConnection]);

  return {
    startConnection,
    stopConnection,
    onReceiveMessage,
    sendMessage,
    connection: connectionRef.current,
  };
};

export default useSignalR;
