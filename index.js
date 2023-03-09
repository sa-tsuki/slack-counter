const { App,LogLevel } = require('@slack/bolt');
const store = require('./store');
const {modalView} = require('./views');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  logLevel: LogLevel.DEBUG
});


app.event('app_home_opened', async ({ event, say }) => {
  // Look up the user from DB
  let user = store.getUser(event.user);

  if (!user) {
    user = {
      user: event.user,
      channel: event.channel
    };
    store.addUser(user);
    await say(
        {
            "type": "section",
            "block_id": "button-block",
            "text": {
                "type": "mrkdwn",
                "text": "Events API から直接モーダルを開くことはできません。ボタンをクリックしてもらう必要があります。",
            },
            "accessory": {
                "type": "button",
                "text": {"type": "plain_text", "text": "モーダルを開く"},
                "value": "clicked",
                "action_id": "open-modal-button",
            },
        }
    );
  } else {
    await say(
        {
            "type": "section",
            "block_id": "button-block",
            "text": {
                "type": "mrkdwn",
                "text": "ボタンをクリックしてもらう必要があります。",
            },
            "accessory": {
                "type": "button",
                "text": {"type": "plain_text", "text": "モーダルを開く"},
                "value": "clicked",
                "action_id": "open-modal-button",
            },
        }
    );
  }
  

  

});

  app.event('app_mention', async ({ event, client }) => {
  try {
    // チャンネルを取得する
    const channel = await client.conversations.info({
      channel: event.channel,
    });

    // モーダルを表示する
    await client.views.open({
      trigger_id: event.trigger_id,
      view: modalView,
    });
  } catch (error) {
    console.error(error);
  }
});


// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

