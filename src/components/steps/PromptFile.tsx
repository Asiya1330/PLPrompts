import { useContext, useState } from "react";
import UploadFiles from '../UploadFiles'
import { UserContext } from "@/contexts/UserContext";
const PromptFile = ({
  prompt,
  setPrompt,
  promptIns,
  setPromptIns,
  fileUrls,
  setFileUrls,
  profileLink,
  setProfileLink,
}: any) => {

  const [haveVariable, setHaveVariable] = useState("");
  const { currentUser } = useContext(UserContext);

  const handleChange = (e: any) => {
    setHaveVariable(e.target.value);
  };
  return (
    <div className="w-full flex flex-row gap-10 px-10">
      <div className="flex flex-col w-1/2 rounded-lg w-[550px] mx-auto min-w-[470px] items-center gap-y-2">
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
        {haveVariable ? (
          <>
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
                onChange={(e: any) => handleChange(e)}
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
              >
                <option>text-davinci-003</option>
              </select>
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <label>Preview Input</label>
              <label className="italic text-gray-400">
                {`"A preview input to this prompt to show a potential buyer. Don't include your whole prompt here, just the
                bits that are editable - e.g. [Company]: Microsoft, [Tone of voice]: Happy."`}
              </label>
              <input className="login-input mb-4 focus:outline-none focus:shadow-outline " />
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <label>Preview Output</label>
              <label className="italic text-gray-400">
                A preview output generated this prompt to demonstrate to a
                potential buyer what your prompt does. Do not include your input
                prompt.
              </label>
              <input className="login-input mb-4 focus:outline-none focus:shadow-outline " />
            </div>
          </>
        ) : (
          <></>
        )}
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
          <UploadFiles userId={currentUser.id} setFileUrls={setFileUrls} />
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
      <div className="flex w-1/2">
        <iframe
          className="mx-auto lg:float-right w-full lg:w-[590px] h-[380px] lg:h-[420px] z-0"
          src="https://player.vimeo.com/video/803439591?h=b962ddd0b6"
          //   alt="sellPromptVideo"
          title="payer.vimeo.player"
          //   frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default PromptFile;
