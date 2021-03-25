const dateIsExpired = (date, expiresSec) => {
    const nowTime = new Date();
    const startTime = new Date(date);
    let timeDiff = Math.abs(nowTime.getTime() - startTime.getTime());

    timeDiff /= 1000;

    // get seconds
    const seconds = Math.round(timeDiff);
    return seconds > expiresSec;
};

module.exports = {
    dateIsExpired
};
