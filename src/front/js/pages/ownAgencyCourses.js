import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { OwnCourseCard } from "../components/Courses/ownCourseCard";
import CreateCourse from "../components/Courses/createCourse";
import { Pricing } from "./pricing";

export const OwnAgencyCourses = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.setHeader("Cursos para tu equipo");
  }, []);

  // useEffect(() => {
  //   if (store.usuario.status === "inactive") {
  //     navigate("/pricing");
  //   }
  // }, [store.usuario.status]);

  useEffect(() => actions.getUsuario(), []);

  // useEffect(() => actions.getCourses(store.usuario.own_agency.id), []);

  return (
    <>
      {store.usuario.status === "inactive" ? (
        <Pricing />
      ) : (
        <div>
          <div className="create-course-heading">
            <CreateCourse />
          </div>
          {/* <OwnCourseCard /> */}
        </div>
      )}
    </>
  );
};
