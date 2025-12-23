import mysql from 'mysql2/promise';
import {config} from 'dotenv'
config();

const connection = await mysql.createConnection({
    host: `${process.env.HOST}`,
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DB}`
});

await connection.connect((err) =>{
    if(err){
        console.error(err)
    }else{
        console.log("Connected")
    } 
})

export const registerU = async(data) =>{
    const query = 'INSERT INTO users(name , lastname, day, month, year, username, password,connected, image) values(?,?,?,?,?,?,?,?,?)';
    await connection.query(query, [data.name, data.lastname, data.day, data.month, data.year, data.username, data.password, 0, '']);
}

export const getImageU = async(data) =>{
    console.log(data)
    const query = `UPDATE users SET image=? where id=?`;
    await connection.query(query, [data.url, data.id])
}

export const setConnect = async(values={}) =>{
    const query = 'UPDATE users SET connected=? WHERE id=?';
    await connection.query(query, [values.value, values.id]) 
}

export const saveM = async(data={}) =>{
    //console.log(data)
    const query = `SELECT * FROM chatusers WHERE username1=? AND username2=? OR username1=? AND username2=?`;
    const [usersChat] = await connection.query(query, [data.user1, data.user2, data.user2, data.user1])
    console.log(usersChat)
    if(usersChat.length === 0){
        const query = `INSERT INTO chatusers(username1, username2, messagesUser1, messagesUser2) values(?,?,?,?)`;
        await connection.query(query, [data.user1, data.user2, data.msg1,''])
    }else{
        const chat = usersChat[0].messagesUser1.concat(' '+data.msg1)
        console.log(chat)
        const query = `UPDATE chatusers SET messagesUser1=? WHERE id=?`;
        await connection.query(query, [chat, usersChat[0].id])
    }
}

export const getM = async(data) =>{
    const query = `SELECT * FROM chatusers WHERE username1=? AND username2=? OR username1=? AND username2=?`;
    const [chat] = await connection.query(query, [data.user1, data.user2, data.user2, data.user1])
    return(chat)
}