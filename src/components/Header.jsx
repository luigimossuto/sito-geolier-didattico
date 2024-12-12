import { useState, useEffect, useContext, useCallback } from "react";
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, 
  NavbarMenu, NavbarMenuItem, Input, ModalContent, ModalHeader, 
  ModalBody, ModalFooter, Button, useDisclosure, Modal, Badge
} from "@nextui-org/react";
import { SearchIcon } from "./icon/SearchIcon";
import { useTheme } from "../providers/ThemeProviders";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { MoonIcon } from "./icon/MoonIcon";
import { SunIcon } from "./icon/SunIcon";
import { CarrelloIcon } from "./icon/CarrelloIcon";
import { merch } from "./data/Merch";
import NavbarSearchComponent from "./NavbarSearchComponent";
import { CartContext } from "../providers/CartContext";

export default function App({ isStorePage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();
  const [search, setSearch] = useState('');
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();
  const [size, setSize] = useState('2xl');
  const navigate = useNavigate();
  const [buttonSize, setButtonSize] = useState('lg');
  const { itemCount, cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const filteredSearch = search.trim() === '' ? [] : merch.filter((prod) => {
    if (!prod || !prod.title || !prod.descrizione || !prod.category) return false;
    
    const searchTerms = search.toLowerCase().split(/\s+/);
    const titleWords = prod.title.toLowerCase().split(/\s+/);
    const descriptionWords = prod.descrizione.toLowerCase().split(/\s+/);
    const textCategory = prod.category.toLowerCase().split(/\s+/);
    
    return searchTerms.every(term => 
      titleWords.some(word => word.includes(term)) || 
      descriptionWords.some(word => word.includes(term)) || 
      textCategory.some(word => word.includes(term))
    );
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setButtonSize('sm');
      } else if (window.innerWidth < 1024) {
        setButtonSize('md');
      } else {
        setButtonSize('lg');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpen = () => {
    setSize(window.innerWidth < 1024 ? 'xl' : '2xl');
    onSearchOpen();
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?q=${search}`);
    onSearchClose();
  };

  const handleSubmitAndClose = () => {
    handleSearchSubmit({ preventDefault: () => {} });
    onSearchClose();
  };

  const handleReset = () => {
    setSearch('');
  };

  const handleCartClick = () => {
    onCartOpen();
  };

  const handleSearchClick = () => {
    onSearchOpen();
  };
  const menuItems = [
    {
      id: "/",
      name: "Home",
    },
    {
      id: "/store",
      name: "Store",
    },
    {
      id: "/tour",
      name: "Tour",
    },
    {
      id: "/geolier",
      name: "Geolier",
    },
    {
      id: "/contatti",
      name: "Contatti",
    }
  ];

  const calculateTotalPrice = (price, quantity) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price.replace('€', '').trim()) : price;
    return (numericPrice * quantity).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const handleMenuItemClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Navbar 
        className={`navbar-sticky ${
          isStorePage
            ? isScrolled 
              ? darkMode 
                ? 'bg-black' 
                : 'bg-white'
              : 'bg-transparent'
            : isScrolled
              ? darkMode
                ? 'bg-black/70 backdrop-blur-md'
                : 'bg-white/70 backdrop-blur-md'
              : 'bg-transparent'
        }`}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        isBordered
      >
        <div className="max-w-[1280px] w-full mx-auto min-[1280px]:px-8 md:px-0 flex items-center">
          <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className={`${darkMode ? 'text-white' : 'text-black'} p-4`}
              onClick={handleMenuToggle}
            />
            <NavbarBrand>
              <NavLink to="/">
                <img src="/logo.svg" className="h-8" alt="Logo" />
              </NavLink>
            </NavbarBrand>
          </NavbarContent>
  
          <NavbarContent className="hidden sm:flex" justify="start">
            <NavbarBrand className="mr-4">
              <NavLink to="/">
                <img src="/logo.svg" className="h-10 sm:h-9 md:h-10" alt="Logo" />
              </NavLink>
            </NavbarBrand>
          </NavbarContent>
  
          <NavbarContent className="hidden sm:flex gap-4 sm:gap-3 md:gap-4" justify="center">
            {menuItems.map((item, index) => (
              <NavbarItem key={index}>
                <NavLink 
                  to={item.id} 
                  className={({ isActive }) => `
                    ${isActive ? 'text-titolo-default' : 'text-secondario-light dark:text-secondario-default'}
                    hover:text-titolo-default dark:hover:text-titolo-default
                    transition-colors duration-300
                    text-sm sm:text-base
                  `}
                >
                  {item.name}
                </NavLink>
              </NavbarItem>
            ))}
          </NavbarContent>
  
          <NavbarContent className="flex gap-0" justify="end">
            <NavbarSearchComponent merch={merch} />
            <NavbarItem>
              <Button 
                size={buttonSize} 
                isIconOnly 
                className="lg:hidden bg-transparent rounded-full" 
                onPress={handleSearchClick}
              >
                <SearchIcon className={`w-[22px] sm:w-[24px] lg:w-[28px] ${darkMode ? 'text-white' : ''}`} />
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                size={buttonSize}
                isIconOnly
                className="bg-transparent -mr-1 sm:-mr-0 lg:-mr-2 lg:ms-1"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? 
                  <MoonIcon className={`size-5 sm:size-6 lg:size-[30px] ${darkMode ? 'text-white' : ''}`} /> : 
                  <SunIcon className={`size-5 sm:size-6 lg:size-[30px] ${darkMode ? 'text-white' : ''}`} />
                }
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button size={buttonSize} isIconOnly className="bg-transparent relative py-2 px-0" onClick={handleCartClick}>
                <Badge 
                  content={itemCount} 
                  placement="top-right"
                  size="sm"
                  className="absolute -top-2 -right-2 bg-titolo-default text-white min-w-[16px] min-h-[16px] sm:min-w-[20px] sm:min-h-[20px] flex items-center justify-center rounded-full p-0.5 text-xs font-bold border-[1.5px] sm:border-2 border-white"
                  isInvisible={itemCount === 0}
                >
                </Badge>
                <CarrelloIcon className={`w-5 sm:w-6 lg:w-[30px] ${darkMode ? 'text-white' : 'text-secondario-light'}`}/>
              </Button>
            </NavbarItem>
          </NavbarContent>
        </div>

        <NavbarMenu className={`${isStorePage ? 'mt-12' : ''} bg-transparent`}>
          {menuItems.map((item, index) => (
            <NavbarMenuItem 
              key={`${item.name}-${index}`}
              className={`${isStorePage ? 'pt-4' : ''}`}
            >
              <NavLink
                to={item.id}
                className={({ isActive }) => `
                  w-full
                  ${isActive ? 'text-titolo-default' : location.pathname === '/' && !darkMode ? 'text-white' : 'text-secondario-light dark:text-secondario-default'}
                  hover:text-titolo-default dark:hover:text-titolo-default
                  transition-colors duration-300
                `}
                size="lg"
                onClick={handleMenuItemClick}
              >
                {item.name}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        <Modal 
          size={size} 
          isOpen={isSearchOpen} 
          onClose={onSearchClose}
          className="modal-center"
          classNames={{
            base: "m-0",
            wrapper: "items-center",
          }}
          scrollBehavior="outside"
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            }
          }}
        >
          <ModalContent style={{ maxHeight: 'calc(100vh - 80px)', marginTop: '40px', marginBottom: '40px' }}>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col pb-0 mt-10">
                  <form onSubmit={handleSearchSubmit} className="flex w-full justify-center gap-4 !items-center">
                    <div className="w-[83%]">
                      <div className="w-full flex">
                        <div className="flex w-full flex-wrap md:flex-nowrap">
                          <Input 
                            value={search} 
                            onChange={(event) => setSearch(event.target.value)} 
                            type="text" 
                            label="Cerca" 
                            placeholder="Che cosa cerchi?"
                          />
                        </div>
                      </div> 
                    </div>
                    <button
                      type="reset"
                      onClick={handleReset}
                      className="flex text-sm items-center justify-center text-secondario-light dark:text-secondario-default underline underline-offset-2"
                    >
                      CANCELLA
                    </button>
                  </form>
                </ModalHeader>
                <ModalBody>
                  <div className="overflow-y-auto max-h-[calc(100vh-280px)] pr-4 -mr-4">
                    <div className="pr-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-lg mx-auto mt-4">
                        {filteredSearch.length > 0 && filteredSearch.map((filt) => (
                          <NavLink to={`/merch/${filt.id}`} onClick={onSearchClose} key={filt.id} className="flex flex-col">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                              <div className="aspect-w-1 aspect-h-1 w-full">
                                <img 
                                  src={filt.img} 
                                  alt={filt.title}
                                  className="object-contain w-full h-32"
                                />
                              </div>
                              <div className="pt-2 flex items-center justify-center gap-1">
                                <img src={filt.icon} className="w-[14px] pt-[1px]"/>
                                <p className={`text-center text-sm truncate font-sans font-bold ${filt.textcolore}`}>{filt.category}</p>
                              </div>
                              <div className="px-2 pt-1">
                                <p className="text-center text-sm font-medium truncate text-secondario-light">{filt.title}</p>
                              </div>
                              <div className="p-2 pt-0">
                                <p className="text-center text-sm font-medium truncate text-secondario-light">{filt.price}</p>
                              </div>
                            </div>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onSearchClose}>
                    Close
                  </Button>
                  <Button className="bg-titolo-default text-secondario-default" onPress={handleSubmitAndClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal 
          isOpen={isCartOpen} 
          onClose={onCartClose}
          scrollBehavior="inside"
          classNames={{
            base: "m-auto max-w-[95%] sm:max-w-md md:max-w-lg",
            wrapper: "items-center",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Carrello</ModalHeader>
                <ModalBody>
                  {cart.length === 0 ? (
                    <p>Il tuo carrello è vuoto.</p>
                  ) : (
                    cart.map((item, index) => (
                      <div key={index} className="flex mb-6">
                        <div className="w-32 h-32 mr-4 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={item.category === 'Biglietto' ? '/foto-tour-marzo2025.jpg' : item.img} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              {item.category === 'Biglietto' ? (
                                <p className="text-base font-sans font-bold text-titolo-default">Biglietto</p>
                              ) : (
                                <>
                                  <img src={item.icon} className="w-[11px] pt-[2.5px]"/>
                                  <p className={`text-base font-sans font-bold ${item.textcolore}`}>{item.category}</p>
                                </>
                              )}
                            </div>
                            <p className="font-bold lg:text-base">{item.title}</p>
                            <p className="text-start lg:text-base">{item.descrizione}</p>
                            <p className="lg:text-base">€{calculateTotalPrice(item.price, item.quantity)}</p>
                            {item.taglia && item.size && (
                              <p className="text-gray-500 text-sm mt-1">Taglia: {item.size}</p>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                                className="w-7 h-7 dark:bg-secondario-default bg-gray-200 text-secondario-light rounded-full"
                              >
                                -
                              </button>
                              <span className="w-7 h-7 dark:bg-secondario-default bg-gray-200 text-titolo-default flex items-center justify-center rounded-full">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                className="w-7 h-7 dark:bg-secondario-default bg-gray-200 text-secondario-light rounded-full"
                              >
                                +
                              </button>
                            </div>
                            <Button color="danger" size="sm" onClick={() => removeFromCart(index)}>
                              Rimuovi
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onCartClose}>
                    Chiudi
                  </Button>
                  <Button className="bg-titolo-default text-secondario-default" onPress={handleProceedToCheckout}>
                    Procedi con l'acquisto
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Navbar>
    </>
  );
}