import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardHeader,
  Card,
  CardContent,
  Avatar,
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
  Snackbar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

//import ReactDOM from "react-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    textAlign: "left",
    margin: 20,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
}));

function PostForm(props) {
  const { userId, userName, refreshPost } = props;
  const classes = useStyles();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);

  const savePost = () => {
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .then((err) => console.log(err));
  };

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPost();
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSent(false);
  };

  return (
    <div className="postContainer">
      <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Gönderi paylaşıldı!
        </Alert>
      </Snackbar>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Link className={classes.link} to={"/users/" + userId}>
              <Avatar aria-label="recipe" className={classes.avatar}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={
            <OutlinedInput
              id="outlined-adornment-amount"
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 25 }}
              fullWidth
              value={title}
              onChange={(i) => handleTitle(i.target.value)}
            ></OutlinedInput>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {
              <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                placeholder="Text"
                inputProps={{ maxLength: 350 }}
                fullWidth
                value={text}
                onChange={(i) => handleText(i.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      style={{
                        background:
                          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        color: "white",
                      }}
                      onClick={handleSubmit}
                    >
                      Paylaş
                    </Button>
                  </InputAdornment>
                }
              ></OutlinedInput>
            }
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostForm;
