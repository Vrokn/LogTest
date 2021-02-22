import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Courses.css";
import axios from "axios";
import { Link } from "react-router-dom";

import Course from "./Course";

function validateSubscribers(courses) {
  return courses.map((course) => {
    const newCourse = { ...course };
    newCourse.periods = newCourse.periods.map((period) => {
      const newPeriod = { ...period };
      if (newPeriod.subscribers === undefined) {
        newPeriod.subscribers = [];
      }
      return newPeriod;
    });
    return newCourse;
  });
}

async function updateCourse(course) {
  const courses = await axios
    .post("/courses", course)
    .then(({ data }) => validateSubscribers(data));

  return courses;
}

async function makeGetRequest() {
  let courses = await axios
    .get("/courses")
    .then(({ data }) => validateSubscribers(data));

  return courses;
}

const Courses = ({ history }) => {
  const [courses, setCourses] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    makeGetRequest().then(setCourses);
  }, [setCourses, setHasError, hasError]);

  return (
    <>
      <Header />
      <div className="courses">
        <div className={"coursesOptions"}>
          <Link to={"./"}> Volver </Link>
        </div>
        <div className={"coursesContainer"}>
          {courses.map((course) => (
            <Course
              key={course.title}
              enroll={(course) => {
                updateCourse(course).then(setCourses);
              }}
              {...course}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
