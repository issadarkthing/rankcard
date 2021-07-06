import canvacord from "../src/index";

const img = "https://cdn.discordapp.com/embed/avatars/0.png";
const bg = "https://cdn.discordapp.com/attachments/852546444086214676/860430326946070558/image0.jpg"

const rank = new canvacord.Rank()
    .setAvatar(img)
    .setCurrentXP(50)
    .setRequiredXP(360)
    .setStatus("dnd")
    .setOverlay("#000", 0.3)
    .setProgressBar("#ff0800", "COLOR", false)
    .setUsername("Snowflake Game Master Foul Master")
    .setBackground("COLOR", "#2a2e35")
    .setBronze(5)
    .setSilver(4)

rank.build().then(data => { 
  canvacord.write(data, "RankCard.png"); 
});
