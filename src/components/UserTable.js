import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addUser,
  editUser,
  deleteUser,
} from "../actions/userActions";
import { Table, Button, Modal, Form, Stack } from "react-bootstrap";

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: { city: "", zipcode: "" },
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAdd = () => {
    try {
      dispatch(addUser({ ...newUser, id: users.length + 1 }));
      setShowModal(false);
      setNewUser({
        name: "",
        email: "",
        phone: "",
        address: { city: "", zipcode: "" },
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEdit = (id) => {
    try {
      dispatch(editUser(id, editingUser));
      setEditingUser(null);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDelete = (id) => {
    try {
      dispatch(deleteUser(id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: 10 }}>User Table</h1>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add User
        </Button>
      </div>
      <Table bordered hover style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City (Zip Code)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.phone}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, phone: e.target.value })
                    }
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>{`${user.address.city} (${user.address.zipcode})`}</td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <Stack direction="horizontal" gap={2}>
                    <Button
                      variant="success"
                      onClick={() => handleEdit(user.id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditingUser(null)}
                    >
                      Cancel
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="horizontal" gap={2}>
                    <Button
                      variant="warning"
                      onClick={() => setEditingUser(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Adding User */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={newUser.address.city}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: { ...newUser.address, city: e.target.value },
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="zipcode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                value={newUser.address.zipcode}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: { ...newUser.address, zipcode: e.target.value },
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTable;
