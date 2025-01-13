import mongoose, { Document, Schema } from 'mongoose';

export interface BalanceDocument extends Document {
  address: string;
  balance: string;
  blockNumber: number;
  gasPrice: string;
}

const BalanceSchema: Schema = new Schema({
  address: { type: String, required: true, unique: true },
  balance: { type: String, required: true },
  blockNumber: { type: Number, required: true },
  gasPrice: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<BalanceDocument>('Balance', BalanceSchema);
