import React, { Fragment, useState, useEffect } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import ConnectStore from "../../lib/ConnectStore";
import Avatar from "../shared/Avatar";
import ClashApi from "../../api/Clashes";
import Loading from "../../components/Loading";
import SpinnerButtonInner from "../../lib/SpinnerButtonInner";
import { useAuth0 } from "@auth0/auth0-react";
import history from "../../history";
import ErrorAlertContainer from "../../lib/ErrorAlertContainer";
import HandleApiError from "../../api/HandleApiError";

const Challenge = (props) => {
  const [clash, setClash] = useState(null);
  const [loading, setLoading] = useState(true);
  const [AcceptButtonLoading, setAcceptButtonLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errors, setErrors] = useState([]);
  const uniqueRef = props.match.params.uniqueRef;

  const { loginWithRedirect } = useAuth0();
  useEffect(() => {
    loadChallenge(uniqueRef);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Fragment>
      <div className="mx-auto text-center" style={{ maxWidth: "56.25rem" }}>
        <div className="top-element-margin"></div>
        <p className="u-s-mt-small u-s-mb-tiny pt-5">
          <span className="text-size-xx-small p-2">
            <Avatar
              user={clash.owner}
              description="Comment user avatar"
              size="50"
            />
          </span>
        </p>
        <p className="u-s-mt-small u-s-mb-tiny">
          {clash.owner.email}&nbsp;<strong>({clash.owner.name})</strong>
        </p>
        <p>has challenged you to a Soundclash:</p>
        <h2 className="u-text-truncate">{clash.name}</h2>
        <p>
          <ErrorAlertContainer errors={errors} errorMessage={errorMessage} />
          <ChallengeActions />
        </p>
        <div className="u-s-mb-base">
          <div className="u-s-mb-base mx-auto text-center col-xs-12 col-sm-6">
            <div className="pb-4">
              <img
                alt="Tracks Icon"
                src="https://res.cloudinary.com/soundclash/image/asset/vinyl-record-a40f320b60a2c98f4e4479f85ee1d218.svg"
                width="30"
              />
              <strong>{clash.owner_track.name}</strong>
            </div>
            <blockquote className="comments__the-comment">
              <cite className="comments__the-comment__author">
                <strong>{clash.owner.name}</strong> says:
              </cite>
              &mdash;
              <p className="comments__the-comment__text">
                {clash.owner_track.last_comment_text}
              </p>
            </blockquote>
            <div>
              <div className="u-s-me-small">
                <img
                  style={{ width: "100%" }}
                  alt={`Track thumbnail for ${clash.name}`}
                  src={clash.image_url}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  function ChallengeActions() {
    if (props.currentUser) {
      return (
        <button
          className="t-comment-submit btn btn-dark btn-sm"
          type="submit"
          onClick={async () => {
            setAcceptButtonLoading(true);
            try {
              const clash = await ClashApi.acceptChallenge(
                uniqueRef,
                props.jwt
              );
              history.push(`/clashes/${clash.id}`);
            } catch (err) {
              const { errorMessage, errors } = HandleApiError(err);
              setErrorMessage(errorMessage);
              setErrors(errors);
            }
            setAcceptButtonLoading(false);
          }}
        >
          <SpinnerButtonInner
            label="Accept and start playing"
            loading={AcceptButtonLoading}
          />
        </button>
      );
    }

    return (
      <button
        className="t-comment-submit btn btn-dark btn-sm"
        type="submit"
        onClick={() => {
          loginWithRedirect({
            redirect_uri: "http://localhost:3000/xxxxx",
          });
        }}
      >
        Login or Sign up to start playing
      </button>
    );
  }

  async function loadChallenge(uniqueRef) {
    setLoading(true);
    const clash = await ClashApi.getChallenge(uniqueRef);
    setClash(clash);
    console.log(clash, "CLASH");
    setLoading(false);
  }
};
export default withAuth0(ConnectStore(Challenge));
