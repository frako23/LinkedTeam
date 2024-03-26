import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Pricing } from "./pricing";
import { TutorialVideoCard } from "../components/Courses/tutorialVideoCard";

export const TutorialVideos = () => {
  const { store } = useContext(Context);

  return (
    <>
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
