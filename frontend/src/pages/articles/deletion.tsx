import React from "react";
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
} from "@mui/material";
import { GetServerSideProps } from "next";
import { format } from "date-fns";

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

interface DeletionPageProps {
  articles: Article[];
  fetchError?: boolean;
}

const DeletionPage: React.FC<DeletionPageProps> = ({
  articles,
  fetchError,
}) => {
  const handleDelete = async (_id: string) => {
    try {
      const res = await axios.delete(`${API_URL}/articles/${_id}`);
      console.log("Article deleted:", res.data);
      window.location.reload(); // Temporary refresh; use state for better UX
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  if (fetchError) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" color="error">
          Error fetching articles. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (articles.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">No articles found for deletion.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Articles Available for Deletion
      </Typography>
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
              {" "}
              {/* Use _id as the unique key */}
              <TableCell>{article.title}</TableCell>
              <TableCell>{article.author}</TableCell>
              <TableCell>
                {format(new Date(article.date), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>{article.tags.join(", ")}</TableCell>
              <TableCell>
                {article.isApproved ? "Approved" : "Pending"}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(article._id)} // Delete handler
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axios.get(`${API_URL}/articles`);

    const articles = res.data.map((article: any) => ({
      _id: article._id, // Use MongoDB _id
      id: article.id, // Custom ID for display if needed
      title: article.title,
      author: article.author,
      date: article.date,
      content: article.content,
      tags: article.tags,
      isApproved: article.isApproved,
      isAnalysis: article.isAnalysis,
    }));

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        articles: [],
        fetchError: true,
      },
    };
  }
};

export default DeletionPage;
