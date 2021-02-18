import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Home.css";

const Home = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch("/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUsers(data.users);
      })
      .catch((err) => setHasError(true));
  }, [setUsers, setHasError, hasError]);
  return (
    <>
      <Header />
      <div className="home">
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
      </div>
    </>
  );
};

export default Home;
