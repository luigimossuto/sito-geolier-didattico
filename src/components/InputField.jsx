import { useForm } from "react-hook-form";

const InputField = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const email = watch("email", "");

  const onSubmit = (data) => {
    if (data.email) {
      console.log("Email valida:", data.email);
      reset();
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <div className="relative flex items-center">
            <input
              type="text"
              className="block w-full py-2 pr-24 text-base border-b-2 border-gray-300 outline-none bg-transparent transition-all duration-300 placeholder-gray-300"
              placeholder="La tua email"
              {...register("email", {
                required: "L'email è obbligatoria per iscriversi",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Inserisci un'email valida",
                },
              })}
            />
            <button 
              type="submit" 
              className="absolute right-0 ps-4 py-1 text-sm font-bold text-white hover:text-opacity-85"
            >
              ISCRIVITI
            </button>
          </div>
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300 ${
              email ? 'w-full' : 'w-0'
            }`}
          />
        </div>
        <label
          className={`absolute left-0 transition-all duration-300 -z-10 ${
            email ? '-top-5 text-sm text-blue-500' : 'top-2 text-base text-transparent'
          }`}
        >
          Inserisci la tua email
        </label>
      </form>
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
      )}
    </div>
  );
};

export default InputField;