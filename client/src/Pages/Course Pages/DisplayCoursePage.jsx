import { useLocation } from "react-router"
import useUserContext from "../../hooks/useUserContext";
import { CurrentMode } from "../../../currentMode";
import { useState, useEffect } from "react";

import SampleSkillImage from "../../../public/Images/sample skill image.jpg"

export default function DisplayCoursePage() {

  const location = useLocation();
  const courseId = location?.state?.courseId;
  const CourseData = location?.state?.course
  const { token } = useUserContext();
  console.log(courseId, CourseData)
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && courseId) fetchCourse(token, courseId, setCourse, setLoading);
    else if (CourseData) {
      setLoading(false);
      setCourse(CourseData);
    }
  }, []);

  if (loading) {
    return (
      <div>
        Loading , Please Wait;
      </div>
    )
  };

  return (

    <div className="flex flex-col justify-center items-center">
      <div className="text-white bg-zinc-800 w-[100vw] py-10 px-[15vw] flex gap-10">
        <div className="flex flex-col gap-6 w-[40vw] ">
          <div className="font-bold text-4xl">
            {course.name}
          </div>
          <div className="font-semibold text-xl">
            {course.subject}
          </div>
          <div>
            Created By {course.instructor.name}
          </div>
          <div>
            Last Updated {course.starttime}
          </div>
        </div>
        <div className="bg-white py-2 text-black z-20 h-[40vh] w-[20vw] gap-4 flex flex-col px-4 ">
          <div className="flex items-center">
            <img src={SampleSkillImage} className="h-[20vh] w-[20vw] object-contain" />
          </div>
          <div className="font-bold text-2xl">
            ₹ {course.price}
          </div>
          <div className="bg-purple-600 hover:bg-purple-800 py-2 text-white duration-100 font-bold flex items-center justify-center">
            Subscribe
          </div>
        </div>
      </div>
      <div>
        <div className="">
          <div className="text-4xl mb-10 flex justify-center items-center mt-6 font-semibold">
            Lectures

          </div>
        </div>
        <div className="flex flex-col gap-4">
          {course.coursevideo.map(item => (
            <CourseVideo video={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function fetchCourse(token, courseId, setCourse, setLoading) {

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

function CourseVideo({ video }) {

  return (
    <div className="flex flex-col justify-normal items-start">
      {/* <div className="text-xl">
        {video.title}
      </div> */}

      <details>
        <summary className="text-xl">
          {video.title}
        </summary>
        <div>
          <video src={video.link} className="w-[30vw]" controls={true}> </video>
        </div>
      </details>
    </div>
  )
}