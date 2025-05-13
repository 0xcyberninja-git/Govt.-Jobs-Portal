import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Briefcase as BriefcaseBusiness, BookOpen, Users, Award, Bell, ArrowRight } from 'lucide-react';
import { jobs } from '../data/mockJobs';
import { blogs } from '../data/mockBlogs';
import Button from '../components/ui/Button';
import Card, { CardContent, CardFooter } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { formatDistanceToNow } from 'date-fns';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const featuredJobs = jobs.filter(job => job.status === 'open').slice(0, 4);
  const recentBlogs = blogs.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to the jobs page with search params
    window.location.href = `/jobs?search=${searchTerm}&location=${location}`;
  };

  const jobCategories = [
    { name: 'Central Government', icon: <BriefcaseBusiness className="h-12 w-12 mb-4 text-primary-600" />, count: 350, path: '/jobs?category=central' },
    { name: 'State Government', icon: <Users className="h-12 w-12 mb-4 text-primary-600" />, count: 520, path: '/jobs?category=state' },
    { name: 'Banking & Finance', icon: <Award className="h-12 w-12 mb-4 text-primary-600" />, count: 210, path: '/jobs?category=banking' },
    { name: 'Defence & Police', icon: <BookOpen className="h-12 w-12 mb-4 text-primary-600" />, count: 180, path: '/jobs?category=defence' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-800 to-primary-600 py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-800 to-primary-600 opacity-70"></div>
          <img 
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="People working" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Dream Government Job</h1>
            <p className="text-lg md:text-xl mb-8 text-white/80">
              Discover thousands of government job opportunities across India. Your career in public service starts here.
            </p>
            
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-7 gap-4">
                <div className="relative col-span-1 md:col-span-3">
                  <input
                    type="text"
                    placeholder="Job title, keywords, or department..."
                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
                
                <div className="relative col-span-1 md:col-span-3">
                  <input
                    type="text"
                    placeholder="Location (City or State)"
                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
                
                <Button 
                  type="submit" 
                  className="col-span-1 py-3"
                  icon={<Search size={18} />}
                >
                  Search
                </Button>
              </form>
              
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
                <span>Popular Searches:</span>
                <Link to="/jobs?category=banking" className="hover:text-primary-600 hover:underline">Banking</Link>
                <Link to="/jobs?department=ssc" className="hover:text-primary-600 hover:underline">SSC</Link>
                <Link to="/jobs?department=upsc" className="hover:text-primary-600 hover:underline">UPSC</Link>
                <Link to="/jobs?department=railways" className="hover:text-primary-600 hover:underline">Railways</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore government job opportunities across various sectors and departments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobCategories.map((category, index) => (
              <Link to={category.path} key={index}>
                <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 transition-transform">
                  {category.icon}
                  <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-500">{category.count}+ Jobs Available</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/jobs">
              <Button variant="outline" icon={<ChevronRight size={16} />} iconPosition="right">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Jobs</h2>
            <Link to="/jobs" className="text-primary-600 font-medium flex items-center hover:text-primary-700">
              View All Jobs <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="flex flex-col h-full">
                <CardContent className="flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="primary" size="sm">{job.category.toUpperCase()}</Badge>
                    <Badge 
                      variant={job.status === 'open' ? 'success' : job.status === 'upcoming' ? 'warning' : 'danger'}
                      size="sm"
                    >
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                  </div>
                  <Link to={`/jobs/${job.id}`}>
                    <h3 className="text-lg font-semibold mb-2 hover:text-primary-600">{job.title}</h3>
                  </Link>
                  <p className="text-gray-600 mb-3">{job.department}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    <p className="mb-1">Location: {job.location}</p>
                    <p className="mb-1">Salary: {job.salary}</p>
                    <p>Vacancies: {job.vacancies}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Posted {formatDistanceToNow(new Date(job.postedDate))} ago
                  </span>
                  <Link to={`/jobs/${job.id}`}>
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Alert Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-full p-3">
                <Bell size={32} className="text-secondary-500" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Never Miss a Job Opportunity</h2>
            <p className="text-lg mb-8 text-white/80">
              Subscribe to our job alerts and get the latest government job opportunities delivered directly to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-md focus:outline-none text-gray-800"
              />
              <Button className="whitespace-nowrap bg-white text-secondary-600 hover:bg-gray-100">
                Subscribe Now
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Latest Updates & News</h2>
            <Link to="/blogs" className="text-primary-600 font-medium flex items-center hover:text-primary-700">
              View All Articles <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={blog.coverImage} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <Badge variant="secondary" size="sm">{blog.category}</Badge>
                    <span className="text-sm text-gray-500">{blog.readTime} min read</span>
                  </div>
                  <Link to={`/blogs/${blog.id}`}>
                    <h3 className="text-xl font-semibold mb-3 hover:text-primary-600">{blog.title}</h3>
                  </Link>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <Link to={`/blogs/${blog.id}`} className="text-primary-600 font-medium flex items-center hover:text-primary-700">
                    Read More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose GovtJobPortal</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              India's most trusted platform for government job opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <BriefcaseBusiness className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Listings</h3>
              <p className="text-gray-600">
                Access thousands of verified government job listings from central, state, and public sector organizations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Bell className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Timely Updates</h3>
              <p className="text-gray-600">
                Get real-time notifications about new job postings, application deadlines, and exam schedules.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Resources</h3>
              <p className="text-gray-600">
                Access preparation guides, tips, and resources to help you succeed in government job examinations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;