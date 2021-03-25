const cron = require('node-cron');
const trackPlayer = require('./trackPlayer');

const PLAYERS = ["ChokitoSLA", "vira51", "Nilton", "Bittencourt"]

const init = async () => {
    console.log('Init Application', new Date().toISOString());

    let cronRunning = false;

    cron.schedule('* * * * *', async () => {

        console.log('Started cron job...', new Date().toISOString())

        if (cronRunning) {
            console.log('The Cron Job is running.', new Date().toISOString())
            return;
        }

        console.log(`Started players track: ${PLAYERS}`, new Date().toISOString())

        const promises = [];

        for (let player of PLAYERS) {
            promises.push(trackPlayer(player))
        }

        await Promise.all(promises)

        cronRunning = false

        console.log('Finished Request track players', new Date().toISOString())

    }, null);
}

(async () => await init())()
