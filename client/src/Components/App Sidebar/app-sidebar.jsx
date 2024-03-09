import SideBar from "./Sidebar";

export default function Web({ child }) {

  return (
    <div className="flex">
      <SideBar />
      {child}
    </div>
  )
}