import express from "express";
import passport from "passport";
import { fetchGoogleUser, refreshAccessToken } from "../utils/tokenHelper.js";
import { User } from "../models/user.js";

const router = express.Router();

router.get("/login/success", async (req, res) => {
  console.log("Session object:", req.session); 
  console.log("Passport user:", req.user);     

  if (req.user) {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      error: false,
      message: "Successfully Logged in",
      user: user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not authorized" });
  }
});


router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failed",
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.redirect("https://managio.in/");
  });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "online",
    prompt: "consent",
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login/failed" }),
  (req, res) => {
    res.redirect("https://managio.in/");
  },
);

router.get("/user", async (req, res) => {
  try {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if token expired and refresh it
    if (!user.accessToken) {
      console.log("No access token found");
      return res.status(401).json({ error: "No access token found" });
    }

    let googleUser = await fetchGoogleUser(user.accessToken);

    // If token is expired, refresh it
    if (!googleUser || googleUser.error) {
      console.log("Access token expired, refreshing...");
      const newAccessToken = await refreshAccessToken(user.refreshToken);

      if (!newAccessToken) {
        return res.status(401).json({ error: "Failed to refresh token" });
      }

      // Update user with new token
      user.accessToken = newAccessToken;
      await user.save();

      // Fetch user data again
      googleUser = await fetchGoogleUser(newAccessToken);
    }

    res.json({ user: googleUser });
  } catch (error) {
    console.error("/auth/user error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// router.put("/user/update",async (req,res)=>{
//     if(!req.isAuthenticated()){
//         return res.status(401).json({error:"Not Authenticated"})
//     }
//     else{
//         try{
//             const user = await new User.findUpdateById(req.user._id);
//             user.name = req.body.name;

//         }
//     }
// })

export default router;
