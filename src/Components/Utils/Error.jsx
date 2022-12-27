import React from "react";
import { Alert, Button } from "react-bootstrap";

/**
 *
 * @param {String} error Mensaje de error que debe mostrar.
 * @param {Function} actions Acciones que debe de hacer el botón "Reintentar".
 * @returns Mensaje de error y botón para reintentar.
 */
function Error({ error, actions }) {
  return (
    <>
      <br />
      <div className="d-flex justify-content-center">
        <Alert variant="danger">{error}</Alert>
      </div>
      <div className="d-flex justify-content-center">
        <Button variant="warning" onClick={actions}>
          Reintentar
        </Button>
      </div>
      <br />
    </>
  );
}

export default Error;
