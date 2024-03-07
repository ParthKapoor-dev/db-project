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
        <div>
          <div className="text-2xl mb-4">
            Student Table
          </div>
          <div className="flex flex-col gap-4 text-lg">
            {group.students.map(item => (
              <Student item={item} key={item.name} />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div>
        Loading
      </div>
    )
  )

}



function Student({ item }) {

  console.log(item);
  return (
    <div className="border-2 gap-4 flex border-slate-300 rounded px-4 py-2 w-[50vw]">
      <div>
        {item.name}
      </div>

      <div>
        {item.rollno}
      </div>
    </div>
  )
}