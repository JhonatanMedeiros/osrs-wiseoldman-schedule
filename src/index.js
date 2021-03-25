const cron = require('node-cron');
const axios = require('axios');

const API_PATH = "https://wiseoldman.net/api/players/track/"
const PLAYERS = ["ChokitoSLA", "vira51", "Nilton", "Bittencourt"]

const trackPlayer = async (username) => {
    console.log(`Track player ${username}`)
    try {
        await axios.post(API_PATH, { username });
        console.log(`Success tracker player ${username}!!`);
    } catch (error) {
        console.log(`Error to track the player: ${username}`);
        if (error.response) {
            try {
                console.log(JSON.parse(error.response.data));
            } catch (e) {
                console.log(e);
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }
}

const init = async () => {

    cron.schedule('* * * * *', () => {
        console.log('Job Started...', new Date().toISOString());

        (async function() {
            console.log('Request track the players', new Date().toISOString())
            for (let player of PLAYERS) {
                await trackPlayer(player);
            }
            console.log('Finished Request track players', new Date().toISOString())
        })();

    }, null);

}


(async () => {
    console.log('Start Application');
   await init();
})()
