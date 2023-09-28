import React from "react";
import { downloadExcel } from "react-export-table-to-excel";

export function ExportToExcel({ excelData }) {
  const header = [
    "amount",
    "birthdate",
    "cellphone",
    "created_at",
    "email",
    "id",
    "name",
    "notes",
    "status",
    "trust",
    "updated_at",
    "user_id",
  ];

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  const fecha = hoy.toLocaleDateString();
  console.log(excelData, fecha);
  function handleDownloadExcel() {
    downloadExcel({
      fileName: `LinkedTeam Data ${fecha}`,
      sheet: "Respaldo de LinkedTeam",
      tablePayload: {
        header,
        // accept two different data structures
        body: excelData,
      },
    });
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-light"
        onClick={(e) => handleDownloadExcel()}
        style={{
          height: "fit-content",
          width: "fit-content",
          marginInline: "0.5rem",
        }}
      >
        Descargar a Excel <i className="fa-solid fa-file-excel"></i>
      </button>
    </>
  );
}
