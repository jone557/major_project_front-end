
const InfoCard = ({data})=>{
    const {id, title, description, icon} = data;
    return<>
        <div className="info_card">
            <h3><span className="icon">{icon}</span> {title}</h3>
            <p className=''>{description}</p>
       </div>
    </>
}

export default InfoCard;