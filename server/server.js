import express from "express"
import "dotenv/config"
import cors  from "cors"
import connectDb from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRouters.js";

const app = express();

await connectDb();

// Middlewares
// app.use(cors())


app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json())

// Routes
app.get ("/",(req,res)=>{
    res.send("this is the godFather")
})
app.use("/api/admin",adminRouter)
app.use("/api/blog",blogRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("server is running on the Port :",PORT)
});

export default app;