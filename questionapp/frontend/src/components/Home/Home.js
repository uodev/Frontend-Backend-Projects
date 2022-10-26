import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import "./Home.scss";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Home() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPost = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refreshPost();
  }, [postList]);

  if (error) {
    return <div>Error !!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container fixed className={classes.container}>
        <PostForm userId={1} userName={"aaa"} refreshPost={refreshPost} />
        {postList.map((post) => (
          <Post
            likes={post.postLikes}
            postId={post.id}
            title={post.title}
            text={post.text}
            userId={post.userId}
            userName={post.userName}
          ></Post>
        ))}
      </Container>
    );
  }
}

export default Home;
