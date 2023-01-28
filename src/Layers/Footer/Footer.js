import {socialLinks} from '../../Assets/Data/data'


const Footer = ()=>{
    return <>
        <footer>
            <div className="footer_contaier margin_section margin_top_4">
                <div className="footer_left">
                    <p>&#169; Copyright {new Date().getFullYear()}</p>
                </div>
                <div className="footer_right">
                    <div className="social_links">
                        <ul>
                            {
                                socialLinks.map((link)=>{
                                return(
                                    <li key={link.id}><a target={'_blank'} className="icon" href={link.url}> {link.icon}</a></li>
                                )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    <script async src="//jsfiddle.net/zh4593oL/1/embed/js,css,result/dark/?fontColor=red"></script>
    </>
}

export default Footer;