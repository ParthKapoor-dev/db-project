import { useRef } from "react";
import { CurrentMode } from "../../../currentMode"
import useUserContext from "../../hooks/useUserContext";

export default function CreateCoursePage() {

  const nameRef = useRef();
  const priceRef = useRef();
  const subjectRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const topicsRef = useRef();

  async function handleSubmit() {

    const { token, user } = useUserContext();
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
        endtime : endDateRef.current.value,
        topics : topicsRef.current.value
      }
    }

    const response = await fetch(serverUrl, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
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
        <input type="text" id="subject" ref={subjectRef}/>

        <label htmlFor="price">Price</label>
        <input type="text" id="price" ref={priceRef} />

        <label htmlFor="start-time">Start Time</label>
        <input type="text" id="start-time" ref={startDateRef}/>

        <label htmlFor="end-time">End Time</label>
        <input type="text" id="end-time" ref={endDateRef} />

        <label htmlFor="topics">Topics</label>
        <input type="text" id="topics" ref={topicsRef} />

        <button>Submit Course</button>
      </form>
    </div>
  )

}

