import { validationResult } from 'express-validator'
import ApiError from "../error/apiError.js";
import { addInvoiceDb,  getInvoicesDb, removeInvoiceDb, updateInvoiceDb } from '../respositories/invoice.collection.js';

async function addInvoice(request) {
    const error = validationResult(request)
    if (!error.isEmpty()) {
        error.array().forEach(err => {
          throw new ApiError(err.msg, 400)
        })
      }
    const result = await addInvoiceDb(request);
    return result;
}

async function showInvoices(request) {
    const result = await getInvoicesDb(request);
    return result;
}

async function removeInvoice(request) {
    const result = await removeInvoiceDb(request);
    return result;
}

async function  updateInvoice(request) {
  const error = validationResult(request)
    if (!error.isEmpty()) {
        error.array().forEach(err => {
          throw new ApiError(err.msg, 400)
        })
      }
    const result = await updateInvoiceDb(request);
    return result;
}
export { addInvoice, showInvoices, removeInvoice, updateInvoice }