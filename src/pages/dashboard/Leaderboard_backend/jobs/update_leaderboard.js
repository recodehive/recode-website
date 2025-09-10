const schedule = require('node-schedule');
const { generateOrgLeaderboard } = require("../functions/org_leaderboard");



function updateOrgLeaderboardJob() {
    // Cron format: second, minute, hour, day of month, month, day of week
    // This runs every day at 00:00:00 (midnight)
    schedule.scheduleJob('0 0 0 * * *', async function () {
        console.log("========");
        console.log("Starting leaderboard update job...");
        console.log("========");

        try {
            await generateOrgLeaderboard();
            console.log("Leaderboard updated successfully!");
        } catch (err) {
            console.error("Leaderboard update failed:", err.message);
        }
    });
}

module.exports.updateOrgLeaderboardJob = updateOrgLeaderboardJob;
