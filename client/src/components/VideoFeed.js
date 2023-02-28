import React from "react";
import { AppContext } from "../contexts/appContext";

const VideoFeed = () => {
  const { videoEl } = AppContext();
  return <video ref={videoEl} />;
};

export default VideoFeed;
