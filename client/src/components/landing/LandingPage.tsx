import Layout, { LayoutLogo, Btn } from "./Layout";

function LandingPage() {
  const handleGoogleSignup = async () => {
    chrome.runtime.sendMessage({ action: "googleLogin" }, (response) => {
      if (response.success) {
        console.log("Token received:", response.token);
        const token = response.token;
        fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + token,
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.error("Error fetching user info:", data.error);
            } else {
              const userName = data.name; // User's name
              const userEmail = data.email; // User's email
              console.log("User Name:", userName);
              console.log("User Email:", userEmail);
            }
          })
          .catch((err) => {
            console.error("Error fetching user info:", err);
          });
        // You can now use the token to make authenticated API requests
      } else {
        console.error("Login failed:", response.error);
      }
    });
  };

  return (
    <Layout>
      <LayoutLogo text={"Elevate Your Stream Experience"} />
      <div className="w-full flex flex-col max-w-xs p-6 space-y-4 ">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-400 bg-gradient-to-br from-slate-900 to-slate-950">
              Continue With
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <Btn
            text="Continue With Google"
            worker={handleGoogleSignup}
            sBtn={true}
          />
        </div>
      </div>
    </Layout>
  );
}

export default LandingPage;
