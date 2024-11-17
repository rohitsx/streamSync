import { useNavigate } from "react-router-dom";
import Layout, { LayoutLogo, Btn } from "./Layout";

function LandingPage() {
  const nav = useNavigate();

  const openNewTab = (route: string) => {
    try {
      chrome.tabs.create({
        url: chrome.runtime.getURL(`index.html#${route}`), // Use hash for routing
      });
    } catch {
      console.error("Failed to create tab. Navigating to fallback route.");
      nav(route);
    }
  };

  return (
    <Layout>
      <LayoutLogo text={"Elevate Your Stream Experience"} />
      <div className="w-full flex flex-col max-w-xs p-6 space-y-4 ">
        <Btn text="Sign Up" worker={() => openNewTab("/signup")} sBtn={true} />
        <Btn text="Login" worker={() => openNewTab("/login")} />
      </div>
    </Layout>
  );
}

export default LandingPage;
