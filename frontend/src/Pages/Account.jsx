import { Typography, Box, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserAccountComp from "../Components/UserAccountComp";
import BlogsComp from "../Components/BlogsComp";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { DialogsProvider } from "@toolpad/core/useDialogs";

function Account() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [allBlogs, setAllBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [image, setimage] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");

  const fetchBlogs = () => {
    const userName = localStorage.getItem("username");
    const userEmail = localStorage.getItem("email");
    axios
      .get(`${BACKEND_URL}/getUserData`, {
        params: { userName, userEmail },
      })
      .then((res) => {
        const { allBlogPosts } = res.data;
        setAllBlogs(allBlogPosts);
        setimage(res.data.image);
        setTimeout(() => setIsLoading(false), 1000);
      })
      .catch((err) => {
        console.log("Didn't get data of user from backend", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs(); // Fetch data when the component mounts
    setfirstname(localStorage.getItem("firstName"));
    setlastname(localStorage.getItem("lastName"));
    setemail(localStorage.getItem("email"));
  }, []);

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 3fr" },
        gap: "1rem",
        paddingTop: "6rem",
        height: {
          xs: "auto",
          sm: "100vh",
        },
      }}
    >
      <DialogsProvider>
        <UserAccountComp />
      </DialogsProvider>
      <Box>
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            color: (theme) =>
              theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
          }}
        >
          My Blogs
        </Typography>

        {isLoading ? ( // Show loader while loading
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5rem",
            }}
          >
            <CircularProgress sx={{ marginTop: "6rem" }} />
          </Box>
        ) : allBlogs?.length === 0 ? (
          <Box
            sx={{ display: "grid", placeItems: "center", marginTop: "10rem" }}
          >
            <Typography
              variant="h5"
              color="color.secondary"
              sx={{ textAlign: "center" }}
            >
              No blogs found
            </Typography>
            <Link to="/createBlog" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                sx={{ width: { xs: "20rem", sm: "13rem" }, marginTop: "1rem" }}
                color="primary"
                fullWidth
              >
                Create your first Blog
              </Button>
            </Link>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: "1rem",
              height: {
                xs: "auto",
                sm: "75vh",
              },
              padding: "2rem",
              overflowY: { xs: "auto", sm: "scroll" },
              overflowX: "hidden",
            }}
          >
            <DialogsProvider>
              {allBlogs
                .slice()
                .reverse()
                .map((blog, index) => (
                  <BlogsComp
                    key={index}
                    isAccountBlog={true}
                    blogKey={index}
                    username={blog.username}
                    firstname={firstname}
                    lastname={lastname}
                    email={email}
                    title={blog.title}
                    desc={blog.desc}
                    fetchBlogs={fetchBlogs}
                    profileImageUrl={image}
                    imageUrl={blog.imageUrl}
                    createdAt={format(new Date(blog.createdAt), "d MMM yyyy")}
                  />
                ))}
            </DialogsProvider>
          </Box>
        )}
      </Box>
    </Box>
  );
}
export default Account;
