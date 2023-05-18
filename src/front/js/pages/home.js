import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import video from "../../video/background.mp4";
import "../../styles/home.css";
import { First } from "../component/first";
import { Second } from "../component/second";
import { Third } from "../component/third";
import { Fourth } from "../component/fourth";
import { Fifth } from "../component/fifth";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <First />
      <div className="container-video">
        <video autoPlay loop muted width="100%">
          <source src={video} type="video/mp4" />
          Sorry, your browser doesn't support videos.
        </video>
      </div>
      <Second />
      <Third />
      <Fourth />
      <Fifth />
    </div>
  );
};
