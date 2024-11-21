import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required!"),
    body("email").isEmail().withMessage("Email is required!"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should contain at least 6 characters!"),
];
export const loginValidator = [
    body("email").isEmail().withMessage("Email is required!"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should contain at least 6 characters!"),
];
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required!"),
];
//# sourceMappingURL=validators.js.map