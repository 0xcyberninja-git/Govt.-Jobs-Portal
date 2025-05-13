import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Briefcase, 
  User, 
  DollarSign, 
  FileText, 
  Clock, 
  Share2, 
  Bookmark, 
  AlertCircle, 
  Award,
  Facebook,
  Twitter,
  Linkedin,
  Printer,
  ArrowLeft
} from 'lucide-react';
import { jobs } from '../data/mockJobs';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card, { CardContent, CardHeader } from '../components/ui/Card';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const job = jobs.find(job => job.id === id);
  
  if (!job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
        <p className="text-gray-600 mb-8">The job you're looking for doesn't exist or has been removed.</p>
        <Link to="/jobs">
          <Button>Back to Jobs</Button>
        </Link>
      </div>
    );
  }
  
  // Format dates
  const postedDate = new Date(job.postedDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  
  const lastDate = new Date(job.lastDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/jobs" className="text-primary-600 hover:text-primary-700 flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Back to Jobs
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="primary">{job.category.toUpperCase()}</Badge>
                <Badge 
                  variant={job.status === 'open' ? 'success' : job.status === 'upcoming' ? 'warning' : 'danger'}
                >
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
                <Badge variant="default">{job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}</Badge>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              <h2 className="text-lg text-gray-700 mb-6">{job.department}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin size={20} className="mr-3 text-primary-600" />
                  <span>{job.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <DollarSign size={20} className="mr-3 text-primary-600" />
                  <span>{job.salary}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Briefcase size={20} className="mr-3 text-primary-600" />
                  <span>Vacancies: {job.vacancies}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <User size={20} className="mr-3 text-primary-600" />
                  <span>Age Limit: {job.ageLimit}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Calendar size={20} className="mr-3 text-primary-600" />
                  <span>Posted: {postedDate}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Clock size={20} className="mr-3 text-primary-600" />
                  <span>Last Date: {lastDate}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                  <Button>Apply Now</Button>
                </a>
                <Button variant="outline" icon={<Bookmark size={18} />}>
                  Save Job
                </Button>
                <div className="relative group">
                  <Button variant="outline" icon={<Share2 size={18} />}>
                    Share
                  </Button>
                  <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Facebook size={16} className="mr-2" />
                      Facebook
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`${job.title} at ${job.department}`)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Twitter size={16} className="mr-2" />
                      Twitter
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Linkedin size={16} className="mr-2" />
                      LinkedIn
                    </a>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  icon={<Printer size={18} />}
                  onClick={() => window.print()}
                >
                  Print
                </Button>
              </div>
            </div>
            
            {/* Job Description */}
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-xl font-semibold">Job Description</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </CardContent>
            </Card>
            
            {/* Qualifications */}
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-xl font-semibold">Qualifications</h3>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {job.qualifications.map((qualification, index) => (
                    <li key={index}>{qualification}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Selection Process */}
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-xl font-semibold">Selection Process</h3>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside text-gray-700 space-y-4">
                  {job.selectionProcess.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 font-semibold">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            
            {/* Application Fee */}
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-xl font-semibold">Application Fee</h3>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fee (₹)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">General</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{job.applicationFee.general}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">OBC</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{job.applicationFee.obc}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">SC</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{job.applicationFee.sc}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">ST</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{job.applicationFee.st}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">PwD</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{job.applicationFee.pwd}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Important Dates */}
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-xl font-semibold">Important Dates</h3>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Application Start Date</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(job.importantDates.applicationStart).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Application End Date</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(job.importantDates.applicationEnd).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </td>
                      </tr>
                      {job.importantDates.examDate && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Examination Date</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {new Date(job.importantDates.examDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </td>
                        </tr>
                      )}
                      {job.importantDates.resultDate && (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Result Date</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {new Date(job.importantDates.resultDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Application Summary */}
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-xl font-semibold">Application Summary</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-1">Application Deadline</p>
                    <p className="font-semibold text-lg flex items-center">
                      <Calendar size={18} className="mr-2 text-primary-600" />
                      {new Date(job.lastDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-1">Vacancies</p>
                    <p className="font-semibold text-lg flex items-center">
                      <Briefcase size={18} className="mr-2 text-primary-600" />
                      {job.vacancies}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-1">Job Type</p>
                    <p className="font-semibold text-lg flex items-center">
                      <FileText size={18} className="mr-2 text-primary-600" />
                      {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-1">Location</p>
                    <p className="font-semibold text-lg flex items-center">
                      <MapPin size={18} className="mr-2 text-primary-600" />
                      {job.location}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 mb-1">Salary</p>
                    <p className="font-semibold text-lg flex items-center">
                      <DollarSign size={18} className="mr-2 text-primary-600" />
                      {job.salary}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full">Apply Now</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
            
            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Similar Jobs</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs
                    .filter(j => j.id !== job.id && j.category === job.category)
                    .slice(0, 3)
                    .map((similarJob) => (
                      <div key={similarJob.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <Link to={`/jobs/${similarJob.id}`}>
                          <h4 className="font-medium hover:text-primary-600 transition-colors">{similarJob.title}</h4>
                        </Link>
                        <p className="text-gray-600 text-sm mb-2">{similarJob.department}</p>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <MapPin size={14} className="mr-1" />
                          <span>{similarJob.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="primary" size="sm">{similarJob.category.toUpperCase()}</Badge>
                          <Badge 
                            variant={similarJob.status === 'open' ? 'success' : similarJob.status === 'upcoming' ? 'warning' : 'danger'}
                            size="sm"
                          >
                            {similarJob.status.charAt(0).toUpperCase() + similarJob.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;