import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Instagram Bios Generator - Boost Your Posts',
  description: 'Create professional and engaging Instagram bios with our free AI-powered bio generator. Make your profile stand out with perfectly crafted bios.',
};

export default function BiosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 