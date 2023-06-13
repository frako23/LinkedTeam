import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";
import { MainChart } from "./mainChart";

export const AdminPannel = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <h1
                className="text-white text-center mt-4 kanban-head-title"
                style={{ paddingBottom: "3rem" }}
            >
                Panel de Administrador
            </h1>
            <MainChart />
        </>
    );
    };
