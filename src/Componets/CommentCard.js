import React from 'react';
import './../Assets/Styles/comment-card.css';

const CommentCard = ({ body, user_data, created_at }) => {
const date = new Date(created_at);
const formattedDate = date.toLocaleDateString();

return (
  
<div className="comment-card">
<div className="comment-card-avatar"></div>
<h3 className="comment-name">{user_data?.firstname} {user_data?.lastname}</h3>
<p className="comment-body">{body}</p>
<p className="comment-date">{formattedDate}</p>
</div>
);
};

export default CommentCard;





