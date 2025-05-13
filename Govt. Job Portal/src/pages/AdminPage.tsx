import React, { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  Save, 
  Plus, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Trash,
  User,
  Tag
} from 'lucide-react';
import { jobs } from '../data/mockJobs';
import { blogs } from '../data/mockBlogs';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

type Tab = 'jobs' | 'blogs';
type JobFormMode = 'add' | 'edit' | null;
type BlogFormMode = 'add' | 'edit' | null;

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('jobs');
  const [jobFormMode, setJobFormMode] = useState<JobFormMode>(null);
  const [blogFormMode, setBlogFormMode] = useState<BlogFormMode>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  
  // Dummy form state (in a real app, you'd use more sophisticated state management)
  const [jobFormValues, setJobFormValues] = useState({
    title: '',
    department: '',
    location: '',
    salary: '',
    postedDate: new Date().toISOString().split('T')[0],
    lastDate: '',
    category: 'central',
    qualifications: '',
    description: '',
    vacancies: 1,
    jobType: 'permanent',
    ageLimit: '',
  });
  
  const [blogFormValues, setBlogFormValues] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: '',
    coverImage: '',
  });

  const handleJobFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobFormValues({
      ...jobFormValues,
      [name]: value,
    });
  };

  const handleBlogFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBlogFormValues({
      ...blogFormValues,
      [name]: value,
    });
  };

  const handleJobFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    alert(`Job ${jobFormMode === 'add' ? 'added' : 'updated'} successfully!`);
    setJobFormMode(null);
  };

  const handleBlogFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    alert(`Blog post ${blogFormMode === 'add' ? 'added' : 'updated'} successfully!`);
    setBlogFormMode(null);
  };
  
  const selectJobForEdit = (id: string) => {
    const job = jobs.find(job => job.id === id);
    if (job) {
      setSelectedJobId(id);
      setJobFormValues({
        title: job.title,
        department: job.department,
        location: job.location,
        salary: job.salary,
        postedDate: job.postedDate,
        lastDate: job.lastDate,
        category: job.category,
        qualifications: job.qualifications.join('\n'),
        description: job.description,
        vacancies: job.vacancies,
        jobType: job.jobType,
        ageLimit: job.ageLimit,
      });
      setJobFormMode('edit');
    }
  };
  
  const selectBlogForEdit = (id: string) => {
    const blog = blogs.find(blog => blog.id === id);
    if (blog) {
      setSelectedBlogId(id);
      setBlogFormValues({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author,
        category: blog.category,
        tags: blog.tags.join(', '),
        coverImage: blog.coverImage,
      });
      setBlogFormMode('edit');
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            <button
              className={`px-6 py-4 text-lg font-medium ${
                activeTab === 'jobs' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('jobs')}
            >
              <div className="flex items-center">
                <Briefcase size={20} className="mr-2" />
                Manage Jobs
              </div>
            </button>
            <button
              className={`px-6 py-4 text-lg font-medium ${
                activeTab === 'blogs' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('blogs')}
            >
              <div className="flex items-center">
                <FileText size={20} className="mr-2" />
                Manage Blogs
              </div>
            </button>
          </div>
        </div>
        
        {/* Jobs Management */}
        {activeTab === 'jobs' && (
          <div>
            {jobFormMode ? (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-semibold">
                    {jobFormMode === 'add' ? 'Add New Job' : 'Edit Job'}
                  </h2>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleJobFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={jobFormValues.title}
                          onChange={handleJobFormChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                          Department/Organization *
                        </label>
                        <input
                          type="text"
                          id="department"
                          name="department"
                          value={jobFormValues.department}
                          onChange={handleJobFormChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location *
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={jobFormValues.location}
                          onChange={handleJobFormChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                          Salary Range *
                        </label>
                        <input
                          type="text"
                          id="salary"
                          name="salary"
                          value={jobFormValues.salary}
                          onChange={handleJobFormChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="e.g., ₹35,000 - ₹45,000"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="postedDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Posted Date *
                        </label>
                        <input
                          type="date"
                          id="postedDate"
                          name="postedDate"
                          value={jobFormValues.postedDate}
                          onChange={handleJobFormChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Date to Apply *
                        </label>
                        <input
                          type="date"
                          id="lastDate"
                          name="lastDate"
                          value={jobFormValues.lastDate}
                          onChange={handleJobFormChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                          Category *
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={jobFormValues.category}
                          onChange={handleJobFormChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="central">Central Government</option>
                          <option value="state">State Government</option>
                          <option value="psu">PSU</option>
                          <option value="banking">Banking</option>
                          <option value="defence">Defence</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                          Job Type *
                        </label>
                        <select
                          id="jobType"
                          name="jobType"
                          value={jobFormValues.jobType}
                          onChange={handleJobFormChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="permanent">Permanent</option>
                          <option value="contract">Contract</option>
                          <option value="temporary">Temporary</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="vacancies" className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Vacancies *
                        </label>
                        <input
                          type="number"
                          id="vacancies"
                          name="vacancies"
                          value={jobFormValues.vacancies}
                          onChange={handleJobFormChange}
                          required
                          min="1"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="ageLimit" className="block text-sm font-medium text-gray-700 mb-1">
                          Age Limit *
                        </label>
                        <input
                          type="text"
                          id="ageLimit"
                          name="ageLimit"
                          value={jobFormValues.ageLimit}
                          onChange={handleJobFormChange}
                          required
                          placeholder="e.g., 18-35 years"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-1">
                        Qualifications * (One per line)
                      </label>
                      <textarea
                        id="qualifications"
                        name="qualifications"
                        value={jobFormValues.qualifications}
                        onChange={handleJobFormChange}
                        required
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter each qualification on a new line"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Job Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={jobFormValues.description}
                        onChange={handleJobFormChange}
                        required
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setJobFormMode(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        icon={<Save size={18} />}
                      >
                        {jobFormMode === 'add' ? 'Add Job' : 'Update Job'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Job Listings</h2>
                  <Button 
                    onClick={() => {
                      setJobFormValues({
                        title: '',
                        department: '',
                        location: '',
                        salary: '',
                        postedDate: new Date().toISOString().split('T')[0],
                        lastDate: '',
                        category: 'central',
                        qualifications: '',
                        description: '',
                        vacancies: 1,
                        jobType: 'permanent',
                        ageLimit: '',
                      });
                      setJobFormMode('add');
                    }}
                    icon={<Plus size={18} />}
                  >
                    Add New Job
                  </Button>
                </div>
                
                <Card>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Job Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Department
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Location
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Last Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {jobs.map((job) => (
                            <tr key={job.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{job.title}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{job.department}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{job.location}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {new Date(job.lastDate).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge 
                                  variant={job.status === 'open' ? 'success' : job.status === 'upcoming' ? 'warning' : 'danger'}
                                >
                                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => selectJobForEdit(job.id)}
                                    className="text-primary-600 hover:text-primary-900"
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    onClick={() => alert('This would delete the job in a real application')}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}
        
        {/* Blogs Management */}
        {activeTab === 'blogs' && (
          <div>
            {blogFormMode ? (
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-semibold">
                    {blogFormMode === 'add' ? 'Add New Blog Post' : 'Edit Blog Post'}
                  </h2>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBlogFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Blog Title *
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={blogFormValues.title}
                          onChange={handleBlogFormChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                          Author *
                        </label>
                        <input
                          type="text"
                          id="author"
                          name="author"
                          value={blogFormValues.author}
                          onChange={handleBlogFormChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                          Category *
                        </label>
                        <input
                          type="text"
                          id="category"
                          name="category"
                          value={blogFormValues.category}
                          onChange={handleBlogFormChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
                          Cover Image URL *
                        </label>
                        <input
                          type="url"
                          id="coverImage"
                          name="coverImage"
                          value={blogFormValues.coverImage}
                          onChange={handleBlogFormChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                          Tags * (comma separated)
                        </label>
                        <input
                          type="text"
                          id="tags"
                          name="tags"
                          value={blogFormValues.tags}
                          onChange={handleBlogFormChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="tag1, tag2, tag3"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                          Excerpt/Summary *
                        </label>
                        <textarea
                          id="excerpt"
                          name="excerpt"
                          value={blogFormValues.excerpt}
                          onChange={handleBlogFormChange}
                          required
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        ></textarea>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                          Content * (Markdown supported)
                        </label>
                        <textarea
                          id="content"
                          name="content"
                          value={blogFormValues.content}
                          onChange={handleBlogFormChange}
                          required
                          rows={12}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setBlogFormMode(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        icon={<Save size={18} />}
                      >
                        {blogFormMode === 'add' ? 'Add Blog Post' : 'Update Blog Post'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Blog Posts</h2>
                  <Button 
                    onClick={() => {
                      setBlogFormValues({
                        title: '',
                        excerpt: '',
                        content: '',
                        author: '',
                        category: '',
                        tags: '',
                        coverImage: '',
                      });
                      setBlogFormMode('add');
                    }}
                    icon={<Plus size={18} />}
                  >
                    Add New Blog Post
                  </Button>
                </div>
                
                <Card>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Author
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Published Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {blogs.map((blog) => (
                            <tr key={blog.id}>
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{blog.author}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant="secondary">{blog.category}</Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {new Date(blog.publishedDate).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => selectBlogForEdit(blog.id)}
                                    className="text-primary-600 hover:text-primary-900"
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    onClick={() => alert('This would delete the blog post in a real application')}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;