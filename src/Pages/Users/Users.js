import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Users.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = ({ history }) => {
  const [state, setState] = useState({ email: "", role: "" });
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [editing, setEditing] = useState(false);

  async function makeGetRequest() {
    let res = await axios.get("http://localhost:3030/usersdata");
    let data = res.data;
    setUsers(data);
    console.log("usuarios", data);
  }
  async function update(e) {
    e.preventDefault();
    const response = await axios.post("http://localhost:3030/users", state);
    console.log(response.data);
  }
  useEffect(() => {
    makeGetRequest();
  }, [setUsers, setHasError, hasError]);

  return (
    <>
      <Header />
      <div className="users">
        <table className="usersTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    onChange={(e) => {
                      setState({ ...state, role: e.target.value });
                    }}
                    id="roles"
                    name="roles"
                    className={editing ? "roleDrop" : "hidden"}
                    defaultValue={user.role}
                  >
                    <option value="User">User</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Admin">Admin</option>
                  </select>
                  {editing ? null : <p>{user.role}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={"usersOptions"}>
          <button onClick={update} className={"saveBtn"} type="submit">
            Guardar
          </button>
          <p onClick={() => setEditing(!editing)}> Editar </p>
          <Link to={"./"}> Volver </Link>
        </div>
      </div>
    </>
  );
};

export default Users;
