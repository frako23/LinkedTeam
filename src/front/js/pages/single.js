import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Navbar } from "../component/navbar";
import "../../styles/single.css"


export const Single = props => {
	const [fecha, setFecha] = useState("");
  const [tipoDeContacto, setTipoDeContacto] = useState("");
  const [comentario,setComentario] = useState("");
  const { store, actions } = useContext(Context);
	const [indicador, setIndicador] = useState("información");
	const params = useParams();


	console.log(params);

	return (
		<div className="pagina">
		{/* barra de menu */}
  
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
						className={`nav-link ${indicador == "registrar" ? "active" : ""} fw-bolder`} 
						
						onClick={(e) => setIndicador("registrar")}
						>Registrar Actividad</button>
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
				<h5 className="card-title">{store.clientes.find( cliente => cliente.id == params.theid).nombre}</h5>
			
			{/* tabla de información */}

			{indicador == "información" ?
			<table className="table table-dark table-bordered mb-0">
                <tbody>
                  <tr>
                    <th scope="row">FECHA DE NACIMIENTO</th>
                    <td className="fw-bolder">{store.clientes.find( cliente => cliente.id == params.theid).fecha}</td>
                  </tr>
                  <tr>
                    <th scope="row">EDAD</th>
                    <td className="fw-bolder">pendiente</td>
                
                  </tr>
                  <tr>
                    <th scope="row">CORREO ELECTRÓNICO</th>
                    <td className="fw-bolder">{store.clientes.find( cliente => cliente.id == params.theid).email}</td>
                    
                  </tr>
                  <tr>
                    <th scope="row">CELULAR</th>
                    <td className="fw-bolder">{store.clientes.find( cliente => cliente.id == params.theid).celular}</td>
                    
                  </tr>
                  <tr>
                    <th scope="row">MONTO</th>
                    <td className="fw-bolder">{store.clientes.find( cliente => cliente.id == params.theid).monto}</td>
                   
                  </tr>
                  <tr>
                    <th scope="row">NIVEL DE CONFIANZA</th>
                    <td className="fw-bolder">{store.clientes.find( cliente => cliente.id == params.theid).confianza}</td>
                    
                  </tr>
                  <tr>
                    <th scope="row">ESTATUS</th>
                    <td className="fw-bolder">{store.clientes.find( cliente => cliente.id == params.theid).estatus}</td>
                    
                  </tr>
				  <tr>
                    <th scope="row">NOTAS</th>
                    <td className="fw-bolder">{store.clientes.find( cliente => cliente.id == params.theid).notas}</td>
                    
                  </tr>
                </tbody>
              </table>

					: ""
				}

			{/* formulario de ingreso de actividad */}
      {indicador == "registrar" ?
          <form>
            <div className="form-group row">
              <label for="inputEmail3" className="col-sm-2 col-form-label">Fecha</label>
              <div className="col-sm-10">
                <input 
                      type="date" 
                      className="form-control" 
                      id="inputEmail3" 
                      value = {fecha}
                      onChange = {(e)=> setFecha(e.target.value)}
                      />
              </div>
            </div>
            
            <fieldset className="form-group">
              <div className="row">
                <legend className="col-form-label col-sm-2 pt-0">Tipo de contacto</legend>
                <div className="col-sm-10">
                  <div className="form-check">
                    <input 
                          className="form-check-input" 
                          type="radio" 
                          name="gridRadios" 
                          id="gridRadios1" 
                          value = {tipoDeContacto}
                          onClick = {(e)=> setTipoDeContacto("Llamada")}
                          />
                    <label className="form-check-label" for="gridRadios1">
                      Llamada {" "} <i class='bx bx-phone-call'></i>
                    </label>
                  </div>
                  <div className="form-check">
                    <input 
                          className="form-check-input" 
                          type="radio" 
                          name="gridRadios" 
                          id="gridRadios2" 
                          value = {tipoDeContacto}
                          onClick = {(e)=> setTipoDeContacto("Mensaje o correo")}/>
                    <label className="form-check-label" for="gridRadios2">
                      Mensaje o correo {" "} <i class='bx bx-chat' ></i>
                    </label>
                  </div>
                  <div className="form-check">
                    <input 
                          className="form-check-input" 
                          type="radio" 
                          name="gridRadios" 
                          id="gridRadios3" 
                          value = {tipoDeContacto}
                          onClick = {(e)=> setTipoDeContacto("Cita")}/>
                    <label className="form-check-label" for="gridRadios3">
                      Cita {" "} <i class='bx bx-male-female' ></i>
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="form-group row">
              <div className="" 
                    style={{width: "100%",
                            flex: "0 0 auto"}}>
              <div class="input-group">
                <div class="input-group-prepend" style={{height: "7rem"}}>
                  <span class="input-group-text" style={{height: "inherit"}}>Comentarios</span>
                </div>
                <textarea 
                          class="form-control" 
                          aria-label="With textarea"
                          value = {comentario}
                          onChange = {(e)=> setComentario(e.target.value)}>

                </textarea>
              </div>
            </div>
            </div>
            <div className="form-group row">
              <div className=""
                    style={{width: "100%",
                    flex: "0 0 auto"}}>
                <button type="submit" className="btn btn-primary">Registrar actividad</button>
              </div>
            </div>
          </form>
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
                  <tr>
                    <td scope="row">{fecha}</td>
                    <td className="fw-bolder">{tipoDeContacto}</td>
				          	<td className="fw-bolder">{comentario}</td>
                  </tr>
                  
                </tbody>
              </table>
					: ""
				}
			</div> 
				<Link to="/dashboard">
					<span className="btn btn-primary btn-lg mb-3" href="#" role="button">
						Regresar
					</span>
				</Link>
			</div>
		</div>
		
	);
};

Single.propTypes = {
	match: PropTypes.object
};
