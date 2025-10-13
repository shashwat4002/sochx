import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Filter, RotateCcw } from "lucide-react";

export interface FilterState {
  grades: string[];
  categories: string[];
  formats: string[];
  seasons: string[];
  paidStatus: string[];
  types: string[];
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}

const FilterPanel = ({ filters, onFiltersChange, totalCount, filteredCount }: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const gradeOptions = ["9", "10", "11", "12", "Gap year"];
  const categoryOptions = ["STEM", "Humanities", "Social Sciences", "Business", "Journalism"];
  const formatOptions = ["Virtual", "In-person", "Hybrid"];
  const seasonOptions = ["Summer", "Winter", "Spring", "Fall", "School Year"];
  const paidOptions = ["Paid", "Free", "Almost free-Aid"];
  const typeOptions = ["Research Program", "Competition", "Summer Program", "Others"];

  const handleFilterChange = (filterType: keyof FilterState, value: string, checked: boolean) => {
    const currentValues = filters[filterType];
    let newValues: string[];
    
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }
    
    onFiltersChange({
      ...filters,
      [filterType]: newValues
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      grades: [],
      categories: [],
      formats: [],
      seasons: [],
      paidStatus: [],
      types: []
    });
  };

  const getActiveFilterCount = () => {
    return (
      filters.grades.length +
      filters.categories.length +
      filters.formats.length +
      filters.seasons.length +
      filters.paidStatus.length +
      filters.types.length
    );
  };

  const renderCheckboxGroup = (
    title: string,
    options: string[],
    filterKey: keyof FilterState,
    selectedValues: string[]
  ) => (
    <div className="space-y-3">
      <h4 className="font-medium text-sm text-foreground">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${filterKey}-${option}`}
              checked={selectedValues.includes(option)}
              onCheckedChange={(checked) => 
                handleFilterChange(filterKey, option, checked as boolean)
              }
            />
            <label
              htmlFor={`${filterKey}-${option}`}
              className="text-sm text-card-foreground cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Filter Button & Summary */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" className="ml-1">
              {getActiveFilterCount()}
            </Badge>
          )}
        </Button>
        
        <div className="text-sm text-muted-foreground">
          Showing {filteredCount} of {totalCount} opportunities
        </div>
      </div>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {filters.grades.map(grade => (
            <Badge key={`grade-${grade}`} variant="outline" className="gap-1">
              Grade {grade}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleFilterChange('grades', grade, false)}
              />
            </Badge>
          ))}
          
          {filters.categories.map(category => (
            <Badge key={`category-${category}`} variant="outline" className="gap-1">
              {category}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleFilterChange('categories', category, false)}
              />
            </Badge>
          ))}
          
          {filters.formats.map(format => (
            <Badge key={`format-${format}`} variant="outline" className="gap-1">
              {format}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleFilterChange('formats', format, false)}
              />
            </Badge>
          ))}
          
          {filters.seasons.map(season => (
            <Badge key={`season-${season}`} variant="outline" className="gap-1">
              {season}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleFilterChange('seasons', season, false)}
              />
            </Badge>
          ))}
          
          {filters.paidStatus.map(paid => (
            <Badge key={`paid-${paid}`} variant="outline" className="gap-1">
              {paid}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleFilterChange('paidStatus', paid, false)}
              />
            </Badge>
          ))}
          
          {filters.types.map(type => (
            <Badge key={`type-${type}`} variant="outline" className="gap-1">
              {type}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleFilterChange('types', type, false)}
              />
            </Badge>
          ))}
          
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-1">
            <RotateCcw className="w-3 h-3" />
            Clear All
          </Button>
        </div>
      )}

      {/* Filter Panel */}
      {isOpen && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center justify-between">
              Filter Opportunities
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {renderCheckboxGroup("Grade Level", gradeOptions, "grades", filters.grades)}
              {renderCheckboxGroup("Academic Area", categoryOptions, "categories", filters.categories)}
              {renderCheckboxGroup("Type", typeOptions, "types", filters.types)}
              {renderCheckboxGroup("Format", formatOptions, "formats", filters.formats)}
              {renderCheckboxGroup("Season", seasonOptions, "seasons", filters.seasons)}
              {renderCheckboxGroup("Cost", paidOptions, "paidStatus", filters.paidStatus)}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-border">
              <Button variant="outline" onClick={clearAllFilters} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset Filters
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Apply Filters ({filteredCount} results)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FilterPanel;