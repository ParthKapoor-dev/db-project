import SideBar from "./Sidebar";

export default function Web({ child }) {

  return (
    <div className="flex ">
      <SideBar />
      <div className='ml-[18.8vw] max-w-[80vw] box-border'>
        {child}
      </div>
    </div>
  )
}