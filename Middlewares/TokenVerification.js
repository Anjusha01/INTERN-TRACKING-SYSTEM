import jwt from 'jsonwebtoken'

const verifyToken=(req,res,next)=>{
    const authHeader= req.headers.authorization;
    if(!authHeader){
        return res.status(401).json('Access denied token is not provided')
    }
    const token= authHeader.split(' ')[1];

    try {
        const response = jwt.verify(token, 'abc'); // Use the same secret key
        req.user = response;
        next();
    } catch (e) {
        res.status(401).json('Invalid token.');
        console.log(e.message, 'error');
    }
}

export default verifyToken;