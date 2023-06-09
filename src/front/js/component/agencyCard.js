import React from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { agenciesData } from "../data/agenciesData";

export function AgencyCard() {
let fullData = agenciesData;

    return (

        <div className="container courses__container">
        { 
            fullData.map ( data => {
                return (
                        <article className="course" key={data.id}>
                            <div >
                                <img className="course__image2" src={data.logoUrl} />
                            </div>
                            <div className="course__info" >
                                <h4><strong>Agencia:</strong> {data.name}</h4>
                                <h4> <strong>Gerente:</strong> {data.manager}</h4>

                                <button href="#" className="course__btn">
                                    Seleccionar
                                </button>
                            </div>
                        </article>
            
            
            )
        })
    }
    </div>
        
    )
    
}