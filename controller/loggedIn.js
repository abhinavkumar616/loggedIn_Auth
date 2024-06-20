const express = require('express');
const userModel = require('./models/user'); // Assuming userModel is exported from this path
const bcrypt = require('bcrypt'); // Assuming you're using bcrypt for password hashing

const app = express();

app.use(express.json());

app.post('/login', async (req, res) => {
    const { nameOrMobile, password } = req.body;

    try {
        // Find user by either name or mobile
        const user = await userModel.findOne({
            $or: [{ name: nameOrMobile }, { mobile: nameOrMobile }]
        });

        if (!user) {
            return res.status(400).send({
                status_code: 400,
                error: "User not found"
            });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send({
                status_code: 400,
                error: "Invalid password"
            });
        }

        // Generate a token (JWT or any other method)
        // Assuming you have a method to generate a token
        const token = generateToken(user); // Implement generateToken method according to your needs

        res.status(200).send({
            status_code: 200,
            message: "Login successful",
            token,
            user: {
                name: user.name,
                email: user.email,
                mobile: user.mobile
            }
        });

    } catch (error) {
        res.status(500).send({
            status_code: 500,
            error: "Internal server error"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
