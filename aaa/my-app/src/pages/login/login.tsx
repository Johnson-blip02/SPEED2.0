import React, { useState, useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { AuthContext } from "../../components/Auth/AuthContext"; // Import AuthContext

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { login } = useContext(AuthContext); // Access login function from AuthContext

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
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          Email: email,
          Password: password,
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Login successful!");
        login(email); // Update the context with the logged-in user's email
        setFormData({ email: "", password: "" });
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
