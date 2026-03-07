import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    description: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    price_per_sqft: {
        type:Number,
        required:true
    },
    area_sqft: {
        type:Number,
        required:true
    },
    location: {
        city: {
            type:String,
            required:true
        },
        locality: {
            type:String,
            required:true
        },
        address: {
            type:String,
            required:true
        },
        geo: {
            type: String,
            coordinates: [Number]
        }
    },
    property_type: {
        type:String,
        required:true
    },
    status: {
        type:String,
        required:true,
        enum:["available","sold","negotiation"],
        default:"available"
    },
    tags:[String],
    media_ids:[String],
    brochure_url:{
        type:String,
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {
    timestamps: true
});

propertySchema.index({ "location.geo": "2dsphere" });

export default mongoose.model("Property", propertySchema);
