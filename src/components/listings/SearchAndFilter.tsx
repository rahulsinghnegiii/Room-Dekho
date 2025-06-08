"use client";

import { useState } from "react";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: {
    minPrice: number;
    maxPrice: number;
    city: string;
    facilities: string[];
    sortBy: string;
  }) => void;
}

const FACILITY_OPTIONS = [
  "WiFi",
  "Parking",
  "AC",
  "Furnished",
  "Kitchen",
  "Laundry",
  "Security",
  "Power Backup",
  "Water Supply",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export default function SearchAndFilter({ onSearch, onFilter }: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100000,
    city: "",
    facilities: [] as string[],
    sortBy: "newest",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: name.includes("Price") ? Number(value) : value,
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleFacilityChange = (facility: string) => {
    const newFacilities = filters.facilities.includes(facility)
      ? filters.facilities.filter((f) => f !== facility)
      : [...filters.facilities, facility];
    
    const newFilters = {
      ...filters,
      facilities: newFacilities,
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder="Enter city"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {FACILITY_OPTIONS.map((facility) => (
              <label key={facility} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.facilities.includes(facility)}
                  onChange={() => handleFacilityChange(facility)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="text-sm">{facility}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
        >
          Search
        </button>
      </form>
    </div>
  );
} 