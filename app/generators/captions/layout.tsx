import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Instagram Captions Generator - Boost Your Posts',
  description: 'Create engaging and creative Instagram captions with our free AI-powered caption generator. Boost your social media presence with perfectly crafted captions.',
};

export default function CaptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 