import { IUser } from "@/contexts/UserContext";
import supabase from "../utils/supabase";
import { UserIdentity } from "@supabase/supabase-js";

const get_session = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
};

const sign_up = async ({ email, password, username }: any) => {
  try {
    const user = { email, password, username };

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (error) throw new Error(error)
    const userToAdd =
    {
      ...user,
      id: data?.user.id
    }

    await addUser(userToAdd);
    // await sign_in(user);

    return {
      data,
      error,
    };
  }
  catch (error) {
    console.log(error);
  }
};

const sign_in_google = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "/marketplace",
    },
  });
  return {
    data,
    error,
  };
};

const sign_in = async ({ email, password }: any) => {
  const user = { email, password };
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (!error) {
  }
  return {
    data,
    error,
  };

};


/**
 * 
 * @param param0 email, password, username, in object
 */
const addUser = async ({ email, username, password, id }: IUser) => {

  const { error, data } = await supabase
    .from("profiles").insert(
      {
        email,
        username,
        password,
        id
      },
    );
  if (error) {
    // if (error.message.includes('duplicate key value violates unique constraint'))
    //   alert('User already exists');

  } else {
    if (password)
    alert('Sent you email for verification')
    // alert('User created successfully');
  }
}


/**
 *
 * @param email email
 * @returns schema {data: [{id, username, nickname, avatar_url, email}], error: error}
 */

const find = async ({ email }: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, avatar_url, username')
    .eq("email", email);

  return {
    data,
    error,
  };

};

/**
 *
 * @param username username
 * @returns schema {data: [{id, username}], error: error}
 */
const find_all = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, nickname, avatar_url, email");
  return {
    data,
    error,
  };
};

/**
 *
 * @param username username
 * @returns schema {data: [{id, username}], error: error}
 */
const find_by_name = async ({ username }: any) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, nickname, avatar_url, email")
    .like("username", `%${username}%`);

  return {
    data,
    error,
  };
};

const userSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error)
    console.log(error);

}

const findUserById = async (id: UserIdentity) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", id);

    return data;
  }
  catch (error) {
    console.log(error);
  }
}

const User = {
  sign_in,
  sign_up,
  sign_in_google,
  find,
  find_all,
  get_session,
  find_by_name,
  addUser,
  userSignOut,
  findUserById
};

export default User;
