import { useState } from 'react';

const ExpandedArea = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Delay hiding the content to allow for smooth transition
    setTimeout(() => setIsVisible(false), 300);
  };

  return (
    <div
      className="relative flex gap-2 h-[36px] w-full items-center sm:mt-6 mt-5 sm:mb-2 cursor-pointer overflow-hidden rounded-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`flex items-center gap-2 w-full text-white pr-4 py-2 rounded-full transition-all duration-300 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <img src={item.icon} className="w-[14px] pt-[1px]"/>
        <p className={`text-sm font-sans font-bold ${item.textcolore}`}>{item.category}</p>
      </div>
      <div 
        className={`absolute left-0 flex justify-center items-center gap-2 text-black px-4 py-2 rounded-full transition-all duration-300 ${
          isVisible ? 'opacity-100 w-full' : 'opacity-0 w-0'
        } ${item.bgicon}`}
      >
        <img src={item.iconhover} className="w-[14px] pt-[1px]" alt="" />
        <p className={`text-sm font-sans font-bold text-secondario-default`}>{item.category}</p>
      </div>
    </div>
  );
};

export default ExpandedArea;