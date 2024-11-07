import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Por favor proporcione un nombre de usuario único"],
        unique: [true, "El nombre de usuario existe"]
    },
    password: {
        type: String,
        required: [true, "Por favor proporcione una contraseña"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Por favor proporcione un correo electrónico único"],
        unique: true,
    },
    firstName: { type: String},
    lastName: { type: String},
    mobile : { type : Number},
    address: { type: String},
    profile: { type: String}
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);