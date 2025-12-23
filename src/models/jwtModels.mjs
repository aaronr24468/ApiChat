import mysql from 'mysql2/promise';
import {config} from 'dotenv'
config();

const connection = await mysql.createConnection({
    host: `${process.env.HOST}`,
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DB}`
});

export const getUser = async(data={}) =>{
    const queryD = [];
    if(data.username){
        for(let key in data){
            queryD.push(`${key}=?`);
        }
    }
    const query = `SELECT * FROM users WHERE ${queryD.join(' AND ')}`;
    const [user] = await connection.query(query, [data.username, data.password]);
    //console.log(user)
    return(user)    
} 