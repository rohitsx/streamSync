export default function startCall(hostname: string | undefined) {
  console.log(hostname);
  window.open(
    `index.html#/call/${hostname}`,
    "newwin",
    "width=300,height=200,resizable=yes,scrollbars=yes",
  );
}
