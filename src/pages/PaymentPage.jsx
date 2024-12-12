import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CartContext } from '../providers/CartContext';
import { AggiungiAlCarrelloIcon } from '../components/icon/CartaDiCreditoIcon';
import Paypal from '../components/icon/Paypal';
import ReindirizzamentoIcon from '../components/icon/ReindirizzamentoIcon';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { total: initialTotal, subtotal: initialSubtotal, shippingCost: initialShippingCost, shippingMethod: initialShippingMethod } = location.state || {};
  const { cart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm();

  const [total, setTotal] = useState(initialTotal || 0);
  const [subtotal, setSubtotal] = useState(initialSubtotal || 0);
  const [shippingCost, setShippingCost] = useState(initialShippingCost || 0);
  const [shippingMethod, setShippingMethod] = useState(initialShippingMethod || 'standard');

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

  const [discountCode, setDiscountCode] = useState('');

  useEffect(() => {
    if (initialTotal) {
      setTotal(initialTotal);
    }
    if (initialSubtotal) {
      setSubtotal(initialSubtotal);
    }
    if (initialShippingCost) {
      setShippingCost(initialShippingCost);
    }
    if (initialShippingMethod) {
      setShippingMethod(initialShippingMethod);
    }
  }, [initialTotal, initialSubtotal, initialShippingCost, initialShippingMethod]);

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
    const shippingCosts = {
      rapida: 5.95,
      standard: subtotal > 40 ? 0 : 4.95,
      express: 8.90
    };
    const newShippingCost = shippingCosts[shippingMethod];
    setShippingCost(newShippingCost);
    setTotal(subtotal + newShippingCost);
  }, [shippingMethod, subtotal]);

  const onSubmit = (data) => {
    console.log(data);
    // Implement payment logic here
    alert('Pagamento effettuato con successo!');
    reset();
    setPaymentMethod('card');
    setShippingMethod('standard');
    setDiscountCode('');
  };

  const handlePayPalPayment = () => {
    const paypalUrl = 'https://www.paypal.com/it/home';
    window.open(paypalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSelectFocus = (selectName) => {
    setOpenSelect(selectName);
  };

  const handleSelectBlur = () => {
    setOpenSelect(null);
  };

  return (
    <div className='w-full min-h-screen bg-secondario-light flex flex-col'>
      <div className="p-4 bg-terziario-default md:hidden">
        <button 
          className="text-white"
          onClick={() => navigate(-1)}
        >
          ← Torna al riepilogo
        </button>
      </div>
      <div className="flex-grow flex justify-center p-8">
        <div className="max-w-[640px] w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Concludi il tuo acquisto</h1>
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

            {/* Shipping options */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-6 mt-8">Opzioni di spedizione</h2>
              <div className="space-y-4">
                {[
                  { id: 'rapida', date: 'Lun, 10.06 - Mer, 12.06', name: 'Consegna rapida', price: '€5,95' },
                  { id: 'standard', date: 'Lun, 11.06 - Gio, 13.06', name: 'Consegna standard', price: subtotal > 40 ? 'Gratis' : '€4,95' },
                  { id: 'express', date: 'Mar, 11.06', name: 'Consegna express', price: '€8,90' }
                ].map((option) => (
                  <label key={option.id} className="flex items-start cursor-pointer">
                    <div className="relative mr-4 mt-1">
                      <input
                        type="radio"
                        value={option.id}
                        checked={shippingMethod === option.id}
                        onChange={() => setShippingMethod(option.id)}
                        className="sr-only"
                      />
                      <div className="w-5 h-5 border-2 border-white rounded-full"></div>
                      {shippingMethod === option.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="text-base font-semibold">{option.date}</div>
                      <div className="text-sm text-gray-500">{option.name}</div>
                    </div>
                    <div className="text-base font-bold">{option.price}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Discount code */}
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
    </div>
  );
};

export default PaymentPage;
