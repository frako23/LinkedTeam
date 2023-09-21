import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import ReactPlayer from "react-player";
import "../../styles/video.css";
import { Comentarios } from "../component/comentarios";
import { Navbar } from "../component/navbar";
import { Link, useParams } from "react-router-dom";
import { tutorialVideosData } from "../data/tutorialVideosData";

export const VideoTutorial = () => {
  const { theid } = useParams();
  const { store, actions } = useContext(Context);
  const video = tutorialVideosData.find((tutorial) => tutorial.id === theid);
  // console.log(video, theid, tutorialVideosData);

  return (
    <div className="d-flex">
      <Navbar />
      <div className="contenedor">
        <div class="card mb-3" style={{ border: "0" }}>
          <div className="contenedor-video">
            <ReactPlayer
              className="react-player"
              url={video.linkUrl}
              width="100%"
              height="100%"
              controls
            />
          </div>
          <div>
            <div className="card-body">
              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>

                <p className="card-text">{video.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
