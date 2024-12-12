import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
const buttonSize = window.innerWidth < 768 ? "sm" : window.innerWidth < 1024 ? "md" : "lg";

const SubscribeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    mode: 'onChange', // Imposta la modalità di validazione a 'onChange'
  });

  const onSubmit = (data) => {
    if (data.email) {
      console.log("Email valida:", data.email);
      reset(); // Resetta il form dopo l'invio
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-md mx-auto"
    >
      <div className="flex items-center bg-white rounded-full shadow-md ps-4 pr-1 py-1 mb-2 relative top-5">
        <div className="flex-grow relative">
          <input
            type="email"
            placeholder="La tua email"
            className={`bg-transparent outline-none lg:px-4 lg:py-2 sm:px-3 sm:py-[6px] text-gray-500 w-full ${
              errors.email ? "border-red-500" : ""
            }`}
            {...register("email", {
              required: "L'email è obbligatoria per iscriversi",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Inserisci un'email valida",
              },
            })}
            onKeyDown={() => trigger("email")} // Trigger la validazione ad ogni cambiamento
          />
        </div>
        <Button
          type="submit"
          className="bg-terziario-default drop-shadow-[-4px_0_1px_rgba(0,0,0,32)] text-white rounded-full shadow-lg ml-2"
          size={buttonSize}
        >
          ISCRIVITI
        </Button>
      </div>
      {errors.email ? (
        <p className="text-red-500 text-sm mt-1 text-center relative top-5">{errors.email.message}</p>
      ) : (<p className="text-red-500 text-sm mt-1 text-center h-5 relative top-5"></p>)}
    </form>
  );
};

export default SubscribeForm;