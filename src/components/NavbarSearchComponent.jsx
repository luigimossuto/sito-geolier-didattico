import { useState, useRef, useEffect } from 'react';
import { NavbarItem, Input} from '@nextui-org/react';
import { NavLink } from 'react-router-dom';
import { SearchIcon } from './icon/SearchIcon';

const NavbarSearchComponent = ({ merch }) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredSearch = search.trim() === '' ? [] : merch.filter((prod) => {
    if (!prod || !prod.title || !prod.descrizione) return false;
    
    const searchTerms = search.toLowerCase().split(/\s+/);
    const titleWords = prod.title.toLowerCase().split(/\s+/);
    const descriptionWords = prod.descrizione.toLowerCase().split(/\s+/);
    
    return searchTerms.every(term => 
      titleWords.some(word => word.includes(term)) || 
      descriptionWords.some(word => word.includes(term))
    );
  });

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setIsOpen(true);
  };

  const handleSearchFocus = () => {
    if (search.trim() !== '') {
      setIsOpen(true);
    }
  };

  return (
    <NavbarItem className="hidden lg:flex relative" ref={dropdownRef}>
      <Input
        classNames={{
          base: "max-w-full sm:max-w-[20rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Cosa cerchi?"
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
        value={search}
        onChange={handleSearchChange}
        onFocus={handleSearchFocus}
      />
      {isOpen && filteredSearch.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50">
          <div className="grid grid-cols-1 gap-2 p-2 max-h-96 overflow-y-auto">
            {filteredSearch.map((filt) => (
              <NavLink 
                to={`/merch/${filt.id}`} 
                onClick={() => setIsOpen(false)} 
                key={filt.id} 
                className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <img src={filt.img} alt={filt.title} className="w-12 h-12 object-contain mr-3 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{truncateText(filt.title, 30)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{filt.price}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </NavbarItem>
  );
};

export default NavbarSearchComponent;