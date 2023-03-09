exports.modalView = () =>  {
  return {
  "type": "modal",
  "title": {
    "type": "plain_text",
    "text": "モーダルのタイトル"
  },
  "submit": {
    "type": "plain_text",
    "text": "送信"
  },
  "close": {
    "type": "plain_text",
    "text": "キャンセル"
  },
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "plain_text",
        "text": "モーダルの本文"
      }
    }
  ]
}
}