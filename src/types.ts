export interface DeadlineEntry {
  date: string;
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
  format: string[]; // always array
  paid: string;
  link: string;
  email: string;
  eligibility?: string;
 tips?: string | string[];
  whatIsLookedFor?: string;
  competition?: "High" | "Medium" | "Low";
  deadline?: string | null | DeadlineEntry[];
  deadlineNotes?: string;
}