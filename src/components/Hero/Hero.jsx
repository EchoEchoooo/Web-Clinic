import LoginDialog from "../LoginPopup/LoginDialog";
import teeth from "/src/assets/teeth.png";

const Hero = () => {
  return (
    <>
      <div className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
        <div className="flex flex-col items-center justify-center  p-8 md:space-y-8">
          <p className="text-center text-2xl sm:text-6xl md:text-8xl">
            Carident
          </p>
          <p className="text-center text-xs tracking-widest sm:text-lg md:text-xl">
            Smarter Dentistry Starts Here: AI-Powered Caries Detection
          </p>
          <img
            className="w-64 my-32 rounded-3xl sm:w-64 md:w-80"
            src={teeth}
            alt="3d teeth illustration"
          />
          <LoginDialog />
        </div>
      </div>
    </>
  );
};

export default Hero;
