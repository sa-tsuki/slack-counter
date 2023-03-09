exports.modalView = () => {
  return {
    title: {
      type: "plain_text",
      text: "#ええやんカウンター",
    },
    type: "modal",
    blocks: [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: "期間を選択してください。",
          emoji: true,
        },
      },
      {
        block_id: "date-start",
        type: "input",
        element: {
          type: "datepicker",
          initial_date: "2023-1-1",
          placeholder: {
            type: "plain_text",
            text: "Select a date",
            emoji: true,
          },
          action_id: "datepicker-action",
        },
        label: {
          type: "plain_text",
          text: "いつから",
          emoji: true,
        },
      },
      {
        block_id: "date-end",
        type: "input",
        element: {
          type: "datepicker",
          initial_date: "2023-1-31",
          placeholder: {
            type: "plain_text",
            text: "Select a date",
            emoji: true,
          },
          action_id: "datepicker-action",
        },
        label: {
          type: "plain_text",
          text: "いつまで",
          emoji: true,
        },
      },
    ],
    submit: {
      type: "plain_text",
      text: "計測",
      action_id: "count_start",
    },
  };
};
