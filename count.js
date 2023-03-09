const channelId = process.env.CHANNEL_ID;

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