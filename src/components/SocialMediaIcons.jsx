import { InstagramIcon } from "./icon/InstagramIcon"
import { TikTokIcon } from "./icon/TikTokIcon"
import { TwitterIcon } from "./icon/TwitterIcon"
import { YoutubeIcon } from "./icon/YoutubeIcon"

const SocialIcon = ({ icon: Icon, name, hoverColor }) => {
  const getHoverColorClass = (color) => {
    switch (color) {
      case 'pink': return 'group-hover:bg-pink-500';
      case 'blue': return 'group-hover:bg-blue-400';
      case 'black': return 'group-hover:bg-black';
      case 'red': return 'group-hover:bg-red-600';
      default: return 'group-hover:bg-gray-500';
    }
  };

  return (
    <div className="relative group">
      <div className={`p-3 bg-white rounded-full shadow-md cursor-pointer transition-all duration-200 ease-in-out transform ${getHoverColorClass(hoverColor)} group-hover:text-white group-hover:scale-110`}>
        <Icon className="w-5 h-5 fill-current text-gray-700 group-hover:text-white" />
      </div>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
        {name}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white transform rotate-45"></div>
      </div>
    </div>
  );
};

const SocialMediaIcons = () => (
  <div className="flex justify-between items-center w-full gap-3 mt-auto mb-0">
    <SocialIcon icon={InstagramIcon} name="Instagram" hoverColor="pink" />
    <SocialIcon icon={TwitterIcon} name="Twitter" hoverColor="blue" />
    <SocialIcon icon={TikTokIcon} name="TikTok" hoverColor="black" />
    <SocialIcon icon={YoutubeIcon} name="YouTube" hoverColor="red" />
  </div>
);

export default SocialMediaIcons;