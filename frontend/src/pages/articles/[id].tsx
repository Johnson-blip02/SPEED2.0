// pages/articles/[id].tsx
import { GetServerSideProps } from "next";
import { Typography, Box } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router"; // Import useRouter from Next.js

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Article {
  _id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  tags: string[];
  isApproved: boolean;
  rating: number;
}

interface ArticleProps {
  article: Article;
}

// Article detail page
const ArticleDetail: React.FC<ArticleProps> = ({ article }) => {
  const router = useRouter();

  // Handle edge case where article is not found
  if (router.isFallback || !article) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {article.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        By {article.author} on{" "}
        {new Date(article.date).toLocaleDateString("en-GB")}
      </Typography>
      <Typography variant="body1" paragraph>
        {article.content}
      </Typography>
      <Typography variant="body2">
        Keywords: {article.tags.join(", ")}
      </Typography>
      <Typography variant="body2">Rating: {article.rating}/10</Typography>
    </Box>
  );
};

// Fetch the article server-side using its _id
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!; // Get id from URL parameters
  try {
    const res = await axios.get(`${API_URL}/articles/${id}`);

    return {
      props: {
        article: res.data,
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      notFound: true, // Return 404 if article is not found
    };
  }
};

export default ArticleDetail;
