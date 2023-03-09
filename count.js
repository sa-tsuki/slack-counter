const channelId = process.env.CHANNEL_ID;

exports.getConversationHistory = async (client, startDate, endDate) => {
  let conversationHistory;
  const f_startDate = `${startDate}T00:00:00Z`
  const f_endDate = `${startDate}T23:59:59Z`
  const timestampStartDate = new Date(f_startDate).getTime()
  const timestampEndDate = new Date(f_endDate).getTime().toString().slice(0, -3);
  
  
    console.log(f_startDate)
  console.log(f_endDate)
  // 2023-02-25T07:26:40Z
  console.log(timestampStartDate)
  console.log(timestampEndDate)
  
  
  try {
    // Call the conversations.history method using WebClient
    const result = await client.conversations.history({
      channel: channelId,
      oldest: 1675177200,
      latest: 1677596399,
    });

    conversationHistory = result.messages;

    // Print results
    console.log(conversationHistory.length + " messages found in " + channelId);
  }
  catch (error) {
    console.error(error);
  }
}