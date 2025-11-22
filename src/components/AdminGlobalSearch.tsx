import { Search, X, ArrowRight, Building, User, Users, FileText, UserCheck } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { properties, agents } from '../data/mockData';

// Extended Mock Data for Search
const mockTenants = [
  { id: '1', name: 'Layla Hassan', email: 'layla@example.com', phone: '+20 100 111 2222' },
  { id: '2', name: 'Ahmed Mahmoud', email: 'ahmed@example.com', phone: '+20 100 222 3333' },
  { id: '3', name: 'Sara Ibrahim', email: 'sara@example.com', phone: '+20 100 333 4444' },
];

const mockOwners = [
  { id: '1', name: 'Mohamed Ali', email: 'm.ali@example.com', phone: '+20 100 555 6666' },
  { id: '2', name: 'Fatima Ahmed', email: 'f.ahmed@example.com', phone: '+20 100 777 8888' },
  { id: '3', name: 'Omar Ibrahim', email: 'o.ibrahim@example.com', phone: '+20 100 999 0000' },
];

const mockLeads = [
  { id: '1', name: 'Khaled Youssef', interest: 'Luxury Villa', status: 'New' },
  { id: '2', name: 'Nour Hassan', interest: '3BR Apartment', status: 'Contacted' },
  { id: '3', name: 'Hassan Moustafa', interest: 'Studio Downtown', status: 'Qualified' },
];

interface SearchResult {
  id: string;
  type: 'Property' | 'Tenant' | 'Agent' | 'Owner' | 'Lead';
  title: string;
  subtitle: string;
  link: string;
}

export function AdminGlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const newResults: SearchResult[] = [];

    // Search Properties
    properties.forEach((p) => {
      if (
        p.title.toLowerCase().includes(lowerQuery) ||
        p.location.toLowerCase().includes(lowerQuery) ||
        p.referenceCode?.toLowerCase().includes(lowerQuery)
      ) {
        newResults.push({
          id: p.id,
          type: 'Property',
          title: p.title,
          subtitle: p.referenceCode || p.location,
          link: `/admin/properties/${p.id}`,
        });
      }
    });

    // Search Tenants
    mockTenants.forEach((t) => {
      if (t.name.toLowerCase().includes(lowerQuery) || t.email.toLowerCase().includes(lowerQuery)) {
        newResults.push({
          id: t.id,
          type: 'Tenant',
          title: t.name,
          subtitle: t.email,
          link: `/admin/tenants/${t.id}`,
        });
      }
    });

    // Search Agents
    agents.forEach((a) => {
      if (a.name.toLowerCase().includes(lowerQuery) || a.email.toLowerCase().includes(lowerQuery)) {
        newResults.push({
          id: a.id,
          type: 'Agent',
          title: a.name,
          subtitle: a.email,
          link: `/admin/agents/${a.id}`,
        });
      }
    });

    // Search Owners
    mockOwners.forEach((o) => {
      if (o.name.toLowerCase().includes(lowerQuery) || o.email.toLowerCase().includes(lowerQuery)) {
        newResults.push({
          id: o.id,
          type: 'Owner',
          title: o.name,
          subtitle: o.email,
          link: `/admin/owners/${o.id}`,
        });
      }
    });

    // Search Leads
    mockLeads.forEach((l) => {
      if (
        l.name.toLowerCase().includes(lowerQuery) ||
        l.interest.toLowerCase().includes(lowerQuery)
      ) {
        newResults.push({
          id: l.id,
          type: 'Lead',
          title: l.name,
          subtitle: `Interested in: ${l.interest}`,
          link: `/admin/leads/${l.id}`,
        });
      }
    });

    setResults(newResults);
  }, [query]);

  const handleSelect = (link: string) => {
    navigate(link);
    setIsOpen(false);
    setQuery('');
  };

  const groupedResults = {
    PROPERTIES: results.filter((r) => r.type === 'Property'),
    TENANTS: results.filter((r) => r.type === 'Tenant'),
    AGENTS: results.filter((r) => r.type === 'Agent'),
    OWNERS: results.filter((r) => r.type === 'Owner'),
    LEADS: results.filter((r) => r.type === 'Lead'),
  };

  const hasResults = results.length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-full mb-6">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0E56A4] focus:border-[#0E56A4] sm:text-sm shadow-sm transition-shadow"
          placeholder="Search properties, tenants, agents, owners, or leads..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Desktop Dropdown / Mobile Overlay */}
      {isOpen && query.length >= 2 && (
        <>
          {/* Mobile Overlay Background */}
          <div className="fixed inset-0 bg-white z-50 md:hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Search</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0E56A4]"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {renderResultsList(groupedResults, handleSelect, hasResults)}
            </div>
          </div>

          {/* Desktop Dropdown */}
          <div className="hidden md:block absolute mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 max-h-[600px] overflow-y-auto">
            {renderResultsList(groupedResults, handleSelect, hasResults)}
          </div>
        </>
      )}
    </div>
  );
}

function renderResultsList(
  groupedResults: any,
  handleSelect: (link: string) => void,
  hasResults: boolean,
) {
  if (!hasResults) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No results found.</p>
      </div>
    );
  }

  return (
    <div className="py-2">
      {Object.entries(groupedResults).map(([category, items]: [string, any[]]) => {
        if (items.length === 0) return null;

        return (
          <div key={category} className="mb-2 last:mb-0">
            <div className="px-4 py-2 text-xs font-bold text-[#0E56A4] bg-gray-50/50 uppercase tracking-wider">
              {category}
            </div>
            <ul>
              {items.map((item) => (
                <li key={`${item.type}-${item.id}`}>
                  <button
                    onClick={() => handleSelect(item.link)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between group border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getBadgeColor(item.type)}`}
                      >
                        {getIcon(item.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#0E56A4] transition-colors" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function getIcon(type: string) {
  switch (type) {
    case 'Property':
      return <Building className="w-4 h-4" />;
    case 'Tenant':
      return <UserCheck className="w-4 h-4" />;
    case 'Agent':
      return <User className="w-4 h-4" />;
    case 'Owner':
      return <Users className="w-4 h-4" />; // Using Users for Owner roughly
    case 'Lead':
      return <FileText className="w-4 h-4" />;
    default:
      return <Search className="w-4 h-4" />;
  }
}

function getBadgeColor(type: string) {
  switch (type) {
    case 'Property':
      return 'bg-blue-100 text-blue-600';
    case 'Tenant':
      return 'bg-green-100 text-green-600';
    case 'Agent':
      return 'bg-purple-100 text-purple-600';
    case 'Owner':
      return 'bg-orange-100 text-orange-600';
    case 'Lead':
      return 'bg-yellow-100 text-yellow-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}
