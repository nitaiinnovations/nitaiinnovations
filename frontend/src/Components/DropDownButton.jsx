import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

export default function CustomDropdown({ toggleDrawer }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const isMobile = useMediaQuery("(max-width:900px)");

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(false);
    if (isMobile) {
      toggleDrawer(false)();
    }
  };

  return (
    <Box
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ position: "relative", display: "inline-block" }}
    >
      <Box
        component="button"
        aria-label="dropdown"
        onMouseEnter={handleMouseEnter}
        sx={{
          p: 0,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <KeyboardArrowDownIcon
          sx={{ color: isLightMode ? "#131B20" : "white" }}
        />
      </Box>
      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1,
            backgroundColor: isLightMode ? "#d2eeff" : "#252525e3",
            border: `1px solid ${isLightMode ? "#ddd" : "#333"}`,
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            backdropFilter: "blur(8px)",
            // Adjust position based on screen size
            ...(isMobile ? { left: "auto", right: 0 } : { left: 0 }),
          }}
        >
          <Link to="/cyberSecurity" style={{ textDecoration: "none" }}>
            <Box
              component="div"
              sx={{
                padding: ".5rem 1rem",
                width: "12rem",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                color: isLightMode ? "black" : "white",
                "&:hover": {
                  backgroundColor: isLightMode ? "#409fff42" : "#224176",
                },
              }}
              onClick={handleClick}
            >
              <Typography variant="p">Cyber Security</Typography>
            </Box>
          </Link>

          <Link to="/cloudService" style={{ textDecoration: "none" }}>
            <Box
              component="div"
              sx={{
                padding: ".5rem 1rem",
                width: "12rem",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                color: isLightMode ? "black" : "white",
                "&:hover": {
                  backgroundColor: isLightMode ? "#409fff42" : "#224176",
                },
              }}
              onClick={handleClick}
            >
              <Typography variant="p">Cloud Services</Typography>
            </Box>
          </Link>

          <Link to="/AIML" style={{ textDecoration: "none" }}>
            <Box
              component="div"
              sx={{
                padding: ".5rem 1rem",
                width: "12rem",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                color: isLightMode ? "black" : "white",
                "&:hover": {
                  backgroundColor: isLightMode ? "#409fff42" : "#224176",
                },
              }}
              onClick={handleClick}
            >
              <Typography variant="p">AI & ML</Typography>
            </Box>
          </Link>
        </Box>
      )}
    </Box>
  );
}
