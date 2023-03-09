const channelId = process.env.CHANNEL_ID;

exports.getConversationHistory = async (client) => {
  let conversationHistory;
  
  try {
    // Call the conversations.history method using WebClient
    const result = await client.conversations.history({
      channel: channelId,
      oldest: slicedOldest,
      latest: slicedLatest,
    });

    conversationHistory = result.messages;

    // Print results
    console.log(conversationHistory.length + " messages found in " + channelId);
  }
  catch (error) {
    console.error(error);
  }
}