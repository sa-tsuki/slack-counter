const { App,LogLevel } = require('@slack/bolt');
const store = require('./store');
const {modalView} = require('./views');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  logLevel: LogLevel.DEBUG
});


// app.event('app_home_opened', async ({ event, say }) => {
//   // Look up the user from DB
//   let user = store.getUser(event.user);

//   if (!user) {
//     user = {
//       user: event.user,
//       channel: event.channel
//     };
//     store.addUser(user);
    
//     await say({blocks:[
//         {
//             "type": "section",
//             "block_id": "button-block",
//             "text": {
//                 "type": "mrkdwn",
//                 "text": "Events API から直接モーダルを開くことはできません。ボタンをクリックしてもらう必要があります。",
//             },
//             "accessory": {
//                 "type": "button",
//                 "text": {"type": "plain_text", "text": "モーダルを開く"},
//                 "value": "clicked",
//                 "action_id": "open_modal",
//             },
//         }
//     ]});
//   } else {
//     await say({blocks:[
//         {
//             "type": "section",
//             "block_id": "button-block",
//             "text": {
//                 "type": "mrkdwn",
//                 "text": "ボタンをクリックしてもらう必要があります。",
//             },
//             "accessory": {
//                 "type": "button",
//                 "text": {"type": "plain_text", "text": "モーダルを開く"},
//                 "value": "clicked",
//                 "action_id": "open_modal",
//             },
//         }
//     ]});
//   }
// });

app.command('/count', async ({ ack, body, client, logger }) => {
  // Acknowledge shortcut request
  await ack();

  try {
    // Call the views.open method using the WebClient passed to listeners
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: modalView()
    });

    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

app.action('count_start', async ({ ack, body, view, client, logger }) => {
  // モーダルでのデータ送信リクエストを確認
  await ack();

  // 入力値を使ってやりたいことをここで実装 - ここでは DB に保存して送信内容の確認を送っている

  // block_id: block_1 という input ブロック内で action_id: input_a の場合の入力
  const val = view['state']['values']['block_1']['input_a'];
  
  console.log("ここにきた")


  // ユーザーにメッセージを送信
  try {
    // await client.chat.postMessage({
    //   channel: user,
    //   text: msg
    // });
  }
  catch (error) {
    logger.error(error);
  }

});

// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

