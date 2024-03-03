import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String },
    address: { type: String },
    city: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export { User };