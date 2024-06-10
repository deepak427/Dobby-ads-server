import express from "express";

import { addFolder, addImage, getFolder } from "../controllers/folder.js";

const router = express.Router();

router.post('/add', addFolder)
router.post('/get', getFolder)
router.post('/addImage', addImage)

export default router