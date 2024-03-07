// import "./style.css";

import { useRef, useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import { CurrentMode } from "../../../currentMode";

export default function NewSubGroups({ setGroups }) {

  const nameRef = useRef();
  const { user, token, dispatch } = useUserContext();
  const [open, setOpen] = useState(false);

  async function handleAddSubgroup(event) {
    event.preventDefault();

    const data = {
      subgroupName: nameRef.current.value,
      teacherId: user._id
    };

    const url = CurrentMode.url + '/user/add-subgroup';

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
      console.log(user);
      dispatch({ type: 'UpdateUser', payload: json });
      setGroups(json.subgroups);
      nameRef.current.value = ""
    } else {
      console.error(json);
    }
  }

  return (

    <div className="flex flex-col ">
      {open ? (
        <form onSubmit={handleAddSubgroup} className="input-styles flex flex-col text-lg z-50 absolute border-2 border-darkbl p-8 bg-white top-[50vh] left-[50vw] translate-x-[-20%] translate-y-[-60%]">
          <div className="flex justify-center items-center text-2xl font-semibold">
            Add New Subgroups
          </div>
          <label htmlFor="grp-name">Sub Group Name</label>
          <input type="text" id="grp-name" ref={nameRef} />
          <button type="submit" className="btn">Add Sub Group</button>
          <button className="error-div mt-4" onClick={() => setOpen(false)}>
            Close
          </button>
        </form>

      ) : (
        <button className="btn w-[30vw]  text-lg" onClick={() => setOpen(true)}>
          Add Sub Group
        </button>
      )}
    </div>
  )
}