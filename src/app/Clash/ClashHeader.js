import React, { Component, Fragment } from "react";
import Avatar from "../shared/Avatar";
import CountLabel from "../shared/CountLabel";

const SocialMediaIcons = (clash) => {
  const shareDescription = (clash) =>
    `${clash.owner_name} vs ${clash.opponent_name} in a Soundclash:: ${clash.name}`;

  return (
    <div className="pb-3">
      <span>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          title="Facebook Share"
          rel="noreferrer"
        >
          <img
            alt=""
            class="u-display-inline-block u-s-ml-micro"
            src="https://res.cloudinary.com/soundclash/image/asset/facebook-share-4702e873848c86c2419993eaff72dbdb.svg"
            width="20"
          />
        </a>
      </span>
      <span>
        <a
          href={`https://www.twitter.com/intent/tweet?url=${
            window.location.href
          }&text=${shareDescription(clash)}&hashtags=soundclash`}
          target="_blank"
          title="Twitter Share"
          rel="noreferrer"
        >
          <img
            alt=""
            className="ml-2"
            src="https://res.cloudinary.com/soundclash/image/asset/twitter-share-1d435796085c7644b3acee055c898e3e.svg"
            width="20"
          />
        </a>
      </span>
      <span>
        <a
          href={`https://plus.google.com/share?url=${window.location.href}`}
          target="_blank"
          title="Googleplus Share"
          rel="noreferrer"
        >
          <img
            alt=""
            className="ml-2"
            src="https://res.cloudinary.com/soundclash/image/asset/googleplus-share-1ff908728ed97a30172569f2433f43b9.svg"
            width="20"
          />
        </a>
      </span>
    </div>
  );
};
class Clash extends Component {
  opponent(clash) {
    if (clash.opponent) {
      return (
        <Fragment>
          <strong>{clash.opponent.name}</strong>
          <Avatar
            user={clash.opponent}
            description="Comment user avatar"
            size="35"
          />
        </Fragment>
      );
    } else {
      return clash.opponent_name;
    }
  }
  render() {
    const clash = this.props.clash;

    return (
      <main className="container-fluid main-content mt-5 px-0">
        <div className="t-clash-id">{clash.id}</div>
        <div
          className="t-clash-header container mx-auto text-center "
          style={{ maxWidth: "56.25rem" }}
        >
          <h1 className="px-2 p-3 pt-5">{clash.name}</h1>
          <h6 className="card-subtitle mb-2 text-muted">
            <div className="text-center pb-3">
              <span className="text-size-xx-small p-2">
                <Avatar
                  user={clash.owner}
                  description="Comment user avatar"
                  size="35"
                />
                <strong>{clash.owner_name}</strong>
              </span>
              <span>vs.</span>
              <span className="text-size-xx-small p-2">
                {this.opponent(clash)}
              </span>
            </div>
          </h6>
          <div className="text-center pb-3">
            <span className="text-size-xx-small p-2">
              <img
                alt="Comments Icon"
                src="https://res.cloudinary.com/soundclash/image/asset/comment-f01f9b1834a2e2bc80dae34d5cf70df3.svg"
                width="20"
              />
              &nbsp;
              <CountLabel label="Comment" count={clash.comments_count} />
            </span>
            <span className="text-size-xx-small p-2">
              <img
                alt="Tracks Icon"
                src="https://res.cloudinary.com/soundclash/image/asset/vinyl-record-a40f320b60a2c98f4e4479f85ee1d218.svg"
                width="20"
              />
              <CountLabel label="Track" count={clash.tracks_count} />
            </span>
          </div>
          <SocialMediaIcons clash={Clash} />
        </div>
      </main>
    );
  }
}

export default Clash;
