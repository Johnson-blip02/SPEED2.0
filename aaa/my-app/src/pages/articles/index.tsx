// pages/articles/index.tsx
import { GetServerSideProps } from "next";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import { Article } from "../../types/Article"; // Import your Article type

type ArticlesProps = {
  articles: Article[]; // Define the type for your articles
};

// The main Articles component, which receives the articles as props
export default function Articles({ articles }: ArticlesProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter articles based on search query
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      new Date(article.date).toLocaleDateString("en-GB").includes(searchQuery) // Explicitly set date format (en-GB for dd/mm/yyyy)
  );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        All Published Articles
      </Typography>

      {/* Search input */}
      <TextField
        label="Search by title, author or date"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Table to display articles */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Keywords</TableCell>
              <TableCell>Actions</TableCell> {/* Add Actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>
                  {new Date(article.date).toLocaleDateString("en-GB")}{" "}
                  {/* Ensure consistent date format */}
                </TableCell>
                <TableCell>{article.rating}</TableCell>
                <TableCell>{article.tags.join(", ")}</TableCell>
                <TableCell>
                  {/* Link to article detail page */}
                  <Link href={`/articles/${article.id}`}>
                    <Button variant="contained" color="primary">
                      Read More
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

// Fetch articles server-side, only including those that are approved
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:5000/api/articles"); // Fetch articles from your API
  const articles = await res.json();

  // Only pass articles where `isApproved` is true
  const approvedArticles = articles.filter(
    (article: any) => article.isApproved
  );

  return {
    props: {
      articles: approvedArticles.map((article: any) => ({
        id: article.id,
        title: article.title,
        author: article.author,
        date: new Date(article.date).toISOString(),
        content: article.content,
        tags: article.tags,
        isApproved: article.isApproved,
        rating: article.rating,
        // Remove isAnalysis since you're handling data manually
      })),
    },
  };
};
