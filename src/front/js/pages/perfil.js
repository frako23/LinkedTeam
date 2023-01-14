import React from "react";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/perfil.css";

export const Perfil = () => {
  return (
    <>
      <div className="info-user">
        <div>
          <img className="profile-img" src={rigoImageUrl} />
        </div>
        <div>
          <div className="data-perfil">Hola, Francisco</div>
        </div>
      </div>
      <div className="container-video p-3">
        <div className="card">
          <div className="thumbnail-video">
            <img src="https://i3.ytimg.com/vi/djuWaNxpgig/maxresdefault.jpg" />
            <i className="fa-solid fa-play icono-play"></i>
          </div>

          <div className="info-video text-center">Video 1</div>
        </div>
        <div className="card">
          <div className="thumbnail-video">
            <img src="http://i3.ytimg.com/vi/MXv6J3tCKCY/hqdefault.jpg" />
            <i className="fa-solid fa-play icono-play"></i>
          </div>

          <div className="info-video text-center">Video 2</div>
        </div>
        <div className="card">
          <div className="thumbnail-video">
            <img src="http://i3.ytimg.com/vi/Kcu2hpxKucI/hqdefault.jpg" />
            <i className="fa-solid fa-play icono-play"></i>
          </div>

          <div className="info-video text-center">Video 3</div>
        </div>
        <div className="card">
          <div className="thumbnail-video">
            <img src="http://i3.ytimg.com/vi/iNrPT-RKPHY/hqdefault.jpg" />
            <i className="fa-solid fa-play icono-play"></i>
          </div>

          <div className="info-video text-center">Video 4</div>
        </div>
      </div>
    </>
  );
};
