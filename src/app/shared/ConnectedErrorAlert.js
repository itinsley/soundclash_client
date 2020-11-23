import ConnectStore from "../../lib/ConnectStore";
import ErrorAlertContainer from "../shared/ErrorAlertContainer";

/**
 * Displays Error Alert if context matches the error context set in store.apiError.context
 *
 * @param {string} context - context - i.e. 'CREATE_TRACK'
 *
 **/
const ConnectedErrorAlert = ({ context }) => {
  const Connected = ConnectStore(({ apiError }) => {
    if (context !== apiError.context) return null;

    return ErrorAlertContainer(apiError);
  });

  return <Connected />;
};

export default ConnectedErrorAlert;
