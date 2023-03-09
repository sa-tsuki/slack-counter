let conversationsStore = {};

exports.populateConversationStore = async (client) => {
  try {
    // Call the conversations.list method using the WebClient
    const result = await client.conversations.list();

    saveConversations(result.channels);
    
    return conversationsStore
  }
  catch (error) {
    console.error(error);
  }
}

// Put conversations into the JavaScript object
function saveConversations(conversationsArray) {
  let conversationId = '';
  
  conversationsArray.forEach(function(conversation){
    // Key conversation info on its unique ID
    conversationId = conversation["id"];
    
    // Store the entire conversation object (you may not need all of the info)
    conversationsStore[conversationId] = conversation;
  });
}