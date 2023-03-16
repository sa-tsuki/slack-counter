const { App,LogLevel } = require('@slack/bolt');
const store = require('./store');
const {modalView} = require('./views');
const {getChannels, getConversationHistory, getReplis} = require('./count');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  logLevel: LogLevel.DEBUG
});

app.command('/count', async ({ ack, body, client, logger }) => {
  // Acknowledge shortcut request
  await ack();

  try {
    // Call the views.open method using the WebClient passed to listeners
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: modalView()
    });

    // console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

app.view('start_count', async ({ ack, body, view, client, logger }) => {
  // モーダルでのデータ送信リクエストを確認
  await ack();

  // 入力値を使ってやりたいことをここで実装 - ここでは DB に保存して送信内容の確認を送っている

  // block_id: block_1 という input ブロック内で action_id: input_a の場合の入力
  const startDate = view['state']['values']['date-start']['datepicker-action']['selected_date']
  const endDate = view['state']['values']['date-end']['datepicker-action']['selected_date']
  const user = body['user']['id'];
  
  const channels = await getChannels(client)
  const conversationHistory = await getConversationHistory(client, startDate, endDate, channels)
  // const allReplis = getReplis(client, conversationHistory)
  
  // ユーザーにメッセージを送信
  try {
    await client.chat.postMessage({
      channel: user,
      text: startDate + endDate
    });
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

