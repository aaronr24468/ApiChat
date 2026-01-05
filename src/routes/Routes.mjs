import { Router } from "express";
import { checkUser, getImageUser, getMessages, getUserD, getUserPhoto, logOut, saveMessage, setConnected } from "../controllers/controllers.mjs";
import multer from "multer";
import {dirname, join} from 'path';
import { fileURLToPath } from "url";

const diskStorage = multer.diskStorage({
    destination: join(dirname(fileURLToPath(import.meta.url)), '../userPhotos'),
    filename: (req,file, cb) =>{
        cb(null, file.originalname)
    }
})

const getImage = multer({
    storage: diskStorage
}).single('image')

export const router = Router();

router.get('/getUser', getUserD);

router.get('/checkUser', checkUser)

router.get('/getUserPhoto', getUserPhoto);

router.post('/setImage', getImage, getImageUser);

router.post('/setConnected', setConnected);

router.post('/saveMessage', saveMessage);

router.post('/getMessages', getMessages);

router.get('/logout', logOut)