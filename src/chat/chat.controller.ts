import { Controller, Post, Body } from '@nestjs/common'
import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { GetChatsDto } from './dto/get-chat.dto'

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('add')
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto)
  }

  @Post('get')
  getChats(@Body() getChatsDto: GetChatsDto) {
    return this.chatService.getChatsByUserId(getChatsDto)
  }
}
