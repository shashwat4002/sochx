import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, Users, Monitor, MapPin, Zap } from "lucide-react";

interface DeadlineEntry {
  type?: string;
  date?: string | null;
  note?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  details: string;
  grades: string[];
  category: string | string[];
  type: string;
  season: string;
  format: string[];
  paid: string;
  link: string;
  email: string;
  eligibility?: string;
  tips?: string | string[];
  whatIsLookedFor?: string;
  competitiveness?: "High" | "Medium" | "Low";
  deadline?: string | DeadlineEntry[];
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  onClick: () => void;
}

const OpportunityCard = ({ opportunity, onClick }: OpportunityCardProps) => {
  // Shorten text for card preview
  const getShortDescription = (text: string, maxLength: number = 150) =>
    text.length <= maxLength ? text : text.substring(0, maxLength).trim() + "...";

  // Category color mapping - matching website aesthetics
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "STEM":
        return "bg-blue-600 text-white border-blue-700";
      case "Humanities":
        return "bg-amber-600 text-white border-amber-700";
      case "Social Sciences":
        return "bg-teal-600 text-white border-teal-700";
      case "Business":
        return "bg-indigo-600 text-white border-indigo-700";
      case "Journalism":
        return "bg-rose-600 text-white border-rose-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Paid badge variant
  const getPaidBadgeVariant = (paid: string) => (paid === "Paid" ? "default" : "secondary");

  // Format icon mapping
  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Virtual":
        return <Monitor className="w-3 h-3" />;
      case "In-person":
        return <MapPin className="w-3 h-3" />;
      case "Hybrid":
        return <Zap className="w-3 h-3" />;
      default:
        return <Monitor className="w-3 h-3" />;
    }
  };

  // Format deadline date
  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  };

  // Check if deadline is soon (within 15 days)
  const isDeadlineSoon = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false;
    
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    return diffDays <= 15 && diffDays >= 0;
  };

  // Get deadline info
  const getDeadlineInfo = () => {
    if (!opportunity.deadline) return null;
    
    if (Array.isArray(opportunity.deadline)) {
      const firstDeadline = opportunity.deadline.find(d => d.date);
      if (!firstDeadline?.date) return null;
      
      return {
        text: formatDeadline(firstDeadline.date),
        isSoon: isDeadlineSoon(firstDeadline.date)
      };
    }
    
    return {
      text: formatDeadline(opportunity.deadline),
      isSoon: isDeadlineSoon(opportunity.deadline)
    };
  };

  const deadlineInfo = getDeadlineInfo();

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-card-hover group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="flex flex-wrap gap-1">
            {(Array.isArray(opportunity.category) ? opportunity.category : [opportunity.category]).map(cat => (
              <Badge key={cat} variant="outline" className={getCategoryColor(cat)}>
                {cat}
              </Badge>
            ))}
          </div>
          <Badge variant={getPaidBadgeVariant(opportunity.paid)} className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {opportunity.paid}
          </Badge>
        </div>

        <CardTitle className="text-lg font-semibold text-primary group-hover:text-primary-hover transition-colors">
          {opportunity.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <CardDescription className="text-sm text-card-foreground leading-relaxed">
          {getShortDescription(opportunity.details)}
        </CardDescription>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>Grades {opportunity.grades.join(", ")}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{opportunity.season}</span>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {opportunity.type}
          </Badge>

          <div className="flex items-center gap-2">
            {opportunity.format.map(f => (
              <Badge key={f} variant="outline" className="flex items-center gap-1 text-xs">
                {getFormatIcon(f)}
                {f}
              </Badge>
            ))}
          </div>
        </div>

        {deadlineInfo && (
          <Badge 
            variant="outline" 
            className="mt-2 text-xs flex items-center gap-1 w-fit"
          >
            <Calendar className="w-3 h-3" />
            <span>Deadline: {deadlineInfo.text}</span>
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;