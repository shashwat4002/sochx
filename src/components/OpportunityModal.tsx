import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Mail, Calendar, Users, DollarSign, BookOpen, Monitor, MapPin, Zap } from "lucide-react";

interface DeadlineEntry {
  type?: string;
  date?: string | null; // ISO string or null
  note?: string;
}

interface Opportunity {
  id: string;
  title: string;
  details: string;
  grades: string[];
  category: string | string[];
  type: string;
  season: string;
  format: string[]; // changed to array
  paid: string;
  link: string;
  email: string;
  eligibility?: string;
  tips?: string | string[];
  whatIsLookedFor?: string;
  competitiveness?: "High" | "Medium" | "Low";
  deadline?: string | null | DeadlineEntry[];
  deadlineNotes?: string;
}

interface OpportunityModalProps {
  opportunity: Opportunity;
  children: React.ReactNode;
}

const fmtDate = (iso?: string | null) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const getSoonness = (iso?: string | null) => {
  if (!iso) return false;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() - Date.now() <= 14 * 24 * 60 * 60 * 1000;
};

const OpportunityModal = ({ opportunity, children }: OpportunityModalProps) => {
  const tipsText = Array.isArray(opportunity.tips) ? opportunity.tips.join(", ") : opportunity.tips;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "STEM":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

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

  const getPaidBadgeVariant = (paid: string) => {
    return paid === "Paid" ? "default" : "secondary";
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Virtual":
        return <Monitor className="w-4 h-4" />;
      case "In-person":
        return <MapPin className="w-4 h-4" />;
      case "Hybrid":
        return <Zap className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const renderDeadlineBadge = (deadline: Opportunity["deadline"], notes?: string | undefined) => {
    if (!deadline && !notes) return null;

    if (typeof deadline === "string") {
      const formatted = fmtDate(deadline);
      if (!formatted) {
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {notes || "Deadline varies — check official site"}
          </Badge>
        );
      }

      const isSoon = getSoonness(deadline);
      return (
        <Badge 
          variant="outline" 
          className={isSoon ? 'bg-red-500 text-white border-red-600' : 'bg-orange-500 text-white border-orange-600'}
        >
          <Calendar className="w-4 h-4" />
          Deadline: {formatted}
        </Badge>
      );
    }

    if (Array.isArray(deadline)) {
      const dated = deadline
        .map((d, i) => ({ ...d, idx: i, ts: d.date ? new Date(d.date).getTime() : NaN }))
        .filter((d) => !Number.isNaN(d.ts))
        .sort((a, b) => a.ts - b.ts);

      const next = dated[0];

      return (
        <div className="flex flex-col gap-1">
          {next ? (
            <Badge
              variant="outline"
              className={getSoonness(next.date) ? 'bg-red-500 text-white border-red-600' : 'bg-orange-500 text-white border-orange-600'}
            >
              <Calendar className="w-4 h-4" />
              Next deadline{next.type ? ` (${next.type})` : ""}: {fmtDate(next.date) || "varies"}
            </Badge>
          ) : (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Deadlines: See list below
            </Badge>
          )}

          <div className="text-sm text-muted-foreground mt-1">
            {deadline.map((d, i) => {
              const formatted = d.date ? fmtDate(d.date) : null;
              return (
                <div key={i} className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {d.type ? <strong>{d.type}: </strong> : null}
                    {formatted ?? d.note ?? "Varies"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (!deadline && notes) {
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {notes}
        </Badge>
      );
    }

    return null;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary mb-4">{opportunity.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(opportunity.category) ? opportunity.category : [opportunity.category]).map(cat => (
              <Badge key={cat} variant="outline" className={getCategoryColor(cat)}>
                {cat}
              </Badge>
            ))}

            <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900 dark:text-purple-100">{opportunity.type}</Badge>

            {opportunity.format.map((f) => (
              <Badge key={f} variant="outline" className="flex items-center gap-1">
                {getFormatIcon(f)}
                {f}
              </Badge>
            ))}

            <Badge variant={getPaidBadgeVariant(opportunity.paid)} className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {opportunity.paid}
            </Badge>

            {opportunity.competitiveness && (
              <Badge
                variant={
                  opportunity.competitiveness === "High"
                    ? "destructive"
                    : opportunity.competitiveness === "Medium"
                    ? "secondary"
                    : "default"
                }
                className="flex items-center gap-1"
              >
                {opportunity.competitiveness} Competitive
              </Badge>
            )}

            {renderDeadlineBadge(opportunity.deadline, opportunity.deadlineNotes)}
          </div>

          {/* Details */}
          <div className="prose prose-sm max-w-none">
            <p className="text-card-foreground leading-relaxed">{opportunity.details}</p>
          </div>

          {/* Deadline Notes */}
          {opportunity.deadlineNotes && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Deadline Notes</h3>
              <p className="text-sm text-card-foreground leading-relaxed">{opportunity.deadlineNotes}</p>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Eligible Grades</p>
                <p className="text-sm text-muted-foreground">{opportunity.grades.join(", ")}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Season</p>
                <p className="text-sm text-muted-foreground">{opportunity.season}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {opportunity.format.map((f) => getFormatIcon(f))}
              <div>
                <p className="text-sm font-medium">Format</p>
                <p className="text-sm text-muted-foreground">{opportunity.format.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Eligibility */}
          {opportunity.eligibility && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Eligibility</h3>
              <p className="text-sm text-card-foreground leading-relaxed">{opportunity.eligibility}</p>
            </div>
          )}

          {/* Tips */}
          {tipsText && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Tips for Applicants</h3>
              <p className="text-sm text-card-foreground leading-relaxed">{tipsText}</p>
            </div>
          )}

          {/* What They Look For */}
          {opportunity.whatIsLookedFor && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">What They Look For</h3>
              <p className="text-sm text-card-foreground leading-relaxed">{opportunity.whatIsLookedFor}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button asChild className="flex-1">
              <a href={opportunity.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </a>
            </Button>

            <Button variant="outline" asChild className="flex-1">
              <a href={`mailto:${opportunity.email}`} className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact Program
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpportunityModal;