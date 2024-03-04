import { validationResult } from 'express-validator'
import ApiError from "../error/apiError.js";
import { addInvoiceDb } from '../respositories/invoice.collection.js';

async function addInvoice(request) {
    const result = await addInvoiceDb(request);
    return result;
}

export { addInvoice }