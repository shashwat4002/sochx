import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
  src="/sochx-title.png"
  className="w-8 h-8 object-contain"
/> 
            <span className="text-xl font-bold text-foreground">SochX</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/opportunities" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/opportunities" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Opportunities
            </Link>
            <Link 
              to="/showcase" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/showcase" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Showcase
            </Link>
            <Link 
              to="/blog" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.startsWith("/blog") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Blog
            </Link>
            <Button variant="secondary" size="sm">
              Submit Opportunity
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
