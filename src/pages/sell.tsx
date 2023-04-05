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
import { UserContext } from '@/contexts/UserContext';
import { PromptsContext } from '@/contexts/PromptsContext';
import axios from 'axios';
import { insertPrompt, uploadImageByUserIdAndFile } from '@/utils/apis';

const Sell: NextPageWithAuth = () => {
  const { currentUser } = useContext(UserContext)
  const { prompts, setPrompts } = useContext(PromptsContext)
  const { unapprovedPrompts, setUnapprovedPrompts } = useContext(PromptsContext)
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
  const [allFiles, setAllFiles] = useState([])
  const [profileLink, setProfileLink] = useState();
  const [allFilesUrl, setAllFilesUrls] = useState([])
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
          setAllFiles={setAllFiles}
          allFiles={allFiles}
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
    const getSession = () => {

      if (currentUser && currentStep === 2) {
        setCurrentStep(direction === 'next' ? 3 : 1);
      }
    };

    if (currentStep === 2) {
      getSession();
    }
  }, [currentStep]);

  useEffect(() => {
    console.log(allFilesUrl, 'updatd');

  }, [allFilesUrl])

  const addAllFilesToS3 = async (allFiles: any) => {
    const urls = await Promise.all(allFiles.map(async (file: any) => {
      let formData = new FormData();
      formData.append('file', file);
      //@ts-ignore
      formData.append('userId', currentUser._id);

      const { data } = await axios.post(uploadImageByUserIdAndFile,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      return data.Location
    }))
    return urls;
  }

  const handleClick = async (direction: string) => {
    if (currentStep == 3 && (!type || !price || !description || !name)) {
      return alert('Please fill all fields before moving to next step')
    }
    if (currentStep == 4 && (!prompt || !profileLink || !promptIns)) {
      return alert('Please fill all fields before moving to next step')
    }
    if (currentStep == 4 && allFiles.length < 5) {
      return alert('Please upload minimum 5 images')
    }
    if (currentStep == 4 && allFiles.length > 9) {
      return alert('You cannot upload more than 9 images')
    }

    if (currentStep === steps.length - 1 && direction === 'next') {
      //@ts-ignore
      const userId = currentUser._id;
      if (!userId) alert('user is not logged in');

      console.log(allFiles, 'allfiles');
      const urls = await addAllFilesToS3(allFiles);
      console.log(urls, 'ye urls');

      const newPrompt = await axios.post(insertPrompt, {
        type,
        description,
        price,
        name,
        prompt,
        profileLink,
        promptIns,
        userId,
        images: urls
      });
      console.log(newPrompt);
      //@ts-ignore
      const updatedPrompts = [...unapprovedPrompts, newPrompt.data]
      //@ts-ignore
      setUnapprovedPrompts(updatedPrompts)
    }

    let newStep = currentStep;
    setDirection(direction);
    direction === 'next' ? newStep++ : newStep--;

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="grow flex flex-col justify-center items-center py-14 px-20">
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
