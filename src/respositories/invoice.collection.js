import { connect } from "../../db.js";
import { Invoice } from "../../models/invoices.js";

async function addInvoiceDb(request) {
    await connect();
    const data = { ...request.body, user_id: request.user.userId }
     const newInvoice = await Invoice.create(data);
    return newInvoice
}

export { addInvoiceDb }