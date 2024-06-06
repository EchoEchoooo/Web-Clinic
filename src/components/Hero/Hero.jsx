import LoginDialog from "../LoginPopup/LoginDialog";
import teeth from "/src/assets/teeth.png";

const Hero = () => {
  return (
    <>
      <div className="flex justify-center px-32 bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
        <div className="flex flex-col md:space-y-8">
          <p className="pt-32 text-2xl sm:text-6xl md:text-8xl font-bold">
            Welcome to Carident.
          </p>
          <p className="text-xs tracking-widest sm:text-lg md:text-xl">
            Smarter Dentistry Starts Here: AI-Powered Caries Detection
          </p>
          <LoginDialog />
        </div>

        <div className="w-1/2">
          <img
            className="my-32 w-full rounded-3xl "
            src="/src/assets/hero_image.png"
            alt="3d teeth illustration"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
