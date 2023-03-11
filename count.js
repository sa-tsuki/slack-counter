const channelId = process.env.CHANNEL_ID;
let conversationsStore = {};

// コメント取得
exports.getChannels = async (client) => {
  try {
    // Call the conversations.list method using the WebClient
    const result = await client.conversations.list();
    
    return result.channels
  }
  catch (error) {
    console.error(error);
  }
}

exports.getConversationHistory = async (client, startDate, endDate, channels) => {
  const f_startDate = new Date(startDate)
  const n_endDate = new Date(endDate)
  const f_endDate = String(n_endDate).replace('00:00:00', '23:59:59')
  const timestampStartDate = new Date(f_startDate).getTime().toString().slice(0, -3);
  const timestampEndDate = new Date(f_endDate).getTime().toString().slice(0, -3);
  
  
  try {
    // Call the conversations.history method using WebClient
    channels.forEach(async(channel) => {
    let conversationHistory;
    const result = await client.conversations.history({
      channel: channel.id,
      oldest: timestampStartDate,
      latest: timestampEndDate,
    });

    conversationHistory = result.messages;

    // Print results
    console.log(conversationHistory.length + " messages found in " + channel.id);
    })
  }
  catch (error) {
    console.error(error);
  }
}

// スレッド内のリプライ取得
// exports.getReplis = async (client, conversations) => {
//     try {
//       conversations.messages.forEach(async (message) =>  {
//         const result = await client.app.client.conversations.replies({
//           channel:""
//         });
//       })    
//   }
//   catch (error) {
//     console.error(error);
//   }
// }