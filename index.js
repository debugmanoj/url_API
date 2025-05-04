import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import routeIndex from "./src/routes/routeIndex.js"
dotenv.config()
const app = express();
const PORT=process.env.PORT
app.use(cors());
app.use(express.json());

app.use("/",routeIndex)

app.listen(PORT, ()=>{
	console.log('Express app running on port ' + (process.env.PORT))
});
