import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

// Use the environment variable for the backend URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SubmitPage() {
  const [article, setArticle] = useState({
    title: "",
    author: "",
    date: "",
    content: "",
    tags: "",
    isApproved: false, // Default value
    isAnalysis: false, // Default value
    rating: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newArticle = {
      ...article,
      tags: article.tags.split(",").map((tag) => tag.trim()), // Convert tags to array of strings
      date: new Date(article.date), // Ensure date is in Date format
      rating: parseInt(article.rating), // Convert rating to number
    };

    try {
      const response = await axios.post(`${API_URL}/articles`, newArticle);
      alert("Article submitted successfully!");
      // Reset form after successful submission
      setArticle({
        title: "",
        author: "",
        date: "",
        content: "",
        tags: "",
        isApproved: false,
        isAnalysis: false, // Resetting isAnalysis
        rating: "",
      });
    } catch (error) {
      console.error("There was an error submitting the article!", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 600,
        margin: "auto",
        mt: 8, // Increased margin-top to move the form further down
      }}
    >
      <TextField
        label="Title"
        name="title"
        value={article.title}
        onChange={handleChange}
        required
      />
      <TextField
        label="Author"
        name="author"
        value={article.author}
        onChange={handleChange}
        required
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={article.date}
        onChange={handleChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Content"
        name="content"
        value={article.content}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />
      <TextField
        label="Tags (comma separated)"
        name="tags"
        value={article.tags}
        onChange={handleChange}
      />
      {/* The "Approved" and "Analysis" checkboxes are hidden by removing them */}
      <TextField
        label="Rating"
        name="rating"
        type="number"
        value={article.rating}
        onChange={handleChange}
        required
        inputProps={{ min: 1, max: 5 }} // Assuming rating is between 1-5
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Article
      </Button>
    </Box>
  );
}
