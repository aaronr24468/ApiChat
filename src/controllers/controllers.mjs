import { getUser } from "../models/jwtModels.mjs";
import { getImageU, getM, registerU, saveM, setConnect } from "../models/models.mjs";

export const getUserD = (request, response) => {
    try {
        const username = request.auth[0];
        response.status(200).json(username)
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
}

export const checkUser = (request, response) => {
    try {
        const token = request.cookies.chatToken
        response.status(200).json('S')
    } catch (e) {
        console.error(e);
        response.status(401).json("F")
    }
}

export const getUserPhoto = async (request, response) => {
    try {
        const username = request.auth[0].username;
        const password = request.auth[0].password;
        const user = await getUser({ username, password })
        response.status(200).json(user[0].image)
    } catch (error) {
        console.error(e);
        response.status(401).json('F')
    }
}

export const registerUser = async (request, response) => {
    try {
        const data = {
            name: request.body.name,
            lastname: request.body.lastname,
            day: request.body.day,
            month: request.body.month,
            year: request.body.year,
            username: request.body.username,
            password: request.body.password,
            connected: 0,
            image: ''
        }
        await registerU(data)
        response.status(200).json('S')
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
}

export const getImageUser = async (request, response) => {
    try {
        const data = {
            id: request.auth[0].id,
            url: `http://localhost:8080/userPhotos/${request.file.filename}`
        }
        await getImageU(data)
        response.status(200).json('S')
    } catch (e) {
        console.error(e)
        response.status(401).json('F')
    }
}

export const setConnected = async (request, response) => {
    try {
        const value = request.body.value;
        const id = request.body.id;
        await setConnect({ value, id })
        response.status(200).json('S')
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
}

export const saveMessage = async (request, response) => {
    try {
        const data = {
            user1: request.body.name,
            user2: request.body.receive,
            msg: request.body.msg
        }
        //console.log(data)
        const msgModify = data.msg.replace(/\s/g, "~")
        //const msg1 = `${msgModify.concat("&"+data.user1)}#${msgModify.concat("&"+data.user2)}`;
        const msg1 = `${msgModify.concat("&" + data.user1)}`;
        //const msg2 = msgModify.concat("&"+data.user2);
        const user1 = data.user1;
        const user2 = data.user2;
        //console.log(data.user1)
        await saveM({ user1, user2, msg1 })
        response.status(200).json("S")
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
}

export const getMessages = async (request, response) => {
    try {
        const data = {
            user1: request.body.name,
            user2: request.body.receive,
        }

        const chatData = await getM(data)

        const arrayChat = chatData[0].messagesUser1.split(' ')
        //console.log(arrayChat)
        response.status(200).json(arrayChat)
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
}

export const logOut = (request, response) => {
    try {
        response.clearCookie('chatToken', {
            secure: false,
            sameSite: 'none',
            partitioned: true
        })
        response.status('200').json({ logout: true })
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
} 