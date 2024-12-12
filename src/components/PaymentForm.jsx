import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CartContext } from '../providers/CartContext';
import { AggiungiAlCarrelloIcon } from './icon/CartaDiCreditoIcon';
import Paypal from './icon/Paypal';
import ReindirizzamentoIcon from './icon/ReindirizzamentoIcon';

const PaymentForm = () => {
  const { cart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm();

  // ... Aggiungi qui il resto dello stato e delle funzioni dal componente CheckoutPage originale ...

  const onSubmit = (data) => {
    console.log(data);
    // Implementa qui la logica di invio del pagamento
    alert('Pagamento effettuato con successo!');
    reset();
    setPaymentMethod('card');
    setShippingMethod('standard');
    setDiscountCode('');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Metodi di pagamento */}
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

      {/* Campi del form per il pagamento con carta */}
      {paymentMethod === 'card' && (
        <>
          {/* ... Aggiungi qui i campi del form per il pagamento con carta ... */}
        </>
      )}

      {/* ... Aggiungi qui gli altri campi del form (indirizzo, spedizione, ecc.) ... */}

      {paymentMethod === 'card' && (
        <button 
          type="submit" 
          className="w-full py-3 px-4 text-white rounded bg-titolo-default hover:bg-[#0083BB] mt-6"
        >
          PAGA €{total.toFixed(2)}
        </button>
      )}

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
    </form>
  );
};

// Modifica questa riga
export { PaymentForm };
