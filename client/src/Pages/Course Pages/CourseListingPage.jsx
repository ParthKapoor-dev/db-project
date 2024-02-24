import { useState, useEffect } from "react";
import { CurrentMode } from "../../../currentMode"
import useUserContext from "../../hooks/useUserContext";

export default function CourseListingPage() {

  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(true);
  const { token } = useUserContext();


  useEffect(() => {
    if (token) fetchRelatedCourses(token, setCourses, setLoading);
  })


  if (loading)
    return (
      <div>
        Loading Please Wait;
      </div>
    );


  if (courses?.length == 0)
    return (

      <div>
        We have no Courses to sell , Please come sometime later
      </div>
    )


  return (

    <div className="">
      <div>
        {courses.map(item => (
          <Course course={item} key={item._id} />
        ))}
      </div>
    </div>
  )
};


function Course({ course }) {

  return (
    <div>
      this is a {course.name}
    </div>
  )
}


async function fetchRelatedCourses(token, setCourses, setLoading) {

  const serverUrl = CurrentMode.url + '/courses/list-course';

  console.log(token);

  const response = await fetch(serverUrl, {
    method: "GET",
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const json = await response.json();

  if (response.ok) {
    console.log(json);
    setCourses(json);
    setLoading(false);

  }
  else {
    console.error(json);
  }
}