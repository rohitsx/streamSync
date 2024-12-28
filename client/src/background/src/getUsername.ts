export default async function getUsername(): Promise<string> {
  const userCokie = await chrome.cookies.get({
    url: import.meta.env.VITE_API,
    name: "user",
  });

  if (!userCokie || !userCokie.value) return "user not found";

  const user = await JSON.parse(userCokie.value);
  return user.username;
}
