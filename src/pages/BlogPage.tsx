import { useState } from 'react';
import { Search, Tag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { BlogCard } from '../components/BlogCard';
import { blogPosts } from '../data/mockData';
import { motion } from 'motion/react';
import { Input } from '../components/ui/input';

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F8F7F5] to-white py-8 md:py-10 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="mb-3 text-[28px] md:text-[32px] lg:text-[36px]">Rental Insights</h1>
            <p className="text-[15px] md:text-[16px] lg:text-[17px] text-gray-600">
              Expert advice, market insights, and helpful guides to make your rental journey easier
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6 md:py-8 lg:py-10 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-4 lg:space-y-5">
              {/* Search */}
              <div className="bg-white rounded-xl p-4 lg:p-5 shadow-sm border border-gray-100">
                <h3 className="text-[16px] lg:text-[17px] font-semibold mb-3">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 lg:pl-10 h-10 lg:h-11"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl p-4 lg:p-5 shadow-sm border border-gray-100">
                <h3 className="text-[16px] lg:text-[17px] font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 text-sm lg:text-[15px] rounded-lg transition-colors ${
                      !selectedCategory
                        ? 'bg-[#D4AF37] text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    All Posts
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 text-sm lg:text-[15px] rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-[#D4AF37] text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Posts */}
              <div className="bg-white rounded-xl p-4 lg:p-5 shadow-sm border border-gray-100">
                <h3 className="text-[16px] lg:text-[17px] font-semibold mb-3">Featured Posts</h3>
                <div className="space-y-3 lg:space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex gap-3">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-14 h-14 lg:w-16 lg:h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-medium line-clamp-2 hover:text-[#D4AF37] transition-colors cursor-pointer">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{post.readingTime} read</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl p-4 lg:p-5 shadow-sm border border-gray-100">
                <h3 className="text-[16px] lg:text-[17px] font-semibold mb-3">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#F8F7F5] text-xs lg:text-sm rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

            {/* Blog Posts Grid */}
            <div className="lg:col-span-3">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No posts found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 md:py-14 lg:py-16 bg-[#F8F7F5]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="mb-3 text-[22px] md:text-[24px] lg:text-[26px]">Stay Updated</h3>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 mb-6 lg:mb-8">
              Subscribe to our newsletter for the latest rental tips, market insights, and property updates
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 lg:py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D4AF37] text-sm lg:text-base"
              />
              <Button className="gold-gradient text-white px-5 lg:px-6 rounded-xl hover:opacity-90 text-sm lg:text-base">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}