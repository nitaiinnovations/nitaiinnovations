import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { Element } from "react-scroll";

function ContactUsComp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const inputStyles = {
    sx: { padding: "0.5rem 0" },
    InputProps: {
      sx: { fontSize: "1.2rem" },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (Object.values(formData).some(field => field.trim() === "")) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "error"
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: "c6938112-db86-4e30-a9a7-ab9414c144c9",
          ...formData
        })
      });

      const data = await response.json();

      if (data.success) {
        setSnackbar({
          open: true,
          message: "Your message has been sent successfully!",
          severity: "success"
        });
        resetForm();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to send message. Please try again later.",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Element name="contactUsSection">
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: "1rem",
          color: (theme) =>
            theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
        }}
      >
        KEEP IN TOUCH
      </Typography>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Contact Us
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1.3fr 1fr" },
          gap: "3rem",
          padding: "3rem",
          boxSizing: "border-box",
        }}
      >
        {/* Left Side: Form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "1fr",
                mb: "1rem",
              }}
            >
              <TextField
                sx={{ width: "100%" }}
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="standard"
                {...inputStyles}
              />
              <TextField
                sx={{ width: "100%" }}
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="standard"
                type="email"
                {...inputStyles}
              />
              <TextField
                sx={{ width: "100%" }}
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                variant="standard"
                {...inputStyles}
              />
              <TextField
                sx={{ width: "100%" }}
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                variant="standard"
                multiline
                rows={5}
                {...inputStyles}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", mb: "1rem" }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                type="button"
                variant="outlined"
                sx={{ width: "100%" }}
                onClick={resetForm}
                disabled={loading}
              >
                Reset
              </Button>
            </Box>
          </form>
        </Box>

        {/* Right Side: Map */}
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column", height: "22rem" }}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                padding: "1rem",
                boxSizing: "border-box",
                background: "transparent",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.584867647099!2d75.0086892741532!3d15.452941285140712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8cd600b1102cf%3A0x6fde00d66af72d03!2sNITAI%20INNOVATIONS!5e0!3m2!1sen!2sin!4v1724674983702!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
          </Box>
          <Box sx={{ padding: "1rem" }}>
            <Typography variant="h2">Address:</Typography>
            <Typography variant="p">
              Odugoudar building, Ramnagar, 1st Main 7th Cross Road, Dharwad
              580001 KA, INDIA.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Element>
  );
}

export default ContactUsComp;