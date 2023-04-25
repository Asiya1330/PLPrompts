export const host = process.env.NEXT_PUBLIC_BEAPI || 'https://newserverprompt.promptheaven.ai';
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;

export const getLikesViewsPurchasesAndRank = `${host}/api/user/getlikesviewspurchasesandrank`;
export const addFollowerUrl = `${host}/api/user/addfollower`;

export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const addChatUrl = `${host}/api/messages/addchat`;
export const getChatUrl = `${host}/api/messages/getchat`;

export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const insertPrompt = `${host}/api/prompt/addprompt`
export const getAllPrompts = `${host}/api/prompt/getprompts`
export const getAllPromptsByHourlyFactor = `${host}/api/prompt/gettrendingprompt`
export const getNonApprovedAllPromptsUrl = `${host}/api/prompt/getnonapprovedprompts`
export const approvePromptUrl = `${host}/api/prompt/approvePrompt`;
export const markFeatureUrl = `${host}/api/prompt/markfeature`;

export const getUserById = `${host}/api/auth/user`;
export const uploadImageByUserIdAndFile = `${host}/api/uploadfile`;
export const deleteImageByPath = `${host}/api/delete`;
export const InsertViewPromptUrl = `${host}/api/prompt/viewprompt`;
export const GetPromptViewsByUserId = `${host}/api/prompt/promptview`;

export const InsertLikePromptUrl = `${host}/api/prompt/likeprompt`;
export const GetPromptFavByUserId = `${host}/api/prompt/likeprompt`;

export const InsertPurchasePromptUrl = `${host}/api/prompt/purchaseprompt`;
export const GetPromptPurchaseByUserId = `${host}/api/prompt/purchaseprompt`;

