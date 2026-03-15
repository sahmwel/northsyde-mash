import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import generateToken from '../utils/generateToken.js';

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, discipline} = req.body;
        const portfolioFile = req.file;

        //Validation
        if (!name|| !email|| !password|| !confirmPassword|| !discipline) {
            return res.status(400).json({ error: 'Please provide name, emmail, password confirm password, and discipline'});
        }

         if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Password do not match'});
        }

        const allowedDisciplines = ['MUSIC', 'SPORTS', 'FASHION', 'TECH', 'OTHER'];
         if (!allowedDisciplines.includes(discipline)) {
            return res.status(400).json({ error: 'Invalid discipline value'});
        }

        const userExists = await prisma.user.findUnique({ where: { email}});
         if (userExists) {
            return res.status(400).json({ error: 'User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let portfolioPath = null;
        if (portfolioFile) {
            portfolioPath = `/uploads/${portfolioFile.filename}`;}

            const user = await prisma.user.create({ data:{
                name,
                email,
                password: hashedPassword,
                portfolio: portfolioPath,
                discipline,
                role: 'USER'
            }
        });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            discipline: user.discipline,
            role: user.role,
            token: generateToken(user.id, user.role)
        });
    }catch (error) {
        res.status(500).json({ error: error.message});
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } =req.body;

        const user = await prisma.user.findUnique({ where: { email}});
         if (user && (await bcrypt.compare(password, user.password))) { res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            portfolio: user.portfolio,
            discipline: user.discipline,
            role: user.role,
            token: generateToken(user.id, user.role)
         });
        } else {
            res.status(401).json({ error: 'Invalid email or password'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id:req.user.id}, select: {id: true, name:true, email: true, portfolio: true, discipline: true, role: true}
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};