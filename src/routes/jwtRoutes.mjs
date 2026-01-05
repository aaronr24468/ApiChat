import { Router } from "express";
import jwt from 'jsonwebtoken';
import { getUser } from "../models/jwtModels.mjs";

export const router = Router();

router.post('/', async(request, response) =>{
    try {
        const username = request.body.username;
        const password = request.body.password;
        const user = await getUser({username, password});
        console.log(user)
        if(user.length === 1 && user[0].connected === 0){
            const payload = {...user};
            //delete payload[0].password;
            const token = jwt.sign(payload, 'secret')
            response.cookie('chatToken', token,{
                httpOnly: true,
                secure: false,
                sameSite: 'none',
                partitioned: true
            });
            response.status(200).json({login: true})
            //response.status(200).json({[{login: true}, user[0]]})
        }else if(user.length === 1 && user[0].coonected === 1){
            response.status(401).json('L')
        }else{
            response.status(200).json('N')
        }
    } catch (e) {
        console.error(e)
        response.status(401).json('unauthorized')
    }
})