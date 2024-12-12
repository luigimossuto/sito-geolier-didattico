import { Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import ButtonBordered from "./ButtonBordered";
import { useState } from "react";
import { SpotifyIcon } from "./icon/SpotifyIcon";
import { ApplemusicIcon } from "./icon/ApplemusicIcon";

const MusicServiceChooser = ({ spotifyUrl, appleMusicUrl }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleOpenChange = (isOpen) => {
    setIsPopoverOpen(isOpen);
  };

  return (
    <Popover 
      placement="bottom"
      isOpen={isPopoverOpen} 
      onOpenChange={handleOpenChange}
    >
      <PopoverTrigger>
        <ButtonBordered className={isPopoverOpen ? 'bg-titolo-default !opacity-100 md:px-10 md:py-6 sm:px-7 sm:py-5 mx-2 ' : 'lg:px-10 lg:py-6 sm:px-7 sm:py-5 mx-2'}>
          <p className='text-secondario-default text-shadow-custom lg:text-lg sm:text-base text-sm font-bold'>ASCOLTA ORA</p>
        </ButtonBordered>
      </PopoverTrigger>
      <PopoverContent className="relative">
        <div className="px-1 py-2">
          <div className="text-small font-bold">Scegli il servizio di streaming:</div>
          <div className="mt-2 flex flex-col gap-2">
            <Button
              as={NavLink}
              to={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              startContent={<SpotifyIcon className="text-green-500 w-6" />}
              className="w-full"
            >
              Ascolta su Spotify
            </Button>
            <Button
              as={NavLink}
              to={appleMusicUrl}
              target="_blank"
              rel="noopener noreferrer"
              startContent={<ApplemusicIcon className="text-pink-500 w-6" />}
              className="w-full"
            >
              Ascolta su Apple Music
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MusicServiceChooser;
