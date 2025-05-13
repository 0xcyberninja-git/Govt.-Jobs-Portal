import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { blogs } from '../data/mockBlogs';
import Card, { CardContent, CardFooter } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const BlogsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  
  // Get unique categories and tags
  const categories = Array.from(new Set(blogs.map(blog => blog.category)));
  const allTags = blogs.flatMap(blog => blog.tags);
  const uniqueTags = Array.from(new Set(allTags));
  
  useEffect(() => {
    let results = [...blogs];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(blog => 
        blog.title.toLowerCase().includes(term) || 
        blog.excerpt.toLowerCase().includes(term) || 
        blog.content.toLowerCase().includes(term) ||
        blog.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      results = results.filter(blog => blog.category === selectedCategory);
    }
    
    setFilteredBlogs(results);
  }, [searchTerm, selectedCategory]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Latest Updates & News</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest news, exam updates, and career advice for government job aspirants.
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-10">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search articles by title, content, or tags..."
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
              
              <div className="w-full md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <Button type="submit">
                Search
              </Button>
              
              {(searchTerm || selectedCategory) && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              )}
            </form>
          </div>
        </div>
        
        {/* Popular Tags */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="default" 
                className="cursor-pointer hover:bg-gray-200"
                onClick={() => setSearchTerm(tag)}
              >
                <Tag size={14} className="mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Blog Listing */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
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
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="default" 
                        size="sm"
                        className="cursor-pointer hover:bg-gray-200"
                        onClick={() => setSearchTerm(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>
                      {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <Link to={`/blogs/${blog.id}`} className="text-primary-600 font-medium flex items-center hover:text-primary-700">
                    Read More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any articles matching your search criteria. Try different keywords or categories.
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;