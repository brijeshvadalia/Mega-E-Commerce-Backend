import Mongoose  from "mongoose";

const couponSchema = new Mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, 'Please provide a coupon name']
        },
        discount: {
            type: Number,
            default: 0
        },
        active: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps : true
    }
)

export default Mongoose.model("Coupon",couponSchema)