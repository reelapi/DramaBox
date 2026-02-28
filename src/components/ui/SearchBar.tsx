import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search dramas..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim() && onSearch) {
        onSearch(query);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
      <div className={`relative glass rounded-full transition-all duration-300 ${
        isFocused ? 'ring-2 ring-purple-500 glow' : ''
      }`}>
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          ref={inputRef}
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none rounded-full"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Search suggestions could go here */}
      {query && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl p-4 z-50">
          <div className="text-sm text-gray-400 mb-2">Popular searches</div>
          <div className="space-y-2">
            {['Korean Romance', 'Historical Drama', 'Thriller Series'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="block w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
