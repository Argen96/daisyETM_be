import { connect } from "../../db.js";
import { Invoice } from "../../models/invoices.js";
import ApiError from "../error/apiError.js";

async function addInvoiceDb(request) {
    try {
        await connect();
        const data = { ...request.body, user_id: request.user.userId };
        const newInvoice = await Invoice.create(data);
        return newInvoice;
    } catch (error) {
        throw new ApiError(error.message, error.status);
    }
}

async function getInvoicesDb(request) {
    try {
        await connect();
        const user_id = request.user.userId;
        const invoices = await Invoice.find({ user_id });
        return invoices;
    } catch (error) {
        throw new ApiError(error.message, error.status);
    }
}

async function removeInvoiceDb(request) {
    try {
        await connect();
        const idInvoice = request.params.id;
        const user_id = request.user.userId;
        const deletedInvoice = await Invoice.findOneAndDelete({ _id: idInvoice, user_id });
        if (!deletedInvoice) throw new ApiError("Invoice not found", 404);
        return deletedInvoice;
    } catch (error) {
        throw new ApiError(error.message, error.status);
    }
}

async function updateInvoiceDb(request) {
    try {
        await connect();
        const newData = request.body
        const idInvoice = request.params.id;
        const user_id = request.user.userId;
        const updatedInvoice = await Invoice.findOneAndUpdate(
            { _id: idInvoice, user_id },
            newData,
            { new: true }
        );
     if (!updatedInvoice) throw new ApiError("Invoice not found", 404);
        return updatedInvoice;
    } catch (error) {
        throw new ApiError(error.message, error.status);
    }
}

export { addInvoiceDb, getInvoicesDb, removeInvoiceDb, updateInvoiceDb }