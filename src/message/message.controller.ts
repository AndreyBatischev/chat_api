import { Controller, Post, Body } from '@nestjs/common'
import { MessageService } from './message.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { GetMessageDto } from './dto/get-message.dto'

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('add')
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto)
  }

  @Post('get')
  getMessage(@Body() getMessageDto: GetMessageDto) {
    return this.messageService.getChatMessage(getMessageDto)
  }
}
