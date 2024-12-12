import React, { useState, useRef, useEffect } from 'react';
import ButtonBordered from './ButtonBordered';

const FlippableImage = ({ frontImage, imgbg, tracklist }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [height, setHeight] = useState('auto');
  const tracklistRef = useRef(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (tracklistRef.current) {
      setHeight(`${tracklistRef.current.scrollHeight}px`);
    }
  }, [tracklist]);

  const renderTrack = (track) => {
    const parts = track.split('feat.');
    if (parts.length > 1) {
      const [title, rest] = parts;
      const [featuring, prod] = rest.split('(prod.');
      return (
        <>
          {title} feat. <span className="font-bold text-secondario-light">{featuring.trim()}</span>
          {prod && <span>{` (prod.${prod}`}</span>}
        </>
      );
    }
    return track;
  };

  return (
    <div className="relative w-full" style={{ height }}>
      <div 
        className={`absolute w-full h-full transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`} 
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className={`absolute w-full h-full backface-hidden ${imgbg} rounded-3xl shadow-lg flex items-center justify-center`}>
          <img src={frontImage} alt="Front" className="max-w-[80%] max-h-[80%] object-contain" />
          <ButtonBordered
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
            onClick={handleFlip}
          >
            Tracklist
          </ButtonBordered>
        </div>
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180 bg-terziario-default rounded-3xl shadow-lg cursor-pointer overflow-hidden"
          onClick={handleFlip}
        >
          <div ref={tracklistRef} className="p-6">
            <div className="space-y-1">
              {tracklist.map((track, index) => (
                <React.Fragment key={index}>
                  <p className="text-secondario-default text-sm">{renderTrack(track)}</p>
                  {index < tracklist.length - 1 && <hr className="border-titolo-default my-0.5" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippableImage;
