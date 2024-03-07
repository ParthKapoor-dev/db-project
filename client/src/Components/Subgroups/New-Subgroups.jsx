// import "./style.css";

import { useRef } from "react";
import useUserContext from "../../hooks/useUserContext";
import { CurrentMode } from "../../../currentMode";

export default function NewSubGroups() {

  const nameRef = useRef();
  const { user, token, dispatch } = useUserContext();

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
      dispatch({ type : 'UpdateUser' , payload : json })
    } else {
      console.error(json);
    }
  }

  return (

    <form onSubmit={handleAddSubgroup} className="input-styles flex flex-col text-lg">
      <div>
        Add New Subgroups
      </div>
      <label htmlFor="grp-name">Sub Group Name</label>
      <input type="text" id="grp-name" ref={nameRef} />
      <button type="submit" className="btn">Add Sub Group</button>
    </form>

  )
}