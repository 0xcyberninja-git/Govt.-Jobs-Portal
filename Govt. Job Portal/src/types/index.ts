export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  salary: string;
  postedDate: string;
  lastDate: string;
  category: 'central' | 'state' | 'psu' | 'banking' | 'defence';
  qualifications: string[];
  description: string;
  vacancies: number;
  jobType: 'permanent' | 'contract' | 'temporary';
  ageLimit: string;
  applicationFee: {
    general: number;
    obc: number;
    sc: number;
    st: number;
    pwd: number;
  };
  applyLink: string;
  selectionProcess: string[];
  importantDates: {
    applicationStart: string;
    applicationEnd: string;
    examDate?: string;
    resultDate?: string;
  };
  status: 'open' | 'closed' | 'upcoming';
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  publishedDate: string;
  readTime: number;
}

export interface FilterOptions {
  department?: string;
  location?: string;
  category?: string;
  jobType?: string;
  status?: string;
  qualification?: string;
}