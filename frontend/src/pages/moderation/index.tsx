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

interface Article {
  _id: string; // Use MongoDB _id
  id: number; // Your custom ID field
  title: string;
  author: string;
  date: string;
  content: string;
  tags: string[];
  isApproved: boolean;
  isAnalysis: boolean;
}

interface ModerationPageProps {
  articles: Article[];
  fetchError?: boolean;
}

const ModerationPage: React.FC<ModerationPageProps> = ({
  articles,
  fetchError,
}) => {
  const handleApproval = async (_id: string, isApproved: boolean) => {
    try {
      const res = await axios.put(
        `https://backend-7uziaorjg-johnsons-projects-22e77e85.vercel.app/articles/${_id}/approve`, // Updated URL with _id
        {
          isApproved: !isApproved, // Toggle approval state
        }
      );
      console.log("Article updated:", res.data);
      window.location.reload(); // Temporary refresh; use state for better UX
    } catch (error) {
      console.error("Error updating article:", error);
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
        <Typography variant="h4">No articles found for moderation.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Articles Awaiting Approval
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
              </TableCell>{" "}
              {/* Date formatted using date-fns */}
              <TableCell>{article.tags.join(", ")}</TableCell>
              <TableCell>
                {article.isApproved ? "Approved" : "Pending"}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color={article.isApproved ? "secondary" : "primary"}
                  onClick={() =>
                    handleApproval(article._id, article.isApproved)
                  } // Pass _id here
                >
                  {article.isApproved ? "Revoke Approval" : "Approve"}
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
    const res = await axios.get(
      "https://backend-7uziaorjg-johnsons-projects-22e77e85.vercel.app/articles/moderation" // Updated URL
    );

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

export default ModerationPage;
