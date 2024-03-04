import { check } from 'express-validator'

const validateInvoice = [
    check('invoice_number').notEmpty().withMessage('Invoice number is required')
        .isLength({ max: 80 }).withMessage('Invoice number must not exceed 80 characters'),
    check('total_value').notEmpty().withMessage('Total value is required')
        .isNumeric().withMessage('Total value must be a number'),
    check('client_name').notEmpty().withMessage('Client name is required')
        .isLength({ max: 80 }).withMessage('Client name must not exceed 80 characters')
];

export {  validateInvoice }