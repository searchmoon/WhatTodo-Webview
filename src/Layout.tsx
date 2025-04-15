import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="w-full flex flex-col h-screen px-4 py-4">
      <Outlet />
    </div>
  );
}

export default Layout;
