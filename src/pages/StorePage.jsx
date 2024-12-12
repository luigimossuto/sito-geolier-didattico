import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { Card, CardBody, CardFooter, Image, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { merch } from "../components/data/Merch";
import ExpandedArea from "../components/ExpandedArea";
import AnimatedCartButton from "../components/AnimatedCartButton";
import { AggiungiAlCarrelloIcon } from "../components/icon/AggiungiAlCarrelloIcon";
import { CartContext } from "../providers/CartContext";
import { ButtonStoreFilter } from "../components/ButtonStoreFilter";
import { ButtonOrdinaFiltra } from "../components/ButtonOrdinaFiltra";

const ArrowIcon = ({ isOpen }) => (
    <svg
      className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

const StorePage = () => {
    const [appliedFilters, setAppliedFilters] = useState({ ordine: 'ORDINE', formato: 'FORMATO', stato: 'STATO' });
    const [selectedFilters, setSelectedFilters] = useState({ ordine: 'ORDINE', formato: 'FORMATO', stato: 'STATO' });
    const [openDropdown, setOpenDropdown] = useState('');
    const { addToCart } = useContext(CartContext);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

    const orderOptions = ['IN PRIMO PIANO', 'BEST SELLER', 'IN ORDINE ALFABETICO, A-Z', 'IN ORDINE ALFABETICO, Z-A', 'PREZZO CRESCENTE', 'PREZZO DECRESCENTE'];
    const formatOptions = ['T-SHIRT', 'VINILE', 'PANTALONCINO', 'CD', 'CAPPELLO', 'CAMICIA', 'BOX'];
    const statoOptions = ['DISPONIBILE', 'NOVITÀ'];

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleFilterChange = (filterType, value) => {
        if (isLargeScreen) {
            setSelectedFilters(prev => ({ ...prev, [filterType]: value }));
        } else {
            setAppliedFilters(prev => ({ ...prev, [filterType]: value }));
        }
    };

    const applyFilters = () => {
        setAppliedFilters(selectedFilters);
    };

    const resetFilters = () => {
        const defaultFilters = { ordine: 'ORDINE', formato: 'FORMATO', stato: 'STATO' };
        setSelectedFilters(defaultFilters);
        setAppliedFilters(defaultFilters);
    };

    const filteredMerch = merch.filter(item => {
        const ordineMatch = appliedFilters.ordine === 'ORDINE' || 
                            item.ordine === appliedFilters.ordine.toLowerCase() || 
                            item.ordine2 === appliedFilters.ordine.toLowerCase() ||
                            ['IN ORDINE ALFABETICO, A-Z', 'IN ORDINE ALFABETICO, Z-A', 'PREZZO CRESCENTE', 'PREZZO DECRESCENTE'].includes(appliedFilters.ordine);
        const formatoMatch = appliedFilters.formato === 'FORMATO' || item.formato === appliedFilters.formato.toLowerCase();
        const statoMatch = appliedFilters.stato === 'STATO' || item.stato === appliedFilters.stato.toLowerCase();
        
        return ordineMatch && formatoMatch && statoMatch;
    });

    const sortedMerch = [...filteredMerch].sort((a, b) => {
        if (appliedFilters.ordine === 'IN ORDINE ALFABETICO, A-Z') {
            return a.title.localeCompare(b.title, 'it', { sensitivity: 'base' });
        } else if (appliedFilters.ordine === 'IN ORDINE ALFABETICO, Z-A') {
            return b.title.localeCompare(a.title, 'it', { sensitivity: 'base' });
        } else if (appliedFilters.ordine === 'PREZZO CRESCENTE' || appliedFilters.ordine === 'PREZZO DECRESCENTE') {
            const priceA = parseFloat(a.price.replace('€', '').replace(',', '.'));
            const priceB = parseFloat(b.price.replace('€', '').replace(',', '.'));
            return appliedFilters.ordine === 'PREZZO CRESCENTE' ? priceA - priceB : priceB - priceA;
        }
        return 0;
    });

    const handleAddToCart = (item) => {
        addToCart(item);
        console.log("Prodotto aggiunto al carrello:", item);
    };
    
    const handleDropdownOpenChange = (isOpen, dropdownType) => {
        setOpenDropdown(isOpen ? dropdownType : '');
    };

    const renderDropdown = (dropdownType, options) => (
        <Dropdown key={dropdownType} onOpenChange={(isOpen) => handleDropdownOpenChange(isOpen, dropdownType)}>
            <DropdownTrigger>
                <Button 
                className="bg-transparent font-bold uppercase text-secondario-default dark:text-secondario-default w-48 lg:text-base"
                endContent={<ArrowIcon isOpen={openDropdown === dropdownType} />}
                >
                    <p className={`${selectedFilters[dropdownType] !== dropdownType.toUpperCase() ? 'text-titolo-default' : 'dark:text-secondario-default text-secondario-default'} truncate`}>
                        {selectedFilters[dropdownType]}
                    </p>
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label={`${dropdownType} selection`}>
                <DropdownItem key="tutti" onPress={() => handleFilterChange(dropdownType, dropdownType.toUpperCase())}>
                    {dropdownType.toUpperCase()}
                </DropdownItem>
                {options.map((option) => (
                    <DropdownItem key={option} onPress={() => handleFilterChange(dropdownType, option)}>
                        {option}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );

    const renderMobileDropdownItem = (option, filterType) => {
        const isActive = appliedFilters[filterType] === option;
        return (
            <DropdownItem 
                key={option} 
                onPress={() => handleFilterChange(filterType, option)}
            >
                <div className="flex items-center justify-between w-full">
                    <span>{option}</span>
                    {isActive && (
                        <span className="w-3 h-3 bg-green-500 rounded-full ml-2"></span>
                    )}
                </div>
            </DropdownItem>
        );
    };

    const handleStatoFilterChange = (value) => {
        setAppliedFilters(prev => ({
            ...prev,
            stato: prev.stato === value ? 'STATO' : value
        }));
    };

    const truncateDescription = (description, maxLength = 30) => {
        if (description.length <= maxLength) return description;
        return description.substr(0, maxLength).trim() + '...';
    };

    return (
        <>
            <div className="mb-12 dark:bg-colorefooter-default bg-terziario-default">
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex flex-wrap justify-between items-center py-8'>
                        {isLargeScreen ? (
                            // Desktop layout
                            <>
                                <div className="flex items-center gap-2 -ml-2">
                                    {renderDropdown('ordine', orderOptions)}
                                    {renderDropdown('formato', formatOptions)}
                                    {renderDropdown('stato', statoOptions)}
                                </div>
                                <div className="text-2xl font-bold flex gap-8">
                                    <ButtonStoreFilter className="bg-gray-500 text-secondario-default dark:text-secondario-default font-bold px-6 py-6 lg:text-base text-sm" onClick={resetFilters}>Elimina Filtri</ButtonStoreFilter>
                                    <ButtonStoreFilter className="dark:bg-terziario-default bg-titolo-default text-secondario-default dark:text-secondario-default font-bold px-6 py-6 lg:text-base text-sm" onClick={applyFilters}>Applica Filtri</ButtonStoreFilter>
                                </div>
                            </>
                        ) : (
                            // Mobile layout
                            <div className="flex items-center gap-2 w-full">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <ButtonOrdinaFiltra className="uppercase bg-secondario-default border-2 border-titolo-default text-secondario-light sm:text-sm text-[12px]">
                                            Filtra e Ordina
                                        </ButtonOrdinaFiltra>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Opzioni di filtro e ordinamento">
                                        <DropdownItem key="reset" onPress={resetFilters}>
                                            ELIMINA FILTRI
                                        </DropdownItem>
                                        <DropdownItem key="formato-header" className="font-bold pt-0 my-2 dark:bg-secondario-default bg-secondario-light"></DropdownItem>
                                        {orderOptions.map(option => renderMobileDropdownItem(option, 'ordine'))}
                                        <DropdownItem key="formato-header" className="font-bold pt-0 my-2 dark:bg-secondario-default bg-secondario-light"></DropdownItem>
                                        {formatOptions.map(option => renderMobileDropdownItem(option, 'formato'))}
                                    </DropdownMenu>
                                </Dropdown>
                                <ButtonOrdinaFiltra 
                                    className={`uppercase sm:text-sm text-[12px] bg-gray-400 border-2 border-secondario-default ${appliedFilters.stato === 'DISPONIBILE' ? 'bg-white text-secondario-light dark:text-secondario-light' : ''}`}
                                    onClick={() => handleStatoFilterChange('DISPONIBILE')}
                                >
                                    Disponibili
                                </ButtonOrdinaFiltra>
                                <ButtonOrdinaFiltra 
                                    className={`uppercase sm:text-sm text-[12px] bg-gray-400 border-2 border-secondario-default ${appliedFilters.stato === 'NOVITÀ' ? 'bg-white text-secondario-light dark:text-secondario-light' : ''}`}
                                    onClick={() => handleStatoFilterChange('NOVITÀ')}
                                >
                                    Novità
                                </ButtonOrdinaFiltra>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 xl:gap-6 px-8 min-[520px]:px-20 sm:px-0">
                    {sortedMerch.map((item, index) => (
                        <NavLink key={index} to={`/store/${item.id}`} className="w-full">
                            <Card className="bg-transparent rounded-b-3xl w-full relative">
                                <CardBody className={`p-0 h-[350px] flex justify-center items-center rounded-t-3xl rounded-b-3xl bg-content1 bg-center bg-no-repeat bg-cover bg-transparent drop-shadow-[0_10px_2px_rgba(113,113,113,55%)] ${item.imgbg}`}>
                                    <Image
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        alt={item.title}
                                        className="w-full h-[240px] object-contain"
                                        src={item.img}
                                    />
                                    <AnimatedCartButton
                                        index={index}
                                        AggiungiAlCarrelloIcon={AggiungiAlCarrelloIcon}
                                        onClick={() => handleAddToCart(item)}
                                        className="absolute bottom-3 right-3"
                                    />
                                </CardBody>
                                <CardFooter className="text-small flex flex-col items-start bg-secondario-default -mt-5 px-4 pb-2">
                                    <ExpandedArea item={item} />
                                    <div className="flex flex-col gap-1 w-full">
                                        <p className="text-primario-default text-start lg:text-base sm:text-base text-sm w-full whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</p>
                                        <p className="text-primario-default text-start lg:text-base sm:text-base text-sm font-bold">{item.sottotitolo}</p>
                                        <p className="text-primario-default text-start lg:text-base sm:text-base text-sm w-full whitespace-nowrap overflow-hidden text-ellipsis">{item.descrizione}</p>
                                        <p className="text-primario-default text-start lg:text-base sm:text-base text-sm w-full mt-auto mb-2">{item.price}</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    );
};

export default StorePage;