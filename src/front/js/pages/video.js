import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ReactPlayer from "react-player";
import "../../styles/video.css";
import { Comentarios } from "../components/Courses/comentarios";

import { useParams } from "react-router-dom";

export const Video = () => {
  const params = useParams();
  const { store } = useContext(Context);

  return (
    <div className="d-flex n-container">
      <div className="contenedor">
        <div className="contenedor-video">
          <ReactPlayer
            className="react-player"
            url={store.courses[params.theid - 1].link_url}
            width="100%"
            height="100%"
            controls
          />
        </div>
        <div>
          <Comentarios />
        </div>
      </div>
    </div>
  );
};
