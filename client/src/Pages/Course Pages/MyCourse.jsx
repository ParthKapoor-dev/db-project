import { useLocation, useNavigate } from "react-router"
import { fetchCourse } from "./DisplayCoursePage";
import { useState, useEffect, useRef } from "react";
import useUserContext from "../../hooks/useUserContext";

import SampleSkillImage from "../../../public/Images/sample skill image.jpg"
import { CurrentMode } from "../../../currentMode";


export default function MyCourse() {

  const location = useLocation();
  const Navigate = useNavigate();
  const courseId = location?.state?.courseId;
  const CourseData = location?.state?.course;
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);
  const videoTitleRef = useRef();
  const { token } = useUserContext();

  useEffect(() => {
    if (token && courseId) fetchCourse(token, courseId, setCourse, setLoading);
    else if (CourseData) {
      setLoading(false);
      setCourse(CourseData);
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: course._id,
      videoDetails: {
        title: videoTitleRef.current.value
      }
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("videoFile", videoFile)

    const serverUrl = CurrentMode.url + '/courses/course-video'
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
      Navigate('/explore/courses');
    } else {
      console.error(json)
    }
  };

  if (loading)
    return "Please Wait ! Page is Still Loading"

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
        <form onSubmit={handleSubmit} className="input-styles flex flex-col mt-10">
          <div className="flex items-center justify-center text-2xl font-semibold">
            Add New Video
          </div>
          <label htmlFor="video-name">Video Name</label>
          <input type="text" ref={videoTitleRef} />

          <label htmlFor="video">Upload Video</label>
          <input type="file" onChange={(event) => {
            setVideoFile(event.target.files[0]);
          }} />

          <button type="submit" className="bg-purple-600 hover:bg-purple-800 py-2 text-white duration-100 font-bold">
            Add Video
          </button>

        </form>
      </div>
    </div>
  )
}