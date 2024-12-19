export default function makeUrl(
  clientId: string,
  response_type: string,
  scopes: string[],
  access_type: string
): string {
  const redirectUri = chrome.identity.getRedirectURL("google");
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  
  url.searchParams.append("client_id", clientId);
  url.searchParams.append("response_type", response_type);
  url.searchParams.append("prompt", "consent select_account");
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("scope", scopes.join(" "));
  url.searchParams.append("access_type", access_type);
  
  return url.toString();
}
