import { Globe } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function LanguageToggle() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-white text-[#0E56A4] hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50">
        <Globe className="w-4 h-4" />
        <span>{language === 'en' ? 'EN' : 'AR'}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-gray-200">
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={`cursor-pointer ${language === 'en' ? 'bg-[#0E56A4]/10 text-[#0E56A4]' : 'hover:bg-gray-100'}`}
        >
          🇬🇧 English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('ar')}
          className={`cursor-pointer ${language === 'ar' ? 'bg-[#0E56A4]/10 text-[#0E56A4]' : 'hover:bg-gray-100'}`}
        >
          🇪🇬 العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
