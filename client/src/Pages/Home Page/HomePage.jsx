import "./style.css"
import SubGroupListingPage from "../../Components/SubGroupListing/SubgroupListing";
import useUserContext from "../../hooks/useUserContext";
import NewSubGroups from "../../Components/Subgroups/New-Subgroups";
import { useState } from "react";
export default function HomePage() {

  const { user } = useUserContext();
  const [subgroups, setSubgroups] = useState(user.subgroups);
  const [showGroups, setShowGroups] = useState(subgroups);


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

      <div className="flex justify-center gap-10">
        <SubGroupListingPage subgroups={subgroups} setShowGroups={setShowGroups} showGroups={showGroups} />
        <NewSubGroups setGroups={setSubgroups} setShowGroups={setShowGroups}/>
      </div>
    </div>
  )
}
