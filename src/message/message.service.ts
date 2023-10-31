import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { Message } from './entities/message.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Chat } from 'src/chat/entities/chat.entity'
import { User } from 'src/user/entities/user.entity'
import { GetMessageDto } from './dto/get-message.dto'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const { chat, author, text } = createMessageDto
    const existAutor = await this.userRepository.findOne({
      where: {
        id: author,
      },
    })

    const existChat = await this.chatRepository.findOne({
      where: {
        id: chat,
      },
    })

    if (!existChat || !existAutor)
      throw new HttpException('User or Chat not found', HttpStatus.NOT_FOUND)

    if (createMessageDto.text.length < 1) {
      throw new BadRequestException('Message is empty')
    }

    const message = new Message()
    message.chat = existChat
    message.author = existAutor
    message.text = text

    const savedMessage = await this.messageRepository.save(message)

    // `Adds a new message. Message id: ${savedMessage.id}`
    return savedMessage.id
  }

  async getChatMessage(getMessageDto: GetMessageDto) {
    const chat = await this.messageRepository.find({
      where: {
        id: +getMessageDto.chat,
      },
    })

    if (!chat) {
      throw new HttpException('Chat not found', HttpStatus.NOT_FOUND)
    }

    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .where('message.chatId = :chatId', { chatId: getMessageDto.chat })
      .orderBy('message.createdAt', 'ASC')
      .getMany()

    // messages.length ? messages : 'This chat is empty'
    return messages
  }
}
