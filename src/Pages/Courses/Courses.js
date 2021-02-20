import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Courses.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Courses = ({ history }) => {
  const [state, setState] = useState({ title: "", instructors: [] });
  const [courses, setCourses] = useState([]);
  const [hasError, setHasError] = useState(false);

  const user = Cookies.get("user");
  const instructor = user ? JSON.parse(user)?.role === "Instructor" : false;

  const username = JSON.parse(user)?.name;

  async function makeGetRequest() {
    let res = await axios.get("/coursesdata");
    let data = res.data;
    setCourses(data);
  }

  async function suscribe(e, index) {
    const newinstructors = [...state.instructors, username];

    /* setState({
      instructors: newinstructors,
      title: courses[index].title,
    }); */
    e.preventDefault();
    const response = await axios.post("/courses", state);
    console.log("response", response);
  }
  async function enroll(e) {
    const newinstructors = [...state.instructors, username];
    console.log(e);
    /* setState({
      instructors: newinstructors,
      title: courses[index].title,
    }); */
    e.preventDefault();
    const response = await axios.post("/courses", state);
    console.log("response", response);
  }
  useEffect(() => {
    makeGetRequest();
  }, [setCourses, setHasError, hasError]);

  return (
    <>
      <Header />
      <div className="courses">
        <div className={"coursesOptions"}>
          <Link to={"./"}> Volver </Link>
        </div>
        <div className={"coursesContainer"}>
          {courses.map((course, index) => (
            <div className={"course"} key={index}>
              <img
                className={"courseImage"}
                src={course.image}
                alt={"noimage"}
              />
              <h1 className={"courseTitle"}>{course.title}</h1>
              <p className={"courseDescription"}>{course.description}</p>
              <p className={"courseInstructors"}>
                Dictado por: {course.instructors.join(", ")}
              </p>
              {!instructor && (
                <button onClick={suscribe} className={"courseSub"}>
                  Suscribirme
                </button>
              )}
              {instructor && (
                <button onClick={enroll} className={"courseSub"}>
                  Dictar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
