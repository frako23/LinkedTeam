import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { OwnCourseCard } from "../components/Courses/ownCourseCard";
import CreateCourse from "../components/Courses/createCourse";
import { Pricing } from "./pricing";

export const OwnAgencyCourses = () => {
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

  useEffect(() => actions.getUsuario(), []);

  useEffect(() => actions.getCourses(store.usuario.own_agency.id), []);

  return (
    <>
      {store.usuario.status === "inactive" ? (
        <Pricing />
      ) : (
        <div>
          <div className="create-course-heading">
            <h1
              className="text-white text-center mt-4 kanban-head-title"
              style={{ paddingBottom: "3rem" }}
            >
              <span style={{ color: "rgb(167, 100, 255)", fontSize: "3rem" }}>
                {store.usuario.own_agency.name}
              </span>
              {" / "}
              Cursos disponibles
            </h1>
            <CreateCourse />
          </div>
          <OwnCourseCard />
        </div>
      )}
    </>
  );
};
