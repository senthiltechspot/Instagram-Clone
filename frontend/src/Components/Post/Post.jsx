import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
  Modal,
  Box,
  Grid,
  TextField,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Comments from "./Comments";
import { Waypoint } from "react-waypoint";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { RWebShare } from "react-web-share";

const cookies = new Cookies();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Post = ({
  image,
  title,
  likes,
  comments,
  id,
  createdAt,
  userId,
  setRefresh,
  isRefresh,
}) => {
  const navigate = useNavigate();

  const [isliked, setIsLiked] = useState(false);
  const [user, setUser] = useState();
  const [text, setText] = useState(null);
  const [open, setOpen] = useState(false);
  const [opensnack, setOpensnack] = useState(false);
  const [imageFile, setImageFile] = useState(false);
  const [videoFile, setVideoFile] = useState(false);

  // Image/Video File
  const videoRef = useRef();
  const [stop, setStop] = useState(false);
  const handleVideo = () => {
    setStop(!stop);
    if (stop === true) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };
  const handleStopVideo = () => {
    videoRef.current.pause();
  };

  // For Modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const LogUser = cookies.get("userId");

  let date = createdAt.split("T");

  useEffect(() => {
    const FetchUser = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/user/${userId}`,
        {
          headers: {
            Authorization: `${cookies.get("Token")}`,
          },
        }
      );
      setUser(response.data);
      const CheckWeatherIsLiked = () => {
        let like = likes.filter((item) => {
          return item === LogUser;
        });

        if (like.length > 0) {
          setIsLiked(true);
        }
        const extension = getFileExtension(image);
        if (extension === "jpg" || extension === "png" || extension === "gif") {
          setImageFile(true);
          setVideoFile(false);
        }
        if (extension === "webm" || extension === "mp4") {
          setVideoFile(true);
          setImageFile(false);
        }
      };
      CheckWeatherIsLiked();
    };

    FetchUser();
  }, [userId, LogUser, image, likes]);

  function getFileExtension(filename) {
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
  }

  // For Comment a Post
  const postaComment = (postid) => {
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API}/api/posts/${postid}/comment`,
      data: {
        text: text,
      },
      headers: {
        Authorization: `${cookies.get("Token")}`,
      },
    };

    const handleComment = (e) => {
      axios(configuration)
        .then((result) => {
          setRefresh(!isRefresh);
          setText("");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    handleComment();
  };

  // Like a Post
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpensnack(false);
  };
  const handleLike = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/posts/${id}/like`,
        {},
        { headers: { Authorization: `${cookies.get("Token")}` } }
      );
      setIsLiked(true);
      likes.push(LogUser);
    } catch (error) {
      setOpensnack(true);
    }
  };

  if (user) {
    return (
      <Card sx={{ marginBottom: 1.5 }}>
        <CardHeader
          avatar={
            <Avatar
              onClick={() => navigate(`/user/${userId}`)}
              aria-label="recipe"
              src={user ? user.dpURL : ""}
            >
              {user ? (user.name ? user.name[0] : "A") : "A"}
            </Avatar>
          }
          action={
            <RWebShare
              data={{
                url: `https://ig-clone-senthiltechspot.vercel.app/Post/${id}`,
                title: `${title}`,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            </RWebShare>
          }
          title={
            user
              ? user.name
                ? user.name
                : "Username Not Found"
              : "User Not Found"
          }
          subheader={`Posted on: ${date[0]} ${date[1].slice(0, 5)}`}
        />
        {image ? (
          imageFile && (
            <CardMedia
              component="img"
              height="20%"
              image={image}
              alt="Paella dish"
            />
          )
        ) : (
          <Skeleton variant="rectangular" height={300} />
        )}
        {videoFile && (
          <Waypoint onLeave={handleStopVideo}>
            <CardMedia
              onClick={handleVideo}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              height="12rem"
              className="video"
            >
              {image ? (
                <video ref={videoRef} width={"300px"}>
                  <source src={image} type="video/mp4" />
                </video>
              ) : (
                <Skeleton variant="rectangular" height={300} />
              )}
            </CardMedia>
          </Waypoint>
        )}

        <CardContent>
          <Typography display="flex" variant="h6">
            {title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" 
              onClick={() => handleLike(id)}
              >
            <Checkbox
              checked={isliked}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </IconButton>
          {likes.length}
          <IconButton aria-label="share" onClick={handleOpen}>
            <ChatIcon />
          </IconButton>
          {comments.length}
          <RWebShare
            data={{
              url: `https://ig-clone-senthiltechspot.vercel.app/Post/${id}`,
              title: `${title}`,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </RWebShare>
        </CardActions>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid>
              <Grid item display="flex" sx={{ padding: "10px" }}>
                <IconButton aria-label="share" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <Typography variant="h4">Comments</Typography>
              </Grid>

              {comments ? (
                comments.map((comment, i) => (
                  <Comments key={i} comment={comment} />
                ))
              ) : (
                <></>
              )}
            </Grid>
            <Box
              sx={{
                display: "flex",
                position: "fixed",
                bottom: 40,
                gap: "5px",
                background: "white",
              }}
            >
              <TextField
                id="outlined-search"
                label="Comment"
                sx={{ flexGrow: 1 }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button variant="contained" onClick={() => postaComment(id)}>
                Comment
              </Button>
            </Box>
          </Box>
        </Modal>
        <Snackbar
          open={opensnack}
          autoHideDuration={3000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity="info"
            sx={{ width: "100%" }}
          >
            You've Already Liked The Post!
          </Alert>
        </Snackbar>
      </Card>
    );
  }
};

export default Post;
