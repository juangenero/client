import React from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../../Context/UserContext";
import { deleteUser, reloadUsers } from "../../Services/users.service.js";

export default function DeleteUserModal() {
  const {
    userDeleteModalShow,
    setUserDeleteModalShow,
    manageUser,
    setUserIsLoading,
    setUserError,
  } = useContext(UserContext);

  return (
    <>
      <Modal
        show={userDeleteModalShow}
        onHide={() => setUserDeleteModalShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Eliminar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/** Necesito poner este condicional, ya que cuando carga el modal en oculto, intenta renderizar datos que aún no existen */}
          ¿Seguro que quieres eliminar al usuario <b>{manageUser ? manageUser.email : null}</b> de
          forma permanente?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={async () => {
              await deleteUser(manageUser.id); // Elimina al usuario
              setUserDeleteModalShow(false); // Oculta la ventana de confirmar eliminación
              reloadUsers(setUserError, setUserIsLoading); // Refresca la lista de usuarios
            }}
          >
            Aceptar
          </Button>
          <Button variant="danger" onClick={() => setUserDeleteModalShow(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
