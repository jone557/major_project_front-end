import StatCard from "../../Componets/stat-card";
import SearchBar from "../../Componets/search-bar";
import Table from "../../Componets/table"

const MainDashboard = ()=>{
    return(
        <main>
            <div className="admin_main_container">
                
                <section >
                    <div className="cards_container">
                        <StatCard/>
                        <StatCard/>
                        <StatCard/>
                        <StatCard/>
                    </div>
     
                    {/* <Table /> */}
                </section>
            </div>
        </main>
    )
}

export default MainDashboard;