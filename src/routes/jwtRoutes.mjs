import { Router } from "express";
import jwt from 'jsonwebtoken';
import { getUser } from "../models/jwtModels.mjs";

export const router = Router();

router.post('/', async(request, response) =>{
    try {
        const username = request.body.username;
        const password = request.body.password;
        const user = await getUser({username, password});
        if(user.length === 1){
            const payload = {...user};
            //delete payload[0].password;
            const token = jwt.sign(payload, 'secret')
            response.status(200).json([token, user[0]])
        }else{
            response.status(401).json('unauthorized')
        }
    } catch (e) {
        console.error(e)
        response.status(401).json('unauthorized')
    }
})