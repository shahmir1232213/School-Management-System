import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

import './home.css'
const Home: React.FC = () => {
  const [sideBarFlag, setSideBarFlag] = useState<boolean>(true);
  return (
        <div className='home-layout'>
         
          {sideBarFlag && (
            <div className='sideBar'>
              <SideBar />
            </div>
          )}
          <div className='child'>
            <Outlet />
          </div>
        </div>
  );
};

export default Home;
