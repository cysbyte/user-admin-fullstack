import express from 'express';
import * as UserController from '../controllers/auth';
import { body, validationResult, check } from "express-validator";
import { User } from '../models/user';

const router = express.Router();

const signupValidationMiddleware =
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({ where: { email: value } }).then((user: any) => {
                    if (user) {
                        return Promise.reject('E-Mail address already exists!');
                    }
                });
            })
            .normalizeEmail(),
    
        body('password').trim()
            // Check if the password is present
    
            .notEmpty().withMessage('Password is required')
    
            // Check if the password contains at least one lowercase character
            .matches(/[a-z]/).withMessage('Password must contain at least one lowercase character')
    
            // Check if the password contains at least one uppercase character
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase character')
    
            // Check if the password contains at least one digit character
            .matches(/\d/).withMessage('Password must contain at least one digit')
    
            // Check if the password contains at least one special character
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')
    
            // Check if the password contains at least 8 characters
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ];

const loginValidationMiddleware =
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({ where: { email: value } }).then((user: any) => {
                    if (!user) {
                        return Promise.reject('Invalid email address or password');
                    }
                });
            })
            .normalizeEmail(),
    
        body('password').trim()
            // Check if the password is present
    
            .notEmpty().withMessage('Password is required')
    
            // Check if the password contains at least one lowercase character
            .matches(/[a-z]/).withMessage('Password must contain at least one lowercase character')
    
            // Check if the password contains at least one uppercase character
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase character')
    
            // Check if the password contains at least one digit character
            .matches(/\d/).withMessage('Password must contain at least one digit')
    
            // Check if the password contains at least one special character
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')
    
            // Check if the password contains at least 8 characters
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ];

const resetValidationMiddleware =
    [
        body('password').trim()
            // Check if the password is present
    
            .notEmpty().withMessage('Password is required')
    
            // Check if the password contains at least one lowercase character
            .matches(/[a-z]/).withMessage('Password must contain at least one lowercase character')
    
            // Check if the password contains at least one uppercase character
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase character')
    
            // Check if the password contains at least one digit character
            .matches(/\d/).withMessage('Password must contain at least one digit')
    
            // Check if the password contains at least one special character
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')
    
            // Check if the password contains at least 8 characters
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

        body('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords have to match');
                }
            }),
    ];

router.get('/', UserController.getAuthenticatedUser);

router.post('/signup', signupValidationMiddleware, UserController.signUp);

router.post('/login', loginValidationMiddleware, UserController.login);

router.post('/logout', resetValidationMiddleware, UserController.logout);

export default router;