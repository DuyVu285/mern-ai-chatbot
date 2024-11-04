import { body, ValidationChain, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    console.log("Request Body:", req.body); // Log request body
    console.log("Validation Errors:", errors.array()); // Log errors
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
  