import React from 'react'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import '../Assets/Styles/profile_card.css'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'

const user = ({id, firstname, lastname, role, email, github, linkedin, created_at}) => {
// const date = moment(created_at.format('MMM Do, YYYY'))
const date = moment(created_at).format("MMM Do YY"); 
  return (
    <div className="wrapper align_items_c">
      <header className='align_items_c justify_content_sb'>
        <div className="main-icon">{firstname.charAt(0).toUpperCase()}</div>
        <div className="info">
          <h4>{firstname.charAt(0).toUpperCase() + firstname.slice(1) + ' ' + lastname.charAt(0).toUpperCase() + lastname.slice(1)}</h4>
          <p>{role}</p>
        </div>
            <p>{date}</p>
      </header>
      <hr />
      <div className="content ">
        <h4>More content</h4>
        <div className="center_center justify_content_sb ">
          <div>
            <button className='btn deactivate-btn' 
                onClick={()=> console.log('deactivate user')}>Deactivate
            </button>
          </div>
          <div className="social-link">
            <div>              
              <div>{github}<a href=""><AiFillGithub/></a></div>
            </div>
            <div>
            <div>{linkedin}<a href=""><AiFillLinkedin/></a></div>
            </div>
          </div>
        </div>
        {/* <footer>
          <div className="actions">
            <button className='btn deactivate-btn' 
            onClick={()=> console.log('deactivate user')}>Deactivate
            </button>
          </div>
        </footer> */}
      </div>
    </div>
  )
}

export default user