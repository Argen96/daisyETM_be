async function formatDate(invoices) {
    const formattedInvoices = invoices.map(invoice => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = new Date(invoice.date_added).toLocaleString(undefined, options);
        return {
            ...invoice._doc,
            date_added: formattedDate
        };
    });
    return formattedInvoices;
}

async function totalValues(invoices) {
    const totalValues = invoices.reduce((total, invoice) => total + invoice.total_value, 0);
    return totalValues;
}


export { formatDate, totalValues };
