import { Outlet } from "react-router-dom";

function ProfileLayout() {
  return (
    <>
      <nav></nav>
      <Outlet />
    </>
  );
}

export default ProfileLayout;
