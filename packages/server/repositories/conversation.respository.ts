// implementation detail
const conversations = new Map<string, string>();

const getLastResponseId = (conversationId: string) =>
   conversations.get(conversationId);

const setLastResponseId = (conversationId: string, responseId: string) =>
   conversations.set(conversationId, responseId);

export const conversationRepository = {
   // getLastResponseId: (conversationId: string) =>
   //    conversations.get(conversationId),

   // setLastResponseId: (conversationId: string, responseId: string) =>
   //    conversations.set(conversationId, responseId),
   setLastResponseId,
   getLastResponseId,
};
