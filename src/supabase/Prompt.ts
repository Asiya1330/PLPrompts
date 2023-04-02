import supabase from "../utils/supabase";

const create = async ({
  type,
  description,
  price,
  name,
  prompt,
  profileLink,
  promptIns,
  userId,
  images,
  category,
  trending_points
}: any) => {
  const promptMetaData = {
    type,
    description,
    price,
    name,
    prompt,
    midjourney_pflink: profileLink,
    prompt_ins: promptIns,
    userId,
    images
  };
  
  const { data, error } = await supabase.from("prompt").insert(promptMetaData).select('*');
  if (error) throw new Error('Error while generating prompts')
  return data[0];
};

const find_all = async () => {
  const { data, error } = await supabase
    .from("prompt")
    .select("*")
    // .like("type", `%${type}%`);

  return {
    data,
    error,
  };
};

const find = async ({
  sortby = "trending",
  type = "dalle",
  category = "threeD",
  page_size = 35,
  page = 1,
}) => {
  const { data, error } = await supabase
    .from("prompt")
    .select("*")
    .eq("type", type)
    .eq("category", category)
    .eq("sortby", sortby)
    .limit(page_size)
    .range((page - 1) * page_size, page * page_size - 1);
  console.log(data, error, 'lolo');

  return { data, error };
};

const Prompt = {
  create,
  find,
  find_all,
};

export default Prompt;
