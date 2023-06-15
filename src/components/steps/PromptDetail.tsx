const PromptDetail = ({
  price,
  setPrice,
  type,
  setType,
  description,
  setDesc,
  name,
  setName }: any) => {

  return (
    <div className="flex flex-col w-full rounded-lg w-[550px] mx-auto  items-center gap-y-2">
      <div className="flex flex-col items-center justify-center">
        <h3>PromptDetail</h3>
        <p>Tell us about the prompt you want to sell.</p>
        <p>
          These details are not final. Our team will make edits if it goes live
        </p>
      </div>
      <div className="w-full flex flex-col gap-y-2">
        <label>Prompt Type</label>
        <label className="italic text-gray-400">
          Select the type of prompt you want to sell
        </label>
        <select
          className="login-input rounded-md outline-none text-gray-400"
          placeholder="Select Prompts Type"
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <option>Select Prompts Type</option>
          <option>DALL-E</option>
          <option>Midjourney</option>
          <option>GPT</option>
          <option>PromptBase</option>
          <option>Stable Diffusion</option>

        </select>
      </div>

      <div className="w-full flex flex-col gap-y-2">
        <label>Name</label>
        <label className="italic text-gray-400">
          Enter name of your prompt
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="login-input mb-4 focus:outline-none focus:shadow-outline "
          placeholder="Movie to Emoji Generator"
          maxLength={60}
        />
        <label className="italic text-gray-400 ml-auto text-sm">{name?.length || 0}/60</label>
      </div>

      <div className="w-full flex flex-col gap-y-2">
        <label>Description</label>
        <label className="italic text-gray-400"        >
          Describe what your prompt does to a potential buyer. A more detailed
          description will increase your sales.
        </label>
        <textarea
          id="story"
          name="story"
          rows={5}
          cols={33}
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          className="login-input mb-4 focus:outline-none focus:shadow-outline "
          placeholder="Converts movie titles into emoji"
          maxLength={500}
        ></textarea>
        <label className="italic text-gray-400 ml-auto text-sm">{description?.length || 0}/500</label>
      </div>

      <div className="w-full flex flex-col gap-y-2">
        <label>Estimated Price</label>
        <label className="italic text-gray-400">
          What do you think the price of this prompt should be?
        </label>
        <select
          className="login-input rounded-md outline-none text-gray-400"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option>0.99$</option>
          <option>1.99$</option>
          <option>2.99$</option>
          <option>3.99$</option>
          <option>4.99$</option>
          <option>5.99$</option>
          <option>6.99$</option>
          <option>7.99$</option>
          <option>8.99$</option>
          <option>9.99$</option>
          <option>10.99$</option>
          <option>11.99$</option>
          <option>12.99$</option>
          <option>13.99$</option>
          <option>14.99$</option>
          <option>15.99$</option>
          <option>16.99$</option>
          <option>17.99$</option>
          <option>18.99$</option>
          <option>19.99$</option>
          <option>20.99$</option>
          <option>21.99$</option>
          <option>22.99$</option>
          <option>23.99$</option>
          <option>24.99$</option>
          <option>25.99$</option>
          <option>26.99$</option>
          <option>27.99$</option>
          <option>28.99$</option>
          <option>29.99$</option>
        </select>
      </div>
    </div>
  );
};

export default PromptDetail;
