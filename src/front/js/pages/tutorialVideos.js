import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Pricing } from "./pricing";
import { TutorialVideoCard } from "../components/Courses/tutorialVideoCard";

export const TutorialVideos = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.setHeader("Videos Tutoriales");
  }, []);

  return (
    <>
      {store.usuario.status === "inactive" ? (
        <Pricing />
      ) : (
        <TutorialVideoCard />
      )}
    </>
  );
};
