import Videos from "../models/Video.js";

export const getWeb = async(req, res, next) => {
    try {
        const videos = await Videos.find({});
        console.log("videos",videos);
        res.render("index", { videos });
    } catch (err) {
        next(err);
    }
};