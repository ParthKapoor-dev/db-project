// import "./style.css";

import { useRef, useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import { CurrentMode } from "../../../currentMode";

export default function NewSubGroups({ setGroups , setShowGroups}) {

  const nameRef = useRef();
  const { user, token, dispatch } = useUserContext();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);

  async function handleAddSubgroup(event) {
    event.preventDefault();
    setDisabled(true);
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
      setShowGroups(json.subgroups);
      nameRef.current.value = ""
    } else {
      console.error(json);
      setError(json.error);
    }
    setDisabled(false)
  }

  return (

    <form onSubmit={handleAddSubgroup} className=" w-[15vw] bg-darkbl h-fit box-content input-styles flex flex-col text-lg border-2 border-slate-500  py-4 px-6 rounded text-white ">
      <div className="flex justify-center items-center text-2xl font-semibold mb-2">
        Add Sub Groups
      </div>
      <label htmlFor="grp-name">Sub Group Name</label>
      <input type="text" id="grp-name" ref={nameRef} className="text-input" style={{ width: '15vw' }} />
      <button type="submit" disabled={disabled} className="bg-blue-500 text-white rounded py-2 hover:bg-white hover:text-blue-500 duration-200 disabled:bg-gray-700 ">
        {disabled ? ("Loading...") : ("Add New Subgroups")}
      </button>
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