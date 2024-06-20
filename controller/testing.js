const haversine = require('haversine-distance');

const metersToKilometers = (meters) => Math.round(meters / 1000);

const testing = async (req, res) => {
    try {
        console.log("hello-----");
        const distanceInMeters = haversine(
            { latitude: 25.5941, longitude: 85.1376 },
            { latitude: 24.7914, longitude: 85.0002 }
        );
        // { latitude: 28.535517, longitude: 77.391029 },
        // { latitude: 18.5204, longitude: 73.8567 }
        console.log("distanceInMeters", distanceInMeters); // distance in meters

        const distanceInKilometers = metersToKilometers(distanceInMeters);
        console.log("distanceInKilometers", distanceInKilometers); // distance in kilometers

        return;
    } catch (error) {
        // Handle error
    }
}

module.exports = testing;
