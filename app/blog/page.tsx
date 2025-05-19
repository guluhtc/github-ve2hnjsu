"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface BlogPostProps {
  title: string;
  content: string;
  onClick: () => void;
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, content, slug }) => (
  <Link href={`/blog/${slug}`} className="block mb-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-100">
    <h2 className="text-xl font-bold">{title}</h2>
    <p className="text-gray-600">{content.substring(0, 100)}...</p>
  </Link>
);

interface FullBlogPostProps {
  title: string;
  content: string;
  onBack: () => void;
}

const FullBlogPost: React.FC<FullBlogPostProps> = ({ title, content, onBack }) => (
  <div className="p-4">
    <button className="mb-4 text-blue-500" onClick={onBack}>Back to Posts</button>
    <h1 className="text-3xl font-bold mb-4">{title}</h1>
    {content.split(/\n\n+/).map((para, idx) => (
      <p key={idx} className="mb-4 text-base leading-relaxed">{para}</p>
    ))}
  </div>
);

const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<{ id: number; title: string; content: string } | null>(null);

  const blogPosts = [
    {
      id: 1,
      title: 'Instagram Marketing Tips',
      content: 'Instagram has become a powerful platform for marketing. Here are some tips to enhance your Instagram presence: Use high-quality images and videos. Engage with your audience through comments and direct messages. Utilize hashtags to increase visibility. Post consistently to keep your audience engaged. Analyze your performance using Instagram Insights. By following these tips, you can improve your Instagram marketing strategy and grow your audience effectively.',
      slug: 'instagram-marketing-tips'
    },
    {
      id: 2,
      title: 'How to Increase Instagram Followers',
      content: 'Increasing your Instagram followers requires a strategic approach. Focus on creating engaging content, using relevant hashtags, and interacting with your audience. Consistency is key to building a loyal following.',
      slug: 'how-to-increase-instagram-followers'
    },
    {
      id: 3,
      title: 'Hashtag Generator',
      content: 'This is a sample blog post about the hashtag generator tool. You can add more details about how to use the tool and its benefits here.',
      slug: 'hashtag-generator'
    }
  ];

  const handlePostClick = (post: { id: number; title: string; content: string }) => {
    setSelectedPost(post);
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      {blogPosts.map(post => (
        <BlogPost key={post.id} title={post.title} content={post.content} slug={post.slug} onClick={() => handlePostClick(post)} />
      ))}
      <BlogPost
        title="7 Best VPNs For Gaming In September 2023 (Low Ping Time)"
        content="Why use a VPN for gaming? Online gaming has become increasingly popular..."
        slug="7-best-vpns-for-gaming-in-september-2023-low-ping-time"
        onClick={() => {}}
      />
    </div>
  );
};

export default BlogPage; 