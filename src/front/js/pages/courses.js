import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

import { CourseCard } from "../components/Courses/courseCard";
import { Pricing } from "./pricing";

export const Courses = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const redirection = () => {
    navigate("/video");
  };

  // useEffect(() => {
  //   if (store.usuario.status === "inactive") {
  //     navigate("/pricing");
  //   }
  // }, [store.usuario.status]);

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
            Cursos disponibles
          </h1>
          <CourseCard />
        </div>
      )}
    </>
  );
};
