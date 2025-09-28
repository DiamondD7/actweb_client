import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import useSignalR from "../../assets/js/useSignalR";
import { PaperPlaneRightIcon } from "@phosphor-icons/react";
import {
  BASE_URL,
  GetFollowing,
  CreateChatRoom,
  GetChats,
  GetUsersByIds,
  MessageSent,
  GetMessages,
  MarkSeenMessage,
  GetPreviewMessages,
} from "../../assets/js/serverapi";
import { useNavigate } from "react-router-dom";
import useValidateUser from "../../assets/js/validate-user";
import useNotification from "../../assets/js/useNotification";
import { TimeAgo } from "../../assets/js/timeago";

import "../../styles/messagesstyles.css";
const NewChatUsersPreview = ({ following, validateToken, fetchChatRooms }) => {
  const USER_ID = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const [recipientId, setRecipientId] = useState(null); //this is only for the validate function callback

  const handleFunctionCallback = async () => {
    await handleCreateChatRoom(false, recipientId);
  };

  const handleCreateChatRoom = async (retry = true, id) => {
    try {
      const response = await fetch(CreateChatRoom, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          SenderId: USER_ID,
          RecipientId: id,
        }),
      });

      if (response.status === 301) {
        console.warn("301 detected, redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && !retry) {
        console.error("Unauthorized. Please log in again.");
        sessionStorage.clear();
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected, retrying...");
        return validateToken(true, handleFunctionCallback);
      }

      if (!response.ok) {
        throw new Error("Failed to fetch following");
      }

      const data = await response.json();
      fetchChatRooms(); //refresh chat rooms
    } catch (err) {
      console.error("Error creating chat room:", err);
      throw err;
    }
  };

  const handleClick = async (e, recipientId) => {
    e.preventDefault();
    setRecipientId(recipientId); //this is only for the validate function callback
    await handleCreateChatRoom(true, recipientId);
  };

  return (
    <div className="new-chat-container__wrapper">
      <h5>Say hi to a friend</h5>
      {following.map((user) => (
        <div
          className="new-chat-preview__wrapper"
          key={user.id}
          onClick={(e) => handleClick(e, user.id)}
        >
          <img
            className="messages-thumbnail__img"
            src={`${BASE_URL}/${user.profilePictureUrl}`}
            alt="profile-message-thumbnail-picture"
          />
          <div className="messages-chat-preview-info__wrapper">
            <p>{user.fullName}</p>

            <span>Start a convo with {user.firstName}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const ChatsPreviews = ({
  chatRooms,
  chatRoomsUsers,
  setOpenChatClicked,
  chosenChatRoom,
  setChosenChatRoom,
  previewMessage,
  lastMessage,
  fetchChatRooms,
}) => {
  const USER_ID = sessionStorage.getItem("id");
  const [search, setSearch] = useState("");

  const handleChatRoomClicked = async (e, chatroom, chatuser) => {
    e.preventDefault();
    await fetchChatRooms(); //do i still need this?
    setChosenChatRoom({
      chatroom: chatroom,
      userFullName: chatuser.fullName,
      userProfilePicture: chatuser.profilePictureUrl,
    });
    setOpenChatClicked(true);
  };

  const filterSearch = chatRoomsUsers.filter((user) =>
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="messages-chats__wrapper">
      <h2>Chats</h2>
      <input
        className="messages-chats-search__input"
        type="text"
        placeholder="Search chat"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* mapping chatRooms and chatRoomUsers and conditions are: match user with the senderId or recipientId and current userId should not included. */}
      {chatRooms.map((chat) => (
        <div key={chat.id}>
          {filterSearch.map(
            (user) =>
              (chat.senderId === user.id || chat.recipientId === user.id) &&
              user.id !== sessionStorage.getItem("id") && (
                <div
                  className={`messages-chat-preview__wrapper ${
                    chosenChatRoom.chatroom.id === chat.id
                      ? "active-chat-room"
                      : ""
                  }`}
                  key={user.id}
                  onClick={(e) => handleChatRoomClicked(e, chat, user)}
                >
                  <img
                    className="messages-thumbnail__img"
                    src={`${BASE_URL}/${user.profilePictureUrl}`}
                    alt="profile-message-thumbnail-picture"
                  />

                  {previewMessage.map((msg) =>
                    msg.chatId === chat.id ? (
                      <div
                        className="messages-chat-preview-info__wrapper"
                        key={msg.id}
                      >
                        <label>{TimeAgo(msg.timeStamp)}</label>
                        <p>{user.fullName}</p>

                        {/* pick either SignalR-updated last message OR fallback to msg */}
                        {lastMessage[chat.id] || msg ? (
                          <p
                            className={
                              (lastMessage[chat.id]?.senderId ??
                                msg.senderId) !== USER_ID &&
                              (lastMessage[chat.id]?.isSeen ?? msg.isSeen) ===
                                false
                                ? "message-not-seen__p"
                                : "preview-message__text"
                            }
                          >
                            {(
                              lastMessage[chat.id]?.content ?? msg.content
                            )?.substring(0, 50)}
                          </p>
                        ) : null}
                      </div>
                    ) : null
                  )}

                  {/* {previewMessage.map((msg) =>
                    msg.chatId === chat.id ? (
                      <div
                        className="messages-chat-preview-info__wrapper"
                        key={msg.id}
                      >
                        <label>{TimeAgo(msg.timeStamp)}</label>
                        <p>{user.fullName}</p>

                        {lastMessage !== null &&
                        lastMessage.chatId === chat.id ? (
                          <p
                            className={
                              lastMessage.senderId !== USER_ID &&
                              lastMessage.isSeen === false
                                ? "message-not-seen__p"
                                : "preview-message__text"
                            }
                          >
                            {lastMessage.content.length > 50
                              ? lastMessage.content.substring(0, 50)
                              : lastMessage.content}
                          </p>
                        ) : (
                          <p
                            className={
                              msg.senderId !== USER_ID && msg.isSeen === false
                                ? "message-not-seen__p"
                                : "preview-message__text"
                            }
                          >
                            {msg.content.length > 50
                              ? msg.content.substring(0, 50)
                              : msg.content}
                          </p>
                        )}
                      </div>
                    ) : (
                      ""
                    )
                  )} */}
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
};

const MessageContainer = ({ chosenChatRoom, setLastMessage }) => {
  const navigate = useNavigate();
  const validateUser = useValidateUser();
  const USER_ID = sessionStorage.getItem("id");
  const { chatroom, userFullName, userProfilePicture } = chosenChatRoom;
  const [messageModel, setMessageModel] = useState({
    ChatId: chatroom.id,
    SenderId: USER_ID,
    Content: "",
  });
  const [messages, setMessages] = useState([]);

  const notification = {
    RecieverId:
      USER_ID === chatroom.senderId ? chatroom.recipientId : chatroom.senderId,
    SenderId: USER_ID,
    ReferenceId: chatroom.id,
    Type: "NewMessage",
    Message: "sent you a message",
    CreatedAt: null,
  };
  const notificationHook = useNotification();

  // SignalR connection
  useSignalR(
    "http://localhost:5188/chatHub",
    setMessages,
    chatroom.id,
    setLastMessage
  );

  useEffect(() => {
    handleFetchMessages();
    handleMarkSeenMessages();
  }, [chatroom.id, messages.length]);

  const handleFetchMessages = async (retry = true) => {
    try {
      const response = await fetch(`${GetMessages}/${chatroom.id}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 301) {
        console.warn("301 detected. Redirecting...");
        sessionStorage.clear();
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && !retry) {
        console.error("Unauthorized. Please log in again.");
        sessionStorage.clear();
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request....");
        return validateUser(true, handleFetchMessages);
      }

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      //console.log(data);
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      throw err;
    }
  };

  const handleSendMessage = async (retry = true) => {
    try {
      const response = await fetch(MessageSent, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ChatId: chatroom.id,
          SenderId: USER_ID,
          Content: messageModel.Content,
        }),
      });

      if (response.status === 301) {
        console.warn("301 detected. Redirecting...");
        sessionStorage.clear();
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && !retry) {
        console.error("Unauthorized. Please log in again.");
        sessionStorage.clear();
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request....");
        return validateUser(true, handleSendMessage);
      }

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      //console.log(data);

      await notificationHook(notification);
      setMessageModel((prev) => ({
        ...prev,
        Content: "",
      }));
    } catch (err) {
      console.error("Error sending message:", err);
      throw err;
    }
  };

  const handleMarkSeenMessages = async (retry = true) => {
    try {
      const response = await fetch(MarkSeenMessage, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ChatId: chatroom.id,
          SenderId: USER_ID,
          Content: messageModel.Content,
        }),
      });

      if (response.status === 301) {
        console.warn("301 detected. Redirecting...");
        sessionStorage.clear();
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && !retry) {
        console.error("Unauthorized. Please log in again.");
        sessionStorage.clear();
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request....");
        return validateUser(true, handleMarkSeenMessages);
      }

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      //console.log(data);
    } catch (err) {
      console.error("Error sending message:", err);
      throw err;
    }
  };

  const handleMessageBtnClicked = async (e) => {
    e.preventDefault();
    await handleSendMessage();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setMessageModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="messages-conversation__wrapper">
        <div className="messages-conversation-header__wrapper">
          <img
            className="messages-thumbnail__img"
            src={`${BASE_URL}/${userProfilePicture}`}
            alt="profile-message-thumbnail-picture"
          />
          <p>{userFullName}</p>
        </div>
        <br />
        <br />

        {messages.length !== 0 ? (
          <>
            {messages.map((msg, index) =>
              msg.senderId === USER_ID ? (
                <MyMessage
                  msg={msg}
                  lastMessageIndex={messages.length}
                  index={index}
                />
              ) : (
                <TheirMessage
                  msg={msg}
                  userProfilePicture={userProfilePicture}
                />
              )
            )}
          </>
        ) : (
          <p>No messages yet. Say hi to {userFullName}!</p>
        )}
      </div>

      <div className="messages-conversation-message-textarea__wrapper">
        <textarea
          placeholder="send your message here..."
          name="Content"
          onChange={(e) => handleOnChange(e)}
          value={messageModel.Content}
        ></textarea>
        <button
          className="messages-conversation-send__btn"
          onClick={(e) => handleMessageBtnClicked(e)}
        >
          <PaperPlaneRightIcon size={20} weight="fill" color={"#4495c7"} />
        </button>
      </div>
    </div>
  );
};

const TheirMessage = ({ msg, userProfilePicture }) => {
  return (
    <div className="messaages-conversation-theirmessage-container__wrapper">
      <div className="messages-conversation-theirmessage__wrapper">
        <div>
          <img
            className="messages-thumbnail__img"
            src={`${BASE_URL}/${userProfilePicture}`}
            alt="profile-message-thumbnail-picture"
          />
        </div>

        <div className="messages-conversation-theirmessage-bubble__wrapper">
          <p className="message-conversation-timeStamp__text">
            {TimeAgo(msg.timeStamp)}
          </p>
          <p>{msg.content}</p>
        </div>
      </div>
    </div>
  );
};

const MyMessage = ({ msg, lastMessageIndex, index }) => {
  return (
    <div className="messages-conversation-mymessage-container__wrapper">
      <div className="messages-conversation-mymessage__wrapper">
        <p className="message-conversation-timeStamp__text">
          {TimeAgo(msg.timeStamp)}
        </p>
        <div className="messages-conversation-mymessage-bubble__wrapper">
          <p>{msg.content}</p>
          {index === lastMessageIndex - 1 && (
            <p>{msg.isSeen === false ? "Sent" : "Seen"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Messages = () => {
  const USER_ID = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const validateToken = useValidateUser();

  const [openChatClicked, setOpenChatClicked] = useState(false);
  const [chosenChatRoom, setChosenChatRoom] = useState({
    chatroom: {},
    userFullName: "",
    userProfilePicture: "",
  });
  const [lastMessage, setLastMessage] = useState({}); //container for last message (Signal R)
  const [previewMessage, setPreviewMessage] = useState([]); //container for last messages (fetching from API)
  const [chatRooms, setChatRooms] = useState([]);
  const [chatRoomsUsers, setChatRoomsUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  useSignalR("http://localhost:5188/chatHub", null, 0, setLastMessage);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchPreviewMessages = async (chats) => {
    try {
      const response = await fetch(GetPreviewMessages, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(chats),
      });

      if (!response.ok) {
        console.error("Error: ", response.status);
        return;
      }

      const data = await response.json();
      setPreviewMessage(data);
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  };
  const fetchFollowing = async (retry = true, chatUsers) => {
    try {
      const response = await fetch(`${GetFollowing}/${USER_ID}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 301) {
        console.warn("301 detected, redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && !retry) {
        console.error("Unauthorized. Please log in again.");
        sessionStorage.clear();
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected, retrying...");
        return fetchFollowing(false);
      }

      if (!response.ok) {
        throw new Error("Failed to fetch following");
      }

      const data = await response.json();

      //filtering following that are already in chat rooms
      const chatRoomUserIds = chatUsers.map((u) => u.id);

      const filteredFollowing = data.filter(
        (user) => !chatRoomUserIds.includes(user.id)
      );

      setFollowing(filteredFollowing);
    } catch (err) {
      console.error("Error fetching following:", err);
    }
  };
  const fetchChatRooms = async (retry = true) => {
    try {
      const response = await fetch(`${GetChats}/${USER_ID}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 301) {
        console.warn("301 detected, redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && !retry) {
        console.error("Unauthorized. Please log in again.");
        sessionStorage.clear();
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected, retrying...");
        return validateToken(true, fetchChatRooms);
      }

      if (!response.ok) {
        throw new Error("Failed to fetch following");
      }

      const data = await response.json();
      setChatRooms(data);

      //Called fetchChatRooms function in another component (ChatPreviews). Everytime the user clicks to open a chat room.
      //handleFetchUsers will only be called when the openChatClicked is false. in other words: it will only run once.
      //no need to run everytime the user move to another chatroom.
      if (openChatClicked === false) {
        //get all ids except the user-id
        const ids = data.map((items) =>
          items.senderId === USER_ID ? items.recipientId : items.senderId
        );
        await handleFetchUsers(true, ids);
      }

      await fetchPreviewMessages(data);
    } catch (err) {
      console.error("Error fetching following:", err);
    }
  };
  const handleFetchUsers = async (retry = true, ids) => {
    try {
      const response = await fetch(GetUsersByIds, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(ids),
      });

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Rerouting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request...");
        return handleFetchUsers(false, ids);
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      setChatRoomsUsers(data);

      fetchFollowing(true, data); //calling following here
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="-main-container__wrapper">
      <Nav />
      <div className="messages-container__wrapper">
        <div>
          <ChatsPreviews
            chatRooms={chatRooms}
            chatRoomsUsers={chatRoomsUsers}
            setOpenChatClicked={setOpenChatClicked}
            chosenChatRoom={chosenChatRoom}
            setChosenChatRoom={setChosenChatRoom}
            previewMessage={previewMessage}
            lastMessage={lastMessage}
            fetchChatRooms={fetchChatRooms}
          />

          <NewChatUsersPreview
            following={following}
            validateToken={validateToken}
            fetchChatRooms={fetchChatRooms}
          />
        </div>

        {openChatClicked === true && (
          <MessageContainer
            chosenChatRoom={chosenChatRoom}
            setLastMessage={setLastMessage}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;
