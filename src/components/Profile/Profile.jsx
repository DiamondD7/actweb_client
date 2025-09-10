import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { TimeAgo } from "../../assets/js/timeAgo";
import {
  USER_API_URI,
  BASE_URL,
  AddUserBackground,
  GetUserBackgrounds,
  UpdateUserBackground,
  GetFeaturedBackgrounds,
  ValidateToken,
  AddPost,
  UploadVideo,
  GetPosts,
  BASE_POST_API,
  AddComment,
  GetComments,
  GetUsersByIds,
  AddLike,
  GetLikes,
  CheckLike,
} from "../../assets/js/serverapi";
import Nav from "../Nav/Nav";
import {
  ArrowCircleRightIcon,
  BookmarkSimpleIcon,
  CaretDownIcon,
  CaretUpIcon,
  ChatCenteredTextIcon,
  CircleNotchIcon,
  DotsThreeIcon,
  EnvelopeIcon,
  FilmSlateIcon,
  FoldersIcon,
  GlobeHemisphereEastIcon,
  LinkIcon,
  MonitorArrowUpIcon,
  MonitorPlayIcon,
  PaperPlaneRightIcon,
  PencilSimpleIcon,
  PhoneIcon,
  PlusIcon,
  PlusSquareIcon,
  ScanSmileyIcon,
  ShareFatIcon,
  SparkleIcon,
  SquaresFourIcon,
  StarIcon,
  TrashIcon,
  VideoIcon,
  XIcon,
} from "@phosphor-icons/react";

import "../../styles/profilestyles.css";
const ProfileReels = ({ userData }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [chosenPost, setChosenPost] = useState([]);
  const [usersPosts, setUsersPosts] = useState([]);
  const [seeMoreCaptionClicked, setSeeMoreCaptionClicked] = useState(false);
  const [isAddPostClicked, setIsAddPostClicked] = useState(false);
  const [isPostClicked, setIsPostClicked] = useState(false);

  useEffect(() => {
    handleGetPosts();
  }, []);

  const handleValidate = async (retry = true) => {
    try {
      const response = await fetch(ValidateToken, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 302) {
        console.warn("302 detected. redirecting...");
        navigate("/");
        return false;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. rerouting...");
        navigate("/");
        return false;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request...");
        return handleValidate(false);
      }

      if (!response.ok) {
        console.warn(response.status);
        return false;
      }

      const data = await response.json();
      console.log(data);
      handleGetPosts(false);
      return true;
    } catch (err) {
      console.warn(err);
    }
  };

  const handleGetPosts = async (retry = true) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${GetPosts}/${sessionStorage.getItem("id")}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 302) {
        console.warn("302 detected. redirecting...");
        navigate("/");
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Rerouting...");
        navigate("/");
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Validating token...");
        return handleValidate();
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      //console.log(data);

      setUsersPosts(data.posts);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePostClicked = (e, data) => {
    e.preventDefault();

    setIsPostClicked(true);
    setChosenPost(data);
  };

  const handleSeeMore = (e) => {
    e.preventDefault();
    setSeeMoreCaptionClicked(!seeMoreCaptionClicked);
  };

  // ---------------------------------------------------------------------------------------

  const AddPostModalContainer = ({ setIsAddPostClicked, handleGetPosts }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [newPost, setNewPost] = useState({
      Caption: "",
      File: null,
      Preview: null,
    });

    const handleFileChange = (e) => {
      const file = e.target.files[0];

      setNewPost((prev) => ({
        ...prev,
        File: file,
        Preview: URL.createObjectURL(file),
      }));
    };

    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setNewPost((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleValidate = async (retry = true) => {
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
          console.warn("401 detected. Retrying request...");
          return handleValidate(false);
        }

        if (!response.ok) {
          console.warn(response.status);
          return false;
        }

        const data = await response.json();
        console.log(data);
        handleUploadVideo(false);
        return true;
      } catch (err) {
        console.warn(err);
      }
    };

    const handleAddPost = async (retry = true, postUrl) => {
      try {
        const response = await fetch(AddPost, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            UserId: sessionStorage.getItem("id"),
            Caption: newPost.Caption,
            PostUrl: postUrl,
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
          console.warn("401 detected. Retrying request...");
          var isValidated = await handleValidate();
          if (isValidated === true) {
            return handleUploadVideo(false);
          } else {
            console.warn("Unauthorized. Rerouting...");
            navigate("/", { replace: true });
          }
        }

        if (!response.ok) {
          console.warn(response.status);
          return;
        }

        const data = await response.json();
        console.log(data);

        handleGetPosts();
        setIsAddPostClicked(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (err) {
        console.warn(err);
      }
    };

    const handleUploadVideo = async (retry = true) => {
      try {
        const formData = new FormData();
        formData.append("File", newPost.File);

        const response = await fetch(UploadVideo, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        if (response.status === 302) {
          console.warn("302 detected. Redirecting...");
          navigate("/", { replace: true });
          return;
        }

        if (response.status === 401 && retry) {
          console.warn("401 detected. Retrying request...");
          return handleValidate();
        }

        if (!response.ok) {
          console.warn(response.status);
          return;
        }

        const data = await response.json();
        console.log(data);
        await handleAddPost(true, data.postUrl);
      } catch (err) {
        console.warn(err);
      }
    };

    const handleAddClick = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      await handleUploadVideo();
    };
    return (
      <div className="post-open-modal__wrapper">
        {isLoading === true ? (
          <div className="-loading-icon__wrapper">
            <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
          </div>
        ) : (
          <div className="-display-flex">
            <div className="add-post-videoPreview__wrapper">
              {newPost.Preview === null ? (
                <>
                  <label htmlFor="actual-btn">
                    Upload a Media <br />
                    <MonitorArrowUpIcon
                      size={52}
                      color={"rgba(0,0,0,0.5)"}
                      weight="fill"
                      className={"upload-icon"}
                    />
                  </label>
                  <input
                    accept="video/*"
                    id="actual-btn"
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                    style={{ display: "none" }}
                  />
                </>
              ) : (
                <video
                  className="video-thumbnail"
                  src={newPost.Preview}
                  disablePictureInPicture
                  disableRemotePlayback
                  autoPlay={true}
                  controls
                  controlsList="nodownload noremoteplayback noplaybackrate"
                  loop={true}
                  alt="video-thumbnail"
                  height="700px"
                  width="100%"
                />
              )}
            </div>
            <div className="add-post-details__wrapper">
              <h4>Make a Post</h4>
              <p>Make a caption</p>
              <textarea
                name="Caption"
                onChange={(e) => handleOnChange(e)}
              ></textarea>

              <div className="add-post-btns__wrapper">
                <button
                  className="-btn-invisible"
                  onClick={() => setIsAddPostClicked(false)}
                >
                  Cancel
                </button>
                <button
                  className="-form-submit__btn"
                  onClick={(e) => handleAddClick(e)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ---------------------------------------------------------------------------------------

  const PostModalContainer = ({ chosenPost, userData, setIsPostClicked }) => {
    const navigate = useNavigate();
    const [isOpenLikesModal, setIsOpenLikesModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [usersComment, setUsersComment] = useState([]);

    const [allLikes, setAllLikes] = useState([]);
    const [postLikes, setPostLikes] = useState([]);
    const [isLikedByUser, setIsLikedByUser] = useState(false);

    const [newCommentandLike, setNewCommentAndLike] = useState({
      PostId: chosenPost.id,
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
          hadnleFetchLikes(false);
        }
        return true;
      } catch (err) {
        console.warn(err);
      }
    };

    const handleFetchComments = async (retry = true) => {
      try {
        const response = await fetch(`${GetComments}/${chosenPost.id}`, {
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

    //--------------------------------------------------------------------------------

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
        const response = await fetch(`${GetLikes}/${chosenPost.id}`, {
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

    // ------------------------------------------------------------------------------------------------

    return (
      <div>
        <div className="post-open-modal__wrapper">
          {isOpenLikesModal === true && (
            <OpenLikesModal
              setIsOpenLikesModal={setIsOpenLikesModal}
              allLikes={allLikes}
            />
          )}
          <button
            className="post-post-close-icon__btn"
            onClick={() => setIsPostClicked(false)}
          >
            <XIcon size={25} color="#ffff" />
          </button>
          <div className="-display-flex">
            <div className="post-open-modal-thumbnail__wrapper">
              <video
                className="video-thumbnail"
                src={`${BASE_POST_API}/${chosenPost.postUrl}`}
                disablePictureInPicture
                disableRemotePlayback
                autoPlay={true}
                controls
                controlsList="nodownload noremoteplayback noplaybackrate"
                loop={true}
                alt="video-thumbnail"
                height="700px"
                width="100%"
              />
            </div>

            <div className="post-open-modal-postDetails__wrapper">
              <div className="-display-flex-justified-spacebetween">
                <div className="-display-flex-aligned-center -gap-10">
                  <img
                    className="profile-post-profilepic-thumbnail__img"
                    src={`${BASE_URL}/${userData.profilePictureUrl}`}
                    alt="dp-thumbnail"
                  />
                  <div>
                    <p>{userData.fullName}</p>
                    <label>{userData.userName}</label>
                  </div>
                </div>

                <p style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)" }}>
                  {TimeAgo(chosenPost.createdAt)}
                </p>
              </div>
              <div
                className={`profile-post-captions__text ${
                  seeMoreCaptionClicked === true ? "-overflow-auto" : ""
                }`}
              >
                {chosenPost.caption.length > 540 ? (
                  <>
                    {seeMoreCaptionClicked === false ? (
                      <>{chosenPost.caption.substring(0, 540)}...</>
                    ) : (
                      <>{chosenPost.caption}</>
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
                  chosenPost.caption
                )}
              </div>

              {postLikes.filter((data) => data.isLiked).length <= 0 ? (
                ""
              ) : (
                <button
                  className="likes-preview__btn -margin-top-10"
                  onClick={() => setIsOpenLikesModal(true)}
                >
                  <SparkleIcon size={12} weight="fill" color={"gold"} />{" "}
                  {postLikes.length}
                </button>
              )}

              <div className="-display-flex-justified-spacebetween">
                <button
                  type="button"
                  onClick={(e) => handleLikeClicked(e)}
                  className="-btn-invisible -display-flex-aligned-center -gap-10 -padding-20"
                >
                  {isLikedByUser === true ? (
                    <>
                      <SparkleIcon size={20} weight="fill" color={"gold"} />{" "}
                      Liked
                    </>
                  ) : (
                    <>
                      <SparkleIcon size={20} /> Like
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

              <div className="profile-post-comments__wrapper">
                {isLoading === true ? (
                  <div className="comment-loading__icon">
                    <CircleNotchIcon
                      size={35}
                      className={"-btn-loading__icon"}
                    />
                  </div>
                ) : (
                  <>
                    {usersComment.map((user) => (
                      <div key={user.id}>
                        {comments.map((comment, index) => (
                          <div
                            className="-display-flex-justified-spacebetween -margin-top-10"
                            key={index}
                          >
                            <div className="-display-flex -gap-10">
                              <img
                                className="comment-profilepic__img"
                                src={`${BASE_URL}/${user.profilePictureUrl}`}
                                alt="profilepic"
                              />
                              <div>
                                <p>{user.fullName}</p>
                                <p className="comment__text">
                                  {user.id === comment.userId &&
                                    comment.comment}
                                </p>
                              </div>
                            </div>

                            <div>
                              <label>{TimeAgo(comment.commentedAt)}</label>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
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
    );
  };

  // ---------------------------------------------------------------------------------------
  return (
    <div>
      {isPostClicked === true || isAddPostClicked === true ? (
        <div className="overlay"></div>
      ) : (
        ""
      )}
      {isPostClicked === true && (
        <PostModalContainer
          chosenPost={chosenPost}
          userData={userData}
          setIsPostClicked={setIsPostClicked}
        />
      )}

      {isAddPostClicked === true && (
        <AddPostModalContainer
          setIsAddPostClicked={setIsAddPostClicked}
          handleGetPosts={handleGetPosts}
        />
      )}
      <div className="profile-reels-call-to-action__wrapper">
        <button className="profile-reels-actions__btn">
          <SquaresFourIcon size={15} /> Posts
        </button>

        <button className="profile-reels-actions__btn">
          <MonitorPlayIcon size={15} /> Reels
        </button>

        <button
          className="profile-reels-makeapost-icon__btn"
          onClick={() => setIsAddPostClicked(true)}
        >
          <PlusIcon size={15} color={"#eaf2ff"} /> Make a Post
        </button>

        <button className="profile-reels-actions__btn">
          <FoldersIcon size={15} /> Drafts
        </button>
        <button className="profile-reels-actions__btn">
          <BookmarkSimpleIcon size={15} /> Saved
        </button>
      </div>

      <div className="profile-reels-container__wrapper">
        {isLoading === true ? (
          <div className="-loading-icon__wrapper">
            <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
          </div>
        ) : (
          <>
            {usersPosts.map((post, index) => (
              <div
                className="profile-reels-content-thumbnail__wrapper"
                onClick={(e) => handlePostClicked(e, post)}
                key={index}
              >
                <video
                  className="profile-reels-thumbnail__video"
                  src={`${BASE_POST_API}/${post.postUrl}`}
                  alt="video-thumbnail"
                />
                <p className="profile-reels-thumbnail__text">
                  {post.caption.length > 250
                    ? post.caption.substring(0, 250) + "...."
                    : post.caption}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const ProfileCards = ({ userData }) => {
  return (
    <div className="profile-cards-container__wrapper">
      <div className="profile-cards__wrapper">
        <div className="profile-cards-icon-texts__wrapper">
          <EnvelopeIcon size={18} />
          <span style={{ fontSize: "12px" }}>{userData?.email}</span>
        </div>
        <div className="profile-cards-icon-texts__wrapper">
          <PhoneIcon size={18} />
          <span style={{ fontSize: "12px" }}>{userData?.mobileNumber}</span>
        </div>
      </div>
      <div className="profile-cards__wrapper">
        <div className="profile-cards-icon-texts__wrapper">
          <ScanSmileyIcon size={18} />
          <span style={{ fontSize: "12px" }}>Appearance</span>
        </div>

        <div className="profile-cards-appearance-details__wrapper">
          <p>Height</p>
          <span style={{ fontSize: "12px" }}>
            {userData.appearance?.height}cm
          </span>
        </div>
        <div className="profile-cards-appearance-details__wrapper">
          <p>Weight</p>
          <span style={{ fontSize: "12px" }}>
            {userData.appearance?.weight}kg
          </span>
        </div>
        <div className="profile-cards-appearance-details__wrapper">
          <p>Hair Color</p>
          <span style={{ fontSize: "12px" }}>
            {userData.appearance?.hairColor}
          </span>
        </div>
        <div className="profile-cards-appearance-details__wrapper">
          <p>Eye Color</p>
          <span style={{ fontSize: "12px" }}>
            {userData.appearance?.eyeColor}
          </span>
        </div>
      </div>
      <div className="profile-cards__wrapper">
        <div className="profile-cards-icon-texts__wrapper">
          <GlobeHemisphereEastIcon size={18} />
          <span style={{ fontSize: "12px" }}>Personal Background</span>
        </div>

        <div className="profile-cards-appearance-details__wrapper">
          <p>Ethnicity</p>
          <span style={{ fontSize: "12px" }}>
            {userData.personalBackground?.ethnicity}
          </span>
        </div>
        <div className="profile-cards-appearance-details__wrapper">
          <p>Natural Accent</p>
          <span style={{ fontSize: "12px" }}>
            {userData.personalBackground?.naturalAccent}
          </span>
        </div>
      </div>
    </div>
  );
};

const ProfileBackground = () => {
  const navigate = useNavigate();
  const [editBackgroundClicked, setEditBackgroundClicked] = useState(false);
  const [openViewAllBtn, setOpenViewAllBtn] = useState(false);
  const [featuredBackgrounds, setFeaturedBackgrounds] = useState([]);

  useEffect(() => {
    handleFeatureBackgrounds();
  }, []);

  const handleFeatureBackgrounds = async (retry = true) => {
    try {
      const ID = sessionStorage.getItem("id");
      const response = await fetch(`${GetFeaturedBackgrounds}?userId=${ID}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorize. Rerouting...");
        navigate("/");
        return;
      }

      if (response.status === 301) {
        console.warn("301 detected. Redirecting...");
        navigate("/");
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request...");
        return handleFeatureBackgrounds(false);
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      setFeaturedBackgrounds(data);
    } catch (err) {
      console.warn(err);
    }
  };

  const ViewAllContainer = ({ setOpenViewAllBtn }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userBackgroundData, setUserBackgroundData] = useState([]);

    useEffect(() => {
      setIsLoading(true);
      handleFetchBackgrounds();
    }, []);

    const handleFetchBackgrounds = async (retry = true) => {
      try {
        const ID = sessionStorage.getItem("id");
        const response = await fetch(`${GetUserBackgrounds}?userId=${ID}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401 && retry === false) {
          console.warn("Unauthorize. Rerouting...");
          navigate("/");
          return;
        }

        if (response.status === 301) {
          console.warn("301 detected. Redirecting...");
          navigate("/");
          return;
        }

        if (response.status === 401 && retry) {
          console.warn("401 detected. Retrying request...");
          return handleFetchBackgrounds(false);
        }

        if (!response.ok) {
          console.warn(response.status);
          return;
        }

        const data = await response.json();
        setUserBackgroundData(data);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (err) {
        console.warn(err);
      }
    };

    return (
      <>
        <div className="viewall-background__wrapper">
          <div className="profile-background-headers__wrapper">
            <button
              className="-btn-invisible"
              onClick={() => setOpenViewAllBtn(false)}
            >
              <XIcon size={15} />
            </button>
            <h4 style={{ marginTop: "10px" }}>Aaron's Background</h4>
            <br />
            <p style={{ fontSize: "12px", lineHeight: "1.5" }}>
              This page gives you a quick look at Aaron’s background — where
              they’ve come from, what they’ve worked on, and a bit about their
              journey in acting. It’s here so you can get to know them better
              beyond just their roles.
            </p>
          </div>

          {isLoading ? (
            <div className="-loading-icon__wrapper">
              <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
            </div>
          ) : (
            <>
              {userBackgroundData.map((data, index) => (
                <div className="-padding-20">
                  <div className="background__wrapper" key={index}>
                    <div className="-display-flex-justified-spacebetween">
                      <div className="background-details__wrapper">
                        <FilmSlateIcon size={20} />
                        <p style={{ fontSize: "10px" }}>{data.year}</p>
                        <h4>{data.title}</h4>

                        <br />
                        <p style={{ fontSize: "12px", marginTop: "10px" }}>
                          Production Type -{" "}
                          <strong>{data.productionType}</strong>
                        </p>
                        <p style={{ fontSize: "12px", marginTop: "10px" }}>
                          Production - <strong>{data.production}</strong>
                        </p>
                        <p style={{ fontSize: "12px", marginTop: "10px" }}>
                          Director - <strong>{data.director}</strong>
                        </p>
                        <p style={{ fontSize: "12px", marginTop: "10px" }}>
                          Role - <strong>{data.role}</strong>
                        </p>
                      </div>
                      <div className="background-details-moreinfo__wrapper">
                        <div className="background-details-note__wrapper">
                          <h5>Note</h5>
                          <p>{data.note}</p>
                        </div>

                        <div>
                          <h5>Links</h5>
                          {data.videoUrls.map((items, index) => (
                            <div key={index}>
                              <a
                                className="view-links__anchor"
                                href={items}
                                target="_blank"
                              >
                                <LinkIcon size={15} /> {items}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </>
    );
  };

  // ------------------------------------------------------------------------------------------------------------------

  const EditBackgroundContainer = ({
    handleFeatureBackgrounds,
    featuredBackgrounds,
  }) => {
    const [urlInputValue, setUrlInputValue] = useState("");
    const [urlError, setUrlError] = useState(null);
    const [userBackgroundData, setUserBackgroundData] = useState([]);
    const [newUserData, setNewUserData] = useState({
      Id: 0,
      Title: "",
      Production: "",
      Role: "",
      Director: "",
      Year: "",
      Note: "",
      ProductionType: "",
      VideoUrls: [],
    });

    const [deleteClicked, setDeleteClicked] = useState(false);
    const [openExistingContainer, setOpenExistingContainer] = useState(0);
    const [isLoading, setIsLoading] = useState(false); //loading for updating
    const [mainLoading, setMainLoading] = useState(false); //main page loading

    useEffect(() => {
      setMainLoading(true);
      handleFetchBackgrounds();
    }, []);

    const handleFetchBackgrounds = async (retry = true) => {
      try {
        const ID = sessionStorage.getItem("id");
        const response = await fetch(`${GetUserBackgrounds}?userId=${ID}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401 && retry === false) {
          console.warn("Unauthorize. Rerouting...");
          navigate("/");
          return;
        }

        if (response.status === 301) {
          console.warn("301 detected. Redirecting...");
          navigate("/");
          return;
        }

        if (response.status === 401 && retry) {
          console.warn("401 detected. Retrying request...");
          return handleFetchBackgrounds(false);
        }

        if (!response.ok) {
          console.warn(response.status);
          return;
        }

        const data = await response.json();
        setUserBackgroundData(data);

        setTimeout(() => {
          setMainLoading(false);
        }, 2000);
      } catch (err) {
        console.warn(err);
      }
    };

    const handleOpenContainers = (index) => {
      if (openExistingContainer === index + 1) {
        setOpenExistingContainer(0);
      } else {
        setOpenExistingContainer(index + 1);
      }
    };

    const handleOnChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;

      setNewUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleAddUrl = (e, index) => {
      e.preventDefault();

      if (isValidUrl(urlInputValue)) {
        setUrlError(false);
        //putting the new url value to the userBackground state for user to see the new values.
        setUserBackgroundData((prev) =>
          prev.map((item, i) => {
            if (i === index) {
              return {
                ...item,
                videoUrls: [...item.videoUrls, urlInputValue.trim()],
              };
            }
            return item;
          })
        );
        setUrlInputValue(""); //setting it to default empty string once it is added to the array.
      } else {
        setUrlError(true);
      }
    };

    const isValidUrl = (string) => {
      try {
        new URL(string);
        return true;
      } catch {
        return false;
      }
    };

    const handleUpdateBackground = async (retry = true, id, featured) => {
      try {
        const newUrls =
          userBackgroundData.find((item, i) => item.id === id)?.videoUrls || [];

        const response = await fetch(UpdateUserBackground, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            Id: id,
            Title: newUserData.Title,
            Production: newUserData.Production,
            Role: newUserData.Role,
            Director: newUserData.Director,
            Year: newUserData.Year,
            IsDeleted: deleteClicked, //if the user clicks the delete icon then the state is true but if they do not, then the state is false
            IsFeatured: featured,
            Note: newUserData.Note,
            ProductionType: newUserData.ProductionType,
            VideoUrls: newUrls,
          }),
        });

        if (response.status === 401 && retry === false) {
          console.warn("Unauthorized. Rerouting...");
          navigate("/");
          return;
        }

        if (response.status === 301) {
          console.warn("301 detected. Redirecting...");
          navigate("/");
          return;
        }

        if (response.status === 401 && retry) {
          console.warn("401 detected. Retrying request...");
          return handleUpdateBackground(false, id, featured);
        }

        if (!response.ok) {
          console.warn(response.status);
          return;
        }

        const data = await response.json();
        console.log(data);

        setNewUserData({
          Id: 0,
          Title: "",
          Production: "",
          Role: "",
          Director: "",
          Year: "",
          Note: "",
          ProductionType: "",
          VideoUrls: [],
        });

        handleFeatureBackgrounds();
        setDeleteClicked(false);
        setTimeout(() => {
          handleFetchBackgrounds(); //calling for resresh data, once update finish
          setOpenExistingContainer(0);
          setIsLoading(false);
          setMainLoading(false);
        }, 2000);
      } catch (err) {
        console.warn(err);
      }
    };

    const handleBtnClicked = async (e, id) => {
      e.preventDefault();

      setIsLoading(true);
      await handleUpdateBackground(true, id, null); //parameter: (retry, id, feature)  retry is for the jwt service, id is the background id and the feature is wether user sets the background a feature (null here because we are only updating the values except for feature)
    };

    const handleBtnFeatureClicked = async (e, id, feature) => {
      e.preventDefault();
      setMainLoading(true);

      const isFeature = feature === true ? false : true;
      await handleUpdateBackground(true, id, isFeature); //parameter: (retry, id, feature)  retry is for the jwt service, id is the background id and the feature is wether user sets the background a feature
    };

    const handleCloseModal = (e) => {
      e.preventDefault();
      setEditBackgroundClicked(false);
    };

    // Remove a URL from the list
    const handleRemoveUrl = (e, index, chosenUrlToDelete) => {
      e.preventDefault();

      setUserBackgroundData((prev) =>
        prev.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              videoUrls: item.videoUrls.filter(
                (_, j) => j !== chosenUrlToDelete
              ),
            };
          }
          return item;
        })
      );
    };

    const AddBackgroundContainer = ({ handleFetchBackgrounds }) => {
      const navigate = useNavigate();
      const [isLoading, setIsLoading] = useState(false);
      const [openAddBackground, setOpenAddBackground] = useState(false);
      const [isUrlError, setIsUrlError] = useState(false);
      const [currentUrl, setCurrentUrl] = useState("");
      const [addNewdata, setAddNewData] = useState({
        UserId: sessionStorage.getItem("id"),
        Title: "",
        Production: "",
        Role: "",
        Director: "",
        Year: "",
        Note: "",
        ProductionType: "",
        VideoUrls: [],
      });

      const handleOnChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setAddNewData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleAddVideoUrl = (e) => {
        e.preventDefault();

        try {
          new URL(currentUrl);
          setAddNewData((prev) => ({
            ...prev,
            VideoUrls: [...prev.VideoUrls, currentUrl.trim()],
          }));

          setCurrentUrl("");
          setIsUrlError(false);
          return true;
        } catch {
          setIsUrlError(true);
          return false;
        }
      };

      const handleAddData = async (retry = true) => {
        try {
          const response = await fetch(AddUserBackground, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify(addNewdata),
          });

          if (response.status === 401 && retry === false) {
            console.warn("Unauthorized. Rerouting...");
            navigate("/");
            return;
          }

          if (response.status === 301) {
            console.warn("301 detected. Redirecting...");
            navigate("/");
            return;
          }

          if (response.status === 401 && retry) {
            console.warn("401 detected. Retrying request...");
            return handleAddData(false);
          }

          if (!response.ok) {
            console.warn(response.status);
            return;
          }

          const data = await response.json();
          console.log(data);

          setAddNewData({
            Title: "",
            Production: "",
            Role: "",
            Director: "",
            Year: "",
            Note: "",
            ProductionType: "",
            VideoUrls: [],
          });

          setTimeout(() => {
            handleFetchBackgrounds();
            setIsLoading(false);
            setOpenAddBackground(false);
          }, 2000);
        } catch (err) {
          console.warn(err);
        }
      };

      const handleBtnSubmitClicked = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await handleAddData();
      };

      // Remove a URL from the list
      const handleRemoveUrl = (e, index) => {
        e.preventDefault();
        setAddNewData((prev) => ({
          ...prev,
          VideoUrls: prev.VideoUrls.filter((_, i) => i !== index),
        }));
      };
      return (
        <div>
          <div
            className="add-background-container__wrapper"
            onClick={() => setOpenAddBackground(!openAddBackground)}
          >
            <div className="-display-flex-aligned-center -gap-10">
              <PlusIcon size={20} />
              <h3>Add a new one</h3>
            </div>
          </div>

          <div
            className={`add-background-open__wrapper ${
              openAddBackground === true ? "slideopen-container" : ""
            }`}
          >
            {isLoading ? (
              <div className="-loading-icon__wrapper">
                <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
              </div>
            ) : (
              <form
                className="add-background-form__wrapper"
                onSubmit={handleBtnSubmitClicked}
              >
                <>
                  <div className="-form-input__wrapper">
                    <p>Title</p>
                    <input
                      type="text"
                      name="Title"
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>

                  <div className="-display-flex-justified-spaceevenly -gap-10">
                    <div className="-form-input__wrapper -width-50percent">
                      <p>Production</p>
                      <input
                        type="text"
                        name="Production"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>

                    <div className="-form-input__wrapper -width-50percent">
                      <p>Production Type</p>
                      <select
                        name="ProductionType"
                        onChange={(e) => handleOnChange(e)}
                      >
                        <option></option>
                        <option value="Feature Film">Feature Film</option>
                        <option value="Short Film">Short Film</option>
                        <option value="Television Series">
                          Television Series
                        </option>
                        <option value="Television Movie">
                          Television Movie
                        </option>
                        <option value="Pilot">Pilot</option>
                        <option calue="Documentary">Documentary</option>
                        <option value="Docuseries">Docuseries</option>
                        <option value="Reality TV">Reality TV</option>
                        <option value="Animated Feature">
                          Animated Feature
                        </option>
                        <option value="Commercial">Commercial</option>
                        <option value="Branded Content">Branded Content</option>
                      </select>
                    </div>
                  </div>
                  <div className="-display-flex-justified-spaceevenly -gap-10">
                    <div className="-form-input__wrapper -width-50percent">
                      <p>Role</p>
                      <input
                        type="text"
                        name="Role"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                    <div className="-form-input__wrapper -width-50percent">
                      <p>Director/Company</p>
                      <input
                        type="text"
                        name="Director"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>

                  <div className="-form-input__wrapper">
                    <p>Note</p>
                    <textarea
                      className="form-edit-note__wrapper"
                      name="Note"
                      onChange={(e) => handleOnChange(e)}
                    ></textarea>
                  </div>

                  <div className="-display-flex-justified-spaceevenly -gap-10">
                    <div className="-form-input__wrapper -width-50percent">
                      <p>Add video links here</p>
                      <p style={{ color: "red" }}>
                        {isUrlError
                          ? "Error: Enter a valid link to a video"
                          : ""}
                      </p>
                      <div className="-display-flex-justified-spacebetween">
                        <input
                          type="text"
                          value={currentUrl}
                          placeholder="eg. https://www.thelinkhere.com/Rtfh52"
                          onChange={(e) => setCurrentUrl(e.target.value)}
                        />
                        <button
                          type="button"
                          className="-btn-invisible"
                          onClick={(e) => handleAddVideoUrl(e)}
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <div className="-form-input__wrapper -width-50percent">
                      <p>Year</p>
                      <input
                        type="text"
                        name="Year"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>

                  <div>
                    {addNewdata?.VideoUrls.map((items, index) => (
                      <div className="link__text" key={index}>
                        {items}{" "}
                        <button
                          type="button"
                          className="-btn-invisible"
                          onClick={(e) => handleRemoveUrl(e, index)}
                        >
                          <XIcon size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
                <button
                  type="submit"
                  className="-form-submit__btn -margin-top-50"
                >
                  Add
                </button>
              </form>
            )}
          </div>
        </div>
      );
    };
    // -----------------------------------------------------------------------------------------

    return (
      <div className="edit-background-container__wrapper">
        <div className="profile-background-headers__wrapper">
          <button
            className="-btn-invisible"
            onClick={(e) => handleCloseModal(e)}
          >
            <XIcon size={15} />
          </button>
          <h4 style={{ marginTop: "10px" }}>
            Add or Update an existing background
          </h4>
          <br />
          <p style={{ fontSize: "12px", lineHeight: "1.5" }}>
            This page allows you to update or add your acting background. Here,
            you can showcase your experience by listing the projects you’ve
            worked on, the roles you played, the production companies involved,
            and the directors you collaborated with. Adding this information
            helps highlight your skills and achievements, making it easier for
            others to understand your experience and see the range of your work
            as an actor.
          </p>
        </div>

        {mainLoading ? (
          <div className="-loading-icon__wrapper">
            <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
          </div>
        ) : (
          <div className="-padding-20">
            <AddBackgroundContainer
              handleFetchBackgrounds={handleFetchBackgrounds}
            />
            <br />
            <br />

            {userBackgroundData.map((items, index) => (
              <div key={index}>
                <div
                  className="edit-background-existing-close__wrapper -margin-top-10"
                  onClick={() => handleOpenContainers(index)}
                >
                  <div>
                    <h3>{items.title}</h3>
                    <h5>{items.productionType}</h5>
                    <p>{items.production}</p>
                  </div>
                  <div className="-display-flex-aligned-center -gap-10">
                    {featuredBackgrounds.length < 4 ||
                    items.isFeatured === true ? (
                      <button
                        type="button"
                        className="-btn-invisible feature-icon__btn"
                        onClick={(e) =>
                          handleBtnFeatureClicked(e, items.id, items.isFeatured)
                        }
                      >
                        {items.isFeatured === false ||
                        items.isFeatured === null ? (
                          <StarIcon
                            size={12}
                            weight="fill"
                            className={"star-default-icon"}
                          />
                        ) : (
                          <StarIcon size={12} weight="fill" color="yellow" />
                        )}
                      </button>
                    ) : (
                      ""
                    )}

                    {openExistingContainer === true ? (
                      <CaretUpIcon size={20} color={"#eaf2ff"} />
                    ) : (
                      <CaretDownIcon size={20} color={"#eaf2ff"} />
                    )}
                  </div>
                </div>
                <div
                  className={`edit-background-existing-open__wrapper ${
                    openExistingContainer === index + 1
                      ? "slideopen-container"
                      : ""
                  }`}
                >
                  {isLoading ? (
                    <div className="-loading-icon__wrapper">
                      <CircleNotchIcon
                        size={35}
                        className={"-btn-loading__icon"}
                      />
                    </div>
                  ) : (
                    <form
                      className="edit-background-form__wrapper"
                      onSubmit={(e) => handleBtnClicked(e, items.id)}
                    >
                      <div className="edit-background-form-delete__wrapper">
                        <button
                          type="button"
                          className="edit-background-form-delete__btn"
                          onClick={() => setDeleteClicked(true)}
                        >
                          <TrashIcon
                            size={17}
                            className={"trash__icon"}
                            weight="fill"
                          />
                        </button>
                      </div>

                      {deleteClicked === true ? (
                        <div style={{ textAlign: "center" }}>
                          <h4>Are you sure want to delete?</h4>
                          <button
                            className="-btn-invisible"
                            onClick={() => setDeleteClicked(false)}
                          >
                            No
                          </button>
                          <button
                            type="submit"
                            className="-btn-confirmation-delete -margin-left-20 -margin-top-20"
                          >
                            Yes
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="-form-input__wrapper">
                            <p>Title</p>
                            <input
                              type="text"
                              placeholder={items.title}
                              name="Title"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </div>

                          <div className="-display-flex-justified-spaceevenly -gap-10">
                            <div className="-form-input__wrapper -width-50percent">
                              <p>Production</p>
                              <input
                                type="text"
                                placeholder={items.production}
                                name="Production"
                                onChange={(e) => handleOnChange(e)}
                              />
                            </div>

                            <div className="-form-input__wrapper -width-50percent">
                              <p>Production Type</p>
                              <select
                                name="ProductionType"
                                onChange={(e) => handleOnChange(e)}
                              >
                                <option value="">{items.productionType}</option>
                                <option value=""></option>
                                <option value="Feature Film">
                                  Feature Film
                                </option>
                                <option value="Short Film">Short Film</option>
                                <option value="Television Series">
                                  Television Series
                                </option>
                                <option value="Television Movie">
                                  Television Movie
                                </option>
                                <option value="Pilot">Pilot</option>
                                <option value="Documentary">Documentary</option>
                                <option value="Docuseries">Docuseries</option>
                                <option value="Reality TV">Reality TV</option>
                                <option value="Animated Feature">
                                  Animated Feature
                                </option>
                                <option value="Commercial">Commercial</option>
                                <option value="Branded Content">
                                  Branded Content
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="-display-flex-justified-spaceevenly -gap-10">
                            <div className="-form-input__wrapper -width-50percent">
                              <p>Role</p>
                              <input
                                type="text"
                                placeholder={items.role}
                                name="Role"
                                onChange={(e) => handleOnChange(e)}
                              />
                            </div>
                            <div className="-form-input__wrapper -width-50percent">
                              <p>Director/Company</p>
                              <input
                                type="text"
                                placeholder={items.director}
                                name="Director"
                                onChange={(e) => handleOnChange(e)}
                              />
                            </div>
                          </div>

                          <div className="-form-input__wrapper">
                            <p>Note</p>
                            <textarea
                              className="form-edit-note__wrapper"
                              placeholder={items.note}
                            ></textarea>
                          </div>

                          <div className="-display-flex-justified-spaceevenly -gap-10">
                            <div className="-form-input__wrapper -width-50percent">
                              <p>Add video links here</p>
                              {urlError === true && (
                                <p style={{ color: "red" }}>
                                  error: invalid url
                                </p>
                              )}
                              <div className="-display-flex-justified-spacebetween">
                                <input
                                  type="text"
                                  name="VideoUrls"
                                  value={urlInputValue}
                                  onChange={(e) =>
                                    setUrlInputValue(e.target.value)
                                  }
                                />

                                <button
                                  className="-btn-invisible"
                                  type="button"
                                  onClick={(e) => handleAddUrl(e, index)}
                                >
                                  Add
                                </button>
                              </div>
                            </div>

                            <div className="-form-input__wrapper -width-50percent">
                              <p>Year</p>
                              <input
                                type="text"
                                placeholder={items.year}
                                name="Year"
                                onChange={(e) => handleOnChange(e)}
                              />
                            </div>
                          </div>

                          {items.videoUrls.map((items, indexOfUrl) => (
                            <div
                              className="-display-flex-justified-spacebetween -width-50percent"
                              key={indexOfUrl}
                            >
                              <p style={{ fontSize: "12px" }}>{items}</p>
                              <button
                                type="button"
                                className="-btn-invisible"
                                onClick={(e) =>
                                  handleRemoveUrl(e, index, indexOfUrl)
                                }
                              >
                                <XIcon size={15} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="submit"
                            className="-form-submit__btn -margin-top-50"
                          >
                            Save
                          </button>
                        </>
                      )}
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // -------------------------------------------------------------------------------------------------------------------
  return (
    <div className="profile-background__wrapper">
      {editBackgroundClicked === true && (
        <>
          <div className="overlay"></div>
          <EditBackgroundContainer
            handleFeatureBackgrounds={handleFeatureBackgrounds}
            featuredBackgrounds={featuredBackgrounds}
          />
        </>
      )}
      {openViewAllBtn === true && (
        <>
          <div className="overlay"></div>
          <ViewAllContainer setOpenViewAllBtn={setOpenViewAllBtn} />
        </>
      )}
      <div className="-display-flex-justified-spacebetween">
        <button
          className="profile-background-viewall__btn"
          onClick={() => setOpenViewAllBtn(true)}
        >
          View all
        </button>
        <button
          className="-btn-invisible"
          onClick={() => setEditBackgroundClicked(true)}
        >
          <PencilSimpleIcon size={15} />
        </button>
      </div>

      {featuredBackgrounds.length <= 0 ? (
        <div className="profile-background-feature-empty__wrapper">
          <h4>Feature your background</h4>
          <p>
            No features yet. You have to <StarIcon size={12} /> feature 2
            backgrounds
          </p>
        </div>
      ) : (
        <>
          {featuredBackgrounds.map((data, index) => (
            <div className="profile-background-lists__wrapper" key={index}>
              <div>
                <p style={{ fontSize: "10px" }}>{data.year}</p>
                <h4>{data.title}</h4>
                <ul className="profile-background__list">
                  <li>
                    Production Type:{" "}
                    <strong className="profile-background-list__li-strong">
                      {data.productionType}
                    </strong>
                  </li>
                  <li>
                    Production:{" "}
                    <strong className="profile-background-list__li-strong">
                      {data.production}
                    </strong>
                  </li>

                  <li>
                    Director/Company:{" "}
                    <strong className="profile-background-list__li-strong">
                      {data.director}
                    </strong>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const ProfileDetails = ({ navigate, userData }) => {
  return (
    <div>
      <div className="profile-deatils__wrapper">
        <img
          className="profile-details-profilepicture__img"
          src={`${BASE_URL}${userData.profilePictureUrl}`}
          alt="profile-picture"
        />

        <div className="profile-details-details__wrapper">
          <h2>{userData.fullName}</h2>
          <p style={{ marginBottom: "5px", color: "rgba(0,0,0,0.6)" }}>
            {userData.userName}
          </p>
          <div className="profile-details-followers__wrapper">
            <p>Followers: 200</p>
            <p>Following: 200</p>
          </div>
          <p className="profile-details-bio__text">
            {userData.bio?.length > 250
              ? userData.bio?.substring(0, 250) + "..."
              : userData.bio}
          </p>
        </div>

        <button
          className="profile-details-profilepicture-edit__btn"
          onClick={() => navigate("/settings-page?load=profile")}
        >
          <PencilSimpleIcon size={15} />
        </button>
      </div>
    </div>
  );
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUserData();
  }, []);

  const handleGetUserData = async (retry = true) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${USER_API_URI}/${sessionStorage.getItem("id")}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 302) {
        console.warn("301 detected, redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("401 detected, rerouting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected, retrying request...");
        return handleGetUserData(false);
      }

      if (!response.ok) {
        console.warn(response.status);
      }

      const data = await response.json();
      setUserData(data);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <div className="-main-container__wrapper">
      <Nav />

      {isLoading ? (
        <div className="profile-loading-icon__wrapper">
          <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
        </div>
      ) : (
        <div className="profile-container__wrapper">
          <div>
            <ProfileDetails navigate={navigate} userData={userData} />
            <ProfileBackground />
          </div>
          <div>
            <ProfileCards userData={userData} />

            <ProfileReels userData={userData} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
