import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  storeEmail,
  storeName,
  storeusername,
  storeLoggedinRecord,
} from "../Store/userSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { CircularProgress, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const loginUser = (e) => {
    e.preventDefault();
    if (email === "" && password === "") {
      setSnackbarMessage("Please enter email and password");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (email === "" || password === "") {
      setSnackbarMessage("Please enter all fields");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    axios
      .post(
        `${BACKEND_URL}/loginUser`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.status === "ok") {
          localStorage.setItem("isLogin", true);
          localStorage.setItem("firstname", res.data.firstname);
          localStorage.setItem("lastname", res.data.lastname);
          localStorage.setItem("username", res.data.name);
          localStorage.setItem("email", res.data.email);
          dispatch(storeName(res.data.name));
          dispatch(storeEmail(res.data.email));
          dispatch(storeusername(res.data.username));
          dispatch(storeLoggedinRecord(true));

          setSnackbarMessage("You have successfully logged in!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);

          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          setSnackbarMessage("Login failed: " + res.data.error);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      })
      .catch((err) => {
        console.error("Error during login request:", err);
        if (
          err.response &&
          err.response.data.error === "Invalid email or password"
        ) {
          setSnackbarMessage("Invalid username or password");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage("An error occurred during login");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <Typography
            variant="h1"
            sx={{
              color: (theme) =>
                theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
            }}
          >
            Login
          </Typography>
        </div>
        <form className="grid gap-4">
          <div className="space-y-2">
            <Typography
              variant="p"
              color="text.secondary"
              sx={{ fontWeight: "500" }}
            >
              Email
            </Typography>
            <input
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              autoComplete="email"
              className="inpts block w-[100%] h-[2.5vw] p-4 rounded-md border-2 border-gray-300 shadow-sm focus:border-primary bg-transparent focus:ring-primary sm:text-sm"
              placeholder="johnDoe@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Typography
              variant="p"
              color="text.secondary"
              sx={{ fontWeight: "500" }}
            >
              Password
            </Typography>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                autoComplete="current-password"
                className="inpts block w-[100%] h-[2.5vw] p-4 rounded-md border-2 border-gray-300 shadow-sm focus:border-primary bg-transparent focus:ring-primary sm:text-sm"
                required
              />
              <button
                type="button"
                onClick={handleClickShowPassword}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <VisibilityOff sx={{ fontSize: "1.2rem" }} />
                ) : (
                  <Visibility sx={{ fontSize: "1.2rem" }} />
                )}
              </button>
            </div>
          </div>
        </form>
        <div className="relative flex flex-col gap-2">
          <button
            type="submit"
            onClick={loginUser}
            className="relative rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full max-w-md"
            disabled={loading}
          >
            {loading && (
              <CircularProgress
                size={14}
                sx={{
                  color: "white",
                }}
              />
            )}
            {!loading && "Login"}
          </button>
          <div className="text-center text-sm text-muted-foreground">
            You don't have an account?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              <Link to="/register">Register</Link>
            </a>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
