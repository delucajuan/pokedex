import { Request, Response, NextFunction } from 'express';
import { check, ValidationChain, validationResult } from 'express-validator';
import { HttpError } from '../types/types';

// Validation for allowed parameters
export const validateAllowedParams = (allowedParams: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const keys = Object.keys(req.query);
    const invalidParams = keys.filter((key) => !allowedParams.includes(key));

    if (invalidParams.length > 0) {
      const error: HttpError = new Error(
        `Invalid parameters: ${invalidParams.join(
          ', '
        )}. Only ${allowedParams.join(', ')} are allowed.`
      );
      error.status = 400;
      return next(error);
    }
    next();
  };
};

// Validation for query values
export const validatePokemonQuery: ValidationChain[] = [
  check('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be an integer between 1 and 100'),
  check('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  check('name')
    .optional()
    .notEmpty()
    .isString()
    .withMessage('Name must be a string'),
  check('type')
    .optional()
    .notEmpty()
    .isString()
    .withMessage('Type must be a string'),
];

export const handleValidationErrors = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: HttpError = new Error('Invalid parameters');
    error.status = 400;
    error.cause = errors.array();

    return next(error);
  }
  next();
};
