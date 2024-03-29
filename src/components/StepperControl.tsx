//@ts-nocheck

import { UserContext } from "@/contexts/UserContext";
import React, { useContext } from "react";

interface StepperControlProps {
  handleClick: any;
  currentStep: any;
  steps: any;
}
const StepperControl = ({
  handleClick,
  currentStep,
  steps,
}: StepperControlProps) => {
  const { currentUser } = useContext(UserContext)
  
  return (
    <div
      className={`container flex justify-center gap-3 mb-8`}
    >
      <button
        onClick={() => handleClick("next")}
        className="bg-yellow py-3 px-12 rouned-full text-black
            font-semibold border-2 hover:bg-slate-700 transition duration-200 ease-in-out"
      >
        {currentStep === steps.length - 2 ? "Confirm Add Prompt" :
          (((currentStep === steps.length - 1)) ? `${!(currentUser?.ownerStripeId) ? 'Connect Bank' : 'Bank Connected'}` : 'Next')}

      </button>
      {
        (currentStep !== steps.length - 1) &&
        <button
          onClick={() => handleClick()}
          className={`py-3 px-12 rouned-full bg-transparent text-white
              font-semibold border-2 hover:bg-slate-700 transition duration-200 ease-in-out ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Back
        </button>
      }
    </div>
  );
};

export default StepperControl;
