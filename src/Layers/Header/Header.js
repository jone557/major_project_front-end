
import {IoIosArrowDroprightCircle} from 'react-icons/io'
import HeaderPoster from '../../Assets/Images/H-poster.png'
import { Link } from 'react-router-dom'

const Header = ()=>{
    return(
        <header>  
            <div className="header_container margin_section">
                <div className="header_left">
                    <h1 className="headline">Make your development faster</h1>
                    <p>EYN Component library offers a comprehensive suite of React UI components to help you build your webapp with ease and faster. Start with EYN React Component library access
                         our fully-loaded component library, or bring your own design system to our production-ready components.</p>
                    <Link to="/components" className="btn center_center">Expore Components <span className='icon'><IoIosArrowDroprightCircle/></span></Link>
                </div>
                <div className="header_right">
                    <img src={HeaderPoster} alt="" />
                </div>
            </div>
        </header>
    )
}

export default Header
