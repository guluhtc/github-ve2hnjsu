import Link from "next/link";
import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-6">
          <Link href="/" className="font-bold text-xl gradient-text">
            TechIGem
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="https://www.instagram.com/shyami_goyal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E4405F] hover:text-[#E4405F]/80 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link 
              href="https://www.linkedin.com/company/techigem/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A66C2] hover:text-[#0A66C2]/80 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link 
              href="https://www.facebook.com/techigem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1877F2] hover:text-[#1877F2]/80 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
          
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TechIGem. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}