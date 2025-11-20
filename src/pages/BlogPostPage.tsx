import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Share2, Tag, ArrowLeft, Facebook, Twitter } from 'lucide-react';
import { blogPosts } from '../data/mockData';
import { Button } from '../components/ui/button';
import { BlogCard } from '../components/BlogCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Blog Post Not Found</h2>
          <Link to="/blog">
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (
      p.category === post.category ||
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post.title;

    let shareUrl = '';
    if (platform === 'whatsapp') {
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    } else {
      // Copy to clipboard
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#D4AF37] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[400px] lg:h-[500px] overflow-hidden"
      >
        <ImageWithFallback
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Category Chip */}
        <div className="absolute top-8 left-8">
          <span className="bg-[#D4AF37] text-white px-4 py-2 rounded-full font-medium">
            {post.category}
          </span>
        </div>
      </motion.div>

      {/* Article Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12"
          >
            {/* Header */}
            <header className="mb-8">
              <h1 className="mb-6">{post.title}</h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(post.publishDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readingTime} read</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">Share:</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShare('whatsapp')}
                  className="gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShare('facebook')}
                  className="gap-2"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShare('twitter')}
                  className="gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  X
                </Button>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-8">
              {post.content.split('\n\n').map((paragraph, index) => {
                // Check if it's a heading (starts with #)
                if (paragraph.startsWith('# ')) {
                  return <h1 key={index} className="mt-8 mb-4">{paragraph.slice(2)}</h1>;
                } else if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="mt-6 mb-4">{paragraph.slice(3)}</h2>;
                } else if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="mt-4 mb-3">{paragraph.slice(4)}</h3>;
                }
                
                // Check if it's a numbered list item
                if (/^\d+\./.test(paragraph)) {
                  const items = paragraph.split('\n').filter(line => /^\d+\./.test(line));
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 mb-4">
                      {items.map((item, i) => {
                        const content = item.replace(/^\d+\.\s*/, '');
                        // Check for bold text (**text**)
                        const parts = content.split(/\*\*(.*?)\*\*/g);
                        return (
                          <li key={i} className="text-gray-700">
                            {parts.map((part, j) => 
                              j % 2 === 0 ? part : <strong key={j}>{part}</strong>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  );
                }

                // Regular paragraph
                const parts = paragraph.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {parts.map((part, i) => 
                      i % 2 === 0 ? part : <strong key={i}>{part}</strong>
                    )}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap pt-6 border-t border-gray-200">
                <Tag className="w-5 h-5 text-gray-400" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-[#F8F7F5] text-gray-700 rounded-full text-sm hover:bg-[#D4AF37] hover:text-white transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.article>

          {/* Author Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <div className="flex items-center gap-6">
              <ImageWithFallback
                src={post.author.photo}
                alt={post.author.name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-100"
              />
              <div>
                <h3 className="text-xl font-semibold mb-1">{post.author.name}</h3>
                <p className="text-gray-600">{post.author.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12"
            >
              <h2 className="mb-6">More from Rental Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
