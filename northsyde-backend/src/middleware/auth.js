import jwt from "jsonwebtoken";
import { prisma } from '../../prisma.js';  // two levels up to project root


export const protect = async (req, res, nest) => {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user =await prisma.user.findUnique({
                where: { id: decoded.id },
                select: { id: true, name: true, email: true, role: true}
            });

            if (!req.user) {
                return res.status(401).json({ error: 'Not authorized'});
            }

            next();
        } catch (error) {
            return res.status(401).json({ error: 'Not authorized, token failed'});
        }
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized, no token'});
    }
};


export const admin = (req,res,next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else{
        res.status(403).json({ error: 'Not authorized ad admin'});
    }
};