import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";

import { CourseCard } from "../components/Courses/courseCard";
import { Pricing } from "./pricing";

export const Courses = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.setHeader("Cursos disponibles");
  }, []);
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
            className="text-black text-center mt-4 kanban-head-title"
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
