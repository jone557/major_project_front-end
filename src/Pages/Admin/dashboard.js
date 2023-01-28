import MainDashboard from "../../Layers/Main/Main-dashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {showStats} from "../../Features/Dashboard/dashboardSlice";
import StatsContainer from "../../Componets/StatsContainer";
import ChartsContainer from "../../Componets/ChartsContainer";
import LimitedList from "../../Componets/LimitedList";

const Dashboard = ()=>{
    // const {isLoading} = useSelector((state)=> state.dashboard)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(showStats())
    }, [])    

    return<>
    <div className="admin_main_container">
        <StatsContainer/>
        {/* {stats.length > 0 && <ChartsContainer/>} */}
        {/* <ChartsContainer/> */}

        {<LimitedList/>}

        {/* <MainDashboard/> */}
    </div>

    </>
}

export default Dashboard;