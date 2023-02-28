import React, { useEffect } from "react";
import { AppContext } from "../contexts/appContext";

const CanvasFeed = () => {
  const { videoEl, canvas_ref, setRequestData, start } = AppContext();

  useEffect(() => {
    if (start && videoEl) {
      const timer = setInterval(() => {
        canvas_ref.current.width = videoEl.current.videoWidth;
        canvas_ref.current.height = videoEl.current.videoHeight;
        canvas_ref.current.hidden = true;
        canvas_ref.current.getContext("2d").drawImage(videoEl.current, 0, 0);
        setRequestData(canvas_ref.current.toDataURL("image/jpeg"));
      }, 20);
      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoEl, start]);

  return <canvas ref={canvas_ref} />;
};

export default CanvasFeed;
