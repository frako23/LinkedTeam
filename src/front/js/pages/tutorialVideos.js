import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { CourseCard } from "../component/courseCard";
import { Pricing } from "./pricing";
import { TutorialVideoCard } from "../component/tutorialVideoCard";

export const TutorialVideos = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {store.usuario.status === "inactive" ? (
        <Pricing />
      ) : (
        <div>
          <h1
            className="text-white text-center mt-4 kanban-head-title"
            style={{ paddingBottom: "3rem" }}
          >
            Videos Tutoriales
          </h1>
          <TutorialVideoCard />
        </div>
      )}
    </>
  );
};
