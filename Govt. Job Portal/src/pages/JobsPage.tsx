import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Filter, ChevronDown, Briefcase, MapPin, Calendar, User, X } from 'lucide-react';
import { jobs } from '../data/mockJobs';
import Card, { CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { FilterOptions, Job } from '../types';
import { formatDistanceToNow } from 'date-fns';

const JobsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  
  const [filters, setFilters] = useState<FilterOptions>({
    department: queryParams.get('department') || '',
    location: queryParams.get('location') || '',
    category: queryParams.get('category') || '',
    jobType: '',
    status: '',
    qualification: '',
  });

  useEffect(() => {
    // Update search and filters when URL params change
    const searchParam = queryParams.get('search');
    if (searchParam) setSearchTerm(searchParam);
    
    setFilters({
      ...filters,
      department: queryParams.get('department') || filters.department,
      location: queryParams.get('location') || filters.location,
      category: queryParams.get('category') || filters.category,
    });
  }, [location.search]);

  useEffect(() => {
    // Apply filters and search
    let results = [...jobs];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(term) || 
        job.department.toLowerCase().includes(term) || 
        job.description.toLowerCase().includes(term)
      );
    }
    
    // Apply filters
    if (filters.category) {
      results = results.filter(job => job.category === filters.category);
    }
    
    if (filters.department) {
      results = results.filter(job => 
        job.department.toLowerCase().includes(filters.department.toLowerCase())
      );
    }
    
    if (filters.location) {
      results = results.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.jobType) {
      results = results.filter(job => job.jobType === filters.jobType);
    }
    
    if (filters.status) {
      results = results.filter(job => job.status === filters.status);
    }
    
    if (filters.qualification) {
      results = results.filter(job => 
        job.qualifications.some(q => 
          q.toLowerCase().includes(filters.qualification?.toLowerCase() || '')
        )
      );
    }
    
    setFilteredJobs(results);
  }, [searchTerm, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search params (in a real app)
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    setFilters({
      department: '',
      location: '',
      category: '',
      jobType: '',
      status: '',
      qualification: '',
    });
    setSearchTerm('');
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  // Get unique filter options
  const departments = Array.from(new Set(jobs.map(job => job.department)));
  const locations = Array.from(new Set(jobs.map(job => job.location)));
  const categories = Array.from(new Set(jobs.map(job => job.category)));
  const jobTypes = Array.from(new Set(jobs.map(job => job.jobType)));
  const statuses = Array.from(new Set(jobs.map(job => job.status)));
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Filters Sidebar */}
          <div className={`md:block ${isFilterOpen ? 'block' : 'hidden'} w-full md:w-1/4 bg-white rounded-lg shadow-md p-6 sticky top-20`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear All
                </button>
              )}
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Job Category</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category}`}
                      name="category"
                      checked={filters.category === category}
                      onChange={() => handleFilterChange('category', category)}
                      className="mr-2 accent-primary-600"
                    />
                    <label htmlFor={`category-${category}`} className="text-gray-700">
                      {category.charAt(0).toUpperCase() + category.slice(1)} Government
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Location</h3>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="">All Locations</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            {/* Department Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Department</h3>
              <select
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="">All Departments</option>
                {departments.map((department, index) => (
                  <option key={index} value={department}>{department}</option>
                ))}
              </select>
            </div>
            
            {/* Job Type Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Job Type</h3>
              <div className="space-y-2">
                {jobTypes.map((type, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`jobType-${type}`}
                      name="jobType"
                      checked={filters.jobType === type}
                      onChange={() => handleFilterChange('jobType', type)}
                      className="mr-2 accent-primary-600"
                    />
                    <label htmlFor={`jobType-${type}`} className="text-gray-700">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Status</h3>
              <div className="space-y-2">
                {statuses.map((status, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`status-${status}`}
                      name="status"
                      checked={filters.status === status}
                      onChange={() => handleFilterChange('status', status)}
                      className="mr-2 accent-primary-600"
                    />
                    <label htmlFor={`status-${status}`} className="text-gray-700">
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {/* Search and Filter Buttons */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search jobs by title, department, or keyword..."
                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
                
                <Button 
                  type="submit" 
                  className="whitespace-nowrap"
                >
                  Search Jobs
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="whitespace-nowrap md:hidden"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  icon={<Filter size={18} />}
                >
                  {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </form>
            </div>
            
            {/* Applied Filters */}
            {hasActiveFilters && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-gray-700 font-medium">Applied Filters:</span>
                  
                  {filters.category && (
                    <Badge variant="primary" className="flex items-center gap-1">
                      Category: {filters.category}
                      <button onClick={() => handleFilterChange('category', '')}>
                        <X size={14} />
                      </button>
                    </Badge>
                  )}
                  
                  {filters.location && (
                    <Badge variant="primary" className="flex items-center gap-1">
                      Location: {filters.location}
                      <button onClick={() => handleFilterChange('location', '')}>
                        <X size={14} />
                      </button>
                    </Badge>
                  )}
                  
                  {filters.department && (
                    <Badge variant="primary" className="flex items-center gap-1">
                      Department: {filters.department}
                      <button onClick={() => handleFilterChange('department', '')}>
                        <X size={14} />
                      </button>
                    </Badge>
                  )}
                  
                  {filters.jobType && (
                    <Badge variant="primary" className="flex items-center gap-1">
                      Job Type: {filters.jobType}
                      <button onClick={() => handleFilterChange('jobType', '')}>
                        <X size={14} />
                      </button>
                    </Badge>
                  )}
                  
                  {filters.status && (
                    <Badge variant="primary" className="flex items-center gap-1">
                      Status: {filters.status}
                      <button onClick={() => handleFilterChange('status', '')}>
                        <X size={14} />
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {/* Jobs Count */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Available Government Jobs</h1>
              <p className="text-gray-600">Showing {filteredJobs.length} jobs matching your criteria</p>
            </div>
            
            {/* Jobs List */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent>
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="primary">{job.category.toUpperCase()}</Badge>
                            <Badge 
                              variant={job.status === 'open' ? 'success' : job.status === 'upcoming' ? 'warning' : 'danger'}
                            >
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </Badge>
                            <Badge variant="default">{job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}</Badge>
                          </div>
                          
                          <Link to={`/jobs/${job.id}`}>
                            <h2 className="text-xl font-semibold mb-2 hover:text-primary-600">{job.title}</h2>
                          </Link>
                          
                          <p className="text-gray-700 mb-4">{job.department}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                            <div className="flex items-center text-gray-600">
                              <MapPin size={18} className="mr-2 text-gray-500" />
                              <span>{job.location}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-600">
                              <Briefcase size={18} className="mr-2 text-gray-500" />
                              <span>Vacancies: {job.vacancies}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-600">
                              <Calendar size={18} className="mr-2 text-gray-500" />
                              <span>Last Date: {new Date(job.lastDate).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-600">
                              <User size={18} className="mr-2 text-gray-500" />
                              <span>Age Limit: {job.ageLimit}</span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="font-medium">Qualifications:</p>
                            <ul className="list-disc list-inside text-gray-600 ml-2">
                              {job.qualifications.slice(0, 2).map((qualification, index) => (
                                <li key={index}>{qualification}</li>
                              ))}
                              {job.qualifications.length > 2 && <li>And more...</li>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="text-gray-600 text-sm w-full sm:w-auto">
                        <p>Salary: <span className="font-medium">{job.salary}</span></p>
                        <p>Posted {formatDistanceToNow(new Date(job.postedDate))} ago</p>
                      </div>
                      
                      <div className="flex gap-3 w-full sm:w-auto">
                        <Link to={`/jobs/${job.id}`} className="w-full sm:w-auto">
                          <Button variant="outline" size="sm" className="w-full">
                            View Details
                          </Button>
                        </Link>
                        <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                          <Button size="sm" className="w-full">
                            Apply Now
                          </Button>
                        </a>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any jobs matching your criteria. Try adjusting your filters or search term.
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;