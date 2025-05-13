import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { blogs } from '../data/mockBlogs';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogs.find(blog => blog.id === id);
  
  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/blogs">
          <Button>Back to Blogs</Button>
        </Link>
      </div>
    );
  }
  
  // Get related blogs (same category, excluding current)
  const relatedBlogs = blogs
    .filter(b => b.id !== blog.id && b.category === blog.category)
    .slice(0, 3);
  
  // Format the content with markdown
  const createMarkup = (content: string) => {
    return { __html: DOMPurify.sanitize(marked(content)) };
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/blogs" className="text-primary-600 hover:text-primary-700 flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Back to Blogs
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Blog Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="h-64 md:h-80">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{blog.category}</Badge>
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="default">{tag}</Badge>
                  ))}
                </div>
                
                <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
                
                <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    <span>{blog.author}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>
                      {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>{blog.readTime} min read</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
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
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`} 
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
                </div>
              </div>
            </div>
            
            {/* Blog Content */}
            <Card className="mb-8">
              <CardContent className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={createMarkup(blog.content)} />
              </CardContent>
            </Card>
            
            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <Link key={index} to={`/blogs?tag=${tag}`}>
                    <Badge variant="default" className="flex items-center">
                      <Tag size={14} className="mr-1" />
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Author Bio */}
            <Card className="mb-8">
              <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-4 py-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={32} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{blog.author}</h3>
                  <p className="text-gray-600 mb-4">
                    Expert in government job examinations and career counseling with over 10 years of experience in guiding aspirants for various competitive exams.
                  </p>
                  <div className="flex gap-2">
                    <a href="#" className="text-gray-600 hover:text-primary-600">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary-600">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary-600">
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Articles */}
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-xl font-semibold">Related Articles</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedBlogs.map((relatedBlog) => (
                    <div key={relatedBlog.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <Link to={`/blogs/${relatedBlog.id}`}>
                        <h4 className="font-medium hover:text-primary-600 transition-colors">
                          {relatedBlog.title}
                        </h4>
                      </Link>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(relatedBlog.publishedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {relatedBlog.readTime} min read
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Categories */}
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-xl font-semibold">Categories</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(blogs.map(b => b.category))).map((category, index) => {
                    const count = blogs.filter(b => b.category === category).length;
                    return (
                      <Link key={index} to={`/blogs?category=${category}`} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                        <span className="text-gray-700">{category}</span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {count}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Popular Tags</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogs.flatMap(b => b.tags))).map((tag, index) => (
                    <Link key={index} to={`/blogs?tag=${tag}`}>
                      <Badge variant="default" className="flex items-center">
                        <Tag size={14} className="mr-1" />
                        {tag}
                      </Badge>
                    </Link>
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

export default BlogDetailPage;