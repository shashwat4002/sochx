import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import teamShashwat from "@/assets/team-shashwat.jpg";
import teamLikhila from "@/assets/team-likhila.png";
import teamBarathraam from "@/assets/team-barathraam.png";
import teamMember1 from "@/assets/yet.png";
import teamMember2 from "@/assets/yet.png";
import teamMember3 from "@/assets/yet.png";
import teamMember4 from "@/assets/yet.png";
import teamMember5 from "@/assets/yet.png";
import teamMember6 from "@/assets/yet.png";
import teamMember7 from "@/assets/yet.png";
import teamMember8 from "@/assets/yet.png";

interface ChiefMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const chiefTeam: ChiefMember[] = [
  {
    name: "Shashwat Mishra",
    role: "Co-Founder",
    description: "I'm Shashwat, a high school graduate and aspiring chemistry researcher with a passion for turning curiosity into impact. Over the past year, I've worked on projects like developing a patent-filed natural leather alternative and studying heavy-metal-free organic compounds. At SochX, I channel this love for science into creating a platform that democratizes research opportunities for students worldwide. I'm especially passionate about green chemistry, materials science, and interdisciplinary solutions to real-world problems. Beyond research, I enjoy building communities of curious learners—whether through mentoring peers, starting student research journals, or enabling others to explore STEM. Science, for me, isn't just discovery; it's empowerment.",
    image: teamShashwat
  },
  {
    name: "Likhila BK",
    role: "Co-Founder",
    description: "I'm Likhila, a high school student from India fascinated by polymers, nanoscience, and the potential of creative research to transform ideas into real solutions. At SochX, I'm committed to making science accessible, exciting, and actionable for students everywhere. I thrive on learning, experimenting, and finding innovative ways to tackle complex challenges. Whether it's exploring cutting-edge research or connecting young learners with opportunities, I'm driven by curiosity and a desire to make a tangible impact through knowledge.",
    image: teamLikhila
  },
  {
    name: "Barathraam G",
    role: "Founding Member & Chief Tech Lead",
    description: "I'm Barathraam, a 10th-grade student passionate about using technology to turn data into insight. I've previously built an advanced weather and air quality predictive model for the Bangalore region as part of the Anveshana program, combining analytics, machine learning, and real-world data. At SochX, I focus on creating seamless, intelligent tools that help students discover and engage with research opportunities worldwide. Outside tech, I enjoy solving Rubik's Cubes—a hobby that trains memory, focus, and problem-solving skills—and I bring that same curiosity and persistence to every project I tackle.",
    image: teamBarathraam
  }
];

const contributors: TeamMember[] = [
  {
    name: "Nil",
    role: "Research Intern",
    bio: "Passionate about bioinformatics and computational biology, Aanya helps curate and verify research opportunities across life sciences programs.",
    image: teamMember1
  },
  {
    name: "Nil",
    role: "Tech Associate",
    bio: "A coding enthusiast specializing in web development and UI/UX design, Rohan contributes to building SochX's user-friendly platform.",
    image: teamMember2
  },
  {
    name: "Nil",
    role: "Content Lead",
    bio: "With a flair for science communication, Priya creates engaging content and guides that make complex research topics accessible to students.",
    image: teamMember3
  },
  {
    name: "Nil",
    role: "Outreach Coordinator",
    bio: "Arjun connects with schools and student communities globally, spreading awareness about research opportunities and SochX's mission.",
    image: teamMember4
  },
  {
    name: "Nil",
    role: "Data Analyst",
    bio: "Kavya analyzes trends in research programs and student engagement, helping SochX optimize its platform based on real insights.",
    image: teamMember5
  },
  {
    name: "Nil",
    role: "Marketing Associate",
    bio: "Creative and strategic, Vikram manages SochX's social media presence and develops campaigns to reach aspiring young researchers.",
    image: teamMember6
  },
  {
    name: "Nil",
    role: "Community Manager",
    bio: "Meera fosters a supportive online community, organizing events and connecting students with mentors and research collaborators.",
    image: teamMember7
  },
  {
    name: "Nil",
    role: "Quality Assurance",
    bio: "Detail-oriented and thorough, Aditya ensures SochX's platform runs smoothly by testing features and maintaining high quality standards.",
    image: teamMember8
  }
];

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Team
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Meet the visionaries democratizing research opportunities for students worldwide.
          </p>
        </div>
      </section>

      {/* Chief Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {chiefTeam.map((member, index) => (
              <Card 
                key={index}
                className="group overflow-hidden transition-all duration-300 hover:shadow-xl border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid md:grid-cols-[300px_1fr] gap-8 p-8">
                  <div className="relative">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center space-y-4">
                    <div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">
                        {member.name}
                      </h2>
                      <p className="text-lg text-primary font-semibold mb-4">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Contributors
            </h2>
            <p className="text-lg text-muted-foreground">
              Talented individuals supporting our mission
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max px-4">
              {contributors.map((member, index) => (
                <Card
                  key={index}
                  className="w-[280px] flex-shrink-0 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border-border animate-fade-in"
                  onClick={() => setSelectedMember(member)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardHeader className="p-6 pb-4">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl text-foreground">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Want to join our team?
            </h3>
            <p className="text-muted-foreground mb-8">
              We're always looking for passionate individuals who share our vision of democratizing research opportunities.
            </p>
            <Button size="lg" className="gap-2">
              <Mail className="w-5 h-5" />
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Member Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="aspect-square w-32 h-32 rounded-full overflow-hidden bg-muted mx-auto mb-4">
              <img
                src={selectedMember?.image}
                alt={selectedMember?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <DialogTitle className="text-2xl text-center">{selectedMember?.name}</DialogTitle>
            <DialogDescription className="text-center text-primary font-semibold text-base">
              {selectedMember?.role}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-muted-foreground leading-relaxed">
              {selectedMember?.bio}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Team;
