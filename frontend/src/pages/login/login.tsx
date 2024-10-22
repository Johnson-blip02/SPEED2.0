import React, { useState, useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { AuthContext } from "../../components/Auth/AuthContext"; // Import AuthContext
import { useRouter } from "next/router"; // Import useRouter to handle redirects

// Use the environment variable for the backend URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { login } = useContext(AuthContext); // Access login function from AuthContext
  const router = useRouter(); // Initialize useRouter

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const { email, password } = formData;

    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        Email: email,
        Password: password,
      });

      if (response.status === 200) {
        const { userType } = response.data; // Assuming userType is returned from the backend
        setSuccessMessage("Login successful!");
        login(email, userType); // Pass both email and userType to login function
        setFormData({ email: "", password: "" });

        // Redirect the user to the home page after successful login
        router.push("/");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error logging in.");
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Typography variant="h6" gutterBottom>
        Email:moderation@example.com Password:SecurePassword123
      </Typography>
      <Typography variant="h6" gutterBottom>
        Email:analysis@example.com Password:AnalysisPassword789
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errorMessage && (
          <Typography
            color="error"
            variant="body1"
            style={{ marginTop: "16px" }}
          >
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography
            color="primary"
            variant="body1"
            style={{ marginTop: "16px" }}
          >
            {successMessage}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      <Typography variant="body1" style={{ marginTop: "16px" }}>
        Don’t have an account?{" "}
        <Link href="/login/registrationPage" passHref>
          <Button color="primary">Register</Button>
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
