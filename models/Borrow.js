import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    bookId:{type:mongoose.Schema.Types.ObjectId, ref:"Book"},
    borrowAt:{type:Date,default:Date.now},
    returnedAt:{type:Date,default:null}
})

const Borrow = mongoose.model("Borrow",borrowSchema)

export default Borrow