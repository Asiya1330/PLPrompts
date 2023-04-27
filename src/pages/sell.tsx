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

  const [gpt_cat, setgpt_cat] = useState('Chat (ChatGPT)');
  const [testing_prompt, settesting_prompt] = useState();
  const [engine, setengine] = useState('text-davinci-003');
  const [preview_output, setpreview_output] = useState(null);
  const [preview_input, setpreview_input] = useState(null);
  const [sd_model, setsd_model] = useState('Stable Diffusion v2.0');
  const [sd_sampler, setsd_sampler] = useState('k_euler');
  const [sd_img_width, setsd_img_width] = useState(512);
  const [sd_img_height, setsd_img_height] = useState(512);
  const [sd_steps, setsd_steps] = useState(150);
  const [sd_cfg_scale, setsd_cfg_scale] = useState(2.5);
  const [sd_seed, setsd_seed] = useState(null);
  const [sd_clip_guide, setsd_clip_guide] = useState(false);
  const [sd_neg_prompt, setsd_neg_prompt] = useState(null);

  //

  const [loading, setLoading] = useState(false)

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
          type={type}
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
          gpt_cat={gpt_cat}
          setgpt_cat={setgpt_cat}
          testing_prompt={testing_prompt}
          settesting_prompt={settesting_prompt}
          engine={engine}
          setengine={setengine}
          preview_output={preview_output}
          setpreview_output={setpreview_output}
          preview_input={preview_input}
          setpreview_input={setpreview_input}
          sd_model={sd_model}
          setsd_model={setsd_model}
          sd_sampler={sd_sampler}
          setsd_sampler={setsd_sampler}
          sd_img_width={sd_img_width}
          setsd_img_width={setsd_img_width}
          sd_img_height={sd_img_height}
          setsd_img_height={setsd_img_height}
          sd_steps={sd_steps}
          setsd_steps={setsd_steps}
          sd_cfg_scale={sd_cfg_scale}
          setsd_cfg_scale={setsd_cfg_scale}
          sd_seed={sd_seed}
          setsd_seed={setsd_seed}
          sd_clip_guide={sd_clip_guide}
          setsd_clip_guide={setsd_clip_guide}
          sd_neg_prompt={sd_neg_prompt}
          setsd_neg_prompt={setsd_neg_prompt}
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
    if (type && type !== 'GPT') {
      console.log('xs');

      setgpt_cat(null)
      setengine(null)
    }
    if (type && type !== 'Stable Diffusion') {
      setsd_model(null)
      setsd_sampler(null)
      setsd_img_width(null)
      setsd_img_height(null)
      setsd_steps(null)
      setsd_cfg_scale(null)
      setsd_clip_guide(null)
    }

  }, [type])

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
    console.log(gpt_cat, sd_model);

    if (currentStep == 3 && (!type || !price || !description || !name)) {
      return alert('Please fill all fields before moving to next step')
    }


    if (currentStep == 4 && type === 'GPT' && (!prompt || !promptIns || !preview_input || !preview_output || !engine || !testing_prompt || !gpt_cat)) {
      console.log(prompt, promptIns, preview_input, preview_output, engine, testing_prompt, gpt_cat)

      return alert('Please fill all fields before moving to next step')
    }
    if (currentStep == 4 && type === 'DALL-E' && (!prompt || !promptIns || allFiles.length < 5 || allFiles.length > 9 || !testing_prompt || !profileLink)) {
      console.log(prompt, promptIns, preview_input, profileLink, preview_output, engine, testing_prompt, gpt_cat)

      return alert('Please fill all fields before moving to next step')
    }
    if (currentStep == 4 && type === 'Midjourney' && (!prompt || !promptIns || allFiles.length < 5 || allFiles.length > 9 || !profileLink)) {
      console.log(prompt, promptIns, preview_input, profileLink, preview_output, engine, testing_prompt, gpt_cat)

      return alert('Please fill all fields before moving to next step')
    }
    if (currentStep == 4 && type === 'Stable Diffusion' && (!prompt || !testing_prompt || allFiles.length < 5 || allFiles.length > 9 || !sd_model || !sd_sampler || !sd_img_width || !sd_img_height || !sd_cfg_scale || !sd_steps || !sd_neg_prompt || !promptIns || !sd_clip_guide)) {
      console.log(prompt, sd_model, sd_sampler, sd_img_width, sd_img_height, sd_cfg_scale, sd_steps, sd_neg_prompt, promptIns, sd_clip_guide, promptIns, preview_input, profileLink, preview_output, engine, testing_prompt, gpt_cat)

      return alert('Please fill all fields before moving to next step')
    }
    if (currentStep == 4 && type === 'PromptBase' && (!prompt || !testing_prompt || allFiles.length < 5 || allFiles.length > 9 || !promptIns)) {
      return alert('Please fill all fields before moving to next step')
    }

    if (currentStep === steps.length - 1 && direction === 'next') {
      //@ts-ignore
      const userId = currentUser._id;
      if (!userId) alert('user is not logged in');
      setLoading(true)
      const urls = await addAllFilesToS3(allFiles);

      const newPrompt = await axios.post(insertPrompt, {
        type,
        description,
        price,
        name,
        prompt,
        midjourney_pflink: profileLink,
        prompt_ins: promptIns,
        userId,
        images: urls,
        gpt_cat,
        testing_prompt,
        engine,
        preview_output,
        preview_input,
        sd_model,
        sd_sampler,
        sd_img_width,
        sd_img_height,
        sd_steps,
        sd_cfg_scale,
        sd_seed,
        sd_clip_guide,
        sd_neg_prompt,
      });
      console.log(newPrompt);
      //@ts-ignore
      const updatedPrompts = [...unapprovedPrompts, newPrompt.data]
      //@ts-ignore
      setUnapprovedPrompts(updatedPrompts);
      setLoading(false)

    }

    let newStep = currentStep;
    setDirection(direction);
    direction === 'next' ? newStep++ : newStep--;

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  if (loading) return <div className='text-3xl m-auto'>Loading...</div>
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
