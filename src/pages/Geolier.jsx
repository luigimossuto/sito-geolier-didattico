import { Button } from '@nextui-org/react';
import React, { useState } from 'react'
import { SpotifyIcon } from '../components/icon/SpotifyIcon';
import { NavLink } from 'react-router-dom';
import { ApplemusicIcon } from '../components/icon/ApplemusicIcon';
import { YoutubeIcon } from '../components/icon/YoutubeIcon';
import { ChieGeolier } from '../components/icon/ChieGeolier';
import { LascesaDiGeolier } from '../components/icon/LascesaDiGeolier';
import { TalentoIcon } from '../components/icon/TalentoIcon';
import { AmbizioniIcon } from '../components/icon/AmbizioniIcon';

const Geolier = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const songs = [
    "EL PIBE DE ORO",
    "I P' ME, TU P' TE",
    "SI STAT' TU",
    "PERDERE 'A CAPA"
  ];

  const songUrls = {
    "EL PIBE DE ORO": {
      spotify: "https://open.spotify.com/track/69VAE3LA7jn5rGAsdflMOS?si=f99273fa5077430b",
      appleMusic: "https://music.apple.com/it/album/el-pibe-de-oro/1750070097?i=1750070370",
    },
    "I P' ME, TU P' TE": {
      spotify: "https://open.spotify.com/track/7BeZyW4hVjeCocSLwDrCME?si=2149bd5d541f46fb",
      appleMusic: "https://music.apple.com/it/album/i-p-me-tu-p-te/1750070097?i=1750072173",
    },
    "SI STAT' TU": {
      spotify: "https://open.spotify.com/track/6s5DJ2zRf9T3A2VidCCHxZ?si=47bd2d22d4db45e4",
      appleMusic: "https://music.apple.com/it/album/si-stat-tu/1750070097?i=1750070382",
    },
    "PERDERE 'A CAPA": {
      spotify: "https://open.spotify.com/track/4vd7gUuDg8Ks19SzZxzeHD?si=da02b532e34149c0",
      appleMusic: "https://music.apple.com/it/album/perdere-a-capa-feat-geolier/1758966708?i=1758967342",
    },
  };

  return (
    <div className="text-white min-h-screen max-w-7xl mx-auto px-7 sm:px-6 lg:px-8 sm:mt-14">
      {/* Main Content */}
      <div className="flex flex-col sm:flex-row">
        {/* Left Column */}
        <div className="w-full sm:w-1/2 pr-0 sm:pr-8 mt-10 sm:mt-20 order-2 sm:order-1">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 dark:text-white text-black">L'ANIMA<br />DI NAPOLI</h1>
          <div className="bg-transparent border-3 border-titolo-default sm:mr-28 px-4 rounded-2xl">
            {songs.map((song) => (
              <div key={song} className="flex justify-between items-center py-4 last:border-b-0 dark:text-white text-black">
                <span>{song}</span>
                <button className="p-4" onClick={() => setSelectedSong(song)}><p className='text-4xl -mt-1 text-titolo-default leading-3'>→</p></button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Image) */}
        <div className="w-full sm:w-1/2 mt-8 sm:mt-0 drop-shadow-[6px_10px_5px_rgba(1,80,235,80%)] order-1 sm:order-2">
          <img 
            src="\geolier-tour-foto-con-gigi-dalessio.jpg" 
            alt="Geolier performing" 
            className="rounded-lg w-full h-auto"
          />
        </div>
      </div>

      {/* Modal */}
      {selectedSong && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="dark:bg-[#18181b] bg-white dark:text-white text-black p-4 sm:p-8 rounded-lg relative w-full max-w-[calc(100%-2rem)] sm:max-w-lg">
              <button 
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" 
                onClick={() => setSelectedSong(null)}
              >
                ✕
              </button>
              <h2 className="text-lg sm:text-xl font-bold mb-4 pr-6">Scegli dove ascoltare "{selectedSong}"</h2>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:w-full">
                <Button
                  as={NavLink}
                  to={songUrls[selectedSong].spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gray-200 dark:bg-gray-500 border-2 border-green-500 text-sm sm:text-base px-2 sm:px-4 py-2 flex items-center justify-center"
                >
                  <SpotifyIcon className="text-green-500 sm:mr-0 w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Ascolta su Spotify</span>
                </Button>
                <Button
                  as={NavLink}
                  to={songUrls[selectedSong].appleMusic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gray-200 dark:bg-gray-500 border-2 border-pink-500 text-black dark:text-white text-sm sm:text-base px-2 sm:px-4 py-2 flex items-center justify-center"
                >
                  <ApplemusicIcon className="text-pink-500 sm:mr-0 w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Ascolta su Apple Music</span>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Sezione "Chi è Geolier?" */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8 mt-10 sm:mt-40 mb-16">
        <div className="md:w-1/2 sm:pr-8 order-2 sm:order-1">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-titolo-default">CHI È GEOLIER?</h2>
          <p className="text-lg text-black dark:text-white">
            Emanuele Palumbo, conosciuto artisticamente come Geolier, è nato a Napoli
            il 23 marzo 2000. Sin dai suoi esordi, si è distinto nella scena musicale per la sua abilità
            di rappare in dialetto napoletano, una scelta che riflette il suo profondo legame con le
            radici e la cultura della sua terra.
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 order-1 sm:order-2 mr-auto mb-2 sm:mb-0">
          <div className="bg-cover bg-no-repeat bg-[url('/foto-con-maglietta-pagina-geolier.jpg')] rounded-lg h-[400px] hidden sm:block"></div>
          <ChieGeolier className="w-28 h-auto sm:hidden text-black dark:text-white" />
        </div>
      </div>

      {/* Sezione "L'ascesa di Geolier" */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-4 sm:gap-8 mt-10 sm:mt-40 mb-16">
        <div className="md:w-1/2 sm:pl-8 order-2 sm:order-1">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-titolo-default text-end sm:text-start">L'ASCESA DI GEOLIER</h2>
          <p className="text-lg text-black dark:text-white text-end sm:text-start">
            Geolier ha iniziato a farsi notare nel panorama musicale napoletano grazie alle sue rime
            incisive e ai flow unici, che gli hanno permesso di emergere rapidamente e di consolidare
            la sua presenza prima nella scena locale e poi a livello nazionale. La sua capacità di fondere
            autenticità e innovazione ha fatto di lui una delle figure di spicco del rap in Italia.
          </p>
        </div>
        <div className="md:w-1/2 mt-2 sm:mt-8 md:mt-0 order-1 sm:order-2 ms-auto mb-2 sm:mb-0">
          <div className="bg-cover bg-no-repeat bg-[url('/foto2-pagina-geolier.jpg')] rounded-lg h-[400px] hidden sm:block"></div>
          <LascesaDiGeolier className="w-28 h-auto sm:hidden text-black dark:text-white" />
        </div>
      </div>

      {/* Sezione Talento */}
      <div className="mt-10 sm:mt-32 text-white rounded-lg">
        <div className="flex flex-col items-center">
          <TalentoIcon className="w-28 h-auto mb-6 sm:mb-4 text-black dark:text-white sm:hidden" />
          <h2 className="text-4xl font-bold text-titolo-default text-center mb-4">TALENTO</h2>
        </div>
        <p className="text-lg text-center sm:-mt-0 mb-8 text-black dark:text-white px-4 sm:px-12">
          Il suo talento è evidente anche nel suo nuovo album, dove Geolier dimostra ancora
          una volta la sua eccellenza nella scrittura dei testi e la versatilità nel spaziare tra
          diversi generi musicali, pur mantenendo il rap come base fondamentale. Numerose
          sue hit hanno dominato le classifiche italiane, rafforzando ulteriormente la sua
          reputazione e il suo status di leader nella scena rap.
        </p>

        {/* Sezione Video */}
        <div className="relative rounded-lg overflow-hidden mt-12">
          <div 
            className="bg-cover bg-center h-[250px] lg:h-[450px]" 
            style={{backgroundImage: "url('/foto-video-pagina-geolier.png')"}}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Button
                as={NavLink}
                to="https://www.youtube.com/watch?v=KwEauy4y3gI"
                target="_blank"
                rel="noopener noreferrer"
                endContent={<YoutubeIcon className="text-white w-6" />}
                className='px-8 py-6 bg-colorefooter-default rounded-full border-2 border-titolo-default hover:bg-titolo-default transition-all duration-300 hover:opacity-0'
              >
                <p className='text-white text-base font-bold'>ASCOLTA ORA</p>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione "ambizioni internazionali" */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8 mt-10 sm:mt-32 mb-16">
          <div className="md:w-1/2 sm:pr-8 order-2 sm:order-1">
            <h2 className="text-4xl font-bold mb-4 text-titolo-default">AMBIZIONI INTERNAZIONALI</h2>
            <p className="text-lg text-black dark:text-white">
            Oltre ai successi in Italia, Geolier aspira a portare la sua musica a un pubblico internazionale, rimanendo fedele al napoletano. La sua missione è sempre stata quella di elevare il dialetto e la cultura della sua terra natale, raggiungendo nuovi ascoltatori senza mai rinunciare alla propria identità linguistica. Questa dedizione e autenticità sono ciò che rende Geolier non solo un rapper di talento, ma anche un ambasciatore della cultura napoletana nel mondo.
            </p>
          </div>
          <div className='md:w-1/2 mt-8 md:mt-0 order-1 sm:order-2 mr-auto'>
            <div className="md:w-full mt-8 md:mt-0 bg-cover bg-no-repeat bg-[url('/foto3-geolier.jpg')] rounded-lg h-[400px] hidden sm:block"></div>
            <AmbizioniIcon className="w-28 h-auto mb-2 sm:mb-4 text-black dark:text-white sm:hidden" />
          </div>
      </div>
    </div>
  );
};

export default Geolier;