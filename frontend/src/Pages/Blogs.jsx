import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
} from "@mui/material";
import { DialogsProvider } from "@toolpad/core/useDialogs";
import axios from "axios";
import { alpha } from "@mui/material/styles";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import BlogsComp from "../Components/BlogsComp";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Blogs() {
  const theme = useTheme();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const isMobileView = useMediaQuery("(max-width: 400px)");
  const isTabView = useMediaQuery("(min-width: 401px) and (max-width: 800px)");
  const isDesktopView = useMediaQuery("(min-width: 801px)");
  const [viewSize, setViewSize] = useState(3);

  useEffect(() => {
    if (isMobileView) {
      setViewSize(1);
    } else if (isTabView) {
      setViewSize(2);
    } else if (isDesktopView) {
      setViewSize(3);
    }
  });

  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const applyFilters = (blogs) => {
    let filtered = blogs.filter((b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter === "newest") {
      filtered = filtered.slice().reverse();
    }

    return filtered;
  };

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/allBlogs`)
      .then((res) => {
        setBlogs(res.data);
        setLoading(false); // Stop loading once blogs are  fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading even if there's an error
      });
  }, [BACKEND_URL]);

  // Handle pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = applyFilters(blogs).slice(
    indexOfFirstBlog,
    indexOfLastBlog
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };

  const handleCreateBlogClick = () => {
    const isLoggedIn = localStorage.getItem("isLogin");

    if (isLoggedIn === "true") {
      navigate("/createBlog");
    } else {
      navigate("/register");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: {
          xs: ".5rem",
          sm: "1rem",
          md: "2rem",
        },
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 10%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          gridTemplateAreas: {
            xs: `
                  "title"
                  "createBlog"
                  "search"
                  "filter"
                `,
            md: `
                  "createBlog title search filter"
                `,
          },
          gridTemplateColumns: {
            xs: "1fr",
            md: "auto 1fr auto auto",
          },
          gridTemplateRows: {
            xs: "auto auto auto auto",
            md: "auto",
          },
          gap: "1rem",
          alignItems: "center",
          width: "100%",
          marginTop: "7rem",
          marginBottom: "2rem",
        }}
      >
        <Button
          onClick={handleCreateBlogClick}
          sx={{ width: "13rem", gridArea: "createBlog" }}
          variant="outlined"
        >
          Create your blog
        </Button>

        <Typography
          variant="h1"
          sx={{
            gridArea: "title",
            textAlign: "center",
            fontSize: { xs: "2.5rem", md: "3rem" },
          }}
        >
          All Blogs
        </Typography>

        <Input
          type="search"
          sx={{
            gridArea: "search",
            width: { xs: "90%", md: 300 },
            marginTop: { xs: 3, md: 0 },
          }}
          placeholder="Search Blogs by Title"
          onChange={handleSearch}
        />

        <FormControl
          sx={{
            gridArea: "filter",
            marginTop: { xs: 2, md: 0 },
            width: { xs: "90%", md: 150 },
          }}
          size="small"
        >
          <InputLabel id="demo-select-small-label">Sort</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={filter}
            label="Sort"
            onChange={changeFilter}
          >
            <MenuItem value={"newest"}>Newest</MenuItem>
            <MenuItem value={"oldest"}>Oldest</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <>
          {currentBlogs.length === 0 && (
            <Box
              sx={{
                width: "93vw",
                display: "grid",
                placeItems: "center",
                marginTop: "3rem",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  color: (theme) =>
                    theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
                }}
              >
                No Blogs Found
              </Typography>
            </Box>
          )}
          <DialogsProvider>
            <ImageList variant="masonry" cols={viewSize} gap={20}>
              {currentBlogs.map((blog, i) => (
                <ImageListItem key={i}>
                  <BlogsComp
                    blogKey={i}
                    username={blog.username}
                    firstname={blog.firstName}
                    lastname={blog.lastName}
                    email={blog.email}
                    title={blog.title}
                    desc={blog.desc}
                    imageUrl={blog.imageUrl}
                    profileImageUrl={blog.profileImageUrl}
                    createdAt={format(new Date(blog.createdAt), "d MMM yyyy")}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </DialogsProvider>

          <Stack spacing={2} sx={{ marginTop: "2rem", alignItems: "center" }}>
            <Pagination
              count={Math.ceil(applyFilters(blogs).length / blogsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </>
      )}
    </Box>
  );
}

export default Blogs;
