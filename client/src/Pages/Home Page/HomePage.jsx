import { useEffect, useState } from "react";
import NewSubGroups from "../../Components/Subgroups/New-Subgroups";
import useUserContext from "../../hooks/useUserContext";
import { useNavigate } from "react-router";

import "./style.css"

export default function HomePage() {

  const { user } = useUserContext();
  const [subgroups, setSubgroups] = useState(user.subgroups);

  return (
    <div className="w-[80vw]">

      <div className="flex justify-center items-center text-5xl font-semibold text-lightbl mt-4">
        Welcome {user.name}
      </div>
      <div className="flex justify-center items-center w-full h-[25vh]">
        <div className="text-4xl font-semibold bg-xdarkbl text-white h-[15vh] w-[40vw] flex justify-center items-center rounded cursor-pointer hover:bg-lightbl duration-200">
          <p className="hover:scale-150 duration-150 w-full h-full flex justify-center items-center">
            Capstone Projects
          </p>
        </div>
      </div>

      <div className="h-4 border-t-2 border-t-slate-400 mx-20 mb-4">
      </div>

      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center gap-2">
          <div className="text-2xl font-semibold bg-xdarkbl text-white px-10 h-[6vh] flex justify-center items-center rounded">
            Sub Groups
          </div>
          <input type="text" className="text-lg border-2 w-[20vw] border-slate-200 rounded py-2 px-4" placeholder="Search Subgroups" />

        </div>
        <div className="flex gap-4 flex-col my-4">
          {subgroups.map(item => (
            <Group item={item} key={item.grpid} />
          ))}
        </div>
        <div>
          <NewSubGroups setGroups={setSubgroups} />
        </div>
      </div>
    </div>
  )
}

function Group({ item }) {

  const Navigate = useNavigate()
  function handleGroupPage() {
    Navigate('/subgroups/' + item.grpname, { state: { groupId: item.grpid } });
  }

  return (
    <div onClick={handleGroupPage} className="parent-div flex flex-col justify-center items-center text-2xl p-4 w-[30vw] border-2 border-darkbl cursor-pointer hover:bg-lightbl hover:text-white duration-400 ">

      {item.grpname}

      <div className="child-div">
      </div>
    </div>
  )
}