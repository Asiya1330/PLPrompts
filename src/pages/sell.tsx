import Stepper from '@/components/Stepper';
import StepperControl from '@/components/StepperControl';
import { useContext, useEffect, useState } from 'react';
import SellPrompt from '@/components/steps/SellPrompt';
import Account from '@/components/steps/Account';
import Final from '@/components/steps/Final';
import GetPaid from '@/components/steps/GetPaid';
import PromptFile from '@/components/steps/PromptFile';
import PromptDetail from '@/components/steps/PromptDetail';
import { StepperContext } from '@/contexts/StepperContext';
import StepAction from '@/components/StepAction';
import { NextPageWithAuth } from '@/helpers/interface';
import UserService from '@/supabase/User';
import PromptService from '@/supabase/Prompt'
import { UserContext } from '@/contexts/UserContext';
import { PromptsContext } from '@/contexts/PromptsContext';

const Sell: NextPageWithAuth = () => {
  const { currentUser } = useContext(UserContext)
  const { prompts, setPrompts } = useContext(PromptsContext)

  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState('');
  const [finalData, setFinalData] = useState([]);
  const [direction, setDirection] = useState('next');
  const steps = ['Sell a Prompt', 'Create An Account', 'Prompt Details', 'Prompt File', 'Get Paid', 'Thank you'];

  //PromptDetails
  const [price, setPrice] = useState('2.99$');
  const [description, setDesc] = useState();
  const [type, setType] = useState();
  const [name, setName] = useState();
  //

  //PromptFiles
  const [prompt, setPrompt] = useState();
  const [promptIns, setPromptIns] = useState();
  const [fileUrls, setFileUrls] = useState();
  const [profileLink, setProfileLink] = useState();
  //

  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return <SellPrompt handleClick={handleClick} />;
      case 2:
        return <Account onSuccess={() => setCurrentStep(3)} />;
      case 3:
        return <PromptDetail
          price={price}
          setPrice={setPrice}
          description={description}
          setDesc={setDesc}
          type={type}
          setType={setType}
          name={name}
          setName={setName} />;
      case 4:
        return <PromptFile
          prompt={prompt}
          setPrompt={setPrompt}
          promptIns={promptIns}
          setPromptIns={setPromptIns}
          fileUrls={fileUrls}
          setFileUrls={setFileUrls}
          profileLink={profileLink}
          setProfileLink={setProfileLink}
        />;
      case 5:
        return <GetPaid />;
      case 6:
        return <Final handleClick={handleClick} />;
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await UserService.get_session();
      if (session !== null && currentStep === 2) {
        setCurrentStep(direction === 'next' ? 3 : 1);
      }
    };

    if (currentStep === 2) {
      getSession();
    }
  }, [currentStep]);


  const handleClick = async (direction: string) => {
    if (currentStep == 3 && (!type || !price || !description || !name)) {
      return alert('Please fill all fields before moving to next step')
    }
    if (currentStep == 4 && (!prompt || !profileLink || !promptIns)) {
      return alert('Please fill all fields before moving to next step')
    }

    if (currentStep === steps.length - 1 && direction === 'next') {
      const userId = currentUser.id;
      if (!userId) alert('user is not logged in');

      const newPrompt = await PromptService.create({
        type,
        description,
        price,
        name,
        prompt,
        profileLink,
        promptIns,
        userId,
        images: fileUrls
      });
      const updatedPrompts = [...prompts, newPrompt]
      setPrompts(updatedPrompts)
    }

    let newStep = currentStep;
    setDirection(direction);
    direction === 'next' ? newStep++ : newStep--;

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="grow flex flex-col justify-center items-center py-14 px-20">
      {/* <Stepper steps={steps} currentStep={currentStep} /> */}
      <StepAction className="w-2/3" current={currentStep} total={steps.length} />
      <div className="my-10 p-10">
        <StepperContext.Provider
          value={
            {
              userData,
              setUserData,
              finalData,
              setFinalData,
            } as any
          }
        >
          {displayStep(currentStep)}
        </StepperContext.Provider>

      </div>
      {currentStep !== steps.length && currentStep !== 1 && currentStep !== 2 && (
        <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps} />
      )}
    </div>
  );
};

export default Sell;

// Sell.auth = true;
