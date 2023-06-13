import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Navbar } from "../component/navbar";
import "../../styles/single.css"


export const Single = props => {

	const [activity, setActivity] = useState({
    fecha: "",
    tipo_de_contacto: "",
    comentario: ""
  });
  const { store, actions } = useContext(Context);
	const [indicador, setIndicador] = useState("información");
	const params = useParams();
	
  // console.log(params);

  const handleActivity = ((e) =>{ setActivity({...activity, [e.target.name]: e.target.value})})

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientActivity(params.theid);
    }
  }, [store.token]);

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientActivity(params.theid);
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
                    <td className="fw-bolder">{actions.calcularEdad(store.clientes.find( cliente => cliente.id == params.theid).fecha) + " años"}</td>
                
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
                    <td className="fw-bolder">{`$ ${store.clientes.find( cliente => cliente.id == params.theid).monto}`}</td>
                   
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



          <form 
                onSubmit= {(e) => {
                  e.preventDefault();
                  // console.log(activity);
                  actions.postClientActivity(activity, params.theid)
                  setActivity("")
                  setIndicador("historico")}}>
            <div className="form-group row">
              <label for="inputEmail3" className="col-sm-2 col-form-label fw-bold">Fecha</label>
              <div className="col-sm-10">
                <input 
                      type="date" 
                      className="form-control fw-bold" 
                      name="fecha"
                      id="inputEmail3" 
                      value = {activity.fecha}
                      onChange = {(e)=> handleActivity(e)}
                      />
              </div>
            </div>
            
            <fieldset className="form-group">
              <div className="row">
                <legend className="col-form-label col-sm-2 pt-0 fw-bold">Tipo de contacto</legend>
                <div className="col-sm-10">
                <select 
                      className="form-select fw-bold" 
                      aria-label="Default select example"
                      name="tipo_de_contacto"
                      value = {activity.tipo_de_contacto}
                      onChange = {(e)=> handleActivity(e)}>
                  <option value="">Selectiona el tipo de contacto</option>
                  <option value="llamada">Llamada</option>
                  <option value="mensaje">Mensaje o correo</option> 
                  <option value="cita">Cita </option>
                </select>
   

                </div>
              </div>
            </fieldset>
            <div className="form-group row">
              <div className="" 
                    style={{width: "100%",
                            flex: "0 0 auto"}}>
              <div className="input-group">
                <div className="input-group-prepend" style={{height: "7rem"}}>
                  <span className="input-group-text fw-bold" style={{height: "inherit"}}>Comentarios</span>
                </div>
                <textarea 
                          className="form-control fw-bold" 
                          aria-label="With textarea"
                          name="comentario"
                          placeholder="El cliente ..."
                          value = {activity.comentario}
                          onChange = {(e)=> handleActivity(e)}>

                </textarea>
              </div>
            </div>
            </div>
            <div className="form-group row">
              <div className=""
                    style={{width: "100%",
                    flex: "0 0 auto"}}>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  
                  >Registrar actividad</button>
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
            { store.clientActivity.map( (act, index) => (
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
				<Link to="/dashboard">
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

Single.propTypes = {
	match: PropTypes.object
};
