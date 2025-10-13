import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Users, Award, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.png";

const Index = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const gatewayFeatures = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Self-Paced Guides",
      description: "Step-by-step resources to design independent research projects and build your academic portfolio.",
      color: "hover:bg-primary/5"
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Curated Opportunities",
      description: "Scouted extracurriculars, research programs, internships, and competitions from around the world.",
      color: "hover:bg-accent/5"
    },
    {
      icon: <Award className="w-8 h-8 text-secondary" />,
      title: "Project Showcase & Conferences", 
      description: "Platform for presenting your research and connecting with peers and mentors globally.",
      color: "hover:bg-secondary/5"
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Independent Publishing",
      description: "Access journals and platforms for publishing your work without needing elite network connections.",
      color: "hover:bg-primary/5"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32 bg-gradient-hero overflow-hidden"
        style={{
          backgroundImage:  `linear-gradient(135deg, hsl(218 91% 20% / 0.9) 0%, hsl(212 94% 51% / 0.8) 100%), 
    url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply"
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Research shouldn't be gated by{" "}
              <span className="text-secondary">zip code</span>,{" "}
              <span className="text-accent">connections</span>, or{" "}
              <span className="text-secondary">cash</span>
            </h1>
            
         <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto font-bold">
  Learn, create, publish — from anywhere. Access high-quality research opportunities 
  regardless of your school, location, or financial background.
</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="gap-2 text-lg px-8 py-4">
                <Link to="/opportunities">
                  Start Exploring
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={scrollToProjects}
                className="gap-2 text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                See Projects
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20"></div>
      </section>

      {/* Gateway Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Four Ways to Break Through Academic Barriers
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to access, create, and share high-quality research — 
              no matter where you're starting from.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {gatewayFeatures.map((feature, index) => (
              <Link 
                key={index}
                to="/opportunities"
                className="block"
              >
                <Card 
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-xl ${feature.color} border-border h-full`}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-primary mb-2">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <CardDescription className="text-card-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase Placeholder */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Student Project Showcase
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              See what students around the world are creating with access to quality research opportunities.
            </p>
            
            <div className="bg-card rounded-xl p-12 border border-border">
              <div className="max-w-md mx-auto">
                <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Coming Soon
                </h3>
                <p className="text-muted-foreground mb-6">
                  This section will feature outstanding research projects and publications 
                  from students using Tinkro's platform.
                </p>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
