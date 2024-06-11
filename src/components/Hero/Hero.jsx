import LoginDialog from "../LoginPopup/LoginDialog";

const Hero = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center bg-white px-32 text-black dark:bg-zinc-950 dark:text-zinc-50">
        <div className="z-10 flex w-10/12 flex-col md:space-y-8">
          <p className="pt-32 text-2xl font-bold sm:text-6xl md:text-8xl">
            Welcome to Carident.
          </p>
          <p className="text-xs tracking-widest sm:text-lg md:text-xl">
            Smarter Dentistry Starts Here: AI-Powered Caries Detection
          </p>
          <LoginDialog />
        </div>


      </div>

      <div className="absolute bottom-0 right-0">
        <img
          className="w-52 md:w-[50%] lg:w-[80%]"
          src="/src/assets/hero_image.png"
          alt="3d teeth illustration"
        />
      </div>
    </div>
  );
};

export default Hero;
