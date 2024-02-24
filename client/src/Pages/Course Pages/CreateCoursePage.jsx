import { useRef, useState } from "react";
import { CurrentMode } from "../../../currentMode"
import useUserContext from "../../hooks/useUserContext";

export default function CreateCoursePage() {

  const nameRef = useRef();
  const priceRef = useRef();
  const subjectRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const topicsRef = useRef();
  const [videoFile,setVideoFile] = useState(null);
  const { token, user } = useUserContext();
  console.log(user, token);

  const someUser = localStorage.getItem('user');
  console.log(someUser);


  async function handleSubmit(event) {
    event.preventDefault();

    const serverUrl = CurrentMode.url + '/courses/add-course';

    const data = {
      user,
      details: {
        instructor: {
          name: user.name,
          id: user._id,
          email: user.email
        },
        name: nameRef.current.value,
        subject: subjectRef.current.value,
        price: priceRef.current.value,
        starttime: startDateRef.current.value,
        endtime: endDateRef.current.value,
        topics: topicsRef.current.value
      }
    }

    const formData= new FormData();
    formData.append("data",data);
    formData.append("videoFile",videoFile);
    console.log(formData);

    const response = await fetch(serverUrl, {
      method: "POST",
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
    } else {
      console.error(json);
    }
  }


  return (
    <div>
      Create Course Page;

      <form onSubmit={handleSubmit} >
        <label htmlFor="name">Course Title</label>
        <input type="text" id="name" ref={nameRef} />

        <label htmlFor="subject">Course Subject</label>
        <input type="text" id="subject" ref={subjectRef} />

        <label htmlFor="price">Price</label>
        <input type="text" id="price" ref={priceRef} />

        <label htmlFor="start-time">Start Time</label>
        <input type="date" id="start-time" ref={startDateRef} />

        <label htmlFor="end-time">End Time</label>
        <input type="date" id="end-time" ref={endDateRef} />

        <label htmlFor="topics">Topics</label>
        <input type="text" id="topics" ref={topicsRef} />

        <label htmlFor="video">Video</label>
        <input type="file" id="videoFile" name="videoFile" accept="video/*" onChange={(event)=>setVideoFile(event.target.files[0])}/>

        <button>Submit Course</button>
      </form>
    </div>
  )

}

