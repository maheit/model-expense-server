import mongoose from 'mongoose';
export default () => {
  const { Schema } = mongoose;
  const userAccount = new Schema({
    _id: Schema.Types.ObjectId,
    googleId: String,
    name: String,
    email: String,
    photos: { type: Array, default: [] },
    // gender: String,
    provider: String,
    // dob: Date,
    createdDate: Date,
  });

  mongoose.model('user-accounts', userAccount);
};
