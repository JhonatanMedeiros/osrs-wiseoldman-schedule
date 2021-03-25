const cron = require('node-cron');
const axios = require('axios');

const API_PATH = "https://wiseoldman.net/api/players/track/"
const PLAYERS = ["ChokitoSLA", "vira51", "Nilton", "Bittencourt"]

const trackPlayer = async (username) => {
    console.log(`Track player ${username}`)
    try {
        const { data } = await axios.post(API_PATH, { username });
        console.log(`Success tracker player ${username}!!`, data);
    } catch (e) {
        console.log(`Error to track the player: ${username}`, e);
    }
}

const init = async () => {

    cron.schedule('* 2 * * *', () => {
        console.log('running a task every minute');
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
