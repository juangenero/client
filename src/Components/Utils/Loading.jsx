import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <>
      <br />
      <div className="d-flex justify-content-center">
        <h1>
          Cargand
          <Spinner animation="border" variant="dark" />
          ...
        </h1>
      </div>
      <br />
    </>
  );
}

export default Loading;
