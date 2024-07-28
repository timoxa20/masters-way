import {SchemasRoomPopulatedResponse} from "src/apiAutogenerated/chat";
import {chatUserDTOToChatUser} from "src/dataAccessLogic/DTOToPreviewConverter/chatUserDTOToChatUser";
import {Chat} from "src/model/businessModel/Chat";

/**
 * Convert {@link chatDTO} to {@link Chat}
 */
export const chatDTOToChat = (chatDTO: SchemasRoomPopulatedResponse): Chat => {
  return new Chat({
    ...chatDTO,
    name: chatDTO.name ?? "Chat has no name",
    src: null,
    users: chatDTO.users.map(chatUserDTOToChatUser),
  });
};
