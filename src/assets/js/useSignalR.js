import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = (hubUrl, setMessages, chatRoomId, setLastMessage) => {
  const connectionRef = useRef(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    const start = async () => {
      try {
        await connection.start();
        console.log("SignalR Connected.");

        connection.on("ReceivePreviewMessage", (msg) => {
          setLastMessage((prev) => ({
            ...prev,
            [msg.chatId]: msg,
          }));
        });

        connection.on("ReceiveMessage", (msg) => {
          setLastMessage((prev) => ({
            ...prev,
            [msg.chatId]: {
              ...msg,
              isSeen: false, // mark unseen for preview
            },
          }));

          if (msg.chatId !== chatRoomId) return; // only update if for current chatroom
          setMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev; // avoid duplicates
            return [...prev, msg];
          });
        });

        connection.on("MessageSeen", (chatId, seenMessageIds, msg) => {
          const USER_ID = sessionStorage.getItem("id");
          setLastMessage((prev) => ({
            ...prev,
            [chatId]: {
              ...(prev[chatId] || {}),
              isSeen: msg.senderId !== USER_ID ? false : true,
            },
          }));

          if (chatId !== chatRoomId) return; // only update if for current chatroom

          setMessages((prev) =>
            prev.map((msg) =>
              seenMessageIds.includes(msg.id)
                ? { ...msg, isSeen: msg.senderId !== USER_ID ? false : true }
                : msg
            )
          );
        });
      } catch (err) {
        console.error("SignalR Connection Error:", err);
        setTimeout(start, 5000); // retry
      }
    };

    start();

    return () => {
      connection.stop();
    };
  }, [hubUrl, setMessages, chatRoomId]);

  return connectionRef.current;
};

export default useSignalR;
