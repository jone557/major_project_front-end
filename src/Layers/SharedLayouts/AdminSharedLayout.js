import {Outlet } from 'react-router-dom';
import AdminSidebar from '../Side bar/Admin-sidebar';

const AdminSharedLayout = () => {
  return (
    <>
        <AdminSidebar/>
        <Outlet />
        
    </>
  );
};
export default AdminSharedLayout;
