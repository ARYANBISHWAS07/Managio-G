import dotenv from "dotenv";

dotenv.config();

// Fetched Google user 
export async function fetchGoogleUser(accessToken) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching Google user data:", err);
    return null;
  }
}

//  Refreshing access token using Refresh Token.
export async function refreshAccessToken(refreshToken) {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.AUTH_GOOGLE_ID,
        client_secret: process.env.AUTH_GOOGLE_SECRET,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      console.log("New Access Token:", data.access_token);
      return data.access_token;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (err) {
    console.error("Error refreshing access token:", err);
    return null;
  }
}
