import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  TextareaAutosize,
  Typography,
  Snackbar,
  Alert,
  CircularProgress, // Import CircularProgress
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false); // Add loading state
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem("username");
    const userEmail = localStorage.getItem("email");
    axios
      .get(`${BACKEND_URL}/getUserData`, {
        params: { userName, userEmail },
      })
      .then((res) => {
        const { firstName, lastName } = res.data;
        setfirstName(firstName);
        setlastName(lastName);
      })
      .catch((err) => {
        console.log("Didn't get data of user from backend", err);
      });
  }, [BACKEND_URL]);

  function createBlog(e) {
    e.preventDefault();

    if (title.trim() === "" || desc.trim() === "") {
      setSnackbarMessage("Please enter title and description");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true); // Show the spinner

    let formData = new FormData();
    formData.append("username", localStorage.getItem("username"));
    formData.append("email", localStorage.getItem("email"));
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("image", image);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);

    axios
      .post(`${BACKEND_URL}/createBlog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setTitle("");
        setDesc("");
        setImage(null);
        setSnackbarMessage("Blog created successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        setTimeout(() => {
          setLoading(false); // Hide the spinner
          navigate("/blogs");
        }, 1500);
      })
      .catch((err) => {
        if (
          err.response.data.message ===
          "Blog title already exists for this user"
        ) {
          setSnackbarMessage("Blog title already exists");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
        console.log("Error during blog creation:", err);
        setLoading(false); // Hide the spinner in case of error
      });
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
        flexDirection: "column",
        padding: { xs: "0 2rem", sm: "0 20rem" },
        gap: "2rem",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
        }}
      >
        Create Blog
      </Typography>
      <Input
        placeholder="Enter Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ width: "100%", fontSize: "1.5rem" }}
      />
      <TextareaAutosize
        minRows={6}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Enter Blog Description"
        style={{
          width: "100%",
          padding: "1rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "1rem",
          background: "transparent",
        }}
      />

      {image && (
        <Box
          sx={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }}
          />
        </Box>
      )}
      <Button
        sx={{
          height: "100%",
          width: "100%",
          cursor: "pointer",
          color: (theme) =>
            theme.palette.mode === "light" ? "black" : "white",
        }}
        variant="outlined"
      >
        <label
          htmlFor="file-upload"
          style={{ cursor: "pointer", width: "100%" }}
        >
          <AttachFileIcon />
          {image ? (
            <Typography variant="p">Upload different Image</Typography>
          ) : (
            <Typography variant="p">Upload Image</Typography>
          )}
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: "none" }}
          />
        </label>
      </Button>

      <Box sx={{ display: "flex", gap: "2rem", width: "100%" }}>
        <Button
          variant="contained"
          onClick={createBlog}
          sx={{ width: "100%", position: "relative" }}
          disabled={loading} // Disable the button when loading
        >
          {loading ? (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                color: "#00bcd4",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          ) : (
            "Post"
          )}
        </Button>
        <Button
          variant="outlined"
          sx={{ width: "100%" }}
          onClick={() => {
            setTitle("");
            setDesc("");
            setImage(null);
          }}
        >
          Clear
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CreateBlog;
