import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    
},
{
    timestamps: true
}
)

export default mongoose.model("Product", productSchema)