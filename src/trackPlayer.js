const axios = require('axios');

const API_PATH = "https://wiseoldman.net/api/players/track/"

const trackPlayer = async (username) => {
    console.log(`Track player ${username}`, new Date().toISOString())
    try {
        await axios.post(API_PATH, { username });
        console.log(`Success tracker player: ${username}`, new Date().toISOString());
    } catch (error) {
        console.log(`Error to track the player: ${username}`, new Date().toISOString());
        if (error.response) {
            const data = error.response.data
            console.log(data && data.message ? data.message : data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
}

module.exports = trackPlayer;
