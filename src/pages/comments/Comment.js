import React from "react";
import styles from "../../styles/Comment.module.css";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";

const Comment = ({
  profile_id,
  profile_image,
  owner,
  updated_at,
  content,
  id,
  setComments,
  setPost,
}) => {
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const handleDelete = async () => {
    try {
      axiosReq.delete(`/comments/${id}`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner} </span>
          <span className={styles.Date}>{updated_at}</span>

          <p>{content}</p>
        </Media.Body>
        {is_owner && (
          <MoreDropdown handleDelete={handleDelete} handleEdit={() => {}} />
        )}
      </Media>
    </div>
  );
};

export default Comment;
