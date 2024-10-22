// pages/articles/[id].tsx

import React from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { format } from "date-fns";

// Use the environment variable for the backend URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

interface ArticleDetailPageProps {
  article: Article;
  fetchError?: boolean;
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  fetchError,
}) => {
  if (fetchError || !article) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" color="error">
          Error fetching article details. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {article.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Author:</strong> {article.author}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Date:</strong> {format(new Date(article.date), "dd/MM/yyyy")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Tags:</strong> {article.tags.join(", ")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Content:</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        {article.content}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Status:</strong>{" "}
        {article.isApproved ? "Approved" : "Pending Approval"}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Analysis:</strong>{" "}
        {article.isAnalysis ? "Analysis Completed" : "Pending Analysis"}
      </Typography>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const res = await axios.get(`${API_URL}/articles/${id}`);
    return {
      props: {
        article: res.data,
      },
    };
  } catch (error) {
    console.error("Error fetching article details:", error);
    return {
      props: {
        fetchError: true,
      },
    };
  }
};

export default ArticleDetailPage;
