import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CartContext } from '../providers/CartContext';
import { AggiungiAlCarrelloIcon } from '../components/icon/CartaDiCreditoIcon';
import Paypal from '../components/icon/Paypal';
import ReindirizzamentoIcon  from '../components/icon/ReindirizzamentoIcon';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm();

  const [countries, setCountries] = useState([
    'Italy', 'United States', 'United Kingdom', 'France', 'Germany', 'Spain', 'Canada', 'Australia', 'Japan', 'Brazil'
  ]);
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const italianCities = {
    'Rome': 'RM',
    'Milan': 'MI',
    'Naples': 'NA',
    'Turin': 'TO',
    'Palermo': 'PA',
    'Genoa': 'GE',
    'Bologna': 'BO',
    'Florence': 'FI',
    'Bari': 'BA',
    'Catania': 'CT',
    'Pescara': 'PE',
  };

  const selectedCountry = watch('country');
  const selectedCity = watch('city');

  const [openSelect, setOpenSelect] = useState(null);

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [discountCode, setDiscountCode] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  const navigate = useNavigate();

  const [mobileTotal, setMobileTotal] = useState(0);

  useEffect(() => {
    let newTotal = subtotal;
    if (shippingMethod === 'standard' && subtotal > 40) {
      // Spedizione standard gratuita per ordini superiori a 40€
      newTotal = subtotal;
    } else {
      // Aggiungi il costo di spedizione appropriato
      if (shippingMethod === 'rapida') {
        newTotal += 5.95;
      } else if (shippingMethod === 'standard') {
        newTotal += 4.95;
      } else if (shippingMethod === 'express') {
        newTotal += 8.90;
      }
    }
    setMobileTotal(newTotal);
  }, [subtotal, shippingMethod]);

  useEffect(() => {
    if (selectedCountry === 'Italy') {
      setCities(Object.keys(italianCities));
    } else {
      setCities([]);
    }
    setValue('city', '');
    setValue('province', '');
  }, [selectedCountry, setValue]);

  useEffect(() => {
    if (selectedCity && italianCities[selectedCity]) {
      setProvinces([italianCities[selectedCity]]);
      setValue('province', italianCities[selectedCity]);
    } else {
      setProvinces([]);
      setValue('province', '');
    }
  }, [selectedCity, setValue]);

  useEffect(() => {
    const newSubtotal = cart.reduce((acc, item) => {
      let itemPrice = 0;
      if (typeof item.price === 'string') {
        itemPrice = parseFloat(item.price.replace('€', '').replace(',', '.')) || 0;
      } else if (typeof item.price === 'number') {
        itemPrice = item.price;
      }
      const itemQuantity = parseInt(item.quantity) || 0;
      return acc + (itemPrice * itemQuantity);
    }, 0);
    setSubtotal(newSubtotal);

    // Calculate shipping cost based on subtotal and selected shipping method
    let cost = 0;
    if (shippingMethod === 'rapida') {
      cost = 5.95;
    } else if (shippingMethod === 'standard') {
      cost = newSubtotal > 40 ? 0 : 4.95;
    } else if (shippingMethod === 'express') {
      cost = 8.90;
    }
    setShippingCost(cost);

    setTotal(newSubtotal + cost);
  }, [cart, shippingMethod]);

  const onSubmit = (data) => {
    console.log(data);
    // Qui implementerai la logica di invio del pagamento
    
    // Dopo aver completato l'invio del pagamento con successo:
    alert('Pagamento effettuato con successo!');
    reset(); // Resetta il form
    setPaymentMethod('card'); // Resetta il metodo di pagamento
    setShippingMethod('standard'); // Resetta il metodo di spedizione
    setDiscountCode(''); // Resetta il codice sconto
  };

  const getTotalTickets = () => {
    return cart.reduce((total, item) => {
      if (item.category === 'Biglietto') {
        return total + item.quantity;
      }
      return total;
    }, 0);
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    const item = cart[index];
    if (item.category === 'Biglietto') {
      const currentTotalTickets = getTotalTickets();
      const difference = newQuantity - item.quantity;
      if (currentTotalTickets + difference > 4) {
        alert('Non puoi acquistare più di 4 biglietti in totale.');
        return;
      }
    }
    updateQuantity(index, newQuantity);
  };

  const handleSelectFocus = (selectName) => {
    setOpenSelect(selectName);
  };

  const handleSelectBlur = () => {
    setOpenSelect(null);
  };

  const handlePayPalPayment = () => {
    const paypalUrl = 'https://www.paypal.com/it/home';
    window.open(paypalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleProceedToPayment = () => {
    navigate('/checkout/payment', { state: { total: total, subtotal: subtotal, shippingCost: shippingCost, shippingMethod: shippingMethod } });
  };

  return (
    <div className='flex flex-col md:flex-row mx-auto w-full min-h-screen'>
      <div className='w-full md:w-1/2 bg-secondario-light sm:flex justify-center order-2 md:order-1 hidden md:flex'>
        {/* Colonna sinistra - Form di pagamento */}
        <div className="max-w-[640px] w-full p-8">
          <h1 className="text-3xl font-bold mb-6">Concludi il tuo acquisto</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4 mt-14">Metodi di pagamento</h2>
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-4 px-4 rounded-lg border-2 ${paymentMethod === 'card' ? 'border-titolo-default' : 'border-gray-600'} flex items-center justify-center`}
                >
                  <AggiungiAlCarrelloIcon className="w-6 h-6 mr-2" />
                  Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex-1 py-4 px-4 rounded-lg border-2 flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-titolo-default' : 'border-gray-600'}`}
                >
                  <Paypal className='w-24 h-8' />
                </button>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <>
                <div>
                  <label className="block mb-2 font-bold">Titolare carta</label>
                  <input
                    {...register('cardHolder', { required: 'Campo obbligatorio' })}
                    className="w-full p-3 bg-transparent rounded-lg border-2 border-secondario-default"
                  />
                  {errors.cardHolder && <span className="text-red-500">{errors.cardHolder.message}</span>}
                </div>
                <div>
                  <label className="block mb-2 font-bold">Dati carta</label>
                  <div className="flex w-full flex-wrap">
                    <input
                      {...register('cardNumber', { required: 'Campo obbligatorio' })}
                      placeholder="Numero carta"
                      className="flex-grow w-full p-3 bg-transparent border-2 border-secondario-default rounded-lg rounded-b-none"
                    />
                    <input
                      {...register('expiryDate', { required: 'Campo obbligatorio' })}
                      placeholder="MM / YY"
                      className="w-1/2 p-3 bg-transparent border-2 border-secondario-default rounded-lg rounded-tl-none rounded-e-none"
                    />
                    <input
                      {...register('cvv', { required: 'Campo obbligatorio' })}
                      placeholder="CVV"
                      className="w-1/2 p-3 bg-transparent border-2 border-secondario-default rounded-lg rounded-s-none rounded-tr-none"
                    />
                  </div>
                  {(errors.cardNumber || errors.expiryDate || errors.cvv) && (
                    <span className="text-red-500">Tutti i campi sono obbligatori</span>
                  )}
                </div>
              </>
            )}

            <div>
              <label className="block mb-2 font-bold">Stato</label>
              <select
                {...register('country', { required: 'Campo obbligatorio' })}
                className={`w-full p-3 border-2 border-secondario-default rounded-lg ${openSelect === 'country' ? 'bg-terziario-default' : 'bg-transparent'}`}
                onFocus={() => handleSelectFocus('country')}
                onBlur={handleSelectBlur}
              >
                <option value="">Seleziona stato</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <span className="text-red-500">{errors.country.message}</span>}
            </div>

            <div className="flex space-x-4">
              <div className="w-2/3">
                <label className="block mb-2 font-bold">Città</label>
                <select
                  {...register('city', { required: 'Campo obbligatorio' })}
                  className={`w-full p-3 border-2 border-secondario-default rounded-lg ${openSelect === 'city' ? 'bg-terziario-default' : 'bg-transparent'}`}
                  disabled={selectedCountry !== 'Italy'}
                  onFocus={() => handleSelectFocus('city')}
                  onBlur={handleSelectBlur}
                >
                  <option value="">Seleziona città</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && <span className="text-red-500">{errors.city.message}</span>}
              </div>
              <div className="w-1/3">
                <label className="block mb-2 font-bold">Provincia</label>
                <select
                  {...register('province', { required: 'Campo obbligatorio' })}
                  className={`w-full p-3 border-2 border-secondario-default rounded-lg ${openSelect === 'province' ? 'bg-terziario-default' : 'bg-transparent'}`}
                  disabled={selectedCountry !== 'Italy' || !selectedCity}
                  onFocus={() => handleSelectFocus('province')}
                  onBlur={handleSelectBlur}
                >
                  <option value="">Seleziona provincia</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
                {errors.province && <span className="text-red-500">{errors.province.message}</span>}
              </div>
            </div>

            <div>
              <div className='flex gap-4 items-center'>
                <label className="block mb-2 font-bold">Indirizzo</label>
                {(errors.address || errors.cap) && <span className="text-red-500 mb-2">Campi obbligatori</span>}
              </div>
              <input
                {...register('address', { required: true })}
                placeholder='Via Carlo Perrier, 4'
                className="w-full p-3 bg-transparent border-2 border-secondario-default rounded-lg rounded-b-none"
              />
              <input
                {...register('cap', { required: true })}
                placeholder="CAP"
                className="w-full p-3 bg-transparent border-2 border-secondario-default rounded-lg rounded-t-none"
              />
            </div>

            {/* New shipping and discount code section */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-6 mt-8">Opzioni di spedizione</h2>
              <div className="space-y-8">
                {[
                  { id: 'rapida', label: 'Lun, 10.06 - Mer, 12.06', name: 'Consegna rapida', price: '€5,95' },
                  { id: 'standard', label: 'Lun, 11.06 - Gio, 13.06', name: 'Consegna standard', price: subtotal > 40 ? 'Gratis' : '€4,95' },
                  { id: 'express', label: 'Mar, 11.06', name: 'Consegna express', price: '€8,90' }
                ].map((option) => (
                  <label key={option.id} className="flex items-center cursor-pointer">
                    <div className="relative mr-4">
                      <input
                        type="radio"
                        value={option.id}
                        checked={shippingMethod === option.id}
                        onChange={() => setShippingMethod(option.id)}
                        className="sr-only" // Hide default radio
                      />
                      <div className="w-6 h-6 border-2 border-white rounded-full"></div>
                      {shippingMethod === option.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <span>{option.label}</span>
                    <span className="ml-auto">{option.name}</span>
                    <span className="ml-2 font-bold">{option.price}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">CODICE SCONTO / BUONO REGALO (facoltativo)</h2>
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Inserisci il codice"
                className="w-full p-3 bg-transparent border-2 border-secondario-default rounded-lg"
              />
            </div>

            {paymentMethod === 'card' && (
              <button 
                type="submit" 
                className="w-full py-3 px-4 text-white rounded bg-titolo-default hover:bg-[#0083BB] mt-6"
              >
                PAGA €{total.toFixed(2)}
              </button>
            )}
          </form>

          {/* PayPal div moved outside and below the form */}
          {paymentMethod === 'paypal' && (
            <div className="bg-secondario-default p-6 rounded-lg text-center mt-6">
              <ReindirizzamentoIcon className="w-24 h-24 mx-auto mb-4 text-gray-400" />
              <p className="mb-4 text-gray-600">
                Dopo aver cliccato "Paga con PayPal", sarai reindirizzato
                su PayPal per completare il tuo acquisto in modo sicuro.
              </p>
              <button 
                onClick={handlePayPalPayment}
                className="w-full py-3 px-4 text-white rounded bg-titolo-default hover:bg-[#0083BB]"
              >
                PAGA CON PAYPAL €{total.toFixed(2)}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='w-full md:w-1/2 bg-terziario-default flex flex-col justify-between order-1 md:order-2 min-h-screen'>
        {/* Colonna destra - Riepilogo ordine */}
        <div className="max-w-[640px] w-full p-8 flex-grow overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Riepilogo ordine</h2>
          {cart.map((item, index) => (
            <div key={item.id} className="bg-white text-black rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <img 
                  src={item.category === 'Biglietto' ? '/foto-tour-marzo2025.jpg' : item.img} 
                  alt={item.title} 
                  className="w-16 h-16 object-cover mr-4"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.sottotitolo}</p>
                      <p className="text-sm mt-1">{item.descrizione}</p>
                      <p className="font-bold mt-1">
                        {item.category === 'Biglietto' 
                          ? `€${parseFloat(item.price).toFixed(2)}`
                          : item.price.startsWith('€') ? item.price : `€${parseFloat(item.price).toFixed(2)}`
                        }
                      </p>
                    </div>
                    <span className={`text-xs font-semibold pr-4 ps-1 sm:px-2 py-1 ms-4 rounded flex items-center ${
                      item.category === 'PREMIUM' ? 'bg-[#9B2EF0] text-white' :
                      item.category === 'ELITE' ? 'bg-[#CEAA2B] text-white' :
                      item.category === 'PLUS' ? 'bg-[#DD590E] text-white' :
                      item.category === 'STANDARD' ? 'bg-[#16E800] text-white' :
                      'bg-titolo-default text-white'
                    }`}>
                      {item.category !== 'Biglietto' && (
                        <img src="/g-store-bianca.svg" alt="G-Store Icon" className="w-3 h-3 mr-2" />
                      )}
                      {item.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <button 
                        className="w-6 h-6 bg-secondario-light rounded-full text-secondario-default"
                        onClick={() => handleUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button 
                        className="w-6 h-6 bg-secondario-light rounded-full text-secondario-default"
                        onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                        disabled={item.category === 'Biglietto' && getTotalTickets() >= 4}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t-2 border-white pt-4 mt-8">
            <div className="flex justify-between border-b-2 border-white pb-4 mb-2">
              <p>Subtotale</p>
              <p>€{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between border-b-2 border-white pt-2 pb-4 mb-2">
              <p>Spedizione</p>
              <p>{shippingCost === 0 ? 'Gratis' : `€${shippingCost.toFixed(2)}`}</p>
            </div>
            <div className="flex justify-between font-bold mt-4">
              <p className='text-xl'>Totale</p>
              <p>€{total.toFixed(2)}</p>
            </div>
          </div>
        </div>
        {/* Add a button to proceed to checkout on mobile */}
        <div className="p-4 bg-terziario-default md:hidden">
          <button 
            className="w-full py-3 px-4 text-white rounded bg-titolo-default font-bold hover:bg-[#0083BB]"
            onClick={handleProceedToPayment}
          >
            Procedi all'acquisto
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
