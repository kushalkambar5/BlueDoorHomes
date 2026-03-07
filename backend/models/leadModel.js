import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    property_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Property"
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    budget:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["new","contacted","visit_done","closed","not_interested"],
        required:true,
        default:"new"
    }
}, {
    timestamps: true
});

export default mongoose.model("Lead", leadSchema);
