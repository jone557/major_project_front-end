import {Outlet } from 'react-router-dom';
import SideBar from '../Side bar/SideBar';

const ComponentSharedLayout = () => {
  return (
    <>
        <SideBar/>
        <Outlet />
        
    </>
  );
};
export default ComponentSharedLayout;
