import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { CourseCard } from "../component/courseCard";

export const Courses = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const redirection = () => {
    navigate("/video");
  };

  useEffect(() => {
    if (store.usuario.status === "inactive") {
      navigate("/pricing");
    }
  }, [store.usuario.status]);

  return (
    <>
      <Navbar />
      <h1
        className="text-white text-center mt-4 kanban-head-title"
        style={{ paddingBottom: "3rem" }}
      >
        Cursos disponibles
      </h1>
      <CourseCard />
    </>
  );
};
