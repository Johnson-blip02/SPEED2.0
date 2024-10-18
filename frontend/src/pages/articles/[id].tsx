// pages/articles/[id].tsx

import { GetServerSideProps } from "next";
import { Paper, Typography } from "@mui/material";
import { Article } from "../../types/Article"; // Import the Article type

// Define the props type for the ArticleDetail component
type ArticleProps = {
  article: Article; // The article object passed as a prop
};

// ArticleDetail component to display the article details
export default function ArticleDetail({ article }: ArticleProps) {
  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      {/* Display the article title */}
      <Typography variant="h4" gutterBottom>
        {article.title}
      </Typography>

      {/* Display the author and publication date */}
      <Typography variant="subtitle1" gutterBottom>
        By {article.author} on {new Date(article.date).toLocaleDateString()}
      </Typography>

      {/* Display the article content */}
      <Typography variant="body1" paragraph>
        {article.content}
      </Typography>

      {/* Display the tags associated with the article */}
      <Typography variant="body2" color="textSecondary">
        Tags: {article.tags.join(", ")}
      </Typography>
    </Paper>
  );
}

// Fetch article data based on the ID from the URL
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!; // Extract the article ID from the URL parameters

  // Fetch the article data from the API
  const res = await fetch(`http://localhost:5000/api/articles/${id}`);
  const article = await res.json();

  return {
    props: {
      article, // Pass the article data as a prop to the component
    },
  };
};
