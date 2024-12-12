import { Button } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaqIcon } from '../components/icon/FaqIcon'
import { AssistenzaIcon } from '../components/icon/AssistenzaIcon'

const Contatti = () => {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    // Qui puoi aggiungere la logica per inviare i dati al server
    reset() // Resetta il form dopo l'invio
  }

  return (
    <div className="text-white min-h-screen max-w-7xl mx-auto px-7 sm:px-6 lg:px-8 mt-14 sm:mt-20 mb-14 sm:mb-0">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">CONTATTACI</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <p className="mb-8 text-black dark:text-white">Scrivici se hai una richiesta o hai bisogno di maggiori informazioni</p>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-2 text-black dark:text-white">Nome</label>
              <div className="flex gap-4">
                <input {...register('nome')} type="text" placeholder="Inserisci il tuo nome" className="bg-transparent border-2 border-black dark:border-white rounded-full px-4 py-2 w-full focus:outline-none text-black dark:text-white" />
                <input {...register('cognome')} type="text" placeholder="Inserisci il tuo cognome" className="bg-transparent border-2 border-black dark:border-white rounded-full px-4 py-2 w-full focus:outline-none text-black dark:text-white" />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 text-black dark:text-white">Email</label>
              <input {...register('email')} type="email" placeholder="mario@rossi.com" className="bg-transparent border-2 border-black dark:border-white rounded-full px-4 py-2 w-full focus:outline-none text-black dark:text-white" />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 text-black dark:text-white">Messaggio</label>
              <textarea {...register('messaggio')} placeholder="Scrivi il tuo messaggio" className="bg-transparent border-2 border-black dark:border-white rounded-3xl px-4 py-2 w-full h-32 focus:outline-none text-black dark:text-white"></textarea>
            </div>
            
            <button type="submit" className="bg-titolo-default text-white rounded-full px-12 py-4 mb-10 sm:mb-0">INVIA</button>
          </form>
        </div>
        
        <div className="flex-1 ms-0 sm:ms-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <FaqIcon className='w-20 mr-4 h-auto text-black dark:text-white' />
              <div className='flex flex-col gap-4'>
                <h2 className="text-xl text-black dark:text-white">Consulta le nostre FAQ</h2>
                <Button className="bg-colorefooter-default rounded-full border-2 px-12 py-4 w-max border-titolo-default hover:bg-titolo-default transition-all duration-300 text-white">FAQ</Button>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-start gap-4 mb-2 mt-20">
              <AssistenzaIcon className='w-20 mr-4 h-auto text-black dark:text-white flex-shrink-0' />
              <div className='flex flex-col gap-6'>
                <h2 className="text-xl mb-2 text-black dark:text-white">Ho bisogno di assistenza dove posso farlo? Puoi farlo al nostro servizio clienti</h2>
                <p className="mb-2 underline text-black dark:text-white">supporto@artista.com</p>
                <p className="mb-2 text-black dark:text-white">+39 123 456 7890</p>
                <p className="text-black dark:text-white">Supporto attivo 7/7 dalle 9 alle 13 e dalle 16 alle 22</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contatti