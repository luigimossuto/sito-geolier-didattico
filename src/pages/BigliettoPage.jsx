import { useParams, NavLink } from 'react-router-dom';
import { biglietti } from "../components/data/Biglietti";
import { ArrowIcon } from '../components/icon/ArrowIcon';
import { MigliorPostoIcon } from '../components/icon/MigliorPostoIcon';
import { SceltaInPiantaIcon } from '../components/icon/SceltaInPiantaIcon';
import { AggiungiAlCarrelloIcon } from '../components/icon/AggiungiAlCarrelloIcon';
import { useState, useEffect, useContext } from 'react';
import { SezioneRed } from '../components/icon/SezioneRed';
import { SezioneBlu } from '../components/icon/SezioneBlu';
import { SezioneOrange } from '../components/icon/SezioneOrange';
import { ParterreInPiedi } from '../components/icon/ParterreInPiedi';
import { Palco } from '../components/icon/Palco';
import ModalBigliettoPage from '../components/ModalBigliettoPage';
import { CartContext } from '../providers/CartContext';

const BigliettoPage = () => {
  const { id } = useParams();
  const biglietto = biglietti.find(b => b.id === parseInt(id));
  const { addToCart, cart } = useContext(CartContext);
  const [selectedOption, setSelectedOption] = useState('migliorPosto');
  const [prezzi, setPrezzi] = useState([]);
  const [quantita, setQuantita] = useState(1);
  const [categoriaSelezionata, setCategoriaSelezionata] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [totalTicketsInCart, setTotalTicketsInCart] = useState(0);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setCategoriaSelezionata(null); // Reset categoriaSelezionata when changing option
  };

  const handleSeatSelection = (section) => {
    setCurrentSelection(section);
    setModalQuantity(1); // Reset quantity when opening modal
    setIsModalOpen(true);
  };

  const handleQuantitySelection = () => {
    setSelectedSeats(prev => ({
      ...prev,
      [currentSelection.name]: {
        ...currentSelection,
        quantity: modalQuantity,
        totalPrice: currentSelection.price * modalQuantity
      }
    }));
    setIsModalOpen(false);
  };

  const incrementQuantity = () => setModalQuantity(prev => Math.min(prev + 1, 4));
  const decrementQuantity = () => setModalQuantity(prev => Math.max(prev - 1, 1));

  const handleRemoveSeat = (sectionName) => {
    setSelectedSeats(prev => {
      const newSeats = { ...prev };
      delete newSeats[sectionName];
      return newSeats;
    });
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleAddToCart = (tipo, prezzo, quantita) => {
    if (totalTicketsInCart + quantita <= 4) {
      const bigliettoToAdd = {
        id: `${biglietto.id}-${tipo}`,
        title: `${biglietto.titolo} - ${tipo}`,
        price: typeof prezzo === 'string' ? parseFloat(prezzo.replace('€', '').trim()) : prezzo,
        quantity: quantita,
        category: 'Biglietto',
        img: '/foto-tour-marzo2025.jpg', // Aggiungi un'immagine per il biglietto
      };
      addToCart(bigliettoToAdd, quantita);
    }
  };

  const handleMigliorPostoAddToCart = () => {
    if (categoriaSelezionata !== null && prezzi[categoriaSelezionata]) {
      const prezzo = parseFloat(prezzi[categoriaSelezionata].prezzo.replace('€', '').trim());
      handleAddToCart(prezzi[categoriaSelezionata].nome, prezzo, quantita);
    }
  };

  const handleSceltaInPiantaAddToCart = () => {
    Object.values(selectedSeats).forEach(seat => {
      handleAddToCart(seat.name, seat.price, seat.quantity);
    });
  };

  useEffect(() => {
    if (selectedOption === 'migliorPosto') {
      const prezziArray = [
        { nome: 'I ANELLO CENTRALE NUMERATO', prezzo: biglietto.prezzoIAnelloCentraleNumerato },
        { nome: 'I ANELLO NUMERATO CAT 1', prezzo: biglietto.prezzoIAnelloNumeratoCat1 },
        { nome: 'I ANELLO NUMERATO CAT 2', prezzo: biglietto.prezzoIAnelloNumeratoCat2 },
        { nome: 'II ANELLO NUMERATO CAT 1', prezzo: biglietto.prezzoIIAnelloNumeratoCat1 },
        { nome: 'II ANELLO CENTRALE NUMERATO', prezzo: biglietto.prezzoIIAnelloCentraleNumerato },
        { nome: 'II ANELLO NUMERATO CAT 2', prezzo: biglietto.prezzoIIAnelloNumeratoCat1 },
        { nome: 'III ANELLO CENTRALE NUMERATO', prezzo: biglietto.prezzoIIIAnelloCentraleNumerato },
        { nome: 'III ANELLO NUMERATO', prezzo: biglietto.prezzoIIIAnelloNumerato },
        { nome: 'PARTERRE IN PIEDI', prezzo: biglietto.parterreInPiedi },
      ];
      setPrezzi(prezziArray);
    } else {
      setPrezzi([]);
    }
  }, [selectedOption, biglietto]);

  useEffect(() => {
    const ticketCount = cart.reduce((total, item) => {
      if (item.category === 'Biglietto') {
        return total + item.quantity;
      }
      return total;
    }, 0);
    setTotalTicketsInCart(ticketCount);
  }, [cart]);

  const remainingTickets = 4 - totalTicketsInCart;

  if (!biglietto) {
    return <div>Biglietto non trovato</div>;
  }

  // Funzione per ottenere il giorno della settimana
  const getDayOfWeek = (dateString) => {
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    
    // Formato: DD-MM-YYYY
    const [day, month, year] = dateString.split('-');
    const date = new Date(year, month - 1, day); // month - 1 perché i mesi in JavaScript vanno da 0 a 11

    console.log("Data parsata:", date);
    return days[date.getDay()];
  };

  console.log("Data originale:", biglietto.data); // Log della data originale
  const dayOfWeek = getDayOfWeek(biglietto.data);
  console.log("Giorno della settimana:", dayOfWeek); // Log del giorno della settimana

  const incrementaQuantita = () => setQuantita(prev => Math.min(prev + 1, 4));
  const decrementaQuantita = () => setQuantita(prev => Math.max(prev - 1, 1));

  const selezionaCategoria = (index) => {
    setCategoriaSelezionata(index);
  };

  // Add this SVG component
  const ChevronDownIcon = ({ className }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  const deliveryMethods = [
    {
      icon: "corriere-espresso-icon",
      title: "Corriere Espresso Italia",
      description: "La consegna è normalmente prevista entro 12 giorni.",
    },
    {
      icon: "corriere-espresso-icon",
      title: "Corriere Espresso Europa occidentale e centrale",
      description: "La consegna è normalmente prevista entro 12 giorni.",
    },
    {
      icon: "corriere-espresso-icon",
      title: "Corriere Espresso Svizzera, USA e Canada",
      description: "La consegna è normalmente prevista entro 12 giorni.",
    },
    {
      icon: "corriere-espresso-icon",
      title: "Corriere Espresso altri paesi del mondo",
      description: "La consegna è normalmente prevista entro 12 giorni.",
    },
    {
      icon: "eticket-icon",
      title: "eTicket",
      description: "L'eTicket è il biglietto elettronico di TicketOne che deve essere scaricato e salvato direttamente sul tuo smartphone, non deve essere stampato e non sarà spedito a casa. Per accedere all'evento sarà sufficiente presentare al controllo accessi il biglietto salvato sullo smartphone per la lettura del relativo codice (QR code).",
    },
    {
      icon: "stampa-casa-icon",
      title: "Stampa@casa",
      description: "Stampa@casa è il biglietto di TicketOne in formato PDF da stampare autonomamente con l'ausilio di una normale stampante, in bianco e nero o a colori.",
    },
  ];

  const onlinePurchaseInfo = [
    {
      title: "Acquisto tramite \"Miglior posto\"",
      content: "Il \"Miglior posto\" è il metodo tradizionale e automatico basato su un algoritmo di assegnazione del miglior posto disponibile al momento dell'acquisto in base alla tipologia di biglietto selezionata e al numero di biglietti che si desidera acquistare. I posti numerati vengono assegnati generalmente contigui uno all'altro."
    },
    {
      title: "Acquisto tramite \"Scelta in pianta\"",
      content: "Con l'acquisto tramite \"Scelta in pianta\" l'utente può selezionare direttamente i posti desiderati sulla pianta dell'evento. Selezionando questa modalità di acquisto è necessario attendere solo qualche secondo per l'apertura completa. Tale opzione è disponibile solo per eventi selezionati da TicketOne e che presentano una mappa di posti numerati."
    },
    {
      title: "Biglietti di \"Posto Unico\"",
      content: "Il biglietto posto unico è un posto non numerato: in piedi o in caso di posti a sedere non si ha diritto ad un determinato posto. Il codice numerico indicato sul biglietto è un codice progressivo, non si riferisce ad un numero di posto esistente."
    },
    {
      title: "Biglietti non disponibili",
      content: "Significa che la quantità di biglietti di cui disponiamo al momento è esaurita. Faremo il possibile per ottenere nuove disponibilità e invitiamo gli utenti interessati a consultare regolarmente il nostro sito web per eventuali aggiornamenti."
    },
    {
      title: "Biglietti Solo nei Punti Vendita",
      content: "Significa che l'evento è imminente e la consegna dei biglietti non è più possibile. Alcuni biglietti potrebbero essere ancora disponibili presso i Punti Vendita TicketOne o sul luogo dell'evento."
    },
    {
      title: "Biglietti ridotti",
      content: "Spesso si possono acquistare biglietti ridotti, ad es. per bambini, studenti e anziani. Questi vengono mostrati nelle categorie di posto. Le aree riservate a persone con disabilità sono gestite direttamente dall'organizzatore, il link al sito dell'organizzatore è pubblicato nella scheda dell'evento desiderato."
    }
  ];

  const organizerInfo = {
    warning: "TicketOne non è l'organizzatore dell'evento ma si occupa della distribuzione dei biglietti per conto dell'organizzatore. Conseguentemente, sia la tipologia di posti messi in vendita di tempo in tempo per il tramite di TicketOne, sia le procedure e l'entità del rimborso dei titoli d'ingresso in caso di annullamento dell'evento, dipendono esclusivamente da scelte dell'organizzatore, senza alcun intervento e responsabilità di TicketOne.",
    cancellationPolicy: "In caso di annullamento dell'evento, il mancato rispetto delle procedure che saranno indicate dall'organizzatore per il rimborso dei titoli d'ingresso può determinare decadenza dal diritto di ottenere tale rimborso. E' facoltà dell'Organizzatore di non procedere al rimborso della componente del prezzo del titolo d'ingresso rappresentata dal diritto di prevendita. In nessun caso saranno rimborsabili le commissioni di servizio applicate da TicketOne.",
    termsAndConditions: "Prima di procedere all'acquisto prendere visione dei termini e delle condizioni d'acquisto accessibili dal presente sito cliccando qui.",
    organizer: "FRIENDS e PARTNERS S.P.A., Via Dei Sormani, 3, 20144 Milano Italia"
  };

  const renderButton = (isSceltaInPianta) => {
    const totalSelectedTickets = isSceltaInPianta
      ? Object.values(selectedSeats).reduce((total, seat) => total + seat.quantity, 0)
      : quantita;

    const isDisabled = isSceltaInPianta
      ? Object.keys(selectedSeats).length === 0 || remainingTickets < totalSelectedTickets
      : categoriaSelezionata === null || !prezzi[categoriaSelezionata] || remainingTickets < totalSelectedTickets;

    const buttonText = () => {
      if (remainingTickets === 0) {
        return "Limite massimo raggiunto (4 biglietti)";
      }
      if (isSceltaInPianta) {
        if (Object.keys(selectedSeats).length === 0) {
          return "Seleziona i tuoi posti";
        }
        return remainingTickets >= totalSelectedTickets
          ? `Aggiungi al carrello - ${totalSelectedTickets} Biglietti, ${Object.values(selectedSeats).reduce((total, seat) => total + seat.totalPrice, 0).toFixed(2)}€`
          : `Limite raggiunto (max 4 biglietti)`;
      } else {
        if (categoriaSelezionata === null || !prezzi[categoriaSelezionata]) {
          return "Scegli il tuo biglietto";
        }
        return remainingTickets >= totalSelectedTickets
          ? `Aggiungi al carrello - ${totalSelectedTickets} Bigliett${totalSelectedTickets === 1 ? 'o' : 'i'}, ${(parseFloat(prezzi[categoriaSelezionata].prezzo.replace('€', '').trim()) * totalSelectedTickets).toFixed(2)}€`
          : `Limite raggiunto (max 4 biglietti)`;
      }
    };

    return (
      <button 
        className={`px-8 py-3 rounded-2xl font-semibold flex items-center justify-center gap-1 ${
          !isDisabled && remainingTickets > 0 ? 'bg-titolo-default text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
        disabled={isDisabled || remainingTickets === 0}
        onClick={isSceltaInPianta ? handleSceltaInPiantaAddToCart : handleMigliorPostoAddToCart}
      >
        <span className="mr-2 lg:text-lg sm:text-base text-sm">
          {buttonText()}
        </span>
        <AggiungiAlCarrelloIcon className="lg:w-6 lg:h-6 sm:w-5 sm:h-5 w-4 h-4 fill-current" />
      </button>
    );
  };

  return (
    <>
        <div className="bg-secondario-default text-white">
            <div className="max-w-7xl lg:py-8 px-7 sm:px-6 lg:px-8 mx-auto flex flex-col sm:flex-row items-center justify-between">
              <div className="w-full sm:w-1/2 flex flex-col justify-center items-center sm:items-start text-center sm:text-left mb-4 sm:mb-0">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-secondario-light mb-2 mt-6 sm:mt-0">Geolier</h1>
                <div className="flex items-center mb-2 sm:mb-2 justify-center sm:justify-start">
                    <svg className="w-6 h-6 mr-2 text-secondario-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="lg:text-xl sm:text-lg text-base text-secondario-light">{dayOfWeek && `${dayOfWeek}, `}{biglietto.data}</p>
                </div>
                <div className="flex items-center sm:mb-4 justify-center sm:justify-start">
                    <svg className="w-6 h-6 mr-2 text-secondario-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="lg:text-xl sm:text-lg text-base text-secondario-light">{biglietto.luogo} | <span className="text-titolo-default">{biglietto.titolo}</span></p>
                </div>
               </div>
                <div className="w-full sm:w-1/2 flex justify-center sm:justify-end mb-8 sm:mb-0">
                  <img src="/foto-tour-marzo2025.jpg" alt="Tour Marzo 2025" className="w-full sm:w-1/2 rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
        <div className='max-w-7xl mx-auto px-8 sm:px-6 lg:px-8'>
            <NavLink to="/tour" className="flex items-center lg:gap-4 sm:gap-3 gap-2 bg-transparent text-secondario-light dark:text-secondario-default py-2 mb-12 mt-6 rounded-full hover:bg-opacity-80 transition-all">
                <ArrowIcon className="lg:w-3 sm:w-2 w-[6px] rotate-180 text-secondario-light dark:text-secondario-default pb-1"/>
                <p className='text-secondario-light dark:text-secondario-default lg:text-lg sm:text-base text-sm font-bold ms-2'>Torna all'elenco delle date</p>
            </NavLink>
            
            {/* Nuovo div con le informazioni */}
            <div className="bg-terziario-default dark:bg-opacity-70 border-3 border-titolo-default dark:border-terziario-default rounded-2xl px-7 py-8 mb-8">
                <p className="text-white lg:text-lg sm:text-base text-sm mb-4"><span className='font-bold'>CAMBIO NOMINATIVO:</span> Per questo evento è consentito il cambio nominativo a partire da un mese prima e fino al giorno dell'evento online sul nostro sito.</p>
                <p className="text-white lg:text-lg sm:text-base text-sm"><span className='font-bold'>LIMITI DI ACQUISTO:</span> Ogni cliente potrà acquistare fino a un massimo di 4 biglietti.</p>
            </div>

            {/* Nuove sezioni con radio button */}
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
              <div 
                className={`flex-1 bg-secondario-default border-2 rounded-lg p-4 cursor-pointer flex flex-col justify-between ${selectedOption === 'migliorPosto' ? 'border-titolo-default drop-shadow-[0_6px_16px_rgba(0,159,227,100%)]' : ''}`}
                onClick={() => handleOptionChange('migliorPosto')}
              >
                <div>
                  <MigliorPostoIcon className={`w-28 h-28 mx-auto mb-4 ${selectedOption === 'migliorPosto' ? 'text-titolo-default' : 'text-gray-500'}`} />
                  <h3 className={`text-center lg:text-lg sm:text-base text-sm font-bold mb-2 ${selectedOption === 'migliorPosto' ? 'text-titolo-default' : 'text-secondario-light'}`}>Miglior posto</h3>
                  <p className="text-center mb-4 text-[#616060] lg:text-base sm:text-sm text-xs ">Tu scegli il prezzo, noi i migliori posti al momento disponibili</p>
                </div>
                <div className="flex justify-center">
                  <input
                    type="radio"
                    id="migliorPosto"
                    name="selectionType"
                    value="migliorPosto"
                    checked={selectedOption === 'migliorPosto'}
                    onChange={() => handleOptionChange('migliorPosto')}
                    className="appearance-none w-6 h-6 border-2 border-gray-300 rounded-full checked:border-green-500 relative before:content-[''] before:absolute before:w-3 before:h-3 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full checked:before:bg-green-500 cursor-pointer"
                  />
                </div>
              </div>

              <div 
                className={`flex-1 bg-secondario-default border-2 rounded-lg p-4 cursor-pointer flex flex-col justify-between ${selectedOption === 'sceltaInPianta' ? 'border-titolo-default drop-shadow-[0_6px_16px_rgba(0,159,227,100%)]' : ''}`}
                onClick={() => handleOptionChange('sceltaInPianta')}
              >
                <div>
                  <SceltaInPiantaIcon className={`w-28 h-28 mx-auto mb-4 ${selectedOption === 'sceltaInPianta' ? 'text-titolo-default' : 'text-gray-500'}`} />
                  <h3 className={`text-center lg:text-lg sm:text-base text-sm font-bold mb-2 ${selectedOption === 'sceltaInPianta' ? 'text-titolo-default' : 'text-secondario-light'}`}>Scelta in pianta</h3>
                  <p className="lg:text-base sm:text-sm text-xs text-center mb-4 text-[#616060]">Scegli sulla pianta i migliori posti disponibili</p>
                </div>
                <div className="flex justify-center">
                  <input
                    type="radio"
                    id="sceltaInPianta"
                    name="selectionType"
                    value="sceltaInPianta"
                    checked={selectedOption === 'sceltaInPianta'}
                    onChange={() => handleOptionChange('sceltaInPianta')}
                    className="appearance-none w-6 h-6 border-2 border-gray-300 rounded-full checked:border-green-500 relative before:content-[''] before:absolute before:w-3 before:h-3 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full checked:before:bg-green-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* miglior posto */}
            {selectedOption === 'migliorPosto' && (
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <div className="mb-6 flex-col sm:flex sm:flex-row sm:justify-between border-b-2 border-[#D9D9D9] pb-7 pt-2">
                  <h3 className="lg:text-lg sm:text-base text-sm text-secondario-light font-semibold mb-2 sm:mt-3">1. Per favore seleziona il numero di biglietti desiderati:</h3>
                  <div className="flex items-center justify-center mt-4 sm:mt-0">
                    <button onClick={decrementaQuantita} className="w-10 py-1 bg-secondario-light lg:text-xl sm:text-lg text-base rounded-md text-secondario-default">-</button>
                    <span className="px-4 py-1 bg-transparent text-secondario-light lg:text-lg sm:text-base text-sm">{quantita}</span>
                    <button onClick={incrementaQuantita} className="w-10 py-1 bg-secondario-light lg:text-xl sm:text-lg text-base rounded-md text-secondario-default">+</button>
                  </div>
                </div>
                
                <h3 className="lg:text-lg sm:text-base text-sm font-semibold mb-3 text-secondario-light">2. Per favore seleziona la categoria di posto:</h3>
                <div className="space-y-2">
                  {prezzi.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 pb-5 border-b-2 border-[#D9D9D9]">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-[minmax(0,1fr),385px,1fr] items-start sm:items-center mb-2 sm:mb-0">
                        <span className="font-medium text-sm sm:text-base lg:text-lg text-secondario-light break-words sm:truncate pr-2">{item.nome}</span>
                        <span className="text-xs sm:text-sm text-gray-500">Intero</span>
                        <span></span> {/* Spazio vuoto per mantenere l'allineamento */}
                      </div>
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                        <span className="mr-4 text-secondario-light text-sm sm:text-base">{item.prezzo}</span>
                        <button 
                          onClick={() => selezionaCategoria(index)}
                          className={`w-6 h-6 rounded-full border-2 relative
                            ${categoriaSelezionata === index 
                              ? 'border-green-500' 
                              : 'border-gray-300 hover:border-gray-400'
                            }
                            focus:outline-none
                            transition-colors duration-200 ease-in-out
                          `}
                        >
                          {categoriaSelezionata === index && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                  {renderButton(false)}
                </div>
              </div>
            )}

            {/* scelta in pianta */}
            {selectedOption === 'sceltaInPianta' && (
              <div className="mt-6 bg-white rounded-lg shadow-md p-6 relative">
                <h3 className="lg:text-lg sm:text-base text-sm font-semibold mb-3 text-secondario-light">Seleziona i tuoi posti sulla pianta:</h3>
                
                {/* Mappa a schermo intero */}
                <div className="w-full h-[calc(100vh-200px)] relative border-2 border-gray-300 p-4 mb-4">
                  <div className="relative w-full h-full">
                    {/* Componenti della mappa come prima */}
                    <Palco className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[31%] text-gray-400" />
                    <SezioneRed className="absolute top-1/4 left-0 w-1/4 h-3/4 text-red-600 cursor-pointer" onClick={() => handleSeatSelection({ name: 'RED', price: 69 })} />
                    <ParterreInPiedi className="absolute top-[41%] left-1/4 w-1/2 h-[26%] text-purple-600 cursor-pointer" onClick={() => handleSeatSelection({ name: 'PARTERRE IN PIEDI', price: 50 })} />
                    <SezioneBlu className="absolute bottom-0 left-1/4 w-1/2 h-1/4 text-blue-500 cursor-pointer" onClick={() => handleSeatSelection({ name: 'BLUE', price: 75 })} />
                    <SezioneOrange className="absolute top-1/4 right-0 w-1/4 h-3/4 text-orange-500 cursor-pointer" onClick={() => handleSeatSelection({ name: 'ORANGE', price: 69 })} />
                    
                    {/* Etichette */}
                    <div className="absolute top-[13%] left-1/2 transform -translate-x-1/2 text-center font-bold text-black">PALCO</div>
                    <div className="absolute top-1/2 left-1/8 transform -translate-x-1/2 -rotate-90 text-red-600 font-semibold">RED</div>
                    <div className="absolute top-1/2 right-0 transform translate-x-full rotate-90 text-orange-500 origin-left font-semibold">ORANGE</div>
                    <div className="absolute top-[33%] left-1/2 transform -translate-x-1/2 text-purple-600 font-semibold">PARTERRE IN PIEDI</div>
                    <div className="absolute bottom-[24%] left-1/2 transform -translate-x-1/2 text-blue-500 font-semibold">BLUE</div>
                  </div>
                </div>
                
                {/* Posti selezionati sopra la mappa */}
                <div className="absolute top-4 right-4 w-1/3 bg-white p-4 rounded-lg shadow-lg">
                  <h4 className="font-semibold mb-2 text-secondario-light">Posti selezionati:</h4>
                  {Object.keys(selectedSeats).length > 0 ? (
                    Object.values(selectedSeats).map((seat) => (
                      <div key={seat.name} className="mb-2 p-2 border-2 border-titolo-default rounded flex justify-between items-center">
                        <span className={`
                          ${seat.name === 'RED' ? 'text-red-600' :
                            seat.name === 'ORANGE' ? 'text-orange-500' :
                            seat.name === 'BLUE' ? 'text-blue-500' :
                            seat.name === 'PARTERRE IN PIEDI' ? 'text-purple-600' :
                            'text-secondario-light'}
                          font-semibold
                        `}>
                          {seat.name} - {seat.quantity}x
                        </span>
                        <div>
                          <span className="mr-2 text-secondario-light">€{seat.totalPrice.toFixed(2)}</span>
                          <button onClick={() => handleRemoveSeat(seat.name)} className="text-titolo-default">X</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">Seleziona i tuoi posti cliccando sui posti disponibili.</p>
                  )}
                </div>
                
                <div className="mt-6 flex justify-end">
                  {renderButton(true)}
                </div>
              </div>
            )}

            {/* Modal per la selezione della quantità */}
            <ModalBigliettoPage isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              {currentSelection && (
                <div className="p-4">
                  <h2 className={`text-xl font-bold mb-4 ${
                    currentSelection.name === 'RED' ? 'text-red-600' :
                    currentSelection.name === 'ORANGE' ? 'text-orange-500' :
                    currentSelection.name === 'BLUE' ? 'text-blue-500' :
                    currentSelection.name === 'PARTERRE IN PIEDI' ? 'text-purple-600' :
                    'text-black'
                  }`}>
                    {currentSelection.name}
                  </h2>
                  <p className="mb-4 text-secondario-light">Prezzo: €{currentSelection.price.toFixed(2)}</p>
                  <p className="mb-2 text-secondario-light">Seleziona la quantità:</p>
                  <div className="flex items-center justify-center mb-4">
                    <button 
                      onClick={decrementQuantity} 
                      className="px-3 py-1 bg-secondario-light text-secondario-default rounded-l"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-secondario-light">{modalQuantity}</span>
                    <button 
                      onClick={incrementQuantity} 
                      className="px-3 py-1 bg-secondario-light text-secondario-default rounded-r"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleQuantitySelection}
                    className="w-full mt-2 px-4 py-2 bg-titolo-default text-white rounded hover:bg-[#0083BB]"
                  >
                    Conferma
                  </button>
                </div>
              )}
            </ModalBigliettoPage>

            {/* Accordion section - moved to the bottom */}
            <div className="mt-8 bg-white rounded-lg shadow-custom p-6 mb-20 drop-shadow-[0_6px_10px_rgba(0,159,227,100%)]">
              {['Informazioni sui metodi di consegna', 'Informazioni sull\'acquisto online', 'Informazioni sull\'organizzatore'].map((title, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button
                    className="w-full py-4 px-6 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="text-secondario-light font-medium">{title}</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-secondario-light transform transition-transform duration-200 ${
                        openAccordion === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === index && (
                    <div className={`${index === 0 ? 'px-0' : 'px-6'} pb-4`}>
                      {index === 0 ? (
                        <div>
                          {deliveryMethods.map((method, idx) => (
                            <div key={idx} className="mb-4 flex flex-col sm:flex-row items-start">
                              <div className="w-full sm:w-auto mb-2 sm:mb-0 sm:mr-3 flex justify-center sm:justify-start">
                                {/* Replace with actual icon component or image */}
                                <div className={`w-12 h-12 sm:w-6 sm:h-6 ${method.icon}`}></div>
                              </div>
                              <div className="w-full text-center sm:text-left">
                                <h4 className="font-semibold text-secondario-light">{method.title}</h4>
                                <p className="text-gray-600">{method.description}</p>
                              </div>
                            </div>
                          ))}
                          <p className="mt-4 text-gray-600 text-center sm:text-left">
                            La modalità di consegna desiderata non è disponibile in questa lista? Per favore controlla se è disponibile nel carrello per questo evento.
                          </p>
                        </div>
                      ) : index === 1 ? (
                        <div>
                          {onlinePurchaseInfo.map((info, idx) => (
                            <div key={idx} className="mb-4">
                              <h4 className="font-semibold text-secondario-light mb-2">{info.title}</h4>
                              <p className="text-gray-600">{info.content}</p>
                            </div>
                          ))}
                          <div className="mt-6 text-sm text-gray-500">
                            <p>Ai sensi e per gli effetti di cui all'art. 49 del Codice del Consumo i dati identificativi di TicketOne sono i seguenti:</p>
                            <p>TicketOne S.p.A. - Sede legale: Via Fabio Filzi, 29 - 20124 Milano - Capitale sociale € 4.998.701,59 P. IVA: 12471480157 REA Milano n.: 1558633 - tel. +39023922261 fax +390239226270.</p>
                            <p>Per eventuali richieste e/o reclami ti preghiamo di utilizzare esclusivamente la nostra sezione servizio clienti e nel caso di compilare l'apposito modulo on-line.</p>
                            <p className="mt-4">TicketOne effettua la vendita dei Titoli di Ingresso in nome e per conto dell'Organizzatore i cui dati identificativi sono contenuti nella pagina dell'Evento prescelto.</p>
                            <p className="mt-4">Copyright © 1998-2024 - Tutti i diritti riservati.</p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-semibold text-secondario-light mb-2">Avvertenza:</h4>
                          <p className="text-gray-600 mb-4">{organizerInfo.warning}</p>
                          
                          <p className="text-gray-600 mb-4">{organizerInfo.cancellationPolicy}</p>
                          
                          <p className="text-gray-600 mb-4">
                            {organizerInfo.termsAndConditions.split('cliccando qui')[0]}
                            <a href="#" className="text-blue-500 hover:underline">cliccando qui</a>.
                          </p>
                          
                          <h4 className="font-semibold text-secondario-light mb-2">Organizzatore:</h4>
                          <p className="text-gray-600">{organizerInfo.organizer}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
        </div>
    </>
  );
}

export default BigliettoPage;