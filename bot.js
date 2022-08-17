const { token } = require("./config.js");
const { Client, Intents } = require("discord.js");
const Verify = require("./bot-verify");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

const GUILD_ID = "973217943536164956";
const ROLE_GOOD_ID = "1006957652720492574";
const MEMBER_ID = "236041077134458881";
const CHANNEL_ID = "1009448326292308088";
client.once("ready", async () => {
  console.log(`Ready!`);

  const guild = client.guilds.cache.get(GUILD_ID);
  const channel = guild.channels.cache.get(CHANNEL_ID);
  //   console.log("channel", channel);
  const role = guild.roles.cache.get(ROLE_GOOD_ID);
  const member = await guild.members.fetch(MEMBER_ID);
  //   console.log("member", member);
  member.roles.add(role);
  //   member.roles.remove(role);
  channel.send("bot start");

  const ch_verify = guild.channels.cache.get(Verify.channel_id);
  const old_msg = await ch_verify.messages.fetch();
  ch_verify.bulkDelete(old_msg);

  Verify.ready(client);
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return;
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (!reaction.message.guild) return;

  if (reaction.message.channelId == Verify.channel_id) {
    Verify.reaction(reaction, user);
  } else {
    console.error("messageReactionAdd no ch");
  }
});

client.on("messageCreate", async (msg) => {
  //
  if (msg.author.bot) return;

  // if (msg.content == "a") {
  //   msg.reply("b");
  // } else {
  //   console.log("msg.content", msg.content);
  // }
});

client.login(token);
console.log("login");

const ROLE_ID_NFT = "1006957652720492574";
async function add_nft_role(user_id) {
  console.log("add_nft_role", user_id);

  const guild = client.guilds.cache.get(GUILD_ID);
  const role = guild.roles.cache.get(ROLE_ID_NFT);
  const member = await guild.members.fetch(user_id);
  member.roles.add(role);
}

module.exports = {
  add_nft_role,
};
