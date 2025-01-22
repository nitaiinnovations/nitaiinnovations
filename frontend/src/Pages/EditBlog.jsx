import {
  Box,
  Button,
  Input,
  TextareaAutosize,
  Typography,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function EditBlog() {
  const navigate = useNavigate();
  const theme = useTheme();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const blog = JSON.parse(localStorage.getItem("currentBlog") || "{}");
    setTitle(blog.title);
    setDesc(blog.desc);
    setImage(blog.image);
  }, []);

  function editBlog() {
    setLoading(true);
    const userName = localStorage.getItem("username");
    const userEmail = localStorage.getItem("email");
    const currentTitle = JSON.parse(
      localStorage.getItem("currentBlog") || "{}"
    ).title;
    const currentDesc = JSON.parse(
      localStorage.getItem("currentBlog") || "{}"
    ).desc;
    const currentImageUrl = JSON.parse(
      localStorage.getItem("currentBlog") || "{}"
    ).imageUrl;

    if (title === "" || desc === "") {
      setSnackbarMessage("Please enter title and description");
      setSnackbarSeverity("warning"); // Show warning Snackbar
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }
    if (
      title === currentTitle &&
      desc === currentDesc &&
      image.name === currentImageUrl
    ) {
      setSnackbarMessage("No changes made");
      setSnackbarSeverity("warning"); // Show warning Snackbar
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }

    let formData = new FormData();
    formData.append("username", userName);
    formData.append("email", userEmail);
    formData.append("changetitle", title);
    formData.append("currentTitle", currentTitle);
    formData.append("changedesc", desc);
    if (image) {
      formData.append("image", image);
    }

    axios
      .patch(`${BACKEND_URL}/editBlog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSnackbarMessage("Blog successfully edited!");
        setSnackbarSeverity("success"); // Show success Snackbar
        setSnackbarOpen(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/account");
        }, 1500);
      })
      .catch((err) => {
        setSnackbarMessage("Failed to edit blog. Please try again.");
        setSnackbarSeverity("error"); // Show error Snackbar
        setSnackbarOpen(true);
        setLoading(false);
      });
  }

  function resetBlog() {
    const blog = JSON.parse(localStorage.getItem("currentBlog") || "{}");
    setTitle(blog.title);
    setDesc(blog.desc);
    setImage(blog.image);
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const inputStyles = {
    width: { xs: "100%", sm: "100%" },
    fontSize: "1.5rem",
  };

  const textAreaStyles = {
    width: "100%",
    backgroundColor: theme.palette.mode === "dark" ? "transparent" : "#fff",
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
    fontSize: "1rem",
    fontWeight: "400",
    padding: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const fileInputStyles = {
    display: "none",
  };

  const fileInputLabelStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: theme.palette.mode === "dark" ? "#333" : "#f5f5f5",
    borderRadius: "4px",
    border: "1px solid #ccc",
    padding: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "400",
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
    gap: "0.5rem",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#555" : "#e0e0e0",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: { xs: "0 2rem", sm: "0 20rem" },
        gap: "2rem",
        marginTop: "3rem",
        marginBottom: "5rem",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
        }}
      >
        Edit Blog
      </Typography>
      <Input
        placeholder="Enter Blog Title"
        sx={inputStyles}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextareaAutosize
        minRows={6}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Enter Blog Description"
        style={textAreaStyles}
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
            <Typography variant="p">Upload different Image</Typography>
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
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: { xs: "100%", sm: "100%" },
          gap: "1rem",
          marginTop: "1rem",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "100%", position: "relative" }}
          onClick={editBlog}
          disabled={loading} // Disable button while loading
        >
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: "#00bcd4", // Light blue color
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: "-12px",
                marginTop: "-12px",
              }}
            />
          )}
          {loading ? "Submitting..." : "Submit"}
        </Button>
        <Button variant="outlined" sx={{ width: "100%" }} onClick={resetBlog}>
          Reset
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity} // Set severity dynamically
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default EditBlog;
