import { useState } from "react";
import { useNavigate } from "react-router";

export default function SubGroupListingPage({ subgroups , showGroups , setShowGroups }) {


  useState(() => {
    setShowGroups(subgroups);
    console.log('hello JI')
  }, [subgroups])

  function handleSearch(event) {
    const input = event.target.value.toLowerCase();
    setShowGroups(subgroups.filter(item => item.grpname.toLowerCase().includes(input)));
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-3xl font-semibold bg-lighterbl text-white px-10 h-[8vh] w-[30vw] flex justify-center items-center rounded">
          Sub Groups
        </div>
        <input type="text" onChange={handleSearch} className="text-lg border-2 w-[25vw] border-slate-200 rounded py-2 px-4" placeholder="Search Subgroups" />

      </div>
      <div className="flex gap-4 flex-col my-4 ">
        {showGroups.map(item => (
          <Group item={item} key={item.grpid} />
        ))}
      </div>
      {/* <div>
        <NewSubGroups setGroups={setSubgroups} />
      </div> */}
    </div>
  )
}



function Group({ item }) {

  const Navigate = useNavigate()
  function handleGroupPage() {
    Navigate('/subgroups/' + item.grpname, { state: { groupId: item.grpid } });
  }

  return (
    // <div onClick={handleGroupPage} className="parent-div flex flex-col justify-center items-center text-2xl p-4 w-[30vw] border-2 border-darkbl cursor-pointer hover:bg-lightbl hover:text-white duration-400 ">

    //   {item.grpname}

    // </div>

    <button onClick={handleGroupPage} className="hover-btn w-[25vw] text-lg">
      {item.grpname}
    </button>
  )
}