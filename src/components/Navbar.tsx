import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, Heart, X } from 'lucide-react';
import { Button } from './ui/button';
import { LanguageToggle } from './LanguageToggle';
import { useState } from 'react';
import bobLogo from 'figma:asset/c3cbe0198340d6bed05c69174ee79f3b6a4d8624.png';

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/properties', label: 'Properties' },
    { path: '/agents', label: 'Agents' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0E56A4] border-b border-[#0A3F79] shadow-md transition-shadow">
      <div className="container mx-auto px-4 md:px-4 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-3 lg:h-28">
          {/* Logo - Horizontal Layout - Enhanced Size */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={bobLogo} 
              alt="Best of Bedz Rentalz" 
              className="h-16 md:h-16 lg:h-24 w-auto object-contain max-w-none"
            />
          </Link>

          {/* Desktop Navigation - Hidden on Mobile & Tablet */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-[#E9C500]'
                    : 'text-white hover:text-[#E9C500]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions - Hidden on Mobile & Tablet */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageToggle />
            <Link to="/properties">
              <Button variant="ghost" size="icon" className="text-white hover:text-[#E9C500] hover:bg-[#0A3F79] transition-all duration-200">
                <Search className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="text-white hover:text-[#E9C500] hover:bg-[#0A3F79] transition-all duration-200">
                <Heart className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-[#E9C500] text-[#0E56A4] hover:bg-[#E3B600] font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 px-5">
                Sign In
              </Button>
            </Link>
            <Link to="/role-selection">
              <Button className="bg-[#E9C500] text-[#0E56A4] hover:bg-[#E3B600] font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 px-5">
                Sign Up
              </Button>
            </Link>
            <Link to="/list-property">
              <Button className="bg-gradient-to-r from-[#E9C500] to-[#DDB400] hover:from-[#E3B600] hover:to-[#D0A700] text-[#0E56A4] font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                List Property
              </Button>
            </Link>
          </div>

          {/* Mobile & Tablet Menu Button - Hidden on Desktop */}
          <button
            className="flex md:flex lg:hidden p-2 text-white hover:text-[#E9C500] transition-all duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile & Tablet Menu - Hidden on Desktop */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#0A3F79]">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-2 transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-[#E9C500]'
                      : 'text-white hover:text-[#E9C500]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Language Toggle - Mobile & Tablet */}
              <div className="py-2">
                <LanguageToggle />
              </div>
              
              {/* Auth Buttons - Mobile & Tablet */}
              <div className="flex gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <Button className="w-full bg-[#E9C500] text-[#0E56A4] hover:bg-[#E3B600] font-semibold transition-all duration-200">
                    Sign In
                  </Button>
                </Link>
                <Link to="/role-selection" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <Button className="w-full bg-[#E9C500] text-[#0E56A4] hover:bg-[#E3B600] font-semibold transition-all duration-200">
                    Sign Up
                  </Button>
                </Link>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Link to="/favorites" className="flex-1">
                  <Button variant="outline" className="w-full border-[#E9C500] text-[#E9C500] hover:bg-[#E9C500] hover:text-[#0E56A4]">
                    <Heart className="w-4 h-4 mr-2" />
                    Favorites
                  </Button>
                </Link>
                <Link to="/list-property" className="flex-1">
                  <Button className="w-full bg-[#E9C500] hover:bg-[#E3B600] text-[#0E56A4] font-semibold">
                    List Property
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}