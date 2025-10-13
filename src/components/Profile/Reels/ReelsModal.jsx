import React, { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  ChatCenteredTextIcon,
  CheckIcon,
  CircleNotchIcon,
  DotsThreeIcon,
  PaperPlaneRightIcon,
  ShareFatIcon,
  SparkleIcon,
  XIcon,
} from "@phosphor-icons/react";
import {
  AddComment,
  AddLike,
  BASE_POST_API,
  BASE_URL,
  CheckLike,
  GetComments,
  GetLikes,
  GetUsersByIds,
  UpdatePost,
  ValidateToken,
} from "../../../assets/js/serverapi";
import { useNavigate } from "react-router-dom";
import { TimeAgo } from "../../../assets/js/timeAgo";

const ReelsModal = ({
  userData,
  setIsReelOpened,
  chosenReel,
  handleGetReels,
}) => {
  const navigate = useNavigate();
  const [seeMoreCaptionClicked, setSeeMoreCaptionClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDetailsSection, setOpenDetailsSection] = useState(false);
  const [comments, setComments] = useState([]);
  const [usersComment, setUsersComment] = useState([]);
  const [isOpenLikesModal, setIsOpenLikesModal] = useState(false);
  const [allLikes, setAllLikes] = useState([]);
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [postLikes, setPostLikes] = useState([]);
  const [editClicked, setEditClicked] = useState(false);
  const [isOpenMenuModal, setIsOpenMenuModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updatePostData, setUpdatePostData] = useState({
    PostId: null,
    Caption: "",
    IsDeleted: null,
  });

  const [newCommentandLike, setNewCommentAndLike] = useState({
    PostId: chosenReel.id,
    UserId: sessionStorage.getItem("id"),
    Comment: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewCommentAndLike((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    handleCheckLike();
    handleFetchComments();
  }, []);

  const handleValidate = async (retry = true, nameOfFunction) => {
    try {
      const response = await fetch(ValidateToken, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 302) {
        console.warn("302 detected. redirecting...");
        navigate("/", { replace: true });
        return false;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. rerouting...");
        navigate("/", { replace: true });
        return false;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Validating tokens...");
        return handleValidate(false, nameOfFunction);
      }

      if (!response.ok) {
        console.warn(response.status);
        return false;
      }

      const data = await response.json();
      //console.log(data);
      if (nameOfFunction === "fetchComments") {
        handleFetchComments(false);
      } else if (nameOfFunction === "addComment") {
        handleAddComment(false);
      } else if (nameOfFunction === "addLike") {
        handleAddLike(false);
      } else if (nameOfFunction === "fetchLikes") {
        handleFetchLikes(false);
      }
      return true;
    } catch (err) {
      console.warn(err);
    }
  };

  const handleFetchComments = async (retry = true) => {
    try {
      const response = await fetch(`${GetComments}/${chosenReel.id}`, {
        method: "GET",
        credentials: "include",
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
        console.warn("401 detected. Validating tokens...");
        return handleValidate(true, "fetchComments");
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      //console.log(data);
      setComments(data);
      const ids = data.map((items) => items.userId);
      handleFetchUsers(true, ids, "comments");
    } catch (err) {
      console.warn(err);
    }
  };

  //fetched all the user that commented/liked a post
  const handleFetchUsers = async (retry = true, ids, functionName) => {
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
        return handleFetchUsers(false, ids, functionName);
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      //console.log(data);

      if (functionName === "comments") {
        setUsersComment(data);
      } else {
        setAllLikes(data);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleAddComment = async (retry = true) => {
    try {
      const response = await fetch(AddComment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newCommentandLike),
      });

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Rerouting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Validating tokens...");
        return handleValidate(true, "addComment");
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      console.log(data);

      setNewCommentAndLike((prev) => ({
        ...prev,
        Comment: "",
      }));

      setIsLoading(true);
      handleFetchComments();
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleAddComment();
  };

  const handleCheckLike = async () => {
    try {
      const response = await fetch(CheckLike, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newCommentandLike),
      });

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();

      setIsLikedByUser(data);
      handleFetchLikes();
    } catch (err) {
      console.warn(err);
    }
  };

  const handleFetchLikes = async (retry = true) => {
    try {
      const response = await fetch(`${GetLikes}/${chosenReel.id}`, {
        method: "GET",
        credentials: "include",
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
        console.warn("401 detected. Validating tokens...");
        return handleValidate(true, "fetchLikes");
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      //console.log(data);
      setPostLikes(data);
      const ids = data.map((items) => items.userId);
      handleFetchUsers(true, ids, "likes");
    } catch (err) {
      console.warn(err);
    }
  };

  const handleAddLike = async (retry = true) => {
    try {
      const response = await fetch(AddLike, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          PostId: newCommentandLike.PostId,
          UserId: newCommentandLike.UserId,
          IsLiked: false, //just need a value because logic is in backend whether user wants to like or unlike
        }),
      });

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Rerouting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Validating tokens...");
        return handleValidate(true, "addLike");
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      //console.log(data);

      setIsLikedByUser(data.likedOrUnliked);
      handleFetchLikes();
    } catch (err) {
      console.warn(err);
    }
  };

  const handleLikeClicked = async (e) => {
    e.preventDefault();
    await handleAddLike();
  };

  //handle update post
  const handleUpdatePost = async (retry = true) => {
    try {
      const response = await fetch(UpdatePost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Id: updatePostData.PostId,
          Caption: updatePostData.Caption,
          IsDeleted: updatePostData.IsDeleted,
        }),
      });

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request...");
        return handleValidate(true, "updatePost");
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      console.log(data);

      setTimeout(() => {
        handleGetReels();
        setUpdateLoading(false);
        setIsReelOpened(false);
        setEditClicked(false);
      }, 2000);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsOpenMenuModal(false);
    setEditClicked(true);
  };

  const handleEditSubmitClick = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    await handleUpdatePost();
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setUpdatePostData((prev) => ({
      ...prev,
      PostId: chosenReel.id,
      IsDeleted: true,
    }));
    setIsOpenMenuModal(false);
  };

  const handleSeeMore = (e) => {
    e.preventDefault();
    setSeeMoreCaptionClicked(!seeMoreCaptionClicked);
  };

  // ------------------------------------------------------------------------------------------------

  const DeleteConfirmationModal = ({
    setUpdatePostData,
    handleUpdatePost,
    setUpdateLoading,
  }) => {
    const handleDeleteClick = async (e) => {
      e.preventDefault();
      setUpdateLoading(true);
      await handleUpdatePost();
    };

    return (
      <>
        <div className="delete-confirmation__wrapper">
          <div style={{ marginTop: "50px" }}>
            <h4>Delete post?</h4>
            <p style={{ fontSize: "12px", marginTop: "20px" }}>
              Are you sure you want to delete this post?
            </p>
          </div>

          <div className="-display-flex-justified-center -gap-20 -margin-top-30">
            <button
              className="-btn-invisible"
              onClick={() =>
                setUpdatePostData((prev) => ({ ...prev, IsDeleted: false }))
              }
            >
              Cancel
            </button>
            <button
              className="-btn-confirmation-delete"
              onClick={(e) => handleDeleteClick(e)}
            >
              {updateLoading === true ? (
                <CircleNotchIcon
                  size={10}
                  className={"-btn-loading__icon"}
                  color="#ffff"
                />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </>
    );
  };

  //----------------------------------------------------------------------------------------------------------------

  const OpenLikesModal = ({ setIsOpenLikesModal, allLikes }) => {
    return (
      <div className="open-likes-modal__wrapper">
        <button
          className="-btn-invisible"
          onClick={() => setIsOpenLikesModal(false)}
        >
          <XIcon size={25} />
        </button>

        <h4 className="-margin-top-20">Likes</h4>

        {allLikes.map((user) => (
          <div
            className="-display-flex-justified-spacebetween -padding-20"
            key={user.id}
          >
            <div className="-display-flex-aligned-center -gap-10">
              <img
                className="likes-modal-user-profilepic__img"
                src={`${BASE_URL}/${user.profilePictureUrl}`}
                alt="profilepicture"
              />
              <div>
                <p style={{ fontSize: "11px" }}>{user.fullName}</p>
                <p style={{ fontSize: "10px" }}>{user.userName}</p>
              </div>
            </div>

            <div>
              <button className="-form-submit__btn">Follow</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  //----------------------------------------------------------------------------------------------------------------

  return (
    <>
      <button
        className="reels-close__btn"
        onClick={() => setIsReelOpened(false)}
      >
        <XIcon size={25} color="#ffff" />
      </button>

      <div className="reels-open-modal__wrapper">
        {updatePostData.IsDeleted === true && (
          <DeleteConfirmationModal
            setUpdatePostData={setUpdatePostData}
            handleUpdatePost={handleUpdatePost}
            setUpdateLoading={setUpdateLoading}
          />
        )}

        {isOpenLikesModal === true && (
          <OpenLikesModal
            setIsOpenLikesModal={setIsOpenLikesModal}
            allLikes={allLikes}
          />
        )}

        <div className="-display-flex">
          <div className="reels-video__wrapper">
            <video
              className="reels__video"
              src={`${BASE_POST_API}/${chosenReel.postUrl}`}
              disablePictureInPicture
              disableRemotePlayback
              autoPlay={true}
              controls
              controlsList="nodownload noremoteplayback noplaybackrate"
              loop={true}
              alt="video-thumbnail"
            />

            <div className="-display-flex-justified-end -gap-10">
              <button
                type="button"
                className="reels-details-slide__btn"
                onClick={(e) => handleLikeClicked(e)}
              >
                {isLikedByUser === false ? (
                  <>
                    <SparkleIcon size={20} color="#ffff" weight="fill" />
                  </>
                ) : (
                  <>
                    <SparkleIcon size={20} weight="fill" color="gold" />
                  </>
                )}
              </button>
              <button
                className="reels-details-slide__btn"
                onClick={() => setOpenDetailsSection(!openDetailsSection)}
              >
                <ChatCenteredTextIcon size={20} color="#ffff" weight="fill" />
              </button>
            </div>
          </div>

          {isOpenMenuModal === true && (
            <div className="menu-modal-open__wrapper">
              <ul>
                <li>
                  <button
                    type="button"
                    className="-btn-invisible"
                    onClick={(e) => handleEditClick(e)}
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteClick(e)}
                    className="-btn-invisible menu-delete__li"
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}

          <div
            className={`reels-details-container__wrapper ${
              openDetailsSection ? "activeSlide" : ""
            }`}
          >
            <div>
              <div className="reels-details__wrapper -padding-10">
                <div style={{ textAlign: "end" }}>
                  <button
                    className="-btn-invisible"
                    onClick={() => setIsOpenMenuModal(!isOpenMenuModal)}
                  >
                    <DotsThreeIcon
                      size={19}
                      color={isOpenMenuModal === true ? "#4495c7" : ""}
                    />
                  </button>
                </div>
                <div className="-display-flex-justified-spacebetween">
                  <div className="-display-flex-aligned-center -gap-10">
                    <img
                      className="profile-post-profilepic-thumbnail__img"
                      src={`${BASE_URL}/${userData.profilePictureUrl}`}
                      alt="profilepic"
                    />
                    <div>
                      <p style={{ fontSize: "12px" }}>{userData.fullName}</p>
                      <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)" }}>
                        {userData.userName}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)" }}>
                      {TimeAgo(chosenReel.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {editClicked === false ? (
                <div
                  className={`profile-reels-captions__text ${
                    seeMoreCaptionClicked === true ? "-overflow-auto" : ""
                  }`}
                >
                  {chosenReel.caption.length > 540 ? (
                    <>
                      {seeMoreCaptionClicked === false ? (
                        <>{chosenReel.caption.substring(0, 540)}...</>
                      ) : (
                        <>{chosenReel.caption}</>
                      )}

                      {seeMoreCaptionClicked === false ? (
                        <button
                          className="-btn-invisible"
                          onClick={(e) => handleSeeMore(e)}
                        >
                          <strong>see more</strong>
                        </button>
                      ) : (
                        <button
                          className="-btn-invisible"
                          onClick={(e) => handleSeeMore(e)}
                        >
                          <strong>see less</strong>
                        </button>
                      )}
                    </>
                  ) : (
                    chosenReel.caption
                  )}
                </div>
              ) : (
                <>
                  <div className="-display-flex-justified-end -gap-20">
                    <button
                      className="-btn-invisible"
                      onClick={() => setEditClicked(false)}
                    >
                      <XIcon size={16} color="red" />
                    </button>

                    <button
                      className="-btn-invisible"
                      onClick={(e) => handleEditSubmitClick(e)}
                    >
                      {updateLoading === true ? (
                        <CircleNotchIcon
                          size={15}
                          className={"-btn-loading__icon"}
                        />
                      ) : (
                        <CheckIcon size={16} color="limegreen" />
                      )}
                    </button>
                  </div>
                  <textarea
                    className="reels-caption-edit-open__textarea"
                    onChange={(e) =>
                      setUpdatePostData((prev) => ({
                        ...prev,
                        PostId: chosenReel.id,
                        Caption: e.target.value,
                      }))
                    }
                  >
                    {chosenReel.caption}
                  </textarea>
                </>
              )}

              {postLikes.filter((data) => data.isLiked).length <= 0 ? (
                ""
              ) : (
                <button
                  className="likes-preview__btn -padding-10"
                  onClick={() => setIsOpenLikesModal(true)}
                >
                  <SparkleIcon size={12} weight="fill" color={"gold"} />{" "}
                  {postLikes.length}
                </button>
              )}

              <div className="-display-flex-justified-spacebetween">
                <button
                  type="button"
                  className="-btn-invisible -display-flex-aligned-center -gap-10 -padding-20"
                  onClick={(e) => handleLikeClicked(e)}
                >
                  {isLikedByUser === false ? (
                    <>
                      <SparkleIcon size={20} /> Like
                    </>
                  ) : (
                    <>
                      <SparkleIcon size={20} weight="fill" color="gold" /> Liked
                    </>
                  )}
                </button>
                <button className="-btn-invisible -display-flex-aligned-center -gap-10 -padding-20">
                  <ChatCenteredTextIcon size={20} /> Comment
                </button>
                <button className="-btn-invisible -display-flex-aligned-center -gap-10 -padding-20">
                  <ShareFatIcon size={20} /> Share
                </button>
              </div>

              <div className="reels-comment-section__wrapper">
                {isLoading === true ? (
                  <div className="comment-loading__icon">
                    <CircleNotchIcon
                      size={35}
                      className={"-btn-loading__icon"}
                    />
                  </div>
                ) : (
                  <div>
                    {usersComment.map((user) => (
                      <div key={user.id}>
                        {comments.map(
                          (comment) =>
                            comment.userId === user.id && (
                              <div className="-display-flex-justified-spacearound -margin-top-20">
                                <div className="-display-flex-aligned-center">
                                  <img
                                    src={`${BASE_URL}/${user.profilePictureUrl}`}
                                    className="comment-profilepic__img"
                                    alt="profilepic"
                                  />

                                  <div>
                                    <p
                                      style={{
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {user.fullName}
                                    </p>
                                    <p className="reels-comment__text">
                                      {comment.comment}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <label
                                    style={{
                                      fontSize: "10px",
                                      color: "rgba(0,0,0,0.4)",
                                    }}
                                  >
                                    {TimeAgo(comment.commentedAt)}
                                  </label>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="profile-post-comment-textarea__wrapper">
                  <textarea
                    className="profile-post-comment__textarea"
                    placeholder="Write a comment..."
                    name="Comment"
                    value={newCommentandLike.Comment}
                    onChange={(e) => handleOnChange(e)}
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
