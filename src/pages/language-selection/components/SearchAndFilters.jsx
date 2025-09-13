import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchAndFilters = ({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  totalLanguages,
  filteredCount 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Languages', icon: 'Globe' },
    { id: 'popular', label: 'Popular', icon: 'TrendingUp' },
    { id: 'european', label: 'European', icon: 'MapPin' },
    { id: 'asian', label: 'Asian', icon: 'Mountain' },
    { id: 'americas', label: 'Americas', icon: 'Map' },
    { id: 'african', label: 'African', icon: 'Sun' }
  ];

  const handleCategorySelect = (categoryId) => {
    onCategoryChange(categoryId);
    setIsFilterOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search languages by name or region..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full pl-10"
        />
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
      </div>
      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Desktop Category Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {categories?.map((category) => (
              <Button
                key={category?.id}
                variant={selectedCategory === category?.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategoryChange(category?.id)}
                iconName={category?.icon}
                iconPosition="left"
                className="whitespace-nowrap"
              >
                {category?.label}
              </Button>
            ))}
          </div>

          {/* Mobile Filter Dropdown */}
          <div className="md:hidden relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              iconName="Filter"
              iconPosition="left"
            >
              {categories?.find(cat => cat?.id === selectedCategory)?.label || 'Filter'}
            </Button>

            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-modal z-50">
                {categories?.map((category) => (
                  <button
                    key={category?.id}
                    onClick={() => handleCategorySelect(category?.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-colors ${
                      selectedCategory === category?.id
                        ? 'bg-primary/10 text-primary' :'text-foreground'
                    }`}
                  >
                    <Icon name={category?.icon} size={16} />
                    <span className="font-medium">{category?.label}</span>
                    {selectedCategory === category?.id && (
                      <Icon name="Check" size={16} className="ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          {filteredCount} of {totalLanguages} languages
        </div>
      </div>
      {/* Active Filters */}
      {(searchTerm || selectedCategory !== 'all') && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchTerm && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-accent/10 text-accent rounded-full text-xs">
              <span>Search: "{searchTerm}"</span>
              <button
                onClick={() => onSearchChange('')}
                className="hover:text-accent/80"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          {selectedCategory !== 'all' && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              <span>{categories?.find(cat => cat?.id === selectedCategory)?.label}</span>
              <button
                onClick={() => onCategoryChange('all')}
                className="hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;