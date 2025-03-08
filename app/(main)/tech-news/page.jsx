"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const TECH_KEYWORDS = ["AI","Developer", "Coding", "Machine Learning", "Cybersecurity", "Blockchain", "Programming", "Software", "Cloud", "Tech", "Gadgets"];


export default function TechNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
    console.log(process.env.NEWS_API)
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines?category=technology&country=us&pageSize=50&apiKey=ff603ed69d734d60a7defb7d7de9029c");
      const filteredArticles = response.data.articles.filter(article => 
        TECH_KEYWORDS.some(keyword => 
          article.title?.toLowerCase().includes(keyword.toLowerCase()) || 
          article.description?.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      setArticles(filteredArticles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daily Tech News</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article, index) => (
            <Card key={index} className="p-4">
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover mb-2 rounded-md" />}
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <Button>Read More</Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
