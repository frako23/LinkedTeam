import React from "react";
import "../../styles/perfil.css";

export const ToDoChart = () => {
  return (
    <div class="history_lists">
      <div class="list1">
        <div class="row">
          <h4 className="text-white">Tareas Pendientes</h4>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Descripción</th>
              <th>Prioridad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2, Aug, 2022</td>
              <td>Sam Tonny</td>
            </tr>
            <tr>
              <td>2</td>
              <td>29, July, 2022</td>

              <td>Code Info</td>
            </tr>
            <tr>
              <td>3</td>
              <td>15, July, 2022</td>

              <td>Jhon David</td>
            </tr>
            <tr>
              <td>4</td>
              <td>5, July, 2022</td>
              <td>Salina Gomiz</td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
