module.exports = {
  message: {
    start: {
      channel: "DGGD1E5RA",
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "You have a new request:\n*<fakeLink.toEmployeeProfile.com|Fred Enriquez - New device request>*"
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*Type:*\nComputer (laptop)"
            },
            {
              "type": "mrkdwn",
              "text": "*When:*\nSubmitted Aut 10"
            },
            {
              "type": "mrkdwn",
              "text": "*Last Update:*\nMar 10, 2015 (3 years, 5 months)"
            },
            {
              "type": "mrkdwn",
              "text": "*Reason:*\nAll vowel keys aren't working."
            },
            {
              "type": "mrkdwn",
              "text": "*Specs:*\n\"Cheetah Pro 15\" - Fast, really fast\""
            }
          ]
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Approve"
              },
              "value": {"blueprint":"approvalNotice","type":"update","value":"confirmation"}
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Deny"
              },
              "value": {"blueprint":"approvalNotice","type":"dialog","value":"info", options: {message_ts: null}}
            }
          ]
        }
      ]
    }
  },
  update: {
    confirmation: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "You have a new request:\n*<fakeLink.toEmployeeProfile.com|Fred Enriquez - New device request>*"
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*Type:*\nComputer (laptop)"
            },
            {
              "type": "mrkdwn",
              "text": "*When:*\nSubmitted Aut 10"
            },
            {
              "type": "mrkdwn",
              "text": "*Last Update:*\nMar 10, 2015 (3 years, 5 months)"
            },
            {
              "type": "mrkdwn",
              "text": "*Reason:*\nAll vowel keys aren't working."
            },
            {
              "type": "mrkdwn",
              "text": "*Specs:*\n\"Cheetah Pro 15\" - Fast, really fast\""
            }
          ]
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "plain_text",
              "text": ":white_check_mark: You approved this request on 03/14/2019 at 03:45pm",
              "emoji": true
            }
          ]
        }
      ]
    },
    denial: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "You have a new request:\n*<fakeLink.toEmployeeProfile.com|Fred Enriquez - New device request>*"
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*Type:*\nComputer (laptop)"
            },
            {
              "type": "mrkdwn",
              "text": "*When:*\nSubmitted Mar 14"
            },
            {
              "type": "mrkdwn",
              "text": "*Last Update:*\nMar 10, 2015 (3 years, 5 months)"
            },
            {
              "type": "mrkdwn",
              "text": "*Reason:*\nAll vowel keys aren't working."
            },
            {
              "type": "mrkdwn",
              "text": "*Specs:*\n\"Cheetah Pro 15\" - Fast, really fast\""
            }
          ]
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "plain_text",
              "text": ":x: You declined this request on 03/14/2019 at 03:45pm",
              "emoji": true
            }
          ]
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "plain_text",
              "text": ":information_source: Reason: Out of Policy",
              "emoji": true
            }
          ]
        },
          {
          "type": "context",
          "elements": [
            {
              "type": "plain_text",
              "text": ":memo: Comment: We don't approve this kind of device.",
              "emoji": true
            }
          ]
        }
      ]
    }
  },
  dialog: {
    info: {
      "callback_id": "dialog:1",
      "title": "This is a demo dialog",
      "elements": [
        {
          "type": "text",
          "label": "Enter some data",
          "name": "some_data"
        }
      ],
      "state": {"blueprint":"template","type":"update","value":"confirmation",}
    }
  }
}