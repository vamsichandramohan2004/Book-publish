import express from 'express';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const router = express.Router();

// Generate a JWT token
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Middleware to protect routes
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);

        if (!currentUser) {
            return res.status(401).json({ message: 'The user belonging to this token no longer exists.' });
        }

        req.user = currentUser;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token. Please log in again.' });
    }
};

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({ username, email, password });
        const token = signToken(newUser._id);
        res.status(201).json({
            status: 'success',
            token,
            data: { user: newUser },
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Login Route (POST request)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        const token = signToken(user._id);
        res.status(200).json({ status: 'success', token, data: { user } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Get current user route (GET request, protected)
router.get('/me', protect, (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: req.user,
        },
    });
});

// Logout route (GET request)
router.get('/logout', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: null,
        message: 'Logged out successfully'
    });
});

export default router;
