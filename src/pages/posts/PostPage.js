import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

function PostPage() {
  // useParams is a hook provided by the React Router library, which is used for routing in React single-page applications (SPAs). The useParams hook allows you to access the parameters of the current route. React Router uses dynamic segments in the route's path to capture values specified in the URL, and useParams lets you extract these values so you can use them in your component.
  // In the PostPage component, which is rendered when navigating to this route, you can use useParams to extract the id from the URL:
  // <Route exact path="/posts/:id" render={() => <PostPage />} />
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        // await Promise.all([...]) is used to wait for all promises passed in the array to be resolved. Here, although there's only one promise (axiosReq.get(...)), using Promise.all suggests that the pattern is designed to accommodate multiple concurrent requests if needed. This is useful for optimizing loading times by fetching multiple resources in parallel.
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  useEffect(() => {
    // Existing code to fetch and set data
    console.log("First item in results array:", post.results[0]);
  }, [post]); // Add 'post' to the dependency array to log whenever 'post' changes

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        {/* Passing an object as props from a parent component to a childmcomponent:  
        Alternatively, you can spread the object's properties so that each property becomes its own prop on the child component. This approach can make it easier to work with individual properties in the child component, especially if the child only needs to use a few properties from the object.*/}
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <p>Post component</p>
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              next={() => fetchMoreData(comments, setComments)}
              hasMore={!!comments.next}
              loader={<Asset spinner />}
              dataLength={comments.results.length}
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                />
              ))}
            />
          ) : (
            <span>No comments yet, be the first to comment!</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;
