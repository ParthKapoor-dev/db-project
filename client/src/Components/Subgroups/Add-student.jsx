import { useRef } from "react";
import { CurrentMode } from "../../../currentMode";
import useUserContext from "../../hooks/useUserContext";

export default function AddStudent({setGroup , subgroupId}) {

  const nameRef = useRef();
  const classRef = useRef();
  const rollnoRef = useRef();
  const { token } = useUserContext();

  async function handleSubmit(event) {

    event.preventDefault();

    const data = {
      subgroupId,
      studentDetails: {
        name: nameRef.current.value,
        class: classRef.current.value,
        rollno: rollnoRef.current.value
      }
    }

    const url = CurrentMode.url + '/user/add-student';
    const response = await fetch(url, {
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
      setGroup(json);
    } else {
      console.error(json);
    }
  }

  return (

    <form action="" className="input-styles flex flex-col" onSubmit={handleSubmit}>

      <div>
        Add Student
      </div>

      <label htmlFor="std-name">Student Name</label>
      <input type="text" id="std-name" ref={nameRef} />

      <label htmlFor="std-class">Student Class</label>
      <input type="text" id="std-class" ref={classRef} />

      <label htmlFor="std-rollno">Roll No.</label>
      <input type="text" id="std-rollno" ref={rollnoRef} />

      <button className="btn">
        Submit
      </button>
    </form>
  )
}