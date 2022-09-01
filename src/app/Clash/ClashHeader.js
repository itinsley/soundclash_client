import React, { Component } from "react";
import Avatar from "../shared/Avatar";
import CountLabel from "../shared/CountLabel";
import MetaTags from "react-meta-tags";
import OpponentAvatar from "../shared/OpponentAvatar";

const description = (clash) => {
  return (
    `${clash.owner_name} and ${clash.opponent_name} laying down tracks in a Soundclash:: ${clash.name}.` +
    ` ${clash.tracks_count} tracks played so far..`
  );
};

const Tags = ({ clash }) => {
  const title = () => `Soundclash:: ${clash.name}`;

  return (
    <MetaTags>
      <title>{title()}</title>
      <meta name="description" content={description(clash)} />
      <meta property="og:title" content={title()} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:image" content={clash.image_url} />
      <meta property="og:description" content={description(clash)} />
      <meta property="og:type" content="website"></meta>
      <meta property="og:site_name" content="Soundclash"></meta>

      <meta name="twitter:title" content={title()} />
      <meta name="twitter:url" content={window.location.href} />
      <meta name="twitter:image" content={clash.image_url} />
      <meta name="twitter:site" content="@soundcla__sh" />
      <meta name="twitter:creator" content="@soundcla__sh" />
      <meta name="twitter:card" content="summary" />
    </MetaTags>
  );
};

const SocialMediaIcons = ({ clash }) => {
  const target = `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/content/${window.location.pathname}`;
  const _description = description(clash);

  return (
    <div className="pb-3">
      <span>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${target}`}
          target="_blank"
          title="Facebook Share"
          rel="noreferrer"
        >
          <img
            alt=""
            src="https://res.cloudinary.com/soundclash/image/asset/facebook-share-4702e873848c86c2419993eaff72dbdb.svg"
            width="20"
          />
        </a>
      </span>
      <span>
        <a
          href={`https://www.twitter.com/intent/tweet?url=${target}&text=${_description}&hashtags=soundclash`}
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
    </div>
  );
};
class Clash extends Component {
  render() {
    const clash = this.props.clash;

    return (
      <main className="container-fluid main-content mt-5 px-0">
        <Tags clash={clash} />
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
                {OpponentAvatar(clash)}
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
              &nbsp;
              <CountLabel label="Track" count={clash.tracks_count} />
            </span>
          </div>
          <SocialMediaIcons clash={clash} />
        </div>
      </main>
    );
  }
}

export default Clash;
