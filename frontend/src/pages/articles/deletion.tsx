// pages/articles/deletion.tsx
import { GetServerSideProps, NextPage } from "next";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { Article } from "../../types/Article"; // Import your Article type
import { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter

type ArticlesProps = {
  articles: Article[]; // Use your Article type
};

const DeletionPage: NextPage<ArticlesProps> = ({ articles }) => {
  const [deletingArticleId, setDeletingArticleId] = useState<number | null>(
    null
  );
  const router = useRouter(); // Initialize router

  const handleDelete = async (id: number) => {
    setDeletingArticleId(id);
    try {
      const response = await fetch(`http://localhost:5000/api/articles/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert(`Article with ID ${id} was deleted successfully.`);
        // Refresh the page
        router.replace(router.asPath); // Reload the page
      } else {
        alert("Failed to delete the article.");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("An error occurred while deleting the article.");
    } finally {
      setDeletingArticleId(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Delete Articles
      </Typography>

      {/* Table container */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>
                  {new Date(article.date).toISOString().split("T")[0]}{" "}
                  {/* Ensures yyyy-mm-dd format */}
                </TableCell>
                <TableCell>{article.rating}</TableCell>
                <TableCell>{article.tags.join(", ")}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(article.id)}
                    disabled={deletingArticleId === article.id}
                  >
                    {deletingArticleId === article.id
                      ? "Deleting..."
                      : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// Fetch articles from the API and pass them as props
export const getServerSideProps: GetServerSideProps<
  ArticlesProps
> = async () => {
  const res = await fetch("http://localhost:5000/api/articles"); // Adjust the API URL if necessary
  const articles = await res.json();

  return {
    props: {
      articles: articles.map((article: any) => ({
        id: article.id,
        title: article.title,
        author: article.author,
        date: new Date(article.date).toISOString().split("T")[0], // Convert Date to a string in yyyy-mm-dd format
        content: article.content,
        tags: article.tags,
        isApproved: article.isApproved, // Include in the data but not displayed
        isAnalysis: article.isAnalysis, // Include isAnalysis property
        rating: article.rating,
      })),
    },
  };
};

export default DeletionPage;
