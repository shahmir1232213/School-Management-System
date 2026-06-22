import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import "./home.css";

const Home: React.FC = () => {
  const [sideBarFlag] = useState(true);

  return (
    <div className="home-layout">
      {sideBarFlag ? (
        <div className="sideBar">
          <SideBar />
        </div>
      ) : null}
      <div className="child">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
