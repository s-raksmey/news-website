"use client";

import Link from "next/link";
import { Article } from "../types";
import Image from "next/image";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getArticleUrl = () => {
    if (article.subcategory) {
      return `/${article.category}/${article.subcategory}/${article.slug}`;
    }
    return `/${article.category}?slug=${article.slug}`;
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {article.image && (
        <div className="aspect-video bg-gray-200">
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Hide image if it fails to load
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="capitalize">{article.category}</span>
          {article.subcategory && (
            <>
              <span className="mx-2">•</span>
              <span className="capitalize">{article.subcategory}</span>
            </>
          )}
          <span className="mx-2">•</span>
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          <Link
            href={getArticleUrl()}
            className="hover:text-blue-600 transition-colors"
          >
            {article.title}
          </Link>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <span>By {article.author}</span>
          </div>

          <Link
            href={getArticleUrl()}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            Read more
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
