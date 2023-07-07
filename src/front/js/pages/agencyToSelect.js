import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { AgencyCard } from "../component/agencyCard";
import Swal from "sweetalert2";

export const AgencyToSelect = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [company, setCompany] = useState("");

  const id = store.usuario.id;

  if (company !== "") {
    console.log(company, id);
    actions.putUserCompany(company, id);
    Swal.fire(` 🤝 Perteneces a ${company}`);
  }

  useEffect(() => {
    if (store.usuario.company === null) {
      console.log("entro aqui");
      Swal.fire({
        title: "Selecciona la compañia a la que perceneces",
        input: "select",
        inputOptions: {
          Particular: "Particular",
          CICALIFE: "CICALIFE",
        },
        inputPlaceholder: "Selecciona la compañia",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value !== "") {
              resolve(`Selccionaste ${value}`);
              setCompany(value);
            } else {
              resolve("Debes seleccionar una opción");
            }
          });
        },
      });
    }
  }, []);
  const redirection = () => {
    navigate("/video");
  };

  return (
    <>
      <Navbar />
      <h1
        className="text-white text-center mt-4 kanban-head-title"
        style={{ paddingBottom: "3rem" }}
      >
        Selecciona la agencia a la que perteneces
      </h1>
      <AgencyCard />
    </>
  );
};
