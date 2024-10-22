import React, { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  _id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  publisher: string;
  submittedAt: string;
  claim: string;
}

const LatestArticles: React.FC = () => {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestArticles = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/speed/latest`
      );
      const sortedArticles = response.data.sort(
        (a: Article, b: Article) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      setLatestArticles(sortedArticles);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching latest articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestArticles();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Latest Articles</h1>
      <ul>
        {latestArticles.map((article) => (
          <li key={article._id}>
            <h2>{article.title}</h2>
            <p>By: {article.authors}</p>
            <p>
              Published in: {article.journal} ({article.year})
            </p>
            <a href={article.doi} target="_blank" rel="noopener noreferrer">
              DOI Link
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestArticles;
