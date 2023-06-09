import React from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { coursesData } from "../data/coursesData";

export function CourseCard() {
let fullData = coursesData;

    return (

        <div className="container courses__container">
        { 
            fullData.map ( data => {
                return (
                        <article className="course" key={data.id}>
                            <div >
                                <img className="course__image" src={data.imgUrl} />
                            </div>
                            <div className="course__info" >
                                <h4>{data.title}</h4>
                                <p>   
                                {data.description}
                                </p>
                                <Link to={data.linkUrl} className="course__btn">
                                    Ver curso
                                </Link>
                            </div>
                        </article>
            
            
            )
        })
    }
    </div>
        
    )
    
}