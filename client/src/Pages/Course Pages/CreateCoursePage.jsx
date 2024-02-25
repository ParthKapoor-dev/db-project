import { useRef, useState } from "react";
import { CurrentMode } from "../../../currentMode"
import useUserContext from "../../hooks/useUserContext";
import { useNavigate } from "react-router";

export default function CreateCoursePage() {

  const Navigate = useNavigate();
  const nameRef = useRef();
  const priceRef = useRef();
  const subjectRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const topicsRef = useRef();
  const { token, user } = useUserContext();
  console.log(user, token);

  const someUser = localStorage.getItem('user');
  console.log(someUser);


  async function handleSubmit(event) {
    event.preventDefault();

    const serverUrl = CurrentMode.url + '/courses/add-course';

    const data = {
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
      topics: topicsRef.current.value,
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
      Navigate('/explore/courses');
    } else {
      throw new Error("network error");
      console.error(json);
    }
  }


  return (
    <div className="flex flex-col items-center justify-center my-4 text-2xl font-bold ">
      Create Course Page

      <form onSubmit={handleSubmit} className="input-styles flex flex-col text-lg font-normal mt-4" >
        <label htmlFor="name">Course Title</label>
        <input type="text" id="name" ref={nameRef} />

        <label htmlFor="subject">Course Subject</label>
        <textarea type="text" id="subject" ref={subjectRef} className="h-[20vh]" />

        <label htmlFor="price">Price</label>
        <input type="text" id="price" ref={priceRef} />

        <label htmlFor="start-time">Start Time</label>
        <input type="date" id="start-time" ref={startDateRef} />

        <label htmlFor="end-time">End Time</label>
        <input type="date" id="end-time" ref={endDateRef} />

        <label htmlFor="topics">Topics</label>
        <input type="text" id="topics" ref={topicsRef} />

        <button type="submit" className="bg-purple-600 hover:bg-purple-800 py-2 text-white duration-100 font-bold">
          Submit Course
        </button>
      </form>
    </div>
  )

}

