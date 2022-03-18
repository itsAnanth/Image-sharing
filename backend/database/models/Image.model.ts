import mongoose from 'mongoose';
import crypto from 'crypto';

const ImageSchema = new mongoose.Schema({
    title: {
        type: String,
        default: crypto.randomBytes(16).toString('hex')
    },
    created: {
        type: Date,
        default: Date.now
    },
    image: {
        type: Buffer,
    },
    contentType: {
        type: String,
        default: 'img/png'
    }
});

export default mongoose.model('Image', ImageSchema);