import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Users.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);

  async function makeGetRequest() {
    let res = await axios.get("/usersdata");
    let data = res.data;
    setUsers(data);
    console.log(data);
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
              <tr>
                <td>{index}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button className={"saveBtn"} type="submit">
            Guardar
          </button>
          <Link to={"./"}> Volver </Link>
        </div>
      </div>
    </>
  );
};

export default Users;
