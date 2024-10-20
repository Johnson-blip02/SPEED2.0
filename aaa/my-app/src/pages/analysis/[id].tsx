// pages/analysis/[id].tsx
import { GetServerSideProps } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Article } from "../../types/Article";

// Define the props type for the ArticleDetail component
type ArticleProps = {
  article: Article | null;
};

export default function ArticleDetail({ article }: ArticleProps) {
  const router = useRouter();

  // Local state for form fields, initialized with article values
  const [formData, setFormData] = useState({
    title: article?.title || "",
    author: article?.author || "",
    content: article?.content || "",
    tags: article?.tags.join(", ") || "", // Tags as comma-separated string
  });

  // Handle input change in form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update the article
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Prepare the tags as an array
      const updatedTags = formData.tags.split(",").map((tag) => tag.trim());

      // PUT request to update the article
      const res = await fetch(
        `http://localhost:5000/api/articles/${article?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            author: formData.author,
            content: formData.content,
            tags: updatedTags,
          }),
        }
      );

      if (res.ok) {
        // Redirect or reload after successful update
        router.push("/analysis");
      } else {
        console.error("Failed to update article");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!article) {
    return <Typography variant="h6">Article not found</Typography>;
  }

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Edit Article: {article.title}
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <Box marginBottom={2}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Box>

        {/* Author Field */}
        <Box marginBottom={2}>
          <TextField
            label="Author"
            name="author"
            fullWidth
            value={formData.author}
            onChange={handleChange}
            required
          />
        </Box>

        {/* Content Field */}
        <Box marginBottom={2}>
          <TextField
            label="Content"
            name="content"
            fullWidth
            multiline
            minRows={4}
            value={formData.content}
            onChange={handleChange}
            required
          />
        </Box>

        {/* Tags Field */}
        <Box marginBottom={2}>
          <TextField
            label="Tags (comma-separated)"
            name="tags"
            fullWidth
            value={formData.tags}
            onChange={handleChange}
          />
        </Box>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </Paper>
  );
}

// Fetch article data based on the ID from the URL
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!; // Extract the article ID from the URL parameters

  try {
    // Fetch the article data from the API
    const res = await fetch(`http://localhost:5000/api/articles/${id}`);

    if (!res.ok) {
      // If the article is not found, return null
      return {
        props: {
          article: null,
        },
      };
    }

    const article = await res.json();

    return {
      props: {
        article, // Pass the article data as a prop to the component
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);

    return {
      props: {
        article: null,
      },
    };
  }
};
