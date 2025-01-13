"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmailInput = void 0;
const zod_1 = require("zod");
const emailValidationSchema = zod_1.z.object({
    to: zod_1.z.array(zod_1.z.string().email()),
    cc: zod_1.z.array(zod_1.z.string().email()).optional(),
    bcc: zod_1.z.array(zod_1.z.string().email()).optional(),
    subject: zod_1.z.string().min(1, { message: "Subject must be a non-empty string." }),
    body: zod_1.z.string().min(1, { message: "Body must be a non-empty string." }),
});
const validateEmailInput = (params) => {
    try {
        emailValidationSchema.parse(params);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            throw new Error(error.errors.map(e => e.message).join(', '));
        }
        throw error;
    }
};
exports.validateEmailInput = validateEmailInput;
