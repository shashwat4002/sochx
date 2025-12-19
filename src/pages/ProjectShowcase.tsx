import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowRight, Bell, Users, Globe, Award, Lightbulb, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ProjectShowcase = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (type: 'showcase' | 'both') => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission (no backend required)
    setTimeout(() => {
      toast({
        title: "Thank You!",
        description: "We'll notify you when updates are available. For now, check back regularly!",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-accent py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-white opacity-10" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6 animate-fade-in">
            <Badge className="bg-secondary hover:bg-secondary-hover text-secondary-foreground px-4 py-2 text-sm font-semibold">
              Accepting Submissions
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Where Young Minds Experience True Research Excellence
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed">
              The SochX Project Showcase provides students with an environment that many only experience at the PhD level. Here, you'll get the chance to work with guidance from world-class professors and present original research to a global audience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <a 
                href="https://forms.gle/36wdLAuYmeTSvfXZ8" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Submit Your Project
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  const element = document.getElementById('subscribe-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 text-white border-white hover:bg-white/20 shadow-lg"
              >
                <Bell className="mr-2 h-5 w-5" />
                Stay Updated
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/80 mt-4">The Google Form for submissions is attached to the "Submit Your Project" button above.</p>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-6">The Young Researchers' Project Showcase</h2>
          <p className="text-muted-foreground leading-relaxed text-center mb-6">
            A virtual event providing middle and high school students an opportunity to present their original research to a wider audience.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Event Objectives</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Offer a platform for emerging student researchers to share their findings with a wider audience at no cost.</li>
                <li>Promote rigorous scientific communication skills.</li>
                <li>Foster a community of young innovators to exchange ideas, inspire peers, and develop as independent thinkers.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Eligibility</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Open to middle and high school students.</li>
                <li>Students must have pursued an original research project in any field.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">General Instructions & Schedule</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Submit an abstract using the provided template by <strong>January 15th, 2026</strong>.</li>
                <li>Notifications of acceptance will be sent by <strong>January 18th, 2026</strong>.</li>
                <li>Accepted students must submit their presentations by <strong>January 26th, 2026</strong>.</li>
                <li>Group presentations are allowed. Each presentation should be under <strong>12 minutes</strong>, with <strong>3 minutes</strong> for Q&amp;A.</li>
                <li>Presentations will be evaluated by subject-area experts based on clarity, originality, and impact. Outstanding projects will receive recognition and certificates.</li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground">Note: The Google Form for submissions is attached — click "Submit Your Project" at the top of the page to open the form.</p>
          </div>
        </div>
      </section>

      {/* Why the Project Showcase Matters */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Why the Project Showcase Matters
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Breaking Financial Barriers
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Many international project showcases and research conferences charge high fees, making them inaccessible to most students. SochX democratizes access to high-quality research opportunit[...]
              </p>
            </Card>

            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/30">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Lightbulb className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Explore & Innovate
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Students gain exposure to real-world research, giving young minds the chance to explore, experiment, and innovate without financial barriers.
              </p>
            </Card>

            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/30">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Global Recognition
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Showcase your creativity on a global stage with mentorship from top professors and a platform to present to a worldwide audience of peers and educators.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What Students Can Expect */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              What Students Can Expect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Premium Mentorship
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Work with professors and researchers from elite universities in India and abroad. Get guidance that students typically only encounter in PhD programs.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Global Exposure
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Showcase your projects to a worldwide audience of peers, educators, and innovators. Connect with like-minded students across the globe.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Hands-on Experience
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Get access to resources, guidance, and feedback that many students only encounter in graduate-level programs. Learn by doing.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Recognition & Growth
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Your work could be featured in research showcases, publications, or conferences, giving you an edge in academic and research pursuits.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Subscribe Card */}
            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/30">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Bell className="w-8 h-8 text-secondary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">
                  Subscribe for Updates
                </h3>
                <p className="text-muted-foreground">
                  Be the first to know when the Project Showcase launches
                </p>
              </div>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full"
                />
                <Button 
                  onClick={() => handleSubscribe('showcase')}
                  disabled={isSubmitting}
                  className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground"
                >
                  {isSubmitting ? "Subscribing..." : "Notify Me"}
                </Button>
              </div>
            </Card>

            {/* Explore Opportunities Card */}
            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/30">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <ArrowRight className="w-8 h-8 text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">
                  Explore Opportunities
                </h3>
                <p className="text-muted-foreground">
                  Start your own research journey today
                </p>
              </div>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full"
                />
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleSubscribe('both')}
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent-hover text-accent-foreground"
                  >
                    {isSubmitting ? "Subscribing..." : "Stay Updated on All"}
                  </Button>
                  <Link to="/opportunities" className="block">
                    <Button variant="outline" className="w-full">
                      Browse Opportunities Now
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 SochX. Democratizing research opportunities.</p>
            <Link to="/" className="hover:text-primary transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectShowcase;
