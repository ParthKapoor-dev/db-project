// import "./style.css";

import { useRef, useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import { CurrentMode } from "../../../currentMode";

export default function NewSubGroups({ setGroups }) {

  const nameRef = useRef();
  const { user, token, dispatch } = useUserContext();
  const [error, setError] = useState(null);

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
      setError(json.error);
    }
  }

  return (

    <form onSubmit={handleAddSubgroup} className=" w-[15vw] h-fit box-content input-styles flex flex-col text-lg border-2 border-slate-400  py-4 px-6 rounded ">
      <div className="flex justify-center items-center text-2xl font-semibold">
        Add New Subgroups
      </div>
      <label htmlFor="grp-name">Sub Group Name</label>
      <input type="text" id="grp-name" ref={nameRef} style={{ width: '15vw' }} />
      <button type="submit" className="btn">Add Sub Group</button>
      {
        error && (
          <div className="error-div mt-4">
            {error}
          </div>
        )
      }
    </form>
  )
}