import { NavLink } from "react-router-dom";
import ButtonBordered from "../components/ButtonBordered";
import { HorizontalScrollCarousel } from "../components/HorizontalScrollCarousel";
import MusicServiceChooser from "../components/MusicServiceChooser";
import SubscribeForm from "../components/SubscribeForm";
import { ArrowIcon } from "../components/icon/ArrowIcon";
import {SpotifyIcon} from "../components/icon/SpotifyIcon";
import {ApplemusicIcon} from "../components/icon/ApplemusicIcon";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleImageClick = (id) => {
    navigate(`/tour/${id}`);
  };

  // Funzione helper per generare i percorsi delle immagini
  const getImageUrl = (name) => {
    return new URL(`/public/${name}`, import.meta.url).href;
  };

  return (
    <>
      <div className="relative">
        <div className="bg-primario-default w-full h-screen bg-[url('/foto-homepage-principale.jpg')] bg-top bg-cover bg-no-repeat flex justify-center items-center">
          <div className="flex text-center flex-col md:gap-8 sm:gap-6 gap-4">
            <p className="md:text-5xl sm:text-4xl min-[420px]:text-3xl text-2xl text-white drop-shadow-[1_2px_2px_rgba(0,0,0,0.75)] font-oswald text-shadow-custom font-bold">
              ASCOLTA ORA IL NUOVO ALBUM
            </p>
            <div className="flex justify-center md:gap-10 sm:gap-6 min-[420px]:gap-4 gap-2">
              <NavLink to={"https://open.spotify.com/album/1bdXMUERNI9dwREDryk6C7?si=A61C0vTnQ6We7KwUI-IdeA"} target="_blank" rel="noopener noreferrer">
                <ButtonBordered className="flex md:gap-4 sm:gap-2 gap-2 md:py-6 sm:py-5 py-4 md:px-10 sm:px-6 px-5">
                  <p className="text-secondario-default text-shadow-custom md:text-xl sm:text-lg text-sm font-bold">DIO LO SA</p>
                  <SpotifyIcon className="md:w-5 sm:w-4 w-3 text-secondario-default"></SpotifyIcon>
                </ButtonBordered>
              </NavLink>
              <NavLink to={"https://music.apple.com/it/album/dio-lo-sa/1750070097"} target="_blank" rel="noopener noreferrer">
                <ButtonBordered className="flex md:gap-4 sm:gap-2 gap-2 md:py-6 sm:py-5 py-4 md:px-10 sm:px-6 px-5">
                  <p className="text-secondario-default text-shadow-custom md:text-xl sm:text-lg text-sm font-bold">DIO LO SA</p>
                  <ApplemusicIcon className="md:w-5 sm:w-4 w-3 text-secondario-default"></ApplemusicIcon>
                </ButtonBordered>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="max-w-7xl px-8 mx-auto">
          <div className="flex justify-between w-full lg:mt-28 md:mt-20 mt-14 mb-10">
            <p className="text-titolo-default lg:text-3xl md:text-[26px] sm:text-2xl text-xl font-bold">STORE</p>
            <NavLink to={"/store"} className={"flex items-center lg:gap-4 sm:gap-3 gap-2 hover:opacity-80"}>
              <p className="text-secondario-light dark:text-secondario-default lg:text-xl sm:text-lg text-base pb-1">Altro</p>
              <ArrowIcon className="lg:w-3 sm:w-2 w-[6px] text-secondario-light dark:text-secondario-default"/>
            </NavLink>
          </div>
        </div>
        <div className="w-full lg:-mt-20 md:-mt-28"><HorizontalScrollCarousel/></div>
        <div className="max-w-7xl px-8 mx-auto">
          <div className="flex justify-between w-full lg:mt-6 md:-mt-10 mt-14 lg:mb-20 md:mb-12 mb-10">
            <p className="text-titolo-default lg:text-3xl md:text-[26px] sm:text-2xl text-xl font-bold">TOUR</p>
            <NavLink to={"/tour"} className={"flex items-center lg:gap-4 sm:gap-3 gap-2 hover:opacity-80"}>
              <p className="text-secondario-light dark:text-secondario-default lg:text-xl sm:text-lg text-base pb-1">Altro</p>
              <ArrowIcon className="lg:w-3 sm:w-2 w-[6px] text-secondario-light dark:text-secondario-default"/>
            </NavLink>
          </div>
          <div className="hidden lg:grid grid-rows-4 grid-cols-5 grid-flow-row gap-6 h-[1200px]">
            <div className="col-span-3 flex justify-between gap-6">
              <div 
                className="w-full h-full rounded-3xl bg-center bg-cover bg-no-repeat flex flex-col items-start justify-end cursor-pointer" 
                style={{backgroundImage: `url(${getImageUrl('geolier-tour-home-foto1.jpg')})`}}
                onClick={() => handleImageClick(4)}
              >
                <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-lg ms-4">UNIPOL ARENA</p>
                <p className="text-secondario-default ms-4 pb-3">CASALECCHIO DI RENO (BO)</p>
              </div>
              <div 
                className="w-full h-full rounded-3xl bg-top bg-cover bg-no-repeat flex flex-col items-start justify-end cursor-pointer" 
                style={{backgroundImage: `url(${getImageUrl('geolier-tour-home-foto2.jpg')})`}}
                onClick={() => handleImageClick(2)}
              >
                <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-lg ms-4">UNIPOL FORUM</p>
                <p className="text-secondario-default ms-4 pb-3">MILANO</p>
              </div>
            </div>
            <div 
              className="row-span-2 col-span-2 rounded-3xl bg-top bg-cover bg-no-repeat flex flex-col items-start justify-end cursor-pointer" 
              style={{backgroundImage: `url(${getImageUrl('geolier-tour-home-foto3.jpg')})`}}
              onClick={() => handleImageClick(5)}
            >
              <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-lg ms-4">PALAZZO DELLO SPORT</p>
              <p className="text-secondario-default ms-4 pb-3">ROMA</p>
            </div>
            <div 
              className="row-span-2 col-span-3 rounded-3xl bg-top bg-cover bg-no-repeat flex flex-col items-start justify-end cursor-pointer" 
              style={{backgroundImage: `url(${getImageUrl('instantanea-geolier-che-arriva-al-maradona.jpg')})`}}
              onClick={() => handleImageClick(10)}
            >
              <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-lg ms-4">STADIO D. A. MARADONA</p>
              <p className="text-secondario-default ms-4 pb-3">NAPOLI</p>
            </div>
            <div 
              className="col-span-2 rounded-3xl bg-center bg-cover bg-no-repeat flex flex-col items-start justify-end cursor-pointer" 
              style={{backgroundImage: `url(${getImageUrl('geolier-tour-home-foto6.jpg')})`}}
              onClick={() => handleImageClick(1)}
            >
              <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-lg ms-4">PALAZZO DEL TURISMO</p>
              <p className="text-secondario-default ms-4 pb-3">JESOLO</p>
            </div>
            <div className="col-span-5 flex justify-between gap-6">
              <div 
                className="w-full h-full rounded-3xl bg-center bg-cover bg-no-repeat flex flex-col items-start justify-end cursor-pointer" 
                style={{backgroundImage: `url(${getImageUrl('geolier-tour-home-foto4.jpg')})`}}
                onClick={() => handleImageClick(3)}
              >
                <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-lg ms-4">INALPI ARENA</p>
                <p className="text-secondario-default ms-4 pb-3">TORINO</p>
              </div>
              <div 
                className="w-full h-full rounded-3xl bg-center bg-cover bg-no-repeat flex flex-col items-start justify-end cursor-pointer" 
                style={{backgroundImage: `url(${getImageUrl('geolier-tour-home-foto5.jpg')})`}}
                onClick={() => handleImageClick(7)}
              >
                <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-lg ms-4">STADIO F. SCOGLIO</p>
                <p className="text-secondario-default ms-4 pb-3">MESSINA</p>
              </div>
            </div>
          </div>
          <div className="hidden sm:grid lg:hidden grid-flow-row gap-6 md:h-[90vh] sm:h-[80vh]">
            <div className="row-span-4 col-span-3 rounded-2xl bg-[url('/instantanea-geolier-che-arriva-al-maradona.jpg')] bg-top bg-cover bg-no-repeat flex flex-col items-start justify-end">
              <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-lg ms-4">STADIO D. A. MARADONA</p>
              <p className="text-secondario-default ms-4 pb-3">NAPOLI</p>
            </div>
            <div className="row-span-2 col-span-2 rounded-2xl bg-[url('/geolier-tour-home-foto1.jpg')] bg-center bg-cover bg-no-repeat flex flex-col items-start justify-end">
              <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-lg ms-4">UNIPOL FORUM</p>
              <p className="text-secondario-default ms-4 pb-3">MILANO</p>
            </div>
            <div className="row-span-2 col-span-2 rounded-2xl bg-[url('/geolier-tour-home-foto3.jpg')] bg-center bg-cover bg-no-repeat flex flex-col items-start justify-end">
              <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-lg ms-4">PALAZZO DELLO SPORT</p>
              <p className="text-secondario-default ms-4 pb-3">ROMA</p>
            </div>
            <div className="col-span-5 row-span-1 grid grid-cols-2 gap-6">
              <div className="rounded-2xl bg-[url('/geolier-tour-home-foto4.jpg')] bg-center bg-cover bg-no-repeat flex flex-col items-start justify-end">
                <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-lg ms-4">INALPI ARENA</p>
                <p className="text-secondario-default ms-4 pb-3">TORINO</p>
              </div>
              <div className="rounded-2xl bg-[url('/geolier-tour-home-foto6.jpg')] sm:bg-[center_top_-6rem] md:bg-[center_top_-7.5rem] bg-cover bg-no-repeat flex flex-col items-start justify-end">
                <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-lg ms-4">PALAZZO DEL TURISMO</p>
                <p className="text-secondario-default ms-4 pb-3">JESOLO</p>
              </div>
            </div>
          </div>
          <div className="grid sm:hidden grid-flow-row gap-4 h-[90vh]">
            <div className="col-span-4 row-span-1 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-[url('/geolier-tour-home-foto1.jpg')] bg-center bg-cover bg-no-repeat flex flex-col items-start justify-end">
                <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-base ms-4">INALPI ARENA</p>
                <p className="text-secondario-default text-sm ms-4 pb-3">TORINO</p>
              </div>
              <div className="rounded-xl bg-[url('/geolier-tour-home-foto3.jpg')] bg-center bg-cover bg-no-repeat flex flex-col items-start justify-end">
                <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-base ms-4">PALAZZO DELLO SPORT</p>
                <p className="text-secondario-default text-sm ms-4 pb-3">ROMA</p>
              </div>
            </div>
            <div className="row-span-2 col-span-4 rounded-xl bg-[url('/instantanea-geolier-che-arriva-al-maradona.jpg')] bg-top bg-cover bg-no-repeat flex flex-col items-start justify-end">
              <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-base ms-4">STADIO D. A. MARADONA</p>
              <p className="text-secondario-default text-sm ms-4 pb-3">NAPOLI</p>
            </div>
            <div className="col-span-4 min-[460px]:row-span-3 row-span-2 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-[url('/geolier-tour-home-foto4.jpg')] bg-center bg-cover bg-no-repeat flex flex-col items-start justify-end">
                <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-base ms-4">UNIPOL FORUM</p>
                <p className="text-secondario-default text-sm ms-4 pb-3">MILANO</p>
              </div>
              <div className="rounded-xl bg-[url('/geolier-tour-home-foto6.jpg')] sm:bg-[center_top_-6rem] md:bg-[center_top_-7.5rem] bg-center bg-cover bg-no-repeat flex flex-col items-start justify-end">
                <p className="font-oswald dark:text-shadow-custom text-shadow-custom text-secondario-default font-bold text-base ms-4">PALAZZO DEL TURISMO</p>
                <p className="text-secondario-default text-sm ms-4 pb-3">JESOLO</p>
              </div>
            </div>
          </div>
          <div className="text-titolo-default w-full lg:mt-28 md:mt-20 lg:text-3xl md:text-[26px] sm:text-2xl text-xl font-bold text-center lg:mb-20 md:mb-12 mt-14 mb-10">GEOLIER</div>
          <div className="flex flex-col md:flex-row items-center justify-between w-full min-[1100px]:gap-24 lg:gap-20 md:gap-16 gap-10 h-max flex-wrap md:flex-nowrap">
            <div className="md:w-[50%] w-full h-auto order-2 md:order-1">
              <p className="dark:text-secondario-default text-secondario-light lg:leading-7 sm:leading-6 leading-5 lg:text-lg sm:text-base text-sm">
              Emanuele, noto come Geolier, si è distinto per la sua abilità di rappare in napoletano. Le sue rime e flow unici gli hanno permesso di affermarsi nella scena napoletana e italiana, diventando una figura di spicco del rap in Italia.
              <div className="min-[1155px]:py-6 lg:py-4 md:py-2 py-2"></div>
              Con il suo nuovo album, Emanuele dimostra la sua eccellenza nella scrittura e la capacità di spaziare tra generi diversi, mantenendo sempre il rap come base. Le sue numerose hit hanno dominato le classifiche, consolidando la sua posizione di leader.
              <div className="min-[1155px]:py-6 lg:py-4 md:py-2 py-2"></div>
              Emanuele aspira a portare la sua musica oltre i confini nazionali, rimanendo fedele al napoletano. La sua missione è elevare il dialetto e la cultura della sua terra, raggiungendo un pubblico internazionale senza rinunciare alla propria identità linguistica.
              </p>
            </div>
            <div className="md:w-[50%] w-full h-full order-1 md:order-2">
              <img src="/foto-geolier-con-pizza-geolier.jpg" className="lg:w-[90%] md:w-full w-full ms-auto h-auto rounded-3xl"></img>
            </div>
          </div>
          <div className="mt-10 md:mt-16 w-full flex flex-nowrap justify-center gap-6 min-[570px]:gap-10 lg:h-[35vh] min-[1140px]:h-[40vh] md:h-[30vh] sm:h-[30vh] min-[570px]:h-[30vh] min-[470px]:h-[25vh] h-[35vh]">
            <div className="hidden md:flex sm:w-1/2 md:w-1/3 lg:w-1/3 h-auto drop-shadow-[0_1px_10px_rgba(0,159,227,100)] rounded-3xl justify-center items-center bg-[url('\/foto-album-il-coraggio-dei-bambini.jpg')] bg-center bg-cover bg-no-repeat">
              <MusicServiceChooser spotifyUrl="https://open.spotify.com/album/5FAlSQMZ4j8pPa4sp0ZB4K?si=FqSEIWnyRfmNCuidPe6Sjg" appleMusicUrl="https://music.apple.com/it/album/il-coraggio-dei-bambini/1660805404"></MusicServiceChooser>
            </div>
            <div className="hidden min-[470px]:flex w-1/2 md:w-1/3 lg:w-1/3 h-auto drop-shadow-[0_1px_10px_rgba(0,159,227,100)] rounded-2xl min-[415px]:rounded-3xl justify-center items-center bg-[url('\/foto-album-il-coraggio-dei-bambini-atto2.jpg')] bg-center bg-cover bg-no-repeat">
              <MusicServiceChooser spotifyUrl="https://open.spotify.com/album/0aGXQkS5LTFhYswwXJ8vJ6?si=-Qz3WH15R226wkxAHNo65A" appleMusicUrl="https://music.apple.com/it/album/il-coraggio-dei-bambini-atto-ii/1679958676"></MusicServiceChooser>
            </div>
            <div className="w-full min-[470px]:w-1/2 md:w-1/3 lg:w-1/3 h-auto drop-shadow-[0_1px_10px_rgba(0,159,227,100)] rounded-2xl min-[415px]:rounded-3xl flex justify-center items-center bg-[url('\/foto-album-dio-lo-sa.png')] bg-center bg-cover bg-no-repeat">
              <MusicServiceChooser spotifyUrl="https://open.spotify.com/album/1bdXMUERNI9dwREDryk6C7?si=A61C0vTnQ6We7KwUI-IdeA" appleMusicUrl="https://music.apple.com/it/album/dio-lo-sa/1750070097"></MusicServiceChooser>
            </div>
          </div>
        </div>
        <div className="mt-14 md:mt-[5.5rem] w-full bg-terziario-default drop-shadow-[0_4px_4px_rgba(0,0,0,25)]">
          <div className="md:flex md:flex-row flex flex-col justify-between items-center py-10 md:py-16 px-8 max-w-7xl mx-auto lg:gap-16 md:gap-12 gap-4">
            <div className="flex flex-col items-center w-full md:w-1/2">
              <p className="lg:text-3xl min-[795px]:text-2xl max-[794px]:text-[22px] md:text-[22px] sm:text-2xl text-xl text-secondario-default text-center font-bold">ENTRA NELLA COMMUNITY</p>
              <p className="lg:text-lg sm:text-base text-sm text-secondario-default text-center leading-6 lg:mt-4 mt-2 px-20 sm:px-0">Iscriviti alla newsletter per diventare un membro esclusivo e ricevere offerte speciali e partecipare ai nostri giveaway.</p>
            </div>
            <div className="w-full md:w-1/2"><SubscribeForm/></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
