import { WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import * as messagesService from './services/messages.service';
import * as usersService from './services/users.service';
import * as chatsService from './services/chats.service';
import { ERROR_TEXT, WS_STATUSES } from './shared/const';
import { getTokenFromBearerString } from './shared/helpers';
import {
  ExtendedWebSocket,
  ExtendedWebSocketServer,
} from './services/socket.service';
import { messagePayloadValidation } from './shared/validations';
import { IMessage } from './models/messages.model';

function sendMessageToClients({
  clients,
  chatUsers,
  message,
  sender,
}: {
  clients: ExtendedWebSocketServer['clients'];
  chatUsers: string[];
  message: IMessage;
  sender: { _id?: string; username?: string };
}) {
  clients.forEach((client) => {
    const isClientReady = client.readyState === WebSocket.OPEN;
    const isClientHaveAccessToChat = chatUsers.includes(
      client.user?._id?.toString()!
    );

    if (isClientReady && isClientHaveAccessToChat) {
      client.send(
        JSON.stringify({
          text: message.text,
          chatId: message.chatId,
          sender,
        })
      );
    }
  });
}

async function handleMessage(
  { message, chatId }: { message: string; chatId: string },
  ws: ExtendedWebSocket,
  wss: ExtendedWebSocketServer
) {
  try {
    const senderId = ws.user?._id;
    const chat = await chatsService.getChatById(chatId);
    const chatUsers = chat?.users?.map((user) => user.toString());
    const isSenderHaveAccessToChat = chatUsers?.includes(senderId!);

    if (!chat?._id) {
      return ws.send(JSON.stringify({ meta: ERROR_TEXT.CHATS.CHAT_NOT_FOUND }));
    }

    if (!isSenderHaveAccessToChat) {
      ws.send(
        JSON.stringify({
          meta: ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS,
        })
      );
      return;
    }

    const createdMessage = await messagesService.createMessage(
      chat._id,
      senderId!,
      message
    );

    sendMessageToClients({
      clients: wss.clients,
      chatUsers: chatUsers!,
      message: createdMessage,
      sender: ws.user!,
    });
  } catch (error) {
    console.log(error);
    ws.send(JSON.stringify({ meta: ERROR_TEXT.SERVER.INTERNAL_ERROR }));
  }
}

export async function onConnection(
  ws: ExtendedWebSocket,
  req: IncomingMessage,
  wss: ExtendedWebSocketServer
) {
  const token = getTokenFromBearerString(req.headers.authorization!);
  const currentUser = await usersService.getUserByToken(token);

  if (!currentUser) {
    ws.send(ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS);
    ws.close(WS_STATUSES.UNAUTHORIZED);
    return;
  }

  ws.user = { _id: currentUser._id.toString(), username: currentUser.username };
  ws.send('Connected');
  ws.on('error', console.error);

  ws.on('message', (data) => {
    const { message, chatId } = JSON.parse(data.toString());
    const { isValidPayload, error } = messagePayloadValidation({
      message,
      chatId,
    });

    if (!isValidPayload) {
      return ws.send(JSON.stringify({ meta: error }));
    }

    handleMessage({ message, chatId }, ws, wss);
  });
}
