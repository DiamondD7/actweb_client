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
} from "../../assets/js/serverapi";
import { useNavigate } from "react-router-dom";
import useValidateUser from "../../assets/js/validate-user";
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
  setChosenChatRoom,
}) => {
  const stringMessage =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum et optio explicabo vero aliquid nostrum doloremque veniam aperiam. Magnam consectetur eaque dolore suscipit beatae, fugiat maxime qui porro inventore voluptate? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ipsum expedita laboriosam, accusantium quasi deleniti pariatur ut. Mollitia fugiat repellat, dignissimos in nisi placeat itaque ut quaerat odio est voluptas.";

  const handleChatRoomClicked = (e, chatroom, chatuser) => {
    e.preventDefault();
    setOpenChatClicked(true);
    setChosenChatRoom({
      chatroom: chatroom,
      userFullName: chatuser.fullName,
      userProfilePicture: chatuser.profilePictureUrl,
    });
  };
  return (
    <div className="messages-chats__wrapper">
      <h2>Chats</h2>
      <input
        className="messages-chats-search__input"
        type="text"
        placeholder="Search conversations"
      />

      {/* mapping chatRooms and chatRoomUsers and conditions are: match user with the senderId or recipientId and current userId should not included. */}
      {chatRooms.map((chat) => (
        <div key={chat.id}>
          {chatRoomsUsers.map(
            (user) =>
              (chat.senderId === user.id || chat.recipientId === user.id) &&
              user.id !== sessionStorage.getItem("id") && (
                <div
                  className="messages-chat-preview__wrapper"
                  key={user.id}
                  onClick={(e) => handleChatRoomClicked(e, chat, user)}
                >
                  <img
                    className="messages-thumbnail__img"
                    src={`${BASE_URL}/${user.profilePictureUrl}`}
                    alt="profile-message-thumbnail-picture"
                  />
                  <div className="messages-chat-preview-info__wrapper">
                    <label>12:00PM</label>
                    <p>{user.fullName}</p>

                    <span>
                      {stringMessage.length > 50
                        ? stringMessage.substring(0, 45) + "..."
                        : stringMessage}
                    </span>
                  </div>
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
};

const MessageContainer = ({ chosenChatRoom, messages, setMessages }) => {
  const navigate = useNavigate();
  const validateUser = useValidateUser();
  const USER_ID = sessionStorage.getItem("id");
  const { chatroom, userFullName, userProfilePicture } = chosenChatRoom;
  const [messageModel, setMessageModel] = useState({
    ChatId: chatroom.id,
    SenderId: USER_ID,
    Content: "",
  });

  useEffect(() => {
    handleFetchMessages();
  }, [chatroom.id]);

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
      console.log(data);
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
        body: JSON.stringify(messageModel),
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
      console.log(data);
      setMessageModel((prev) => ({
        ...prev,
        Content: "",
      }));
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
            {messages.map((msg) =>
              msg.senderId === USER_ID ? (
                <MyMessage msg={msg} />
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

const MyMessage = ({ msg }) => {
  return (
    <div className="messages-conversation-mymessage-container__wrapper">
      <div className="messages-conversation-mymessage__wrapper">
        <p className="message-conversation-timeStamp__text">
          {TimeAgo(msg.timeStamp)}
        </p>
        <div className="messages-conversation-mymessage-bubble__wrapper">
          <p>{msg.content}</p>
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
  const [chatRooms, setChatRooms] = useState([]);
  const [chatRoomsUsers, setChatRoomsUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const { startConnection, sendMessage, onReceiveMessage } = useSignalR(
    "http://localhost:5188/chatHub"
  );

  // useEffect(() => {
  //   startConnection();v
  //   onReceiveMessage("ReceiveMessage", (user, receivedMessage) => {
  //     const newMessage = { user, text: receivedMessage };
  //     setMessages((prevMessages) => [...prevMessages, newMessage]);
  //   });
  // }, []);

  useEffect(() => {
    fetchChatRooms();
  }, []);

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

      //get all ids except the user-id
      const ids = data.map((items) =>
        items.senderId === USER_ID ? items.recipientId : items.senderId
      );

      handleFetchUsers(true, ids);
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
            setChosenChatRoom={setChosenChatRoom}
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
            messages={messages}
            setMessages={setMessages}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;
