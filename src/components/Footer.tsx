import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground/80 pt-16 pb-8">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Compass className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-primary-foreground">
              SkillPath<span className="text-accent">AI</span>
            </span>
          </Link>
          <p className="text-sm text-primary-foreground/60 max-w-xs">
            Your AI-powered career mentor. Discover paths, build skills, land opportunities.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">Product</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/explore" className="hover:text-primary-foreground transition-colors">Career Explorer</Link></li>
            <li><Link to="/roadmap" className="hover:text-primary-foreground transition-colors">Skill Roadmaps</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary-foreground transition-colors">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Community</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/40">
        © 2026 SkillPath AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
