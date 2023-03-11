const channelId = process.env.CHANNEL_ID;
let conversationsStore = {};

// スレッドの一言目取得
exports.getChannels = async (client) => {
  try {
    // Call the conversations.list method using the WebClient
    const result = await client.conversations.list();

    saveConversations(result.channels);
    
    return conversationsStore
  }
  catch (error) {
    console.error(error);
  }
}

// スレッド取得のオブジェクト整頓
function saveConversations(conversationsArray) {
  let conversationId = '';
  
  conversationsArray.forEach(function(conversation){
    // Key conversation info on its unique ID
    conversationId = conversation["id"];
    
    // Store the entire conversation object (you may not need all of the info)
    conversationsStore[conversationId] = conversation;
  });
}

// スレッド内のリプライ取得
exports.getReplis = async (client, conversations) => {
    try {
      conversations.messages.forEach(async (message) =>  {
        const result = await client.app.client.conversations.replies({
          channel:
        });
      })    
  }
  catch (error) {
    console.error(error);
  }
}

exports.getConversationHistory = async (client, startDate, endDate) => {
  let conversationHistory;
  const f_startDate = new Date(startDate)
  const n_endDate = new Date(endDate)
  const f_endDate = String(n_endDate).replace('00:00:00', '23:59:59')
  const timestampStartDate = new Date(f_startDate).getTime().toString().slice(0, -3);
  const timestampEndDate = new Date(f_endDate).getTime().toString().slice(0, -3);
  
  
  try {
    // Call the conversations.history method using WebClient
    const result = await client.conversations.history({
      channel: channelId,
      oldest: timestampStartDate,
      latest: timestampEndDate,
    });

    conversationHistory = result.messages;

    // Print results
    console.log(conversationHistory.length + " messages found in " + channelId);
  }
  catch (error) {
    console.error(error);
  }
}