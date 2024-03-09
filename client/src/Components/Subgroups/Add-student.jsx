import { useRef, useState } from "react";
import { CurrentMode } from "../../../currentMode";
import useUserContext from "../../hooks/useUserContext";

export default function AddStudent({ setGroup, subgroupId }) {

  const nameRef = useRef();
  const emailRef = useRef();
  const rollnoRef = useRef();
  const { token } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
  }
  async function handleSubmit(event) {

    event.preventDefault();

    const data = {
      subgroupId,
      studentDetails: {
        name: nameRef.current.value,
        email: emailRef.current.value,
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
      handleClose();
    } else {
      console.error(json);
      setError(json.message);
    }
  }

  return (
    <div>
      <button className="py-2 px-4 bg-blue-500 flex justify-center items-center rounded-lg" onClick={handleOpen}>
        + Add Student
      </button>


      {isOpen && (

        <div className="z-10 absolute top-0 left-0 bg-opacity-100 bg-gray-500 h-full w-full flex justify-center items-center">
          <form action="" className="flex flex-col p-8 bg-darkbl rounded justify-center w-[40vw]" onSubmit={handleSubmit}>

            <label htmlFor="std-name">Name</label>
            <input type="text" id="std-name" placeholder="Student's Name" ref={nameRef} className="bg-lighterbl text-lg border-2 border-slate-600  px-2 focus-visible:outline-0 rounded py-1 mb-4" />

            <label htmlFor="std-email">Email</label>
            <input type="text" id="std-email" placeholder="Student's Email" ref={emailRef} className="bg-lighterbl text-lg border-2 border-slate-600  px-2 focus-visible:outline-0 rounded py-1 mb-4" />

            <label htmlFor="std-rollno">Roll No.</label>
            <input type="number" id="std-rollno" placeholder="Student's Roll No" ref={rollnoRef} className="bg-lighterbl text-lg border-2 border-slate-600  px-2 focus-visible:outline-0 rounded py-1 mb-4" />

            <div className="flex gap-4">
              <div className="flex flex-col">
                <label htmlFor="std-rollno">OS</label>
                <input type="number" id="std-rollno" placeholder="" ref={rollnoRef} className="bg-lighterbl text-lg border-2 border-slate-600  px-2 focus-visible:outline-0 rounded py-1 mb-4 w-[5vw]" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="std-rollno">OS</label>
                <input type="number" id="std-rollno" placeholder="" ref={rollnoRef} className="bg-lighterbl text-lg border-2 border-slate-600  px-2 focus-visible:outline-0 rounded py-1 mb-4 w-[5vw]" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="std-rollno">OS</label>
                <input type="number" id="std-rollno" placeholder="" ref={rollnoRef} className="bg-lighterbl text-lg border-2 border-slate-600  px-2 focus-visible:outline-0 rounded py-1 mb-4 w-[5vw]" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="std-rollno">OS</label>
                <input type="number" id="std-rollno" placeholder="" ref={rollnoRef} className="bg-lighterbl text-lg border-2 border-slate-600  px-2 focus-visible:outline-0 rounded py-1 mb-4 w-[5vw]" />
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <button className="py-2 px-4 bg-blue-500 flex justify-center items-center rounded-lg" type="submit">
                Add
              </button>

              <button onClick={handleClose} className="py-2 px-4 bg-red-500 flex justify-center items-center rounded-lg">
                Close
              </button>
            </div>

            {error && (
              <div className="error-div">
                {error}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  )
}