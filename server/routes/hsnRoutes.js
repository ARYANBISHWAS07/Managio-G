import express from "express";
import { HSNItem } from "../models/hsnCodes.js";

const router = express.Router();


router.get("/hsnAdd", async (req, res) => {
    try {
        const data = await HSNItem.find();
        console.log(" Retrieved Records:", data.length);
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/hsnAdd/:item_code", async (req, res) => {
    try {
        const { item_code } = req.params;
        // console.log("Searching for HSN Code:", item_code);

        const item = await HSNItem.findOne({item_code});

        if (!item) {
            // console.log(" HSN Code Not Found:", item_code);
            return res.status(404).json({ error: "HSN Code not found" });
        }

        // console.log(" HSN Code Found:", item);
        res.json(item);
    } catch (error) {
        console.error("Error fetching HSN details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;