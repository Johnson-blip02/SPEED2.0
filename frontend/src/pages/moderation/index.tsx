import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";

interface Article {
  _id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  tags: string[];
  isApproved: boolean;
  isAnalysis: boolean;
}

export default function ModerationPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/articles/moderation"
        );
        setArticles(response.data);
        setLoading(false);
      } catch (err: any) {
        setError("Error fetching articles for moderation.");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Function to handle approving an article
  const handleApprove = async (id: string, currentStatus: boolean) => {
    try {
      await axios.put(`http://localhost:5000/api/articles/approve/${id}`, {
        isApproved: !currentStatus,
      });
      // Update the article list after successful approval
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === id
            ? { ...article, isApproved: !currentStatus }
            : article
        )
      );
    } catch (error) {
      console.error("Error updating approval status", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Articles Awaiting Approval
      </Typography>
      {articles.length === 0 ? (
        <Typography variant="body1">
          No articles found for moderation.
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article._id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>
                  {new Date(article.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{article.tags.join(", ")}</TableCell>
                <TableCell>
                  {article.isApproved ? "Approved" : "Pending"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={article.isApproved ? "secondary" : "primary"}
                    onClick={() =>
                      handleApprove(article._id, article.isApproved)
                    }
                  >
                    {article.isApproved ? "Revoke Approval" : "Approve"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}
