import React from "react";
import ReactPlayer from "react-player";
import "../../styles/video.css";
import { Comentarios } from "../component/comentarios";

export const Video = () => {
  return (
    <>
      <div className="contenedor">
        <div className="contenedor-video">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=djuWaNxpgig&t=2s"
            width="100%"
            height="100%"
            controls
          />
        </div>
      </div>
      <div>
        <Comentarios />
      </div>
    </>
  );
};
