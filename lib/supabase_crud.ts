import supabase from "./supabase";

const TABLE_NAME = "sampledatabase";

export async function getUsers() {
  const { data, error } = await supabase.from(TABLE_NAME).select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function insertUser(user: { name: string; email: string }) {
  const { name, email } = user;
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{ name: name, email: email }]);
  if (error) {
    throw error;
  }
}

export async function updateUser(user: {
  id: number;
  name: string;
  email: string;
}) {
  const { id, name, email } = user;
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ name: name, email: email })
    .match({ id: id });
  if (error) {
    throw error;
  }
}

export async function deleteUser(id: any) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .match({ id: id });
  if (error) {
    throw error;
  }
}
