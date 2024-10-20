import { useState, useEffect } from "react";
import axios from "axios";
import { Article } from "../../types/Article";
import Link from "next/link";
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router"; // To handle active state

export default function AnalysisPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter(); // Get the current route

  useEffect(() => {
    // Fetch articles where isAnalysis is false
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/articles/analysis/pending"
        ); // Full backend URL
        setArticles(response.data); // Set articles in state
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleSetAnalysisTrue = async (id: number) => {
    try {
      // Update isAnalysis to true for the selected article
      await axios.put(
        `http://localhost:5000/api/articles/${id}`,
        { isAnalysis: true },
        {
          headers: {
            "Content-Type": "application/json", // Ensure the correct headers
          },
        }
      );

      // Update the local state to reflect the change
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== id)
      );
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Articles Pending Analysis
      </Typography>
      <List>
        {articles.length > 0 ? (
          articles.map((article) => (
            <ListItem key={article.id}>
              <ListItemText
                primary={article.title}
                secondary={`Author: ${article.author} | Date: ${new Date(
                  article.date
                ).toLocaleDateString()}`}
              />
              <Link href={`/analysis/${article.id}`} passHref>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  className={
                    router.pathname === `/analysis/${article.id}`
                      ? "active"
                      : ""
                  }
                >
                  Edit
                </Button>
              </Link>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleSetAnalysisTrue(article.id)}
              >
                Approve
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography>No articles found pending analysis.</Typography>
        )}
      </List>
      <style jsx>{`
        .active {
          background-color: #1976d2;
          color: white;
        }
      `}</style>
    </Box>
  );
}
