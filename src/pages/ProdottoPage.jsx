import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";
import { merch } from "../components/data/Merch";
import { CartContext } from "../providers/CartContext";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import FlippableImage from "../components/FlippableImage";
import FrecciaCorrelati from "../components/icon/FrecciaCorrelati";
import ExpandedArea from "../components/ExpandedArea";
import AnimatedCartButton from "../components/AnimatedCartButton";
import { AggiungiAlCarrelloIcon } from "../components/icon/AggiungiAlCarrelloIcon";
import { gsap } from "gsap";

// Importa tutte le icone
import { CartaCulturaIcon } from "../components/icon/CartaCulturaIcon";

const ProdottoPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(2); // Start with the third product
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef([]);
  const containerRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    const foundProduct = merch.find((item) => item.id === parseInt(id));
    setProduct(foundProduct);
    setLoading(false);
    // Reset the current image index to 0 when the product changes
    setCurrentImageIndex(0);
    // Set default size to "M" if the product has sizes
    if (foundProduct && foundProduct.taglia) {
      const sizes = foundProduct.taglia.split(", ");
      setSelectedSize(sizes.includes("M") ? "M" : sizes[0]);
    }
  }, [id]);

  useEffect(() => {
    // Simula il caricamento dei prodotti correlati
    const filtered = merch.filter((item) => item.id !== parseInt(id));
    setRelatedProducts(filtered.slice(0, 5)); // Prendi solo i primi 5 prodotti correlati
    setCurrentIndex(2); // Reset to the third product when related products change
  }, [id]);

  useEffect(() => {
    if (relatedProducts.length > 0 && containerRef.current) {
      positionCards();
    }
  }, [relatedProducts, currentIndex]);

  const positionCards = () => {
    const cardWidth = 270; // Larghezza della card + gap
    const containerWidth = containerRef.current.offsetWidth;
    const centerOffsetX = containerWidth / 2 - cardWidth / 2;
    const centerOffsetY = 300; // Metà dell'altezza del contenitore

    cardsRef.current.forEach((card, index) => {
      const distance = index - currentIndex;
      gsap.to(card, {
        x: centerOffsetX + distance * cardWidth,
        y: centerOffsetY,
        scale: 1 - Math.abs(distance) * 0.2,
        opacity: 1 - Math.abs(distance) * 0.3,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % relatedProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + relatedProducts.length) % relatedProducts.length
    );
  };

  const visibleProducts = [
    relatedProducts[
      (currentIndex - 1 + relatedProducts.length) % relatedProducts.length
    ],
    relatedProducts[currentIndex],
    relatedProducts[(currentIndex + 1) % relatedProducts.length],
  ].filter(Boolean); // Filtra eventuali undefined

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, size: selectedSize }, quantity);
    console.log(
      "Prodotto aggiunto al carrello:",
      product,
      "Quantità:",
      quantity,
      "Taglia:",
      selectedSize
    );
  };

  const tracklist = [
    "1. PER SEMPRE (prod. Michelangelo)",
    "2. IDEE CHIARE feat. Lazza (prod. Dat Boi Dee, Finesse)",
    "3. EL PIBE DE ORO (prod. Poison Beatz)",
    "4. SI STAT'TU (prod. Dat Boi Dee, Poison Beatz, Geenaro, Ghana Beats)",
    "5. IO T'O GIUR' feat. Sfera Ebbasta (prod. Dardust)",
    "6. PRESIDENTE (prod. Dat Boi Dee, Kermit)",
    "7. UNA COME TE (prod. Dat Boi Dee)",
    "8. EMIRATES (prod. Poison Beatz, Geenaro, Ghana Beats, Giuszy)",
    "9. UNA VITA FA feat. Shiva (prod. Mace, Shune)",
    "10. EPISODIO D'AMORE (Dat Boi Dee, Takagi & Ketra)",
    "11. 6 MILIONI DI EURO FA (skit) (prod. Dat Boi Dee)",
    "12. 357 feat. Guè (prod. Dat Boi Dee, Cerul67)",
    "13. DIO LO SA (prod. Dat Boi Dee)",
    "14. BELLA E BRUTTA NOTIZIA feat. Maria Becerra (prod. Geenaro, Ghana Beats, Maxzwell, Poison Beats)",
    "15. GIÀ LO SAI feat. Luchè (prod. Dat Boi Dee)",
    "16. SCUMPAR (prod. Yung Snapp, Poison Beatz, Sewsi)",
    "17. I P'ME, TU P'TE (prod. Michelangelo)",
    "18. NU PARL, NU SENT, NU VEC (prod. Poison Beatz)",
    "19. CLS feat. Yung Snapp, MV Killa, Lele Blade (prod. Dat Boi Dee)",
    "20. L'ULTIMA POESIA feat. Ultimo (prod. Takagi & Ketra, JVLI)",
    "21. FINCHÈ NON SI MUORE (prod. Poison Beatz)",
  ];

  const images = product
    ? [product.img, product.img2, product.img3, product.img4].filter(Boolean)
    : [];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const formatTitle = (title) => {
    if (title === "T-shirt l'ultima poesia") {
      return (
        <>
          <span className="title-part">T-shirt</span>{" "}
          <span className="title-part">l'ultima poesia</span>
        </>
      );
    }
    return title;
  };

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  if (!product) {
    return <div>Product not found</div>; // Or a more user-friendly error message
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {/* Immagine del prodotto - ora è il primo elemento nel grid */}
        <div className="space-y-6 mt-4 order-1 md:order-2 px-4 sm:px-6 lg:px-8">
          <div
            className={`${product.imgbg} rounded-3xl shadow-lg aspect-square relative overflow-hidden`}
          >
            <div className="absolute inset-0 flex items-center">
              <img
                src={images[currentImageIndex]}
                alt={product.title}
                className={`max-w-none h-full ${
                  currentImageIndex === 2 && product.formato === "pantaloncino"
                    ? "!object-cover object-left mr-auto w-auto"
                    : "object-contain w-full"
                }`}
              />
            </div>
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
                >
                  <FrecciaCorrelati className="h-6 w-6 text-secondario-light" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
                >
                  <FrecciaCorrelati className="h-6 w-6 text-secondario-light transform rotate-180" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex
                          ? "bg-titolo-default"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Descrizione, quantità, ecc. - ora è il secondo elemento nel grid */}
        <div className="space-y-6 order-2 md:order-1 px-4 sm:px-6">
          <h1 className="lg:text-5xl sm:text-4xl text-3xl font-bold text-titolo-default dark:text-titolo-default lg:mt-10 sm:mt-6 product-title">
            {formatTitle(product.title)}
          </h1>
          <div className="bg-[#F0F0F0] lg:px-8 lg:py-12 md:px-6 md:py-8 px-4 py-4 rounded-3xl shadow-lg lg!mt-10 !mt-6">
            <div className="flex items-center gap-2 mb-2">
              <Image
                src={iconMap[product.category]}
                alt={product.category}
                className="sm:w-[14px] sm:pt-[1px] w-[12px] pt-[2px] "
              />
              <p
                className={`sm:text-xl text-lg font-sans font-bold ${product.textcolore}`}
              >
                {product.category}
              </p>
            </div>
            <p className="text-primario-default text-start md:text-lg sm:text-lg text-base">
              {product.title}
            </p>
            <p className="text-primario-default text-start md:text-lg sm:text-lg text-base font-bold">
              {product.sottotitolo}
            </p>
            <p className="text-primario-default text-start md:text-lg sm:text-lg text-base">
              {product.descrizione}
            </p>
            <p className="lg:text-xl text-secondario-light mt-1 uppercase">
              {product.price}
            </p>
            <p className="lg:text-xl md:text-lg text-secondario-light uppercase sm:mt-6 mt-4">
              QUANTIT&Agrave;
            </p>
            <div className="sm:mt-4 mt-2 flex items-center sm:gap-4 gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="sm:w-10 sm:h-10 w-8 h-8 bg-secondario-default rounded-full text-secondario-light lg:text-2xl md:text-xl text-lg font-bold"
              >
                -
              </button>
              <span className="sm:w-10 sm:h-10 w-8 h-8 bg-secondario-default rounded-full text-secondario-light text-center flex items-center justify-center font-bold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="sm:w-10 sm:h-10 w-8 h-8 bg-secondario-default rounded-full text-secondario-light lg:text-2xl md:text-xl text-lg font-bold"
              >
                +
              </button>
            </div>

            {/* Add size selection for products with sizes */}
            {product.taglia && (
              <>
                <p className="md:text-base  text-secondario-light uppercase sm:mt-6 mt-4">
                  TAGLIE:
                </p>
                <Select
                  className="mt-2"
                  placeholder="Seleziona taglia"
                  selectedKeys={[selectedSize]}
                  onSelectionChange={(keys) =>
                    setSelectedSize(Array.from(keys)[0])
                  }
                >
                  {product.taglia.split(", ").map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </Select>
              </>
            )}

            <p className="lg:mt-6 sm:mt-4 mt-4 lg:text-xl sm:text-lg text-secondario-light">
              Disponibile ora
            </p>
            <Button
              className="lg:mt-4 sm:mt-2 mt-2 w-full bg-titolo-default text-white lg:text-xl sm:text-lg text-base py-7 rounded-full"
              onClick={handleAddToCart}
              disabled={product.taglia && !selectedSize}
            >
              AGGIUNGI AL CARRELLO
            </Button>
            <div className="mt-4 flex items-center">
              <CartaCulturaIcon className="h-6 mr-2 text-[#0624E0]" />
              <span className="text-sm text-gray-500 font-bold">
                Acquistabile con Carta della Cultura e Carta del Merito
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Categoria e resto - ora è fuori dal grid e sotto tutto il resto */}
      <div className="lg:w-1/2 w-full mt-8 sm:mt-12 lg:mt-14 px-4 sm:px-6 lg:pr-10">
        <div
          className={`${product.bgicon} p-4 ps-8 rounded-l-3xl rounded-r-3xl !rounded-b-none text-white`}
        >
          <p className="font-bold lg:text-xl sm:text-lg text-base">
            {product.category}
          </p>
        </div>
        <div
          className={`bg-secondario-default p-4 ps-8 !mt-0 rounded-b-3xl border-2 border-t-0`}
          style={{ borderColor: product.color }}
        >
          <p className="font-bold text-secondario-light pt-3 pb-4">
            {product.descrizione2 &&
              product.descrizione2.map((part, index) => (
                <span
                  key={index}
                  className={part.isNormal ? "font-normal" : ""}
                >
                  {part.text}
                </span>
              ))}
          </p>
          {product.descrizione3 && (
            <p className="font-bold text-secondario-light py-2">
              {product.descrizione3.map((part, index) => (
                <span
                  key={index}
                  className={part.isNormal ? "font-normal" : ""}
                >
                  {part.text}
                </span>
              ))}
            </p>
          )}
          {product.descrizione4 && (
            <p className="font-bold text-secondario-light py-2">
              {product.descrizione4.map((part, index) => (
                <span
                  key={index}
                  className={part.isNormal ? "font-normal" : ""}
                >
                  {part.text}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>

      {/* FlippableImage solo per i vinili */}
      {product.formato === "vinile" && (
        <div className="mt-12 w-full md:w-4/5 lg:w-[55%] mr-auto px-4 sm:px-6">
          <FlippableImage
            frontImage={product.imgvinile}
            imgbg={product.imgbg}
            tracklist={tracklist}
          />
        </div>
      )}

      {/* Prodotti correlati */}
      <div className="mt-20 mb-4 sm:mb-0">
        <h2 className="text-3xl font-bold px-4 sm:px-6">Prodotti correlati</h2>
        <div className="relative overflow-hidden" style={{ height: "600px" }}>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          >
            <FrecciaCorrelati className="h-6 w-6 text-secondario-light" />
          </button>
          <div
            ref={containerRef}
            className="absolute top-16 left-0 w-full h-full -translate-y-1/2"
          >
            {relatedProducts.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="absolute w-64"
              >
                <NavLink to={`/store/${item.id}`} className="block">
                  <Card className="bg-transparent rounded-b-3xl w-full relative h-[500px]">
                    <CardBody
                      className={`p-0 h-[350px] flex justify-center items-center rounded-t-3xl rounded-b-3xl bg-content1 bg-center bg-no-repeat bg-cover bg-transparent drop-shadow-[0_10px_2px_rgba(113,113,113,55%)] ${item.imgbg}`}
                    >
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
                        onClick={(e) => handleAddToCart(item, e)}
                        className="absolute bottom-3 right-3 z-10"
                      />
                    </CardBody>
                    <CardFooter className="text-small flex flex-col items-start bg-secondario-default -mt-5 px-4 pb-2">
                      <ExpandedArea item={item} />
                      <div className="flex flex-col gap-1 w-full">
                        <p className="text-primario-default text-start lg:text-base sm:text-base text-sm w-full whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.title}
                        </p>
                        <p className="text-primario-default text-start lg:text-base sm:text-base text-sm font-bold">
                          {item.sottotitolo}
                        </p>
                        <p className="text-primario-default text-start lg:text-base sm:text-base text-sm w-full whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.descrizione}
                        </p>
                        <p className="text-primario-default text-start lg:text-base sm:text-base text-sm w-full mt-auto mb-2">
                          {item.price}
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                </NavLink>
              </div>
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          >
            <FrecciaCorrelati className="h-6 w-6 text-secondario-light transform rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProdottoPage;
