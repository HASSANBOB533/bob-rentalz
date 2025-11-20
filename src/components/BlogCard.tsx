import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Link to={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all border border-gray-100"
      >
        {/* Featured Image */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <ImageWithFallback
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Category Chip */}
          <div className="absolute top-4 left-4 bg-[#D4AF37] text-white px-4 py-1.5 rounded-full text-sm font-medium">
            {post.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishDate)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} read</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold mb-3 text-[#2B2B2B] group-hover:text-[#D4AF37] transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-[#D4AF37] font-medium group-hover:gap-3 transition-all">
            <span>Read More</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
