import React, { useEffect, useState, useRef, useCallback } from "react";
import Nav from "../Nav/Nav";
import {
  AddComment,
  AddLike,
  BASE_POST_API,
  BASE_URL,
  CheckLike,
  GetComments,
  GetFollowing,
  GetFollowingPosts,
  GetLikes,
  GetUsersByIds,
  ValidateToken,
  GetCastingCalls,
  GetAllEvents,
} from "../../assets/js/serverapi";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarDotsIcon,
  CalendarSlashIcon,
  ChatCenteredTextIcon,
  CircleNotchIcon,
  FilmSlateIcon,
  HashStraightIcon,
  PaperPlaneRightIcon,
  ShareFatIcon,
  SmileyXEyesIcon,
  SparkleIcon,
  TrophyIcon,
} from "@phosphor-icons/react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { TimeAgo } from "../../assets/js/timeago";
import useNotification from "../../assets/js/useNotification";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/feedstyles.css";
const FeedPostsContainer = () => {
  const USER_ID = sessionStorage.getItem("id");
  const notificationHook = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [feedUsers, setFeedUsers] = useState([]);
  const [feedPosts, setFeedPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [pageSize] = useState(2);
  const observer = useRef();

  const [postByUserId, setPostByUserId] = useState(null);
  const [openDetailsPostId, setOpenDetailsPostId] = useState(null);
  const [seeMoreCaptionClicked, setSeeMoreCaptionClicked] = useState(null);
  const [comments, setComments] = useState([]);
  const [usersComments, setUsersComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const [isLikedByUser, setIsLikedByUser] = useState(false);

  const [newComment, setNewComment] = useState({
    PostId: openDetailsPostId,
    UserId: sessionStorage.getItem("id"),
    Comment: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    handleGetFollowing();
  }, []); //getfollowing
  const handleGetFollowing = async (retry = true) => {
    try {
      const response = await fetch(`${GetFollowing}/${USER_ID}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        navigate("/", { replace: true });
        sessionStorage.clear();
        return;
      }

      if (response.status === 401 && !retry) {
        navigate("/", { replace: true });
        sessionStorage.clear();
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected, retrying request...");
        return await handleGetFollowing(false);
      }

      if (!response.ok) {
        console.error(response.status);
      }

      const data = await response.json();
      //console.log(data);
      setFeedUsers(data);
      const ids = data.map((items) => items.id);
      await handleGetPostsOfFollowing(ids);
    } catch (err) {
      console.error("Error: ", err);
      throw err;
    }
  };

  const handleGetPostsOfFollowing = useCallback(
    async (ids) => {
      if (!hasNext || isLoading) return;
      setIsLoading(true);
      try {
        const response = await fetch(
          `${GetFollowingPosts}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify(ids),
          }
        );

        if (!response.ok) {
          console.error("Status: ", response.status);
          return;
        }

        const data = await response.json();

        setFeedPosts((prev) => [...prev, ...data.items]);
        setHasNext(data.hasNext);
      } catch (err) {
        console.error("Error: ", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [pageNumber, hasNext, isLoading]
  );

  const lastProducRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNext]
  );

  useEffect(() => {
    if (feedUsers.length > 0) {
      const ids = feedUsers.map((items) => items.id);
      handleGetPostsOfFollowing(ids);
    }
  }, [pageNumber]);

  useEffect(() => {
    handleFetchComments();
    handleCheckLike(openDetailsPostId);
  }, [openDetailsPostId]);

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
      }
      return true;
    } catch (err) {
      console.warn(err);
    }
  };

  const handleFetchComments = async (retry = true) => {
    try {
      const response = await fetch(`${GetComments}/${openDetailsPostId}`, {
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
      await handleFetchUsers(true, ids, "comments");
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
        setUsersComments(data);
      } else {
        setAllLikes(data);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleFetchLikes = async (retry = true) => {
    try {
      const response = await fetch(`${GetLikes}/${openDetailsPostId}`, {
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

  const handleCheckLike = async (openDetailsPostId) => {
    try {
      const response = await fetch(CheckLike, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          PostId: openDetailsPostId,
          UserId: sessionStorage.getItem("id"),
          Comment: "",
        }),
      });

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();

      setIsLikedByUser(data);
      await handleFetchLikes();
    } catch (err) {
      console.warn(err);
    }
  };

  const handleAddLike = async (retry = true, videoId) => {
    try {
      const notification = {
        RecieverId: postByUserId,
        SenderId: USER_ID,
        ReferenceId: videoId,
        Type: "NewLike",
        Message: "likes your post",
        CreatedAt: null,
      };

      const response = await fetch(AddLike, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          PostId: videoId,
          UserId: sessionStorage.getItem("id"),
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

      if (data.likedOrUnliked === true) {
        await notificationHook(notification);
      }
      await handleFetchLikes();
      setIsLikedByUser(data.likedOrUnliked);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleAddComment = async (retry = true) => {
    try {
      const notification = {
        RecieverId: postByUserId,
        SenderId: USER_ID,
        ReferenceId: openDetailsPostId,
        Type: "NewComment",
        Message: "commented on your post",
        CreatedAt: null,
      };

      const response = await fetch(AddComment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          PostId: openDetailsPostId,
          UserId: USER_ID,
          Comment: newComment.Comment,
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
        return handleValidate(true, "addComment");
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      //console.log(data);

      await handleFetchComments();
      await notificationHook(notification);
      setNewComment((prev) => ({
        ...prev,
        Comment: "",
      }));

      //setIsLoading(true);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddComment();
  };

  const handleLikeClicked = async (e, videoId) => {
    e.preventDefault();
    await handleAddLike(true, videoId);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenBtn = (e, post) => {
    e.preventDefault();
    if (post.id === openDetailsPostId) {
      setOpenDetailsPostId(null);
      setPostByUserId(null);
    } else {
      setOpenDetailsPostId(post.id);
      setPostByUserId(post.userId);
    }
  };

  const handleSeeMore = (e, id) => {
    e.preventDefault();
    if (id === seeMoreCaptionClicked) {
      setSeeMoreCaptionClicked(null);
    } else {
      setSeeMoreCaptionClicked(id);
    }
  };

  return (
    <div className="post-container__wrapper">
      {feedPosts.map((post) =>
        feedUsers.map(
          (user) =>
            user.id === post.userId && (
              <div
                style={{
                  margin: "0 0 50px 50px",
                }}
                ref={lastProducRef}
                key={post.id}
              >
                <div className="post-header-user-details__wrapper">
                  <img
                    className="feed-picture-thumbnail__img"
                    src={`${BASE_URL}/${user.profilePictureUrl}`}
                    alt="profile-picture-thumbnail"
                  />
                  <div>
                    <p>{user.fullName}</p>
                    <span>{TimeAgo(post.createdAt)}</span>
                  </div>
                </div>
                <div className="post-thumbnail__wrapper">
                  <div className="post-reels-video__wrapper">
                    <video
                      className="feed-post__video"
                      src={`${BASE_POST_API}/${post.postUrl}`}
                      disablePictureInPicture
                      disableRemotePlayback
                      autoPlay={false}
                      controls
                      controlsList="nodownload noremoteplayback noplaybackrate"
                      loop={true}
                      alt="video-thumbnail"
                    />
                    {/* <button className="post-play-icon__btn">
                      <PlayCircleIcon
                        size={80}
                        color={"rgba(0, 0, 0, 0.7)"}
                        weight="fill"
                      />
                    </button> */}
                  </div>

                  <div
                    className={`post-thumbnail-details__wrapper ${
                      openDetailsPostId === post.id ? "activeSlide" : ""
                    }`}
                  >
                    {post.caption.length > 540 ? (
                      <div className="post-reel-caption-container__wrapper">
                        {seeMoreCaptionClicked === post.id ? (
                          <p style={{ fontSize: "12px" }}>
                            {post.caption.substring(0, 540)}...
                          </p>
                        ) : (
                          <p style={{ fontSize: "12px" }}>{post.caption}</p>
                        )}

                        {seeMoreCaptionClicked === post.id ? (
                          <button
                            className="-btn-invisible"
                            onClick={(e) => handleSeeMore(e, post.id)}
                          >
                            <strong>see more</strong>
                          </button>
                        ) : (
                          <button
                            className="-btn-invisible"
                            onClick={(e) => handleSeeMore(e, post.id)}
                          >
                            <strong>see less</strong>
                          </button>
                        )}
                      </div>
                    ) : (
                      <p style={{ fontSize: "12px" }}>{post.caption}</p>
                    )}

                    {postLikes.filter((data) => data.isLiked).length <= 0 ? (
                      ""
                    ) : (
                      <button className="likes-preview__btn -padding-10">
                        <SparkleIcon size={12} weight="fill" color={"gold"} />{" "}
                        {postLikes.length}
                      </button>
                    )}

                    <div className="-display-flex-justified-spacebetween -margin-top-20">
                      <button
                        className="post-thumbnail-details-actions__btn"
                        onClick={(e) => handleLikeClicked(e, post.id)}
                      >
                        {isLikedByUser === false ? (
                          <>
                            <SparkleIcon size={20} /> Like
                          </>
                        ) : (
                          <>
                            <SparkleIcon size={20} weight="fill" color="gold" />{" "}
                            Liked
                          </>
                        )}
                      </button>
                      <button className="post-thumbnail-details-actions__btn">
                        <ChatCenteredTextIcon size={22} /> Comment
                      </button>
                      <button className="post-thumbnail-details-actions__btn">
                        <ShareFatIcon size={22} /> Share
                      </button>
                    </div>

                    <div className="post-reel-comment-section-container__wrapper">
                      {comments.map((comment) =>
                        usersComments.map(
                          (user) =>
                            user.id === comment.userId && (
                              <div
                                className="-display-flex-justified-spacebetween -margin-top-10"
                                key={comment.id}
                              >
                                <div className="-display-flex-aligned-center">
                                  <img
                                    className="feed-picture-comments__img"
                                    src={`${BASE_URL}/${user.profilePictureUrl}`}
                                    alt="profile-picture-thumbnail"
                                  />
                                  <div>
                                    <label className="feed-comments-accountName__text">
                                      {user.fullName}
                                    </label>
                                    <p className="feed-comments-comment__text">
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
                        )
                      )}
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="feed-post-comment-textarea__wrapper">
                        <textarea
                          className="feed-post-comment__textarea"
                          placeholder="Write a comment..."
                          name="Comment"
                          value={newComment.Comment}
                          onChange={(e) => handleOnChange(e)}
                        ></textarea>
                        <button type="submit" className="-btn-invisible">
                          <PaperPlaneRightIcon
                            size={20}
                            weight="fill"
                            color={"#4495c7"}
                          />
                        </button>
                      </div>
                    </form>

                    <button
                      className="reel-arrow-comment__btn"
                      onClick={(e) => handleOpenBtn(e, post)}
                    >
                      {openDetailsPostId === post.id ? (
                        <>
                          <ArrowLeftIcon size={20} />
                          <br />
                          Hide comments
                        </>
                      ) : (
                        <>
                          <ArrowRightIcon size={20} />
                          <br />
                          Show comments
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
        )
      )}

      {isLoading && <p>Loading more...</p>}
      {!hasNext && <p>All products loaded</p>}
    </div>
  );
};

const EventWorkshopsContainer = ({ USER_ID }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(GetAllEvents, {
        method: "GET",
      });

      if (!response.ok) {
        console.error(response.status);
      }

      const data = await response.json();
      setEvents(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Error", err);
      throw err;
    }
  };
  return (
    <div className="eventworkshops-container__wrapper">
      <h5 className="-display-flex-aligned-center -gap-10 -margin-top-20">
        <CalendarDotsIcon size={15} weight="fill" color="rgba(0,0,0,0.6)" />{" "}
        Events/Workshops
      </h5>

      {isLoading === true ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
        </div>
      ) : (
        <>
          {events.length <= 0 ? (
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              <CalendarSlashIcon
                size={20}
                weight="fill"
                color="rgba(0,0,0,0.3)"
              />
              <h5 style={{ color: "rgba(0,0,0,0.3)" }}>No Upcoming Events</h5>
            </div>
          ) : (
            <>
              {events.map((event) => (
                <div className="eventworkshops-card__wrapper" key={event.id}>
                  <div style={{ marginTop: "20px" }}>
                    <h6>{event.title}</h6>
                    <p className="eventworkshops-description__text">
                      {event.description}
                    </p>
                    <ul className="eventworkshops-list__ul">
                      <li>Location: {event.location}</li>
                      <li>
                        Date & Time:{" "}
                        {new Date(event.eventDate).toLocaleString("en-nz")}
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

const CastingCallsContainer = ({ USER_ID }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [castingCalls, setCastingCalls] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetchCastingCalls();
  }, []);

  const fetchCastingCalls = async () => {
    try {
      const response = await fetch(`${GetCastingCalls}/${USER_ID}`, {
        method: "GET",
      });

      if (!response.ok) {
        console.error(response.status);
      }

      const data = await response.json();
      setCastingCalls(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Error: ", err);
      throw err;
    }
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="feed-casting-call-container__wrapper">
      <h5 className="-display-flex-aligned-center -gap-10 -margin-top-20">
        {" "}
        <FilmSlateIcon size={15} weight="fill" color="rgba(0,0,0,0.6)" />
        Casting Calls
      </h5>

      {isLoading === true ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
        </div>
      ) : (
        <>
          {castingCalls.length <= 0 ? (
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              <SmileyXEyesIcon
                size={20}
                weight="fill"
                color="rgba(0,0,0,0.3)"
              />
              <h5 style={{ color: "rgba(0,0,0,0.3)" }}>No Casting Calls</h5>
            </div>
          ) : (
            <Slider {...settings}>
              {castingCalls.map((items) => (
                <div className="castingcall-card__wrapper" key={items.id}>
                  <div className="card__wrapper">
                    <div className="-display-flex-justified-spacebetween -display-flex-aligned-center">
                      <h5>{items.title}</h5>
                      <p style={{ fontSize: "10px" }}>
                        {new Date(items.createdAt).toLocaleDateString("nz")}
                      </p>
                    </div>
                    <p className="casting-call-description__text">
                      {items.description}
                    </p>

                    <ul className="casting-call-consideration__ul">
                      <li>Location: {items.location}</li>
                      <li>Ethnicity: {items.ethnicity}</li>
                      <li>Gender: {items.gender}</li>
                      <li>Ages: {items.age}</li>
                      <li style={{ fontWeight: "bold" }}>
                        Due Date:{" "}
                        {new Date(items.dueDate).toLocaleDateString("nz")}
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </>
      )}
    </div>
  );
};

const FeedHashTagsContainer = () => {
  return (
    <div>
      <div className="hashtag__wrapper">
        <h5 className="-display-flex-aligned-center -gap-10">
          {" "}
          <HashStraightIcon size={15} />
          Popular Hashtags
        </h5>
        <br />
        <div className="hashtag-data__wrapper">
          <div className="hashtag-data">monologue</div>
          <div className="hashtag-data">audition</div>
          <div className="hashtag-data">actingchallenge</div>
          <div className="hashtag-data">crying</div>
          <div className="hashtag-data">crying</div>
          <div className="hashtag-data">crying</div>
          <div className="hashtag-data">crying</div>
          <div className="hashtag-data">crying</div>
          <div className="hashtag-data">crying</div>
        </div>
      </div>
    </div>
  );
};

const WeeklyChallengesContainer = () => {
  return (
    <div>
      <div className="feed-weeklychallenges__wrapper">
        <h5 className="-display-flex-aligned-center -gap-10">
          {" "}
          <TrophyIcon size={15} weight="fill" color="rgba(0,0,0,0.6)" /> Weekly
          Challenges
        </h5>

        <ul className="feed-weeklychallenge-list__ul">
          <li>A minute of monologue</li>
          <li>Crying on the SPOT!</li>
          <li>Cry, while watching funny videos!</li>
        </ul>
      </div>
    </div>
  );
};

const Feed = () => {
  const USER_ID = sessionStorage.getItem("id");
  return (
    <div className="-main-container__wrapper">
      <Nav />
      <div className="feed-container__wrapper">
        <div>
          <div>
            <WeeklyChallengesContainer />
            <div className="feed-features-container__wrapper -margin-top-20">
              <FeedHashTagsContainer />
              <CastingCallsContainer USER_ID={USER_ID} />
              <EventWorkshopsContainer USER_ID={USER_ID} />
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
