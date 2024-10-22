import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Box, Button, TextField, Typography } from "@mui/material";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Article {
  _id: string; // MongoDB _id
  id: number; // Custom ID
  title: string;
  author: string;
  date: string;
  content: string;
  tags: string[];
  isApproved: boolean;
  isAnalysis: boolean;
}

const EditArticle: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Retrieve the article ID from the URL
  const [article, setArticle] = useState<Article | null>(null); // State for article

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/articles/${id}`)
        .then((res) => setArticle(res.data))
        .catch((error) => console.error("Error fetching article:", error));
    }
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/articles/${id}`, article);
      router.push("/analysis"); // Redirect back to AnalysisPage after saving
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  if (!article) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Article
      </Typography>
      <TextField
        label="Title"
        value={article.title}
        onChange={(e) => setArticle({ ...article, title: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Author"
        value={article.author}
        onChange={(e) => setArticle({ ...article, author: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        value={article.content}
        onChange={(e) => setArticle({ ...article, content: e.target.value })}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      {/* Add more fields for other properties like tags, isApproved, etc. */}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default EditArticle;
