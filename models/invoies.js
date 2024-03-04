import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    invoice_number: { type: String, required: true },
    date_added: { type: Date, default: Date.now },
    total_value: { type: Number, required: true },
    client_name: { type: String, required: true }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export { Invoice };