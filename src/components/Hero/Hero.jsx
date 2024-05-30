import LoginDialog from "../LoginPopup/LoginDialog";

const Hero = () => {
  return (
    <>
      <div className={"bg-white text-black dark:bg-zinc-950 dark:text-zinc-50"}>
        <div className="flex h-[100vh] w-full flex-col items-center justify-center">
          <h1
            className="p-8 text-center text-2xl sm:p-2  sm:text-6xl md:text-8xl"
          >
            Carident
          </h1>
          <p className="text-center tracking-widest pb-3">
            Smarter Dentistry Starts Here: AI-Powered Caries Detection
          </p>
          <LoginDialog />
        </div>
      </div>
    </>
  );
};

export default Hero;
