import express from "express";
import {createServer} from 'http';
import { expressjwt } from "express-jwt";
import morgan from "morgan";
import {dirname, join} from 'path';
import { fileURLToPath } from "url";
import cors from 'cors'
import { router as jwtRouter } from "./routes/jwtRoutes.mjs";
import { router as routerInfo } from "./routes/Routes.mjs";
import { router as registerRouter } from "./routes/RegisterRouter.mjs";
import { initWebSocket } from "./webSocket.mjs";
import cookieParser from "cookie-parser";
import {config} from "dotenv";
config();

const port = process.env.PORT || 9000

const app = express();
const server = createServer(app)

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(dirname(fileURLToPath(import.meta.url)))); 


app.use('/register', registerRouter)

app.use('/login', jwtRouter);  

app.use('/chat/v1', expressjwt({secret: 'secret', algorithms: ['HS256'], getToken: (req) => req.cookies.chatToken}), routerInfo);

// app.get('/', (request, response) =>{
//     response.redirect('/login');
// });

app.use((err, request, response, next) =>{
    if(err.name === "UnauthorizedError"){
       response.status(401).json("Unauthorized");
    }else{
        next();
    }
}); 

initWebSocket(server);

server.listen(8080, () =>{
    console.log(`Listening to the http://localhost:${port}`);
})