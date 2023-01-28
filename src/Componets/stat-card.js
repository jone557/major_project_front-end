import '../Assets/Styles/admin-card.css'
import {BsArrowUpRight} from 'react-icons/bs'
const StatCard = ({userCount})=>{
    return (
        <div className="row card admin_card gap-1">
            <div className="col">
                <article>
                    <h3>Cateory {userCount}</h3>
                    <p>Total</p>
                    <h3>59</h3>
                </article>
            </div>
            <div className="col">
                <div><BsArrowUpRight/></div>
                graph
            </div>
        </div>
    )
}

export default StatCard;