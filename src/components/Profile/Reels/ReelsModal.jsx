import React, { useState } from "react";
import {
  ArrowRightIcon,
  ChatCenteredTextIcon,
  PaperPlaneRightIcon,
  ShareFatIcon,
  SparkleIcon,
  XIcon,
} from "@phosphor-icons/react";

const ReelsModal = ({ setIsReelOpened }) => {
  const [openDetailsSection, setOpenDetailsSection] = useState(false);

  return (
    <>
      <button
        className="reels-close__btn"
        onClick={() => setIsReelOpened(false)}
      >
        <XIcon size={25} color="#ffff" />
      </button>
      <div className="reels-open-modal__wrapper">
        <div className="-display-flex">
          <div className="reels-video__wrapper">
            <img
              className="reels__video"
              src="https://images.unsplash.com/photo-1754136362561-fd8b431c78e4?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="video"
            />

            <div className="-display-flex-justified-end -gap-10">
              <button className="reels-details-slide__btn">
                <SparkleIcon size={20} color="#ffff" weight="fill" />
              </button>
              <button
                className="reels-details-slide__btn"
                onClick={() => setOpenDetailsSection(!openDetailsSection)}
              >
                <ChatCenteredTextIcon size={20} color="#ffff" weight="fill" />
              </button>
            </div>
          </div>

          <div
            className={`reels-details-container__wrapper ${
              openDetailsSection ? "activeSlide" : ""
            }`}
          >
            <div>
              <div className="reels-details__wrapper">
                <div className="-display-flex-aligned-center -gap-10">
                  <img
                    className="profile-post-profilepic-thumbnail__img"
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="profilepic"
                  />
                  <div>
                    <p style={{ fontSize: "12px" }}>Aaron Sierra</p>
                    <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)" }}>
                      _diamonddamn
                    </p>
                  </div>
                </div>
              </div>
              <p className="reels-caption__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
                dolorem doloremque suscipit non corporis aspernatur hic, beatae
                sed nobis! Earum veritatis pariatur ipsum similique ullam cumque
                modi vero iste enim? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Similique quo iure at. Repudiandae natus
                fugiat cupiditate illum in alias laboriosam quae ex,
                accusantium, ut possimus porro temporibus voluptatum explicabo!
                Voluptas. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Alias, ipsam. Dolor quam et dolorem sit provident porro
                molestiae laborum obcaecati explicabo nostrum possimus, id
                distinctio nemo sed fuga quos impedit!
              </p>

              <div className="-display-flex-justified-spacebetween">
                <button
                  type="button"
                  className="-btn-invisible -display-flex-aligned-center -gap-10 -padding-20"
                >
                  <>
                    <SparkleIcon size={20} /> Like
                  </>
                </button>
                <button className="-btn-invisible -display-flex-aligned-center -gap-10 -padding-20">
                  <ChatCenteredTextIcon size={20} /> Comment
                </button>
                <button className="-btn-invisible -display-flex-aligned-center -gap-10 -padding-20">
                  <ShareFatIcon size={20} /> Share
                </button>
              </div>

              <div className="reels-comment-section__wrapper">
                <div className="-display-flex-justified-spacebetween -margin-top-10 -padding-10">
                  <div className="-display-flex -gap-10">
                    <img
                      src="https://randomuser.me/api/portraits/men/3.jpg"
                      className="comment-profilepic__img"
                      alt="profilepic"
                    />
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                        Jojo Binay
                      </p>
                      <p className="reels-comment__text">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Nulla possimus cum est magnam, ex ducimus qui
                        aspernatur deleniti doloremque, id tempora dolores
                        veritatis nam. Hic doloribus delectus dolores provident
                        ex.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      style={{ fontSize: "12px", color: "rgba(0,0,0,0.4)" }}
                    >
                      9 hrs ago
                    </label>
                  </div>
                </div>
              </div>

              <form>
                <div className="profile-post-comment-textarea__wrapper">
                  <textarea
                    className="profile-post-comment__textarea"
                    placeholder="Write a comment..."
                    name="Comment"
                  ></textarea>
                  <button type="submit" className="-btn-invisible">
                    <PaperPlaneRightIcon
                      size={25}
                      weight="fill"
                      color={"#4495c7"}
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReelsModal;
