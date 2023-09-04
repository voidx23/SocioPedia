import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js"

/*REGISTER USER */

export const adminRegister = async (req,res) => {
    console.log("reached");
    try{

        const {

            firstName,
            lastName,
            email,
            password,
            picturePath,
            location,
            occupation

        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({

            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            location,
            occupation,
           
        })

        const savedAdmin = await newAdmin.save(); 
        res.status(201).json(savedAdmin);


    } catch(err){

        res.status(500).json({error: err.message});


    }
};

/* LOGGING IN */

export const adminLogin = async (req, res) =>{
    try {

        const { email, password} =req.body;
        const user = await Admin.findOne({email:email})
        if(!user) return  res.status(400).json({msg:"user does not exist"})

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg:"invalid Credentials"});

        const adminToken = jwt.sign({ id:user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ adminToken, user });

        
    } catch (err) {
        res.status(500).json({error:err.message})
        
    }
};

