import React from "react";
import { Tooltip } from "react-bootstrap";

export function viewToolTip(props) {
  return (
    <Tooltip id="view-tooltip" {...props}>
      Ver
    </Tooltip>
  );
}

export function editToolTip(props) {
    return (
      <Tooltip id="edit-tooltip" {...props}>
        Editar
      </Tooltip>
    );
  }

  export function deleteToolTip(props) {
    return (
      <Tooltip id="delete-tooltip" {...props}>
        Eliminar
      </Tooltip>
    );
  }
