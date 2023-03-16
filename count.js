const channelId = process.env.CHANNEL_ID;
let conversationsStore = {};

// ユーザー取得
exports.getWorkspaceMembers = async (client) => {
  try {
    const result = await client.users.list();
    const members = result.members.map((member) => {
      return {
        id: member.id,
        name: member.name,
      };
    });
    return members;
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    return [];
  }
};

// コメント取得
exports.getChannels = async (client) => {
  try {
    // Call the conversations.list method using the WebClient
    const result = await client.conversations.list();

    return result.channels;
  } catch (error) {
    console.error(error);
  }
};

exports.getConversationHistory = async (
  client,
  startDate,
  endDate,
  channels
) => {
  const f_startDate = new Date(startDate);
  const n_endDate = new Date(endDate);
  const f_endDate = String(n_endDate).replace("00:00:00", "23:59:59");
  const timestampStartDate = new Date(f_startDate)
    .getTime()
    .toString()
    .slice(0, -3);
  const timestampEndDate = new Date(f_endDate)
    .getTime()
    .toString()
    .slice(0, -3);

  try {
    // Call the conversations.history method using WebClient
    //     ここは権限が降りてから
    //     channels.forEach(async(channel) => {
    //     let conversationHistory;
    //     const result = await client.conversations.history({
    //       channel: channel.id,
    //       oldest: timestampStartDate,
    //       latest: timestampEndDate,
    //     });

    //     conversationHistory = result.messages;

    //     // Print results
    //     console.log(conversationHistory.length + " messages found in " + channel.id);
    //     })

    let conversationHistory;
    const result = await client.conversations.history({
      channel: channelId,
      oldest: timestampStartDate,
      latest: timestampEndDate,
    });

    conversationHistory = result.messages;
    return conversationHistory;
  } catch (error) {
    console.error(error);
  }
};

// スレッド内のリプライ取得
exports.getReplis = async (client, conversations) => {
  let resultArray = [];

  // Promise.all と map を使用してすべての非同期処理が完了するのを待つ
  await Promise.all(conversations.map(async (message, x) => {
    try {
      const result = await client.conversations.replies({
        channel: channelId,
        ts: message.ts,
      });
      
      resultArray = [...resultArray, ...result.messages];
      console.log("ここの結果",resultArray)
    } catch (error) {
      console.error(error);
    }
  }));

  console.log("オブジェクト！！！！！！！！！！！！！！！", resultArray);

  const filteredArray = resultArray.filter((message) => {
    return message.text.match(`<@`);
  });

  return filteredArray;
};

exports.getDate = (members, allMessages) => {
  allMessages.forEach((message) => {
      if (
        message.text.match(`|ええやん>`) ||
        message.text.match(`|さすが>`) ||
        message.text.match(`|ありがとう>`)
      ) {
        members.forEach((member) => {
          if (message.text.match(member.id)) {
            console.log(member.name);
          }
        });
      }
  });
};
