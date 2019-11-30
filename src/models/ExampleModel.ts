import mongoose, { Schema, Document } from 'mongoose';

export interface ExampleModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: number;
    createdDate: Date;
}

const ExampleSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name',
    },
    lastName: {
        type: String,
        required: 'Enter a last name',
    },
    email: {
        type: String,
    },
    company: {
        type: String,
    },
    phone: {
        type: Number,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<ExampleModel>('Example', ExampleSchema);
