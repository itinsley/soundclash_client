import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import InfoApi from "../api/Info";

const VersionTag = () => {
  const [env, setEnv] = useState(null);
  useEffect(() => {
    InfoApi.get().then((info) => setEnv(info.environment));
  }, []);

  if (env == null || env == "production") {
    return null;
  }

  return (
    <div className="label-version-tag">
      <FontAwesomeIcon
        className="fa-rotate-90 mb-2"
        icon={faInfoCircle}
        size="lg"
      />
      {env} environment
    </div>
  );
};

export default VersionTag;
