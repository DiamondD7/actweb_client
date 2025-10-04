import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import {
  CaretLeftIcon,
  CaretRightIcon,
  ChatCenteredTextIcon,
  FilmSlateIcon,
  HashStraightIcon,
  PlayCircleIcon,
  ShareFatIcon,
  SparkleIcon,
  TrophyIcon,
} from "@phosphor-icons/react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
