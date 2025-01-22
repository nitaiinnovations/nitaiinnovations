import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Typography,
  useTheme,
  IconButton,
  Button,
  Skeleton,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { format } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { DialogsProvider, useDialogs } from "@toolpad/core/useDialogs";

const BlogsComp = ({
  blogKey,
  username,
  firstname,
  lastname,
  email,
  title,
  fetchBlogs,
  desc,
  imageUrl = "",
  createdAt,
  profileImageUrl,
  isAccountBlog = false,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const dialogs = useDialogs();
  const [fullName, setfullName] = useState(firstname + " " + lastname);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openReadMoreDialog, setOpenReadMoreDialog] = useState(false);

  const handleReadMoreDialogOpen = () => {
    setOpenReadMoreDialog(true);
  };

  const handleReadMoreDialogClose = () => {
    setOpenReadMoreDialog(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  function editBlog() {
    let blogInfo = {
      title: title,
      desc: desc,
      imageUrl: imageUrl,
    };
    localStorage.setItem("currentBlog", JSON.stringify(blogInfo));
    navigate("/editBlog");
  }

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const deleteBlog = async () => {
    const userEmail = localStorage.getItem("email");

    setLoading(true);

    axios
      .delete(`${BACKEND_URL}/deleteBlog`, {
        data: {
          email: userEmail,
          title: title,
        },
      })
      .then((res) => {
        setSnackbarMessage("Blog deleted successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        fetchBlogs();
      })
      .catch((err) => {
        setSnackbarMessage("Failed to delete blog");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      })
      .finally(() => {
        setLoading(false);
        setOpenDialog(false);
      });
  };

  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
    }
  }, [reloadPage]);

  const defaultProfileImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <DialogsProvider>
      <Box
        key={blogKey}
        sx={{
          ...blogCardStyle(theme),
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        {!isAccountBlog && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
            }}
          >
            <Box>
              <img
                src={profileImageUrl ? profileImageUrl : defaultProfileImage}
                style={{
                  height: "4rem",
                  width: "4rem",
                  objectFit: "contain",
                  borderRadius: "100rem",
                  transition: "opacity 0.3s ease-in-out",
                }}
                alt="Profile image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultProfileImage;
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                overflow: "hidden",
                flexDirection: "column",
                ml: 1,
              }}
            >
              <Typography variant="p">
                {fullName || <Skeleton width={120} />}
              </Typography>
              <Typography
                variant="p"
                sx={{ fontSize: "100% !important" }}
                color="text.secondary"
              >
                {email || <Skeleton width={160} />}
              </Typography>
              <Typography sx={{ fontSize: ".8rem !important" }}>
                {format(new Date(createdAt), "d MMM yyyy")}
              </Typography>
            </Box>
          </Box>
        )}

        {isAccountBlog && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6">
              Date: {format(new Date(createdAt), "d MMM yyyy")}
            </Typography>
            <Box>
              <IconButton aria-label="edit" onClick={editBlog}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleDeleteClick}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        )}

        <Divider />

        {imageUrl && (
          <>
            <Skeleton
              variant="rectangular"
              width="80%"
              height="18rem"
              sx={{
                borderRadius: ".5rem",
                mx: "auto",
                display: imageLoaded ? "none" : "block",
              }}
            />
            <Box
              sx={{
                display: imageLoaded ? "grid" : "none",
                placeItems: "center",
              }}
            >
              <img
                src={imageUrl}
                style={{
                  height: "100%",
                  maxHeight: "18rem",
                  width: "80%",
                  objectFit: "contain",
                  borderRadius: ".5rem",
                  opacity: imageLoaded ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
                alt="Blog image"
                onLoad={handleImageLoad}
              />
            </Box>
          </>
        )}

        <Box>
          <Typography
            variant="h2"
            sx={{ mb: 2, fontSize: "1.8rem !important" }}
          >
            {title?.length > 35
              ? `${title.slice(0, 35)}...`
              : title || <Skeleton width="80%" height={80} />}
          </Typography>
          <Typography
            variant="p"
            color="text.secondary"
            sx={{
              wordWrap: "break-word",
            }}
          >
            {imageUrl === ""
              ? desc?.length > 500
                ? `${desc.slice(0, 500)}...`
                : desc || <Skeleton width="100%" height={80} />
              : desc?.length > 150
                ? `${desc.slice(0, 150)}...`
                : desc || <Skeleton width="100%" height={80} />}
          </Typography>
        </Box>
        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          onClick={handleReadMoreDialogOpen}
        >
          Read more
        </Button>
        <Dialog
          open={openReadMoreDialog}
          onClose={handleReadMoreDialogClose}
          aria-labelledby="read-more-dialog-title"
          fullWidth
          maxWidth="md"
          BackdropProps={{
            style: {
              backdropFilter: "blur(10px)", // Apply blur effect
              backgroundColor: "rgba(0, 0, 0, 0.6)", // Adjust opacity and color
            },
          }}
        >
          <DialogTitle
            id="read-more-dialog-title"
            component="div"
            sx={{
              position: "relative",
              display: "grid",
              placeItems: "center",
              padding: "1rem", // Adjust padding as needed
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "2.5rem !important",
                paddingRight: "2.2rem",
              }}
            >
              {title}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleReadMoreDialogClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "text.primary",
              }}
            >
              <CloseIcon
                sx={{
                  fontSize: "2.2rem",
                  color: (theme) =>
                    theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
                }}
              />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ padding: { xs: "1rem", lg: "2rem" } }}>
            {imageUrl && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <img
                  src={imageUrl}
                  alt="Blog image"
                  style={{
                    height: "auto",
                    maxHeight: "20rem",
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: ".5rem",
                  }}
                />
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                mb: 2,
              }}
            >
              <Box>
                <img
                  src={profileImageUrl ? profileImageUrl : defaultProfileImage}
                  style={{
                    height: "4rem",
                    width: "4rem",
                    objectFit: "cover",
                    transition: "opacity 0.3s ease-in-out",
                  }}
                  alt="Profile image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultProfileImage;
                  }}
                />
              </Box>
              {isMobileView ? (
                <Box
                  sx={{
                    display: "flex",
                    overflow: "hidden",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body1">
                    {fullName || <Skeleton width={120} />}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "100% !important" }}
                  >
                    {email || <Skeleton width={160} />}
                  </Typography>
                  <Typography variant="caption">
                    {format(new Date(createdAt), "d MMM yyyy")}
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      overflow: "hidden",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="body1">
                      {fullName || <Skeleton width={120} />}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "100% !important" }}
                    >
                      {email || <Skeleton width={160} />}
                    </Typography>
                  </Box>
                  <Typography variant="caption">
                    {format(new Date(createdAt), "d MMM yyyy")}
                  </Typography>
                </Box>
              )}
            </Box>

            <Divider />
            <Divider />
            <Divider />

            <Typography variant="h2" gutterBottom sx={{ marginTop: "2rem" }}>
              <Box sx={{ whiteSpace: "pre-wrap" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  {desc || <Skeleton width={600} />}
                </Typography>
              </Box>
            </Typography>
          </DialogContent>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="delete-dialog-title"
        >
          <DialogTitle id="delete-dialog-title">
            {loading ? "Deleting Blog" : "Confirm Deletion"}
          </DialogTitle>
          <DialogContent>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Typography>
                Are you sure you want to delete the blog titled "{title}"? This
                action cannot be undone.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            {!loading && (
              <>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={deleteBlog} color="error">
                  Delete
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </DialogsProvider>
  );
};

const blogCardStyle = (theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: ".5rem",
  border: `1px solid ${theme.palette.divider}`,
  padding: "1rem",
  borderRadius: "1.5rem",
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  height: "auto",
});

export default BlogsComp;
