import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Intern from '../Models/Interns.js';
import Trainer from '../Models/Trainers.js';
import User from '../Models/Users.js';

const SALT_ROUNDS = 10;

export const trainerRegisterAuth = async (req, res) => {
    try {
        const { name, username, password, email, photo, confirmPassword, dateJoined, specialization } = req.body;
        if (!name || !username || !password || !email || !confirmPassword || !dateJoined || !specialization) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'This email id is already registered with us' });
            } else if (existingUser.username === username) {
                return res.status(400).json({ error: 'This username already exists' });
            }
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match.' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        
        const newTrainer = new Trainer({ ...req.body, password: hashedPassword });
        const trainerResponse = await newTrainer.save();

        const newUser = new User({
            username:username,
            email:email,
            password: hashedPassword,
            userType: 'trainer',
            profileId: trainerResponse._id,
            isApproved: false,
        });

        await newUser.save();

        res.json(trainerResponse);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const internRegisterAuth = async (req, res) => {
    try {
        const { name, username, password, email, photo, confirmPassword, dateJoined, course } = req.body;
        if (!name || !username || !password || !email || !confirmPassword || !dateJoined || !course) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'This email id is already registered with us' });
            } else if (existingUser.username === username) {
                return res.status(400).json({ error: 'This username already exists' });
            }
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match.' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newIntern = new Intern({ ...req.body, password: hashedPassword });
        const internResponse = await newIntern.save();

        const newUser = new User({
            username:username,
            email:email,
            password: hashedPassword,
            userType: 'intern',
            profileId: internResponse._id,
            isApproved: false,
        });

        await newUser.save();

        res.json(internResponse);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const adminRegisterAuth = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'This email id is already registered with us' });
            } else if (existingUser.username === username) {
                return res.status(400).json({ error: 'This username already exists' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newAdmin = new User({ username, email, password: hashedPassword, userType: 'Admin' });
        const adminResponse = await newAdmin.save();
        res.json(adminResponse);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const authLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json("Username and password are required.");
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json("User not found.");
        }

        if (!user.isApproved) {
            return res.status(403).json("Your account is awaiting approval from the admin.");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json("Invalid username or password.");
        }

        const token = jwt.sign({ id: user._id, username: user.username }, 'abc', { expiresIn: '1h' });

        res.json({
            userType: user.userType,
            token: token,
            username: user.username,
            profileId: user.profileId,
            id:user._id
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const tokenAuth = async (req, res) => {
    try {
        let id = req.params.id;
        let users = await User.find({ id });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
