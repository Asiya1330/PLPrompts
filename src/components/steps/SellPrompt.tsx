//@ts-nocheck
import { useContext } from "react";
import { StepperContext } from "@/contexts/StepperContext";
import { UserContext } from "@/contexts/UserContext";
import { ResposnsivenessContext } from "@/contexts/responsiveWidthContext";

interface SellPromptProps {
  handleClick: any;
}

const SellPrompt = ({ handleClick }: SellPromptProps) => {
  const { currentUser } = useContext(UserContext);
  const { removeSocialIcons } = useContext(ResposnsivenessContext)
  const { userData, setUserData }: any = useContext(StepperContext);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className={`${!removeSocialIcons ? 'flex-col items-center' : ''} w-full flex flex-row pb-10 `}>
      <div className={`${!removeSocialIcons ? 'w-full items-center' : 'w-1/2'} flex flex-col  gap-y-4`}>
        <h2>
          Start Selling your
          <span className="gradient-text">&nbsp;Own Prompts</span>
        </h2>
        <div className="flex flex-col leading-8 text-gray-400 text-xl">
          <p className="text-left">
            PromptBase is a marketplace for DALL.E, Midjourney, Stable Diffusion
            and GPT-3 Prompts
          </p>
          <p className="text-left">
            You can sell your own prompts on PromptBase and start earning from
            your Prompt Engineering skills
          </p>
          <p className="text-left">
            {
              "If your Prompt is approved, you'll keep 80% of revenue from every sale of your prompt"
            }
          </p>
          <p className="text-left">Get selling in just 2 minutes.</p>
        </div>
        <button
          className="bg-yellow text-black border-2 border-white rounded-full px-4 py-2"
          onClick={() => handleClick("next")}
        >
          Sell a Prompt
        </button>
        <p className="text-gray-400 text-left">
          Please read our{" "}
          <span className="text-yellow">prompt submission guidlines</span>before
          submitting your prompt so you understand what prompts can be sold on{" "}
          <span className="text-yellow">Prompts</span>
        </p>
      </div>
      <div className={`${!removeSocialIcons ? 'w-full items-center' : 'w-1/2'} flex `}>
        <iframe
          className="mx-auto lg:float-right w-full lg:w-[555px] h-[330px] lg:h-[420px] z-0"
          src="https://player.vimeo.com/video/803439591?h=b962ddd0b6"
          // alt="sellPromptVideo"
          title="payer.vimeo.player"
          // frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default SellPrompt;
