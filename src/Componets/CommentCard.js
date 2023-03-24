import React from 'react';
import './../Assets/Styles/comment-card.css';
import defaultAvatar from '../Assets/Images/img_avatar.png'

const CommentCard = ({ body, user_data, created_at, filename }) => {
const date = new Date(created_at);
const formattedDate = date.toLocaleDateString();

const imgValue = filename? `http://127.0.0.1:8000/storage/images/${filename}` : null
return (
  
<div className="comment-card">
<div className="comment-card-avatar"><img src={imgValue || defaultAvatar} className='nav_img' alt="profile" /></div>
<h3 className="comment-name">{user_data?.firstname} {user_data?.lastname}</h3>
<p className="comment-body">{body}</p>
<p className="comment-date">{formattedDate}</p>
</div>
);
};

export default CommentCard;





