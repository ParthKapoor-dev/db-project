import { useEffect, useState } from "react";
import { CurrentMode } from "../../../currentMode";
import { useLocation } from "react-router";
import useUserContext from "../../hooks/useUserContext";
import AddStudent from "../../Components/Subgroups/Add-student";

export default function ShowGroups() {

  const [group, setGroup] = useState();
  const { token } = useUserContext();
  const location = useLocation();
  const groupId = location.state.groupId;
  const [Loading, setLoading] = useState(true);
  const [showSubGroups, setShowSubGroups] = useState();

  useEffect(() => {


    const url = CurrentMode.url + '/user/fetch-subgrp?_id=' + groupId;
    async function fetchGroup() {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setLoading(false);
        setGroup(json);
        setShowSubGroups(json);
      } else {
        console.error(json);
      }
    };

    if (token || groupId) fetchGroup();

  }, [token])

  function handleSearch(event) {
    const input = event.target.value;
    const students = group.students.filter(item => {
      const objKeys = Object.keys(item);
      return objKeys.some(data => item[data].toLowerCase().includes(input.toLowerCase()));
    }
    );
    setShowSubGroups((group) => ({ ...group, students }))
  }

  function handleChange(event) {
    const input = event.target.value.toLowerCase();
    console.log(input);

    const students = group.students.sort((item1, item2) => (item1[input].toLowerCase()) - (item2[input].toLowerCase()));

    const showStudents = showSubGroups.students.sort((item1, item2) => (item1[input].toLowerCase()) - (item2[input].toLowerCase()));

    console.log(students);
    console.log(showStudents);

    setGroup((prev) => ({ ...prev, students }));
    setShowSubGroups(prev => ({ ...prev, students: showStudents }));

  }

  return (
    !Loading ? (
      <div className="flex flex-col px-10 py-6 items-center w-[80vw]">
        <div className="text-2xl font-semibold">
          Sub Group : {group.name}
        </div>

        <div className="bg-lighterbl text-white rounded py-2 w-[70vw]">

          <div className="px-6 h-15 flex items-center justify-between py-4 ">

            <input type="text" onChange={handleSearch} className="bg-lighterbl text-lg border-2 border-slate-600  px-2 focus-visible:outline-0 rounded py-1" placeholder="Search Students" />

            <div className="flex gap-6 ">
              <select placeholder="Sort By" name="" id="" onChange={handleChange} className="bg-lighterbl text-lg border-2 border-slate-600  px-2 w-[10vw] focus-visible:outline-0 rounded py-1">
                <option value="name" className="py-2">Name</option>
                <option value="roll_no">Roll No</option>
                {/* <option value="marks">Marks</option> */}
              </select>

              <AddStudent setShowSubGroups={setShowSubGroups} setGroup={setGroup} subgroupId={groupId} />
            </div>
          </div>
          <div className="text-lg py-2 bg-darkbl px-6 flex items-center">

            <div className="min-w-10">
              #
            </div>

            <div className=" min-w-60 max-w-60 overflow-hidden  ">
              NAME
            </div>

            <div className=" min-w-60 max-w-60 overflow-hidden  ">
              ROLL NO
            </div>

            <div className=" min-w-40 max-w-40 overflow-hidden  ">
              OS
            </div>

            <div className=" min-w-40 max-w-40 overflow-hidden  ">
              CP
            </div>

            <div className=" min-w-40 max-w-40 overflow-hidden  ">
              ELEC
            </div>

            <div className=" min-w-40 max-w-40 overflow-hidden  ">
              CN
            </div>


          </div>
          <div className="flex flex-col text-lg">
            {showSubGroups.students.map((item, index) => (
              <Student item={item} key={item.name} index={index + 1} />
            ))}
          </div>
        </div>
        <div>
        </div>
      </div>
    ) : (
      <div>
        Loading
      </div>
    )
  )

}



function Student({ item, index }) {

  console.log(item);
  return (

    <div className="text-lg py-2 px-6 border-b-2 border-slate-600 bg-lighterbl flex items-center">

      <div className="min-w-10 max-w-10 overflow-hidden">
        {index}
      </div>

      <div className=" min-w-60 max-w-60 overflow-hidden">
        {item.name}
      </div>

      <div className=" min-w-60 max-w-60 overflow-hidden    ">
        {item.roll_no}
      </div>

      <div className="  min-w-40 max-w-40 overflow-hidden">
        {item.os_marks}
      </div>

      <div className=" min-w-40 max-w-40 overflow-hidden  ">
        {item.cp_marks}
      </div>

      <div className="min-w-40 max-w-40 overflow-hidden  ">
        {item.elec_marks}
      </div>

      <div className=" min-w-40 max-w-40 overflow-hidden  ">
        {item.cn_marks}
      </div>

    </div>
  )
}