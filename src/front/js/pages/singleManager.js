import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Navbar } from "../component/navbar";
import "../../styles/single.css"


export const SingleManager = props => {

  const { store, actions } = useContext(Context);
	const [indicador, setIndicador] = useState("información");
	const params = useParams();
	
  // console.log(params);

  let asociadoId = store.userClients.find( cliente => cliente.id == params.theid).user_id

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getManagerClientActivity(asociadoId, params.theid);
    }
  }, [store.token]);



	return (
		<>
      <Navbar />
			<div className="card text-center single-view-card">
			<div className="card-header">
				<ul className="nav nav-tabs card-header-tabs">
				<li className="nav-item">
					<button 
						className={`nav-link ${indicador == "información" ? "active" : ""} fw-bolder`}
						
						onClick={(e) => setIndicador("información")}
						>Información</button>
				</li>
				<li className="nav-item">
					<button 
						className={`nav-link ${indicador == "historico" ? "active" : ""} fw-bolder`}  
						
						onClick={(e) => setIndicador("historico")}
						>Histórico</button>
				</li>
				</ul>
			</div>
			<div className="card-body" style={{paddingInline: "8rem"}}>
				<h5 className="card-title">{store.userClients.find( cliente => cliente.id == params.theid).nombre}</h5>
			
			{/* tabla de información */}

			{indicador == "información" ?
			<table className="table table-dark table-bordered mb-0">
                <tbody>
                  <tr>
                    <th scope="row">FECHA DE NACIMIENTO</th>
                    <td className="fw-bolder">{store.userClients.find( cliente => cliente.id == params.theid).fecha}</td>
                  </tr>
                  <tr>
                    <th scope="row">EDAD</th>
                    <td className="fw-bolder">{actions.calcularEdad(store.userClients.find( cliente => cliente.id == params.theid).fecha) + " años"}</td>
                
                  </tr>
                  <tr>
                    <th scope="row">CORREO ELECTRÓNICO</th>
                    <td className="fw-bolder">{store.userClients.find( cliente => cliente.id == params.theid).email}</td>
                    
                  </tr>
                  <tr>
                    <th scope="row">CELULAR</th>
                    <td className="fw-bolder">{store.userClients.find( cliente => cliente.id == params.theid).celular}</td>
                    
                  </tr>
                  <tr>
                    <th scope="row">MONTO</th>
                    <td className="fw-bolder">{`$ ${store.userClients.find( cliente => cliente.id == params.theid).monto}`}</td>
                   
                  </tr>
                  <tr>
                    <th scope="row">NIVEL DE CONFIANZA</th>
                    <td className="fw-bolder">{store.userClients.find( cliente => cliente.id == params.theid).confianza}</td>
                    
                  </tr>
                  <tr>
                    <th scope="row">ESTATUS</th>
                    <td className="fw-bolder">{store.userClients.find( cliente => cliente.id == params.theid).estatus}</td>
                    
                  </tr>
				  <tr>
                    <th scope="row">NOTAS</th>
                    <td className="fw-bolder">{store.userClients.find( cliente => cliente.id == params.theid).notas}</td>
                    
                  </tr>
                </tbody>
              </table>

					: ""
				}
			{/* tablar de historico de actividad */}
			{indicador == "historico" ?
				<table className="table table-dark table-bordered mb-0">
				  <thead>
							<tr>
							<th>Fecha</th>
							<th>Tipo de contacto</th>
							<th>Comentario</th>		
							</tr>
					</thead>
          <tbody>
            { store.managerClientActivity.map( (act, index) => (
            <tr key={index}>
              <td scope="row">{act.fecha}</td>
              <td className="fw-bolder">{act.tipo_de_contacto}</td>
              <td className="fw-bolder">{act.comentario}</td>
            </tr>

            ))} 
          </tbody>
        </table>
					: ""
				}
			</div> 
				<Link to="/dashboardAsociado">
					<span 
            className="btn btn-primary btn-lg mb-3" 
            role="button">
						Regresar
					</span>
				</Link>
			</div>
		</>
		
	);
};

