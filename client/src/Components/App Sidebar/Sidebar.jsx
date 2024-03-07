import { Link } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";
import "./sidebar.css"

export default function SideBar({ }) {

  const { user } = useUserContext();

  return (
    <div className="flex flex-col bg-xdarkbl w-[20vw] text-lg text-white h-[100vh] px-8 py-6">
      <div className="mb-6 text-2xl font-semibold">
        ECE Webkiosk
      </div>

      <div id="routes" className="flex flex-col text-slate-400 gap-2">
        <Link to={'/home'} className="">
          Home
        </Link>

        <Link to={'/home'}>
          Capstone
        </Link >

        <Link to={'/home'}>
          Sub Groups
        </Link>

        <Link to={'/subgroups/update'}>
          Update Sub Groups
        </Link>

        <Link>
          Settings
        </Link>
      </div>

      <div className="bottom-4 absolute py-4 hover:bg-slate-800 px-2 w-40 rounded">
        {user.name}
      </div>
    </div>
  )
}