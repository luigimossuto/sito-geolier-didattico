import AccordionFooter from "./AccordionFooter";
import InputField from "./InputField";
import SocialMediaIcons from "./SocialMediaIcons";

const Footer = () => {
  return (
    <>
        <div className="w-full mx-auto bg-colorefooter-default border-b-2 border-gray-400">
          <div className="hidden lg:block">
            <div className="max-w-7xl px-8 mx-auto py-14 flex justify-between lg:gap-20">
              <div className="w-max h-auto flex flex-col gap-6">
                <p className="text-lg font-bold dark:text-shadow-custom text-shadow-custom text-secondario-default">Diventa membro esclusivo</p>
                <InputField />
              </div>
              <div className="w-max h-auto flex flex-col justify-between">
                <div>
                  <p className="text-lg font-bold text-secondario-default text-shadow-custom">Supporto</p>
                  <ul className="flex flex-col gap-6 mt-6">
                    <li className="text-secondario-default text-base">Contatti</li>
                    <li className="text-secondario-default text-base">Chiedi un rimborso</li>
                  </ul>
                </div>
                <div className="mt-auto">
                  <SocialMediaIcons />
                </div>
              </div>
              <div className="w-max h-auto flex flex-col gap-6">
                  <p className="text-lg font-bold text-secondario-default text-shadow-custom">Sito</p>
                  <ul className="flex flex-col gap-6">
                      <li className="text-secondario-default text-base">Home</li>
                      <li className="text-secondario-default text-base">Store</li>
                      <li className="text-secondario-default text-base">Tour</li>
                      <li className="text-secondario-default text-base">Geolier</li>
                  </ul>
              </div>
              <div className="w-max h-auto flex flex-col gap-6">
                  <p className="text-lg font-bold text-secondario-default text-shadow-custom">Area legale</p>
                  <ul className="flex flex-col gap-6">
                      <li className="text-secondario-default text-base">Informativa sulla Privacy</li>
                      <li className="text-secondario-default text-base">Condizioni D&apos;Uso</li>
                      <li className="text-secondario-default text-base">Termini D&apos;Acquisto</li>
                      <li className="text-secondario-default text-base">Impostazioni dei Cookie</li>
                  </ul>
              </div>
            </div>
          </div>
          <div className="max-w-7xl px-8 mx-auto sm:pt-14 pt-14 pb-10 md flex lg:hidden justify-between gap-4">
            <div className="w-full h-auto flex flex-col gap-6">
              <p className="text-lg sm:text-xl font-bold text-secondario-default text-shadow-custom">Diventa membro esclusivo</p>
              <InputField />
              <AccordionFooter className="ps-0" />
            </div>
          </div>
        </div>
        <div className="w-full mx-auto bg-colorefooter-default">
            <p className="text-center text-secondario-default text-sm py-4">© Geolier</p>
        </div>
    </>
  );
};

export default Footer;
