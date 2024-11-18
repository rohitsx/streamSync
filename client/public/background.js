chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "googleLogin") {
    chrome.identity.getAuthToken({ 
      interactive: true,
      // Add these parameters to force account selection
      oauth2Params: {
        prompt: 'select_account',
        login_hint: '' // Clear any default account hint
      }
    }, (token) => {
      if (chrome.runtime.lastError) {
        console.error("Authentication failed:", chrome.runtime.lastError);
        sendResponse({ success: false, error: chrome.runtime.lastError });
        return;
      }

      fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(profile => {
        localStorage.setItem("google_token", token);
        localStorage.setItem("google_profile", JSON.stringify(profile));
        
        sendResponse({ 
          success: true, 
          token: token, 
          profile: profile 
        });
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
        sendResponse({ success: false, error: "Could not fetch profile" });
      });
    });

    return true;
  }
});
