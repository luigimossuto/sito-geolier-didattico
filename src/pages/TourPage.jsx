import { useState, useEffect } from 'react';
import { CroceTour } from "../components/icon/CroceTour"
import { biglietti } from "../components/data/Biglietti"
import { Link, Outlet } from 'react-router-dom'

const TourPage = () => {
  const [activeFilter, setActiveFilter] = useState('TUTTI');
  const [selectedCity, setSelectedCity] = useState('');

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return new Date(year, month - 1, day); // month is 0-indexed in JS Date
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('it-IT', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return { day, month, year };
  };

  const sortedBiglietti = biglietti.sort((a, b) => parseDate(a.data) - parseDate(b.data));

  const filteredBiglietti = sortedBiglietti.filter(biglietto => {
    if (activeFilter === 'TUTTI') return true;
    if (activeFilter === 'FILTRI' && selectedCity) {
      return biglietto.luogo.toLowerCase().includes(selectedCity.toLowerCase());
    }
    return true;
  });

  const uniqueCities = [...new Set(biglietti.map(b => b.luogo.split(',')[0].trim()))];

  useEffect(() => {
    if (activeFilter !== 'FILTRI') {
      setSelectedCity('');
    }
  }, [activeFilter]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setActiveFilter('FILTRI');
  };

  return (
    <div className="bg-secondario-default dark:bg-secondario-light text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-20 lg:px-14 md:px-10 px-4 min-[520px]:gap-8 gap-4">
          <CroceTour className="lg:w-52 md:w-44 sm:w-32 min-[380px]:w-28 w-20 lg:h-52 md:h-44 sm:h-32 min-[380px]:h-28 h-20 dark:text-white text-black" />
          <div className="text-center md:pb-8 sm:pb-4 pb-3">
            <h1 className="lg:text-[5rem] md:text-[4rem] sm:text-[3rem] min-[520px]:text-[2.5rem] min-[420px]:text-[2.5rem] min-[380px]:text-[2rem] text-[1.8rem] font-bold font-mrdafoe dark:text-white text-black">geolier</h1>
            <p className="lg:text-[3.5rem] md:text-[3rem] sm:text-[2rem] min-[520px]:text-[1.8rem] min-[420px]:text-[1.8rem] min-[380px]:text-[1.5rem] text-[1.4rem] font-bold">
              <span className="dark:text-white text-black">O</span>
              <span className="text-titolo-default">F</span>
              <span className="dark:text-white text-black">FI</span>
              <span className="text-titolo-default">C</span>
              <span className="dark:text-white text-black">IAL</span>
              <span className="dark:text-white text-black ml-2">T</span>
              <span className="text-titolo-default">O</span>
              <span className="dark:text-white text-black">U</span>
              <span className="text-titolo-default">R</span>
            </p>
          </div>
          <CroceTour className="lg:w-52 md:w-44 sm:w-32 min-[380px]:w-28 w-20 lg:h-52 md:h-44 sm:h-32 min-[380px]:h-28 h-20 dark:text-white text-black" />
        </div>

        <div className="flex gap-4 mb-8">
          {['TUTTI', 'FILTRI'].map(filter => (
            <button
              key={filter}
              className={`px-12 py-[10px] rounded-[20px] border-2 dark:border-secondario-default border-secondario-light ${
                activeFilter === filter ? 'bg-titolo-default' : 'bg-gray-700 hover:bg-titolo-default'
              } text-white`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {activeFilter === 'FILTRI' && (
          <div className="mb-8 relative">
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="appearance-none w-full bg-titolo-default text-white px-4 py-2 pr-8 rounded-[20px] border-2 border-secondario-default focus:outline-none focus:ring-2 cursor-pointer transition-all duration-300 ease-in-out"
            >
              <option value="">Seleziona una città</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {filteredBiglietti.map((biglietto, index) => {
            const { day, month, year } = formatDate(parseDate(biglietto.data));
            const isLastItem = index === filteredBiglietti.length - 1;
            const isPrimaryItem = index === filteredBiglietti.length - 10;

            return (
              <div 
                key={biglietto.id} 
                className={`flex items-start justify-between gap-4 pt-4 pb-8 ${!isLastItem ? 'border-b-2 border-gray-500' : ''} ${isPrimaryItem ? 'border-t-2 border-gray-500 pt-8' : ''}`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8">
                  <div className="flex-shrink-0">
                    <p className="lg:text-3xl md:text-2xl text-xl font-bold dark:text-white text-black">{day}</p>
                    <p className="lg:text-base md:text-sm text-sm dark:text-white text-black">{month}, {year}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="lg:text-2xl md:text-xl text-lg font-bold dark:text-white text-black whitespace-nowrap overflow-hidden text-ellipsis max-w-[130px] min-[330px]:max-w-[150px] min-[420px]:max-w-[200px] min-[500px]:max-w-none">
                      {biglietto.titolo}
                    </p>
                    <p className="lg:text-base md:text-sm text-sm dark:text-white text-black">{biglietto.luogo}</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {biglietto.disponibile ? (
                    <Link 
                      to={`/tour/${biglietto.id}`} 
                      className="inline-block text-center bg-white text-black lg:text-base text-sm lg:px-20 lg:py-4 md:px-16 md:py-3 min-[365px]:px-12 min-[350px]:px-10 px-8 py-3 mt-7 sm:mt-0 border-2 border-titolo-default rounded-[20px] transition-all duration-300 ease-in-out hover:bg-titolo-default hover:bg-opacity-30 dark:hover:text-white dark:hover:bg-terziario-default"
                    >
                      BIGLIETTI
                    </Link>
                  ) : (
                    <span className="inline-block text-center bg-gray-500 text-secondario-light lg:text-base text-sm lg:px-20 lg:py-4 md:px-16 md:py-3 min-[365px]:px-12 min-[350px]:px-10 px-8 py-3 mt-7 sm:mt-0 border-2 border-secondario-default rounded-[20px]">
                      SOLD OUT
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default TourPage