import Intern from '../Models/Interns.js';
import Trainer from '../Models/Trainers.js';
import User from '../Models/Users.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const SALT_ROUNDS=10;

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

        let hashedPassword= await bcrypt.hash(password,SALT_ROUNDS)
        let newTrainer = new Trainer({...req.body,password:hashedPassword});
        const trainerResponse = await newTrainer.save();


        let newUser = new User({ ...req.body, userType: 'trainer', password:hashedPassword});
        let userResponse = await newUser.save();

        res.json(trainerResponse);

    } catch (e) {
        res.status(500).json({ error: e.message });
        console.log(e.message);
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

        let hashedPassword= await bcrypt.hash(password,SALT_ROUNDS)
        let newIntern = new Intern({...req.body,password:hashedPassword});
        const internResponse = await newIntern.save();


        let newUser = new User({ ...req.body, userType: 'intern', password:hashedPassword});
        let userResponse = await newUser.save();

        res.json(internResponse);

    } catch (e) {
        res.status(500).json({ error: e.message });
        console.log(e.message);
    }
};




export const adminRegisterAuth = async (req, res) => {

    try {
        const{username,password,email}=req.body

        if (!username || !password || !email ) {
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

        const hashedPassword= await bcrypt.hash(password,SALT_ROUNDS)

        let newAdmin = new User({ username, email, password: hashedPassword,userType: 'admin' });
        const adminResponse = await newAdmin.save();
        res.json(adminResponse)

    } catch (e) {
        res.status(500).json({ error: e.message });
        console.log(e.message);
    }
};


export const authLogin= async(req,res)=>{
    try{
        const{username,password}=req.body
        if( !username || !password){
            return res.status(400).json("Email and passwords required")
        }
            const user = await User.findOne({  username });
            if(!user){
                return res.status(401).json("User not found")

            }
            if (!user.isApproved) {
                return res.status(403).json("Your account is awaiting approval from the admin");
            }    
            const validPassword= await bcrypt.compare(password,user.password)
            if(!validPassword){
                return res.status(500).json('Invalid username or password')
            }
            const token=jwt.sign({id:user._id, username:user.username},'abc',{expiresIn:'1h'})
            res.json({ userType: user.userType, token: token, username:user.username});
// res.json({user,token})
    }
    catch(e){
        res.status(500).json(e.message);
    }
}


export const tokenAuth = async (req, res) => {
    console.log("WELCOME");

    try {
        let username = req.params.username;
        console.log(username);
        let users = await User.find({ username: username });
        console.log(users);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
