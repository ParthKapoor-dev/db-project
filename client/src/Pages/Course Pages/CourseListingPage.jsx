import { useState } from "react";
import { CurrentMode } from "../../../currentMode"
import useUserContext from "../../hooks/useUserContext";

export default function CourseListingPage() {

  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedCourses(setCourses , setLoading);
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
          <Course course={item}  />
        ))}
      </div>
    </div>
  )
};


function Course({course}) {
  
  return (
    <div>
      this is a {course.name}
    </div>
  )
}


async function fetchRelatedCourses(setCourses , setLoading) {

  const { token } = useUserContext();

  const serverUrl = CurrentMode.url + '/list-course';
  const response = fetch(serverUrl, {
    method: "GET",
    header: {
      'content-type': 'application/json',
      'Autherization': `Bearer ${token}`
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