import React, { useEffect, useState, useRef, useCallback } from "react";
import Nav from "../Nav/Nav";
import {
  BASE_POST_API,
  BASE_URL,
  GetFollowing,
  GetFollowingPosts,
} from "../../assets/js/serverapi";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarDotsIcon,
  ChatCenteredTextIcon,
  FilmSlateIcon,
  HashStraightIcon,
  ShareFatIcon,
  SparkleIcon,
  TrophyIcon,
} from "@phosphor-icons/react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { TimeAgo } from "../../assets/js/timeago";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/feedstyles.css";
const FeedPostsContainer = () => {
  const USER_ID = sessionStorage.getItem("id");
  const [isLoading, setIsLoading] = useState(false);
  const [feedUsers, setFeedUsers] = useState([]);
  const [feedPosts, setFeedPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [pageSize] = useState(2);
  const observer = useRef();
  const [openDetailsPostId, setOpenDetailsPostId] = useState(null);
  const [seeMoreCaptionClicked, setSeeMoreCaptionClicked] = useState(null);
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

  const handleOpenBtn = (e, id) => {
    e.preventDefault();
    if (id === openDetailsPostId) {
      setOpenDetailsPostId(null);
    } else {
      setOpenDetailsPostId(id);
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
                      <>
                        {seeMoreCaptionClicked === false ? (
                          <p style={{ fontSize: "12px" }}>
                            {post.caption.substring(0, 540)}...
                          </p>
                        ) : (
                          <p style={{ fontSize: "12px" }}>{post.caption}</p>
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
                      <p style={{ fontSize: "12px" }}>{post.caption}</p>
                    )}

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

                    <button
                      className="reel-arrow-comment__btn"
                      onClick={(e) => handleOpenBtn(e, post.id)}
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

const EventWorkshopsContainer = () => {
  return (
    <div className="eventworkshops-container__wrapper">
      <h5 className="-display-flex-aligned-center -gap-10 -margin-top-20">
        <CalendarDotsIcon size={15} weight="fill" color="rgba(0,0,0,0.6)" />{" "}
        Events/Workshops
      </h5>
      <div className="eventworkshops-card__wrapper">
        <div style={{ marginTop: "20px" }}>
          <h6>Acting Workshop 2025</h6>
          <p className="eventworkshops-description__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            omnis soluta at tempore nulla maxime modi, deleniti recusandae vel
            veritatis ducimus quos dicta odit commodi impedit mollitia dolor
            explicabo adipisci.
          </p>
          <ul className="eventworkshops-list__ul">
            <li>Location: ASB Showgrounds North Shore</li>
            <li>Date: 1st Apr 2025</li>
            <li>Time: 9 - 1PM</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const CastingCallsContainer = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <h5 className="-display-flex-aligned-center -gap-10 -margin-top-20">
        {" "}
        <FilmSlateIcon size={15} weight="fill" color="rgba(0,0,0,0.6)" />
        Casting Calls
      </h5>

      <Slider {...settings}>
        <div className="castingcall-card__wrapper">
          <div className="card__wrapper">
            <h5>Casting Call for TVFilm</h5>
            <p className="casting-call-description__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
              quidem veniam! Nesciunt, excepturi eligendi voluptates, fugit
              pariatur id repudiandae incidunt dolorum est ab enim ducimus
              molestiae unde dicta sit sequi! lorem
            </p>

            <ul className="casting-call-consideration__ul">
              <li>Location: 3-88 Hensrow Road, New Lynn</li>
              <li>Ethnicity: Any</li>
              <li>Gender: Any</li>
              <li>Ages: 18 years and younger</li>
            </ul>
          </div>
        </div>
        <div className="castingcall-card__wrapper">
          <div className="card__wrapper">
            <h5>Casting Call for TVFilm</h5>
            <p className="casting-call-description__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
              quidem veniam! Nesciunt, excepturi eligendi voluptates, fugit
              pariatur id repudiandae incidunt dolorum est ab enim ducimus
              molestiae unde dicta sit sequi!
            </p>

            <ul className="casting-call-consideration__ul">
              <li>Location: 3-88 Hensrow Road, New Lynn</li>
              <li>Ethnicity: Any</li>
              <li>Gender: Any</li>
              <li>Ages: 18 years and younger</li>
            </ul>
          </div>
        </div>
        <div className="castingcall-card__wrapper">
          <div className="card__wrapper">
            <h5>Casting Call for TVFilm</h5>
            <p className="casting-call-description__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
              quidem veniam! Nesciunt, excepturi eligendi voluptates, fugit
              pariatur id repudiandae incidunt dolorum est ab enim ducimus
              molestiae unde dicta sit sequi!
            </p>

            <ul className="casting-call-consideration__ul">
              <li>Location: 3-88 Hensrow Road, New Lynn</li>
              <li>Ethnicity: Any</li>
              <li>Gender: Any</li>
              <li>Ages: 18 years and younger</li>
            </ul>
          </div>
        </div>
        <div className="castingcall-card__wrapper">
          <div className="card__wrapper">
            <h5>Casting Call for TVFilm</h5>
            <p className="casting-call-description__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
              quidem veniam! Nesciunt, excepturi eligendi voluptates, fugit
              pariatur id repudiandae incidunt dolorum est ab enim ducimus
              molestiae unde dicta sit sequi!
            </p>

            <ul className="casting-call-consideration__ul">
              <li>Location: 3-88 Hensrow Road, New Lynn</li>
              <li>Ethnicity: Any</li>
              <li>Gender: Any</li>
              <li>Ages: 18 years and younger</li>
            </ul>
          </div>
        </div>
      </Slider>
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
  return (
    <div className="-main-container__wrapper">
      <Nav />
      <div className="feed-container__wrapper">
        <div>
          <div>
            <WeeklyChallengesContainer />
            <div className="feed-features-container__wrapper -margin-top-20">
              <FeedHashTagsContainer />
              <CastingCallsContainer />
              <EventWorkshopsContainer />
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
