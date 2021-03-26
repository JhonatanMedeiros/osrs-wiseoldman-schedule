const cron = require('node-cron');
const trackPlayer = require('./trackPlayer');
const { dateIsExpired } = require('./utils');

const PLAYERS = ["ChokitoSLA", "vira51", "Nilton", "Mateuss"]

const init = async () => {
    console.log('Init Application', new Date().toISOString());

    let cronRunning = false;
    let lastUpdated = null;

    cron.schedule('* * * * *', async () => {

        console.log('Started cron job...', new Date().toISOString())

        if (cronRunning) {
            console.log('The Cron Job is running.', new Date().toISOString())
            return;
        }

        if (lastUpdated && !dateIsExpired(lastUpdated, '60')) {
            console.log(`Updated too recently in ${lastUpdated.toISOString()}`)
            return;
        }

        console.log(`Started players track: ${PLAYERS}`, new Date().toISOString())

        const promises = [];

        for (let player of PLAYERS) {
            promises.push(trackPlayer(player))
        }

        await Promise.all(promises)

        lastUpdated = new Date();

        cronRunning = false

        console.log('Finished Request track players', lastUpdated.toISOString())

    }, null);
}

(async () => await init())()
