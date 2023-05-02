//@ts-nocheck
import { useContext, useState } from "react";
import UploadFiles from '../UploadFiles'
import { UserContext } from "@/contexts/UserContext";


const PromptFile = ({
  type,
  prompt,
  setPrompt,
  promptIns,
  setPromptIns,
  fileUrls,
  setFileUrls,
  setAllFiles,
  allFiles,
  profileLink,
  setProfileLink,
  gpt_cat,
  setgpt_cat,
  testing_prompt,
  settesting_prompt,
  engine,
  setengine,
  preview_output,
  setpreview_output,
  preview_input,
  setpreview_input,
  sd_model,
  setsd_model,
  sd_sampler,
  setsd_sampler,
  sd_img_width,
  setsd_img_width,
  sd_img_height,
  setsd_img_height,
  sd_steps,
  setsd_steps,
  sd_cfg_scale,
  setsd_cfg_scale,
  sd_seed,
  setsd_seed,
  sd_clip_guide,
  setsd_clip_guide,
  sd_neg_prompt,
  setsd_neg_prompt,
}: any) => {

  const [haveVariable, setHaveVariable] = useState("");
  const { currentUser } = useContext(UserContext);

  const handleChange = (e: any) => {
    setHaveVariable(e.target.value);
  };


  return (
    <div className="w-full flex flex-row gap-10 px-10">
      <div className="flex flex-col w-1/2 rounded-lg mx-auto min-w-[470px] items-center gap-y-2">
        {(type === 'GPT') &&
          <div>
            <div className="flex flex-col items-start justify-center">
              <h3>Prompt File</h3>
              <p>
                Copy and paste the JSON GPT-3 prompt file from the OpenAI
                playground. Ensure any editable parts of your prompt are indicated
                by [square brackets].
              </p>
              <p>
                {
                  "Watch our 19 second guide to the right (below on mobile) if you're stuck."
                }
              </p>
            </div>

            <select
              className="login-input rounded-md outline-none text-gray-400"
              placeholder="Price"
              value={gpt_cat}
              onChange={(e) => {
                console.log('eee');

                setgpt_cat(e.target.value)
              }}
            >
              <option value={'Completion (RegularGPT)'}>Completion (RegularGPT)</option>
              <option value={'Chat (ChatGPT)'}>Chat (ChatGPT)</option>

            </select>

            <div className="w-full flex flex-col gap-y-2">
              <label>*Prompt</label>
              <label className="italic text-gray-400">
                Put any variables in [square brackets].
              </label>
              <textarea
                id="story"
                name="story"
                rows={5}
                cols={33}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="Converts movie titles into emoji"
              ></textarea>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>*Testing Prompt</label>
              <label className="italic text-gray-400">
                {`"One example of your prompt with all variables filled in, e.g. if your prompt contained a variable like
                [Tone of voice], this variable should be changed to "happy" or "sad" in your test prompt. Buyers will
                not see this, it is only for PromptBase's internal testing."`}
              </label>
              <textarea
                id="story"
                name="story"
                rows={2}
                cols={33}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="Converts movie titles into emoji"
                value={testing_prompt}
                onChange={(e) => settesting_prompt(e.target.value)}
              ></textarea>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>Engine</label>
              <label className="italic text-gray-400">
                What GPT3 Engine does this prompt use?
              </label>
              <select
                className="login-input rounded-md outline-none text-gray-400"
                placeholder="Select Prompts Type"
                value={engine}
                onChange={(e) => setengine(e.target.value)}
              >
                <option>text-davinci-003</option>
                <option>text-davinci-003</option>
                <option>text-davinci-003</option>
                <option>text-davinci-003</option>
                <option>text-davinci-003</option>
                <option>text-davinci-003</option>

              </select>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>Preview Input</label>
              <label className="italic text-gray-400">
                {`"A preview input to this prompt to show a potential buyer. Don't include your whole prompt here, just the
                bits that are editable - e.g. [Company]: Microsoft, [Tone of voice]: Happy."`}
              </label>
              <input value={preview_input}
                onChange={(e) => setpreview_input(e.target.value)} className="login-input mb-4 focus:outline-none focus:shadow-outline " />
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>Preview Output</label>
              <label className="italic text-gray-400">
                A preview output generated this prompt to demonstrate to a
                potential buyer what your prompt does. Do not include your input
                prompt.
              </label>
              <input value={preview_output}
                onChange={(e) => setpreview_output(e.target.value)} className="login-input mb-4 focus:outline-none focus:shadow-outline " />
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>Prompt Instructions</label>
              <label className="italic text-gray-400">
                Any extra tips or examples for the buyer on how to use this prompt.
              </label>
              <textarea
                id="story"
                name="story"
                rows={2}
                cols={33}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="To use this prompt you need to..."
                value={promptIns}
                onChange={(e) => setPromptIns(e.target.value)}
              ></textarea>
            </div>

          </div>
        }


        {(type === 'DALL-E') &&
          <div>
            <div className="flex flex-col items-start justify-center">
              <h3>Prompt File</h3>
              <p>
                Copy and paste the DALL-E prompt
              </p>
              <p>
                {
                  "Watch our 19 second guide to the right (below on mobile) if you're stuck."
                }
              </p>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>*Prompt</label>
              <label className="italic text-gray-400">
                Put any variables in [square brackets].
              </label>
              <textarea
                id="story"
                name="story"
                rows={5}
                cols={33}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="Converts movie titles into emoji"
              ></textarea>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>*Testing Prompt</label>
              <label className="italic text-gray-400">
                {`"One example of your prompt with all variables filled in, e.g. if your prompt contained a variable like
                [Tone of voice], this variable should be changed to "happy" or "sad" in your test prompt. Buyers will
                not see this, it is only for PromptBase's internal testing."`}
              </label>
              <textarea
                id="story"
                name="story"
                rows={2}
                cols={33}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="Converts movie titles into emoji"
                value={testing_prompt}
                onChange={(e) => settesting_prompt(e.target.value)}              ></textarea>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>Prompt Instructions</label>
              <label className="italic text-gray-400">
                Any extra tips or examples for the buyer on how to use this prompt.
              </label>
              <textarea
                id="story"
                name="story"
                rows={2}
                cols={33}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="To use this prompt you need to..."
                value={promptIns}
                onChange={(e) => setPromptIns(e.target.value)}
              ></textarea>
            </div>

            {
              currentUser &&
              <UploadFiles userId={currentUser._id} setFileUrls={setFileUrls} setAllFiles={setAllFiles} allFiles={allFiles} />
            }

            <div className="midjourney-profile w-full flex flex-col gap-y-2">
              <h4>*Image Verification Link</h4>
              <label className="italic text-gray-400">
                Copy the labs.openai.com share link to one of your images.
              </label>
              <input
                type="text"
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="https://www.labs.openai.com/app/s/abcd1234/"
                value={profileLink}
                onChange={(e) => setProfileLink(e.target.value)}
              />
            </div>

          </div>
        }
        {(type === 'Midjourney') &&
          <div>
            <div className="flex flex-col items-start justify-center">
              <h3>Prompt File</h3>
              <p>
                Copy and paste the Midjourney prompt
              </p>
              <p>
                {
                  "Watch our 19 second guide to the right (below on mobile) if you're stuck."
                }
              </p>
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <label>*Prompt</label>
              <label className="italic text-gray-400">
                Put any variables in [square brackets].
              </label>
              <textarea
                id="story"
                name="story"
                rows={5}
                cols={33}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="Converts movie titles into emoji"
              ></textarea>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>*Testing Prompt</label>
              <label className="italic text-gray-400">
                {`"One example of your prompt with all variables filled in, e.g. if your prompt contained a variable like
                [Tone of voice], this variable should be changed to "happy" or "sad" in your test prompt. Buyers will
                not see this, it is only for PromptBase's internal testing."`}
              </label>
              <textarea
                id="story"
                name="story"
                rows={2}
                cols={33}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="Converts movie titles into emoji"
                value={testing_prompt}
                onChange={(e) => settesting_prompt(e.target.value)}
              ></textarea>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>Prompt Instructions</label>
              <label className="italic text-gray-400">
                Any extra tips or examples for the buyer on how to use this prompt.
              </label>
              <textarea
                id="story"
                name="story"
                rows={2}
                cols={33}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="To use this prompt you need to..."
                value={promptIns}
                onChange={(e) => setPromptIns(e.target.value)}
              ></textarea>
            </div>
            {
              currentUser &&
              <UploadFiles userId={currentUser._id} setFileUrls={setFileUrls} setAllFiles={setAllFiles} allFiles={allFiles} />
            }

            <div className="midjourney-profile w-full flex flex-col gap-y-2">
              <h4>*Midjourney Profile</h4>
              <label className="italic text-gray-400">
                Copy the midjourney.com/app/users link to your profile (watch our video if you can't find this). You'll need an active Midjourney subscription to get this link.
              </label>
              <input
                type="text"
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="https://www.midjourney.com/app/users/abcd1234/"
                value={profileLink}
                onChange={(e) => setProfileLink(e.target.value)}
              />
            </div>
          </div>
        }

        {
          (type === 'Stable Diffusion') &&
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-start justify-center">
              <h3>Prompt File</h3>
              <p>
                Copy and paste the Stable Diffusion prompt
              </p>
              <p>
                {
                  "Watch our 19 second guide to the right (below on mobile) if you're stuck."
                }
              </p>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>*Prompt</label>
              <label className="italic text-gray-400">
                Put any variables in [square brackets].
              </label>
              <textarea
                id="story"
                name="story"
                rows={5}
                cols={33}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="Converts movie titles into emoji"
              ></textarea>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>*Testing Prompt</label>
              <label className="italic text-gray-400">
                {`"One example of your prompt with all variables filled in, e.g. if your prompt contained a variable like
                [Tone of voice], this variable should be changed to "happy" or "sad" in your test prompt. Buyers will
                not see this, it is only for PromptBase's internal testing."`}
              </label>
              <textarea
                id="story"
                name="story"
                rows={2}
                cols={33}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="Converts movie titles into emoji"
                value={testing_prompt}
                onChange={(e) => settesting_prompt(e.target.value)}
              ></textarea>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>Model</label>
              <select
                className="login-input rounded-md outline-none text-gray-400"
                placeholder="Select Prompts Type"
                value={sd_model}
                onChange={(e) => setsd_model(e.target.value)}
              >
                <option>Stable diffusion-003</option>
                <option>Stable diffusion-003</option>
                <option>Stable diffusion-003</option>
                <option>Stable diffusion-003</option>
                <option>Stable diffusion-003</option>
                <option>Stable diffusion-003</option>

              </select>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>Sampler</label>
              <select
                className="login-input rounded-md outline-none text-gray-400"
                placeholder="Select Prompts Type"
                value={sd_sampler}
                onChange={(e) => setsd_sampler(e.target.value)}
              >
                <option>k_euler</option>
                <option>k_euler</option>
                <option>k_euler</option>
                <option>k_euler</option>
                <option>k_euler</option>
                <option>k_euler</option>
              </select>
            </div>
            <div className="flex flex-row  gap-3">
              <label for="vol">
                Image Width
              </label>
              <input
                value={sd_img_width}
                onChange={(e) => setsd_img_width(e.target.value)}
                className="w-[400px]" type="range" id="vol" name="vol" min="512" max="1024" step="64" />
              <div className="value">{sd_img_width}</div>

            </div>
            <div className="flex flex-row gap-3">
              <label for="vol" >
                Image Height
              </label>
              <input
                value={sd_img_height}
                onChange={(e) => setsd_img_height(e.target.value)}
                className="w-[400px]" type="range" id="vol" name="vol" min="512" max="1024" step="64" />
              <div className="value">{sd_img_height}</div>

            </div>

            <div className="flex flex-row gap-3">
              <label for="vol">
                Cfg Scale
              </label>
              <input
                value={sd_cfg_scale}
                onChange={(e) => setsd_cfg_scale(e.target.value)}
                className="w-[400px]" type="range" id="vol" name="vol" min="0.0" max="20.0" step="0.5" />
              <div className="value">{sd_cfg_scale}</div>

            </div>

            <div className="flex flex-row gap-3">
              <label for="vol">
                Steps
              </label>
              <input value={sd_steps}
                onChange={(e) => setsd_steps(e.target.value)}
                className="w-[400px]" type="range" id="vol" name="vol" min="10" max="150" step="1" />
              <div className="value">{sd_steps}</div>

            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>Seed (optional)</label>
              <input
                id="seed"
                name="seed"
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="Random seed"
                value={sd_seed}
                onChange={(e) => setsd_seed(e.target.value)} >
              </input>
            </div>

            <div className="checkbox flex flex-col gap-3">
              <label>CLIP Guidance</label>
              <input value={sd_clip_guide}
                onChange={(e) => setsd_clip_guide(e.target.value)}
                type="checkbox" name="clip" id="clip" />
            </div>

            <div className="neg-prompt">
              <label>Negative Prompt</label>
              <input
                id="seed"
                name="seed"
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="Random seed"
                value={sd_neg_prompt}
                onChange={(e) => setsd_neg_prompt(e.target.value)} >

              </input>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>Prompt Instructions</label>
              <label className="italic text-gray-400">
                Any extra tips or examples for the buyer on how to use this prompt.
              </label>
              <textarea
                id="story"
                name="story"
                rows={2}
                cols={33}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="To use this prompt you need to..."
                value={promptIns}
                onChange={(e) => setPromptIns(e.target.value)}
              ></textarea>
            </div>

            {
              currentUser &&
              <UploadFiles userId={currentUser._id} setFileUrls={setFileUrls} setAllFiles={setAllFiles} allFiles={allFiles} />
            }

          </div>
        }
        {
          (type === 'PromptBase') &&
          <div>
            <div className="flex flex-col items-start justify-center">
              <h3>Prompt File</h3>
              <p>
                PromptBase
              </p>
              <p>
                {
                  "Watch our 19 second guide to the right (below on mobile) if you're stuck."
                }
              </p>
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <label>*Prompt</label>
              <label className="italic text-gray-400">
                Put any variables in [square brackets].
              </label>
              <textarea
                id="story"
                name="story"
                rows={5}
                cols={33}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="Converts movie titles into emoji"
              ></textarea>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>*Testing Prompt</label>
              <label className="italic text-gray-400">
                {`"One example of your prompt with all variables filled in, e.g. if your prompt contained a variable like
                [Tone of voice], this variable should be changed to "happy" or "sad" in your test prompt. Buyers will
                not see this, it is only for PromptBase's internal testing."`}
              </label>
              <textarea
                id="story"
                name="story"
                rows={2}
                cols={33}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="Converts movie titles into emoji"
                value={testing_prompt}
                onChange={(e) => settesting_prompt(e.target.value)}  >

              </textarea>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <label>Prompt Instructions</label>
              <label className="italic text-gray-400">
                Any extra tips or examples for the buyer on how to use this prompt.
              </label>
              <textarea
                id="story"
                name="story"
                rows={2}
                cols={33}
                className="login-input mb-4 focus:outline-none focus:shadow-outline "
                placeholder="To use this prompt you need to..."
                value={promptIns}
                onChange={(e) => setPromptIns(e.target.value)}
              ></textarea>
            </div>
            {
              currentUser &&
              <UploadFiles userId={currentUser._id} setFileUrls={setFileUrls} setAllFiles={setAllFiles} allFiles={allFiles} />
            }

          </div>
        }
      </div>
      <div className="flex w-1/2">
        <iframe
          className="mx-auto lg:float-right w-full lg:w-[590px] h-[380px] lg:h-[420px] z-0"
          src="https://player.vimeo.com/video/803439591?h=b962ddd0b6"
          title="payer.vimeo.player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default PromptFile;
