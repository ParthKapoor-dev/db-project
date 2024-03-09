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
      } else {
        console.error(json);
      }
    };

    if (token || groupId) fetchGroup();

  }, [token])

  return (
    !Loading ? (
      <div className="flex flex-col px-10 py-6 items-center w-[80vw]">
        <div className="text-2xl font-semibold">
          Sub Group : {group.name}
        </div>
        <div className="bg-lighterbl text-white rounded py-2 w-[70vw]">

          <div className="px-6 h-15 flex items-center justify-between py-4">

            <input type="text" className="bg-lighterbl text-lg border-2 border-slate-600  px-2 focus-visible:outline-0 rounded py-1" placeholder="Search Students" />

            <div className="flex gap-6 ">
              <select name="" id="" className="bg-lighterbl text-lg border-2 border-slate-600  px-2 w-[10vw] focus-visible:outline-0 rounded py-1">
                <option value="name" className="py-2">Name</option>
                <option value="rollno">Roll No</option>
                <option value="marks">Marks</option>
              </select>

              <AddStudent />
              </div>
          </div>
          <div className="text-lg py-2 bg-darkbl px-6 flex items-center">

            <div className="w-10">
              #
            </div>

            <div className="w-60">
              NAME
            </div>

            <div className="w-60">
              ROLL NO
            </div>

            <div className="w-40">
              OS
            </div>

            <div className="w-40">
              CP
            </div>

            <div className="w-40">
              ELEC
            </div>

            <div className="w-40">
              CN
            </div>

            <div className="w-40">
              ACTIONS
            </div>

          </div>
          <div className="flex flex-col text-lg">
            {group.students.map((item, index) => (
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
    // <div className="border-b-2 gap-4 flex border-slate-500  px-4 py-2 w-full">

    <div className="text-lg py-2 px-6 border-b-2 border-slate-600 bg-lighterbl bg-darkbl flex items-center">

      <div className="w-10">
        {index}
      </div>

      <div className="w-60">
        {item.name}
      </div>

      <div className="w-60">
        {item.rollno}
      </div>

      <div className="w-40">
        {item.os_marks}
      </div>

      <div className="w-40">
        {item.cp_marks}
      </div>

      <div className="w-40">
        {item.elec_marks}
      </div>

      <div className="w-40">
        {item.cn_marks}
      </div>

      {/* </div> */}
    </div>
  )
}