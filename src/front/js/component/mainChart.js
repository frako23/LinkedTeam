import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";



export const MainChart = () => {
  const { store, actions } = useContext(Context);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  const navigate = useNavigate();
//   const token = sessionStorage.getItem("token");
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
  // console.log("Este es tu token", store.token);

//   const handleClick = () => {
    // const success = await
    // actions.login(email, password);
    // success && navigate("/");
//   };

  useEffect(() => {actions.getTotalUsuarios()}, []);

    return (
        <div style={{
                marginLeft: "5rem",
                marginRight: "1rem"    }}>
         <h3 className="text-white fw-bold">Tabla de usuarios</h3>
				<table className="table table-dark table-bordered mb-0">
				  <thead>
							<tr>
                                <th>Usuario ID</th>
                                <th>Creacion</th>
                                <th>Nombre</th>
                                <th>Agencia</th>
                                <th>Rol</th>
                                <th>Estatus</th>
                                <th>Asignar rol</th>
                                <th>Activacion</th>		
							</tr>
					</thead>
          <tbody>
            { store.totalUsuarios.map (usuario => {
                            return (
            <tr key={usuario.id}>
                <td scope="row">{usuario.id}</td>
                <td scope="row">{usuario.created_at}</td>
                <td className="fw-bolder">{usuario.name + " " + usuario.lastname}</td>
                <td className="fw-bolder">{usuario.agency_ybt}</td>
                <td className="fw-bolder">{usuario.role}</td>
                <td className="fw-bolder">{usuario.status}</td>
                <td className="fw-bolder">
                    <button className="btn btn-primary">
                        Gerente
                    </button>
                </td>
                <td className="fw-bolder">
                    <button className="btn btn-success">
                        Activar
                    </button>
                </td>
            </tr>

            )})} 
          </tbody>
        </table>
			
        </div>
  );
};
