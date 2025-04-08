const ControllerBar = ({
  step,
  setStep,
}: {
  step: string;
  setStep: (value: string) => void;
}) => {
  const handleOnClicOnHome = () => {
    setStep("home");
  };

  const handleOnClickOnExplore = () => {
    setStep("explore");
  };

  const handleOnClickOnSettings = () => {
    setStep("settings");
  };
  const handleOnClickOnViewPage = () => {
    setStep("viewPage");
  };

  return (
    <div className="w-1/4 flex flex-col h-screen gap-1 pr-10">
      <button
        className={`flex py-1 px-3 w-full justify-center items-center gap-2 rounded-lg text-[14px] cursor-pointer ${
          step === "home" ? "bg-[#F4F4F5] text-black" : "bg-white text-black"
        }`}
        onClick={handleOnClicOnHome}
      >
        Home
      </button>
      <button
        className={`flex py-1 px-3 w-full justify-center items-center gap-2 rounded-lg text-[14px] cursor-pointer ${
          step === "explore" ? "bg-[#F4F4F5] text-black" : "bg-white text-black"
        }`}
        onClick={handleOnClickOnExplore}
      >
        Explore
      </button>
      <button
        className={`flex py-1 px-3 w-full justify-center items-center gap-2 rounded-lg text-[14px] cursor-pointer ${
          step === "viewPage"
            ? "bg-[#F4F4F5] text-black"
            : "bg-white text-black"
        }`}
        onClick={handleOnClickOnViewPage}
      >
        View page
      </button>
      <button
        className={`flex py-1 px-3 w-full justify-center items-center gap-2 rounded-lg text-[14px] cursor-pointer ${
          step === "settings"
            ? "bg-[#F4F4F5] text-black"
            : "bg-white text-black"
        }`}
        onClick={handleOnClickOnSettings}
      >
        Account settings
      </button>
    </div>
  );
};

export default ControllerBar;
