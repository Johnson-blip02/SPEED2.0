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
import { useRouter } from "next/router";

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

interface AnalysisPageProps {
  articles: Article[];
  fetchError?: boolean;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({
  articles,
  fetchError,
}) => {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/analysis/${id}`); // Navigate to the edit page with the article ID
  };

  const handleApprove = async (_id: string) => {
    try {
      const res = await axios.put(
        `${API_URL}/articles/${_id}/approveAnalysis`,
        { isAnalysis: true } // Send the updated field
      );
      console.log("Article approved for analysis:", res.data);
      window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
      console.error("Error approving article for analysis:", error);
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
        <Typography variant="h4">
          No articles available for analysis.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Articles Pending Analysis
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
                  color="primary"
                  onClick={() => handleEdit(article._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleApprove(article._id)} // Approve button handler
                  sx={{ ml: 2 }}
                >
                  Approve
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
    const res = await axios.get(`${API_URL}/articles/analysis/pending`);

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

export default AnalysisPage;
