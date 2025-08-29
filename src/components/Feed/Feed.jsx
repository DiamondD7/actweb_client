import React from "react";
import Nav from "../Nav/Nav";
import {
  ChatCenteredTextIcon,
  ImageIcon,
  PlayCircleIcon,
  ShareFatIcon,
  SparkleIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react";

import "../../styles/feedstyles.css";
const FeedPostsContainer = () => {
  return (
    <div className="post-container__wrapper">
      <div>
        <div className="post-header-user-details__wrapper">
          <img
            className="feed-picture-thumbnail__img"
            src="https://randomuser.me/api/portraits/men/99.jpg"
            alt="profile-picture-thumbnail"
          />
          <div>
            <p>Jonnathan Roumy</p>
            <span>3 days ago</span>
          </div>
        </div>
        <div className="post-thumbnail__wrapper">
          <div>
            <img
              className="post-thumbnail__img"
              src="https://images.unsplash.com/photo-1625631248418-435d0444f7d4?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="post-thumbnail"
            />
            <button className="post-play-icon__btn">
              <PlayCircleIcon
                size={80}
                color={"rgba(0, 0, 0, 0.7)"}
                weight="fill"
              />
            </button>
          </div>

          <div className="post-thumbnail-details__wrapper">
            <p className="post-thumbnail-caption__text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum,
              doloribus, illo accusantium distinctio provident impedit error
              consectetur architecto laborum culpa assumenda, adipisci ratione
              labore tenetur aperiam cumque. Minus, consequatur accusamus?
            </p>

            <div className="-display-flex-justified-spacebetween -margin-top-20">
              <button className="post-thumbnail-details-actions__btn">
                <SparkleIcon size={22} /> Like
              </button>
              <button className="post-thumbnail-details-actions__btn">
                <ChatCenteredTextIcon size={22} /> Comment
              </button>
              <button className="post-thumbnail-details-actions__btn">
                <ShareFatIcon size={22} /> Share
              </button>
            </div>

            <div className="-display-flex-aligned-center -gap-10 -margin-top-20">
              <img
                className="feed-picture-comments__img"
                src="https://randomuser.me/api/portraits/men/95.jpg"
                alt="profile-picture-thumbnail"
              />
              <div>
                <label className="feed-comments-accountName__text">
                  Henderson Hamilton
                </label>
                <p className="feed-comments-comment__text">
                  Omg, I love this!!!!!!!
                </p>
              </div>
            </div>
            <div className="-display-flex-aligned-center -gap-10 -margin-top-20">
              <img
                className="feed-picture-comments__img"
                src="https://randomuser.me/api/portraits/women/95.jpg"
                alt="profile-picture-thumbnail"
              />
              <div>
                <label className="feed-comments-accountName__text">
                  Jenny Lace
                </label>
                <p className="feed-comments-comment__text">
                  Where is your shirt from?
                </p>
              </div>
            </div>
            <div className="-display-flex-aligned-center -gap-10 -margin-top-20">
              <img
                className="feed-picture-comments__img"
                src="https://randomuser.me/api/portraits/men/94.jpg"
                alt="profile-picture-thumbnail"
              />
              <div>
                <label className="feed-comments-accountName__text">
                  Peter Green
                </label>
                <p className="feed-comments-comment__text">Lol</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <div className="post-header-user-details__wrapper">
          <img
            className="feed-picture-thumbnail__img"
            src="https://randomuser.me/api/portraits/women/69.jpg"
            alt="profile-picture-thumbnail"
          />
          <div>
            <p>Victoria James</p>
            <span>5 days ago</span>
          </div>
        </div>
        <div className="post-thumbnail__wrapper">
          <div>
            <img
              className="post-thumbnail__img"
              src="https://plus.unsplash.com/premium_photo-1683219367988-61cebb58e343?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="post-thumbnail"
            />
            <button className="post-play-icon__btn">
              <PlayCircleIcon
                size={80}
                color={"rgba(0, 0, 0, 0.7)"}
                weight="fill"
              />
            </button>
          </div>

          <div className="post-thumbnail-details__wrapper">
            <p className="post-thumbnail-caption__text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum,
              doloribus, illo accusantium distinctio provident impedit error
              consectetur architecto laborum culpa assumenda, adipisci ratione
              labore tenetur aperiam cumque. Minus, consequatur accusamus?
            </p>

            <div className="-display-flex-justified-spacebetween -margin-top-20">
              <button className="post-thumbnail-details-actions__btn">
                <SparkleIcon size={22} /> Like
              </button>
              <button className="post-thumbnail-details-actions__btn">
                <ChatCenteredTextIcon size={22} /> Comment
              </button>
              <button className="post-thumbnail-details-actions__btn">
                <ShareFatIcon size={22} /> Share
              </button>
            </div>

            <div className="-display-flex-aligned-center -gap-10 -margin-top-20">
              <img
                className="feed-picture-comments__img"
                src="https://randomuser.me/api/portraits/men/95.jpg"
                alt="profile-picture-thumbnail"
              />
              <div>
                <label className="feed-comments-accountName__text">
                  Henderson Hamilton
                </label>
                <p className="feed-comments-comment__text">
                  Omg, I love this!!!!!!!
                </p>
              </div>
            </div>
            <div className="-display-flex-aligned-center -gap-10 -margin-top-20">
              <img
                className="feed-picture-comments__img"
                src="https://randomuser.me/api/portraits/women/95.jpg"
                alt="profile-picture-thumbnail"
              />
              <div>
                <label className="feed-comments-accountName__text">
                  Jenny Lace
                </label>
                <p className="feed-comments-comment__text">
                  Where is your shirt from?
                </p>
              </div>
            </div>
            <div className="-display-flex-aligned-center -gap-10 -margin-top-20">
              <img
                className="feed-picture-comments__img"
                src="https://randomuser.me/api/portraits/men/94.jpg"
                alt="profile-picture-thumbnail"
              />
              <div>
                <label className="feed-comments-accountName__text">
                  Peter Green
                </label>
                <p className="feed-comments-comment__text">Lol</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeedHashTagsContainer = () => {
  return (
    <div className="hashtag-container__wrapper">
      <div></div>
    </div>
  );
};

const FeedWhatsonYourMindContainer = () => {
  return (
    <div>
      <div className="feed-whatsonyourmind__wrapper">
        <h5>Make a Post</h5>
        <div className="-display-flex-aligned-center -gap-10">
          <img
            className="feed-picture-thumbnail__img"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="profile-picture-thumbnail"
          />
          <div style={{ marginTop: "30px" }}>
            <textarea
              className="feed-whatsonyourmind-message__textarea"
              placeholder="What's on your mind?"
            ></textarea>
            <div className="-display-flex-justified-spacebetween -margin-top-10">
              <div className="-display-flex-aligned-center -gap-10">
                <button className="-btn-transparent-noborders">
                  <VideoCameraIcon
                    size={20}
                    color={"rgba(0,0,0,0.4)"}
                    className={"-margin-left-10"}
                  />
                </button>
                <button className="-btn-transparent-noborders">
                  <ImageIcon size={20} color={"rgba(0,0,0,0.4)"} />
                </button>
              </div>

              <div>
                <button className="feed-whatsonyourmind-post__btn">Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Feed = () => {
  return (
    <div className="-main-container__wrapper">
      <Nav />
      <div className="feed-container__wrapper">
        <div>
          <div>
            <FeedWhatsonYourMindContainer />
            <div className="-margin-top-20">
              <FeedHashTagsContainer />
            </div>
          </div>
        </div>
        <div className="feed-posts-container__wrapper">
          <FeedPostsContainer />
        </div>
      </div>
    </div>
  );
};

export default Feed;
