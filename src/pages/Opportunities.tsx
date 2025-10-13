import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import OpportunityCard from "@/components/OpportunityCard";
import OpportunityModal from "@/components/OpportunityModal";
import FilterPanel, { FilterState } from "@/components/FilterPanel";
import opportunitiesData from "@/data/opportunities.json";
import { Opportunity } from "@/types";

const Opportunities = () => {
  // All hooks must be inside the component function
  const [opportunities] = useState<Opportunity[]>(
  opportunitiesData.map((opp) => ({
    ...opp,
    format: Array.isArray(opp.format) ? opp.format : [opp.format],
  })) as Opportunity[]
);

  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>(opportunities);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    grades: [],
    categories: [],
    formats: [],
    seasons: [],
    paidStatus: [],
    types: []
  });

  useEffect(() => {
    let filtered = opportunities;

    // Search filter - comprehensive like Google search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase().trim();
      const searchTerms = searchLower.split(/\s+/); // Split by whitespace
      
      filtered = filtered.filter(opp => {
        // Create searchable text from all relevant fields
        const searchableText = [
          opp.title,
          opp.details,
          opp.type,
          opp.season,
          opp.paid,
          Array.isArray(opp.category) ? opp.category.join(' ') : opp.category,
          Array.isArray(opp.format) ? opp.format.join(' ') : opp.format,
          opp.grades.join(' '),
          opp.eligibility || '',
          Array.isArray(opp.tips) ? opp.tips.join(' ') : (opp.tips || ''),
          opp.whatIsLookedFor || '',
          opp.deadlineNotes || ''
        ].join(' ').toLowerCase();
        
        // Match if all search terms are found somewhere in the searchable text
        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    // Grade filter
    if (filters.grades.length > 0) {
      filtered = filtered.filter(opp =>
        opp.grades.some(grade => filters.grades.includes(grade))
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
  filtered = filtered.filter(opp =>
    Array.isArray(opp.category)
      ? opp.category.some(cat => filters.categories.includes(cat))
      : filters.categories.includes(opp.category)
  );
}

    // Format filter
    if (filters.formats.length > 0) {
      filtered = filtered.filter(opp =>
        opp.format.some(f => filters.formats.includes(f))
      );
    }

    // Season filter
    if (filters.seasons.length > 0) {
      filtered = filtered.filter(opp =>
        filters.seasons.includes(opp.season)
      );
    }

    // Paid status filter
    if (filters.paidStatus.length > 0) {
      filtered = filtered.filter(opp =>
        filters.paidStatus.includes(opp.paid)
      );
    }

    // Type filter
    if (filters.types.length > 0) {
      filtered = filtered.filter(opp => {
        // Check if "Others" is selected and this opportunity doesn't match the main types
        const isOther = !['Research Program', 'Competition', 'Summer Program'].includes(opp.type);
        
        if (filters.types.includes('Others') && isOther) {
          return true;
        }
        
        return filters.types.includes(opp.type);
      });
    }

    // Sort by deadline - urgent deadlines first
    filtered.sort((a, b) => {
      const getDeadlineTimestamp = (opp: Opportunity) => {
        if (!opp.deadline) return Infinity;
        
        if (Array.isArray(opp.deadline)) {
          const firstDeadline = opp.deadline.find(d => d.date);
          if (!firstDeadline?.date) return Infinity;
          return new Date(firstDeadline.date).getTime();
        }
        
        const timestamp = new Date(opp.deadline).getTime();
        return isNaN(timestamp) ? Infinity : timestamp;
      };

      const isDeadlineSoon = (timestamp: number) => {
        if (timestamp === Infinity) return false;
        const now = Date.now();
        const diffDays = (timestamp - now) / (1000 * 60 * 60 * 24);
        return diffDays <= 15 && diffDays >= 0;
      };

      const aTime = getDeadlineTimestamp(a);
      const bTime = getDeadlineTimestamp(b);
      const aSoon = isDeadlineSoon(aTime);
      const bSoon = isDeadlineSoon(bTime);

      // Urgent deadlines first
      if (aSoon && !bSoon) return -1;
      if (!aSoon && bSoon) return 1;
      
      // Then sort by deadline date
      if (aTime !== Infinity && bTime !== Infinity) {
        return aTime - bTime;
      }
      
      // No deadline goes last
      if (aTime === Infinity && bTime !== Infinity) return 1;
      if (aTime !== Infinity && bTime === Infinity) return -1;
      
      return 0;
    });

    setFilteredOpportunities(filtered);
  }, [searchTerm, filters, opportunities]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Global Opportunities for Students
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Explore curated internships, competitions, research programs, and summer schools 
              for high school students worldwide. Filter by grade, category, type, season, or paid/free status.
            </p>
            <Button variant="secondary" size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              Submit Opportunity
            </Button>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search opportunities by title, description, category, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Filters */}
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            totalCount={opportunities.length}
            filteredCount={filteredOpportunities.length}
          />
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Available Opportunities
            </h2>
            <p className="text-muted-foreground">
              Showing {filteredOpportunities.length} of {opportunities.length} opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityModal key={opportunity.id} opportunity={opportunity}>
                <OpportunityCard 
                  opportunity={opportunity} 
                  onClick={() => {}} 
                />
              </OpportunityModal>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No opportunities found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or browse all available opportunities.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Opportunities;