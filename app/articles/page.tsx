import type { Metadata } from "next";
import ArticlesList from "@/components/articles/ArticlesList";

export const metadata: Metadata = {
  title: "Articles & Guides",
  description:
    "Practical articles on relocation, property, lifestyle and planning to help you make informed decisions.",
};

export default function ArticlesPage() {
  return <ArticlesList />;
}
