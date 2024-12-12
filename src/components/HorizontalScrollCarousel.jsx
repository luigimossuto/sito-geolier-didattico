import { useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../providers/ThemeProviders";
import { merch } from "./data/Merch";
import { Card, CardBody, CardFooter, Image, Badge } from "@nextui-org/react";
import { useScroll, useTransform, motion } from "framer-motion";
import ExpandedArea from "./ExpandedArea";
import { AggiungiAlCarrelloIcon } from "./icon/AggiungiAlCarrelloIcon";
import AnimatedCartButton from "./AnimatedCartButton";
import { CartContext } from "../providers/CartContext";

export const HorizontalScrollCarousel = () => {
    const { itemCount } = useContext(CartContext);
    const { darkMode } = useTheme();
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative">
            {/* Desktop version */}
            <div className="hidden md:block h-[300vh]">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-4">
                        {merch.map((item, index) => (
                            <CardItem key={index} item={item} index={index} />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Mobile version - only first 4 cards */}
            <div className="md:hidden">
                {merch.slice(0, 4).map((item, index) => (
                    <div key={index} className="mb-8 px-8 min-[520px]:px-20 sm:px-28">
                        <CardItem item={item} index={index} />
                    </div>
                ))}
            </div>
        </section>
    );
};

const CardItem = ({ item, index }) => {
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (e) => {
        e.preventDefault(); // Previene la navigazione del NavLink
        e.stopPropagation(); // Previene la propagazione dell'evento
        addToCart(item);
        console.log("Prodotto aggiunto al carrello:", item);
    };

    return (
        <NavLink to={`/store/${item.id}`} className="flex-shrink-0 w-[320px]">
            <Card 
                className="bg-transparent rounded-b-3xl w-full relative" 
                isPressable 
                onPress={() => console.log("item pressed")}
            >
                <CardBody className={`p-0 h-[350px] min-[335px]:h-[380px] flex justify-center items-center rounded-t-3xl rounded-b-3xl bg-content1 bg-center bg-no-repeat bg-cover bg-transparent drop-shadow-[0_10px_2px_rgba(113,113,113,55%)] ${item.imgbg} relative`}>
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
                        onClick={handleAddToCart}
                        className="absolute bottom-3 right-3 z-10"
                    />
                </CardBody>
                <CardFooter className="text-small flex flex-col items-start bg-secondario-default -mt-5 px-4 max-sm:pb-2">
                    <ExpandedArea item={item} />
                    <div className="flex flex-col sm:gap-2 gap-1 w-full">
                        <p className="text-primario-default text-start sm:text-[16px] text-sm">{item.title}</p>
                        <p className="text-primario-default text-start sm:text-[16px] text-sm font-bold">{item.sottotitolo}</p>
                        <p className="text-primario-default text-start sm:text-[16px] text-sm">{item.descrizione}</p>
                        <p className="text-primario-default text-start sm:text-[16px] text-sm w-full mt-auto mb-2">{item.price}</p>
                    </div>
                </CardFooter>
            </Card>
        </NavLink>
    );
};

// Rimuovi la dichiarazione duplicata di AnimatedCartButton qui