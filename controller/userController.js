// const userModel=require("../model/userModel")

// const jwt=require("jsonwebtoken")

// const userController=async(req,res)=>{

//         try {
//             const { name, email, password, address, latitude, longitude,status } = req.body;

//             if(await userModel.findOne({email})){
//                 return res.status(400).send({
//                     status_code: 400,
//                     error: "Email already exists"
//                 });
//             }

//             const newUser = await userModel.create({ 
//                 name, email, password, address, latitude, longitude,
//                 ...(status ? { status } : {})
//             });
//             await newUser.save();

//             let token=jwt.sign({
//                 exp: Math.floor(Date.now() / 1000) + (60 * 60),
//                 data:newUser
//             },"AzQ,PI)0")

//             console.log("jwt--------",token);

//             res.status(201).send({
//                 status_code: 201,
//                 message: 'User created successfully',
//                 data: {
//                     name,
//                     email,
//                     address,
//                     latitude,
//                     longitude,
//                     status: newUser.status,
//                     register_at: newUser.register_at,
//                     token
//                 }

//             });
//         } catch (error) {
//             res.status(500).send({ 
//                 status_code: 500, 
//                 message:"Internal Server Error",
//                 error:error.message
//              });
//         }
// }
// module.exports=userController



const userModel = require("../model/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userController = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (await userModel.findOne({ email })) {
            return res.status(400).send({
                status_code: 400,
                error: "Email already exists"
            });
        }

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(req.body.email);

        if (isValidEmail === false) {
            console.log("email is not correct");
            throw new Error("Please write correct email id")
        }

        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{8,}$/;
        let newPassword = password
        let verifyPassword = passwordRegex.test(newPassword)

        if (!verifyPassword) {
            return res.status(400).send({
                status_code: 400,
                error: "Password does not meet the complexity requirements"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword-----", hashedPassword);


        // passwordRegex.test(password);
        const newUser = await userModel.create({
            name, email, password: hashedPassword
        });

        let token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: newUser
        }, "AzQ,PI)0")

        console.log("jwt--------", token);

        res.status(201).send({
            status_code: 201,
            message: 'User created successfully',
            data: [
                {
                    token,
                    newUser
                }
            ]
        });
    } catch (error) {
        res.status(500).send({
            status_code: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
}
module.exports = userController