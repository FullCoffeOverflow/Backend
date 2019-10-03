import mongoose, { Schema, Document } from 'mongoose';

export interface IExample extends Document {
    firstName: string,
    lastName: string,
    email: string,
    company: string,
    phone: number,
    created_date: Date
}

const ExampleSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String            
    },
    company: {
        type: String            
    },
    phone: {
        type: Number            
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IExample>('Example', ExampleSchema);
