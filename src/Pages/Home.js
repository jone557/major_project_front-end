import Navbar from '../Layers/Nav/Navbar';
import Header from '../Layers/Header/Header';
import Main from '../Layers/Main/Main-home';
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../Features/Auth/authSlice"
import { Link } from "react-router-dom";

function Home() {


  return <>

    <Header />
    <Main/>
  </>
}

export default Home;