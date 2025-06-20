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
      <BlogPost
        title="Digital Tools That Simplify Complex Business Processes"
        content="In today's fast-paced landscape, organizations are embracing digital tools to navigate increasingly intricate operations. Discover essential platforms for automation, project management, data analytics, procurement, CRM, and document management that streamline business processes and drive innovation."
        slug="Digital-Tools-That-Simplify-Complex-Business-Processes"
        onClick={() => {}}
      />
      <BlogPost
        title="7 Awesome Virtual Reality Tours to Try in 2023"
        content="It was just a few years ago that COVID-19 severely limited our every move. In some regions, the travel industry is still recovering from the financial shock. This caused virtual tourism to explode seemingly overnight. In fact, the virtual reality travel industry is projected to surpass $24 billion in value by 2027. And today, you can choose from a vast range of travel experiences to enjoy mysterious cultures, colorful wildlife, and the warm embrace of locals from the comfort of your home. Here are 7 awesome digital travel experiences you can enjoy."
        slug="Awesome-Virtual-Reality-Tours-to-Try-in"
        onClick={() => {}}
      />
      <BlogPost
        title="Best VPNs for Netflix: Unlock More Content in 2024"
        content="Why use a VPN for Netflix? Streaming Netflix content from different regions has become a popular way to access a wider variety of shows and movies. However, Netflix restricts content based on your geographic location. This is where a VPN (Virtual Private Network) can help. In this article, we'll explore the benefits of using a VPN for Netflix, how to choose the best VPN for streaming, tips for avoiding Netflix VPN blocks, and a list of top VPNs for Netflix in 2024. By the end, you'll know how to unlock more content and stream securely."
        slug="vpn-for-netflix"
        onClick={() => {}}
      />
    </div>
  );
};

export default BlogPage; 