export default async function checkIfLiveStream(url: string) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const isLive = html.includes(
      '<meta itemprop="isLiveBroadcast" content="True">',
    );
    return isLive;
  } catch (error) {
    console.error("Error fetching the URL:", error);
    return false;
  }
}
