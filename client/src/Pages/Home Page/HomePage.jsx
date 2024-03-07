import { useEffect, useState } from "react";
import NewSubGroups from "../../Components/Subgroups/New-Subgroups";
import useUserContext from "../../hooks/useUserContext";
import { useNavigate } from "react-router";

export default function HomePage() {

  const { user } = useUserContext();
  const [subgroups, setSubgroups] = useState(user.subgroups);

  return (
    <div className="w-[80vw]">
      <div className="flex justify-center items-center w-full h-[25vh]">
        <div className="text-4xl font-semibold bg-xdarkbl text-white h-[15vh] w-[40vw] flex justify-center items-center rounded cursor-pointer hover:bg-lightbl duration-200">
          <p className="hover:scale-125 duration-200 w-full h-full flex justify-center items-center">
            Capstone Projects
          </p>
        </div>
      </div>

      <div className="h-4 border-t-2 border-t-slate-400 mx-20 mb-4">
      </div>

      <div className="flex flex-col items-center">
        <div className="text-2xl font-semibold bg-xdarkbl text-white h-[10vh] w-[40vw] flex justify-center items-center rounded">
          Sub Groups
        </div>
        <div>
          {subgroups.map(item => (
            <Group item={item} key={item.grpid} />
          ))}
        </div>
        <div>
          <NewSubGroups />
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
    <div onClick={handleGroupPage}>
      {item.grpname}
    </div>
  )
}