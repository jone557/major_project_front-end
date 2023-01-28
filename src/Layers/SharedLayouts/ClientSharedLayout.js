import {Outlet, } from 'react-router-dom';
import Navbar from '../Nav/Navbar';
import Footer from '../Footer/Footer';

const ClientSharedLayout = () => {

  return (
    <>
        <Navbar/>
        <Outlet />
        <Footer/>
    </>
  );
};
export default ClientSharedLayout;
