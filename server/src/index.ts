import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET must be defined");
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");
    if (!process.env.MONGO_PASSWORD)
        throw new Error("MONGO_PASSWORD must be defined");

    await mongoose.connect(
        process.env.MONGO_URI.replace("<password>", process.env.MONGO_PASSWORD),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    );
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
};

start();

//color #ff8787 #33255e
