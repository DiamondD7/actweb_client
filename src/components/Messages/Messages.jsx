import React from "react";
import Nav from "../Nav/Nav";

import "../../styles/messagesstyles.css";
import { PaperPlaneRightIcon } from "@phosphor-icons/react";
const ChatsPreviews = () => {
  const stringMessage =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum et optio explicabo vero aliquid nostrum doloremque veniam aperiam. Magnam consectetur eaque dolore suscipit beatae, fugiat maxime qui porro inventore voluptate? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ipsum expedita laboriosam, accusantium quasi deleniti pariatur ut. Mollitia fugiat repellat, dignissimos in nisi placeat itaque ut quaerat odio est voluptas.";
  return (
    <div className="messages-chats__wrapper">
      <h2>Chats</h2>
      <input
        className="messages-chats-search__input"
        type="text"
        placeholder="Search conversations"
      />

      <div className="messages-chat-preview__wrapper">
        <img
          className="messages-thumbnail__img"
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="profile-message-thumbnail-picture"
        />
        <div className="messages-chat-preview-info__wrapper">
          <label>12:00PM</label>
          <p>John Doe</p>

          <span>
            {stringMessage.length > 50
              ? stringMessage.substring(0, 45) + "..."
              : stringMessage}
          </span>
        </div>
      </div>
    </div>
  );
};

const TheirMessage = () => {
  return (
    <div className="messaages-conversation-theirmessage-container__wrapper">
      <div className="messages-conversation-theirmessage__wrapper">
        <img
          className="messages-thumbnail__img"
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="profile-message-thumbnail-picture"
        />

        <div className="messages-conversation-theirmessage-bubble__wrapper">
          <p className="message-conversation-timeStamp__text">11:36 AM</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            quis totam in ratione quibusdam, vero obcaecati animi odit mollitia
            unde impedit adipisci omnis consequatur repellendus, beatae, hic
            magni sapiente autem?
          </p>
        </div>
      </div>
    </div>
  );
};

const MyMessage = () => {
  return (
    <div className="messages-conversation-mymessage-container__wrapper">
      <div className="messages-conversation-mymessage__wrapper">
        <p className="message-conversation-timeStamp__text">12:00 PM</p>
        <div className="messages-conversation-mymessage-bubble__wrapper">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            quis totam in ratione quibusdam, vero obcaecati animi odit mollitia
            unde impedit adipisci omnis consequatur repellendus, beatae, hic
            magni sapiente autem?
          </p>
        </div>
      </div>
    </div>
  );
};

const Messages = () => {
  return (
    <div className="-main-container__wrapper">
      <Nav />
      <div className="messages-container__wrapper">
        <ChatsPreviews />

        <div>
          <div className="messages-conversation__wrapper">
            <div className="messages-conversation-header__wrapper">
              <img
                className="messages-thumbnail__img"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="profile-message-thumbnail-picture"
              />
              <p>John Doe</p>
            </div>
            <br />
            <br />
            <TheirMessage />
            <MyMessage />
          </div>

          <div className="messages-conversation-message-textarea__wrapper">
            <textarea placeholder="send your message here..."></textarea>
            <button className="messages-conversation-send__btn">
              <PaperPlaneRightIcon size={20} weight="fill" color={"#4495c7"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
