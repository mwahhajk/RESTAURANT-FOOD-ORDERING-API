import mongoose from "mongoose";

export const connectDB=()=>{
    mongoose.connect("mongodb://localhost:27017/",{dbName:"RESTAURANT_FOOD_ORDER_API"})
    .then(()=>{console.log("DB Connected");
    })
    .catch((err)=>{console.log(err);
    })
}