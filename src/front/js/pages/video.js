import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import ReactPlayer from "react-player";
import "../../styles/video.css";
import { Comentarios } from "../component/comentarios";
import { Navbar } from "../component/navbar";
import { Link, useParams } from "react-router-dom";

export const Video = () => {
  const params = useParams();
  const { store, actions } = useContext(Context);

  return (
    <div className="d-flex">
      <Navbar />
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
