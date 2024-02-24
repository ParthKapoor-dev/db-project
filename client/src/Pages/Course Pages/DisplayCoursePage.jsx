import { useLocation } from "react-router"
import useUserContext from "../../hooks/useUserContext";
import { CurrentMode } from "../../../currentMode";
import { useState, useEffect } from "react";

export default function DisplayCoursePage() {

  const location = useLocation();
  const courseId = location.state.courseId;
  const { token } = useUserContext();

  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && courseId) fetchCourse(token, courseId, setCourse, setLoading)
  }, []);

  if (loading) {
    return (
      <div>
        Loading , Please Wait;
      </div>
    )
  };

  return (

    <div>
      {course.title}
    </div>
  )
}

async function fetchCourse(token, courseId, setCourse, setLoading) {

  const serverUrl = CurrentMode.url + '/display-course/' + courseId;
  const response = await fetch(serverUrl, {
    method: "GET",
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const json = await response.json();

  if (response.ok) {
    console.log('Course Fetched Successfully');
    setCourse(json);
    setLoading(false)
  } else {
    console.error('Error : Cannot Fetch Course');
  }

}