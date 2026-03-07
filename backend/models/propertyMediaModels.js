import mongoose from "mongoose";

const propertyMediaSchema = new mongoose.Schema({
    property_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Property"
    },
    type:{
        type:String,
        enum:["image","video"],
        required:true
    },
    url:{
        type:String,
        required:true
    },
    public_id:{
        type:String,
        required:true
    },
    is_primary:{
        type:Boolean,
        default:false
    },
    order:{
        type:Number,
        default:0
    }
}, {
    timestamps: true
});

export default mongoose.model("PropertyMedia", propertyMediaSchema);