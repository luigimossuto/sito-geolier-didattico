import {Accordion, AccordionItem} from "@nextui-org/react";
import { NavLink } from "react-router-dom";

export default function AccordionFooter() {
  const contatti = "Contatti";
  const rimborso = "Chiedi un rimborso";
  const home = "Home";
  const store = "Store";
  const tour = "Tour";
  const geolier = "Geolier";
  const privacy = "Informativa sulla Privacy";
  const condizioniUso = "Condizioni D'Uso";
  const termini = "Termini D'Acquisto";
  const cookie = "Impostazioni dei Cookie";

  const accordionItemClasses = {
    title: "font-bold text-lg sm:text-xl text-secondario-default dark:text-secondario-default",
    // ... altri classNames se necessario
  };

  return (
    <div className="[&_*]:!ps-0">
      <Accordion>
        <AccordionItem 
          key="1" 
          aria-label="Accordion 1" 
          title="Supporto"
          classNames={accordionItemClasses}
        >
          <div className="flex flex-col gap-3">
            <NavLink to={"#"}><p className="text-base sm:text-lg text-secondario-default dark:text-secondario-default">{contatti}</p></NavLink>
            <NavLink to={"#"}><p className="text-base sm:text-lg text-secondario-default dark:text-secondario-default">{rimborso}</p></NavLink>
          </div>
        </AccordionItem>
        <AccordionItem 
          key="2" 
          aria-label="Accordion 2" 
          title="Sito"
          classNames={accordionItemClasses}
        >
          <div className="flex flex-col gap-3">
            <NavLink to={"#"}><p className="text-base sm:text-lg text-secondario-default dark:text-secondario-default">{home}</p></NavLink>
            <NavLink to={"#"}><p className="text-base sm:text-lg text-secondario-default dark:text-secondario-default">{store}</p></NavLink>
            <NavLink to={"#"}><p className="text-base sm:text-lg text-secondario-default dark:text-secondario-default">{tour}</p></NavLink>
            <NavLink to={"#"}><p className="text-base sm:text-lg text-secondario-default dark:text-secondario-default">{geolier}</p></NavLink>
          </div>
        </AccordionItem>
        <AccordionItem 
          key="3" 
          aria-label="Accordion 3" 
          title="Area legale"
          classNames={accordionItemClasses}
        >
          <div className="flex flex-col gap-3">
            <NavLink to={"#"}><p className="text-base sm:text-lg text-secondario-default dark:text-secondario-default">{privacy}</p></NavLink>
            <NavLink to={"#"}><p className="text-base sm:text-lg text-secondario-default dark:text-secondario-default">{condizioniUso}</p></NavLink>
            <NavLink to={"#"}><p className="text-base sm:text-lg text-secondario-default dark:text-secondario-default">{termini}</p></NavLink>
            <NavLink to={"#"}><p className="text-base sm:text-lg text-secondario-default dark:text-secondario-default">{cookie}</p></NavLink>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}