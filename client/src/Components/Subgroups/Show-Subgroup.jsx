import { useEffect, useState } from "react";
import { CurrentMode } from "../../../currentMode";
import { useLocation } from "react-router";
import useUserContext from "../../hooks/useUserContext";

export default function ShowSubgroups() {

  const [group, setGroup] = useState([]);
  const { token } = useUserContext();
  const location = useLocation();
  const groupId = location.state.groupId;

  useEffect(() => {

    const url = CurrentMode.url + '/get-subgroup/' + groupId;
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
      } else {
        console.error(json);
      }
    };

    if (token || groupId) fetchGroup();

  }, [ token])

  return (
    <div>
      {group.length !== 0 ? (
        <div>
          {group.students.map(item => (
            <Student item={item} key={item.id} />
          ))}
        </div>
      ) : (
        "Loading"
      )}
    </div>
  )
}



function Student({ item }) {

  console.log(item);
  return (
    // { item }
    "studnet"
  )
}