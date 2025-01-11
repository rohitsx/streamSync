export default function startCall(
  hostname: string | undefined,
) {
  chrome.windows.create({
    url: `index.html#/call/${hostname}`,
    type: "popup",
    width: 300,
    height: 200,
  });
}
