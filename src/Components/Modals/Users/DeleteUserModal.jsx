import React from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../../../Context/UserContext";
import { deleteUser } from "../../../Services/users.service.js";

export default function DeleteUserModal() {
  const {
    userListDeleteModalShow,
    setUserListDeleteModalShow,
    selectedUser,
    setUserListIsLoading,
    setUserListError,
  } = useContext(UserContext);

  return (
    <Modal
      show={userListDeleteModalShow}
      onHide={() => setUserListDeleteModalShow(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Eliminar usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/** Necesito poner este condicional, ya que cuando carga el modal en oculto, intenta renderizar datos que aún no existen */}
        ¿Seguro que quieres eliminar al usuario <b>{selectedUser ? selectedUser.email : null}</b> de
        forma permanente?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={async () => {
            await deleteUser(selectedUser.id); // Elimina al usuario
            setUserListDeleteModalShow(false); // Oculta la ventana de confirmar eliminación
            setUserListError(null); // Borra los errores de la lista de usuarios
            setUserListIsLoading(true); // Pone a cargar la lista de usuarios
          }}
        >
          Aceptar
        </Button>
        <Button variant="danger" onClick={() => setUserListDeleteModalShow(false)}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
