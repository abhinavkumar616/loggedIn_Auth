const userModel = require('../model/userModel');

const getDataByDay = async (req, res) => {
    try {
        // Extract the day numbers from the request query
        const dayNumbers = req.query.week_number.split(',').map(Number); // Convert string to array of numbers

        // Define the week_number array
        const week_number = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Create an object to store data for each day
        const data = {};

        // Loop through each day number
        for (const dayNumber of dayNumbers) {
            // Check if the day number is within the valid range
            if (dayNumber >= 0 && dayNumber < week_number.length) {
                // Get the corresponding day name
                const dayName = week_number[dayNumber];

                // Query the database to find users registered on the specified day
                const users = await userModel.find({ "register_at.day": dayName }).select('name email');

                // Add the data to the response object
                data[dayName.toLowerCase()] = users;
            } else {
                // Day number is out of range, add a message to the response object
                data[`out_of_range_${dayNumber}`] = "Day number is out of range";
            }
        }

        // Return the response
        res.status(200).json({
            status_code: 200,
            message: "Data for the specified week_number",
            data: data
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({
            status_code: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = getDataByDay;
