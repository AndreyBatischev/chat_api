import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateChatDto } from './dto/create-chat.dto'
import { Chat } from './entities/chat.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { Message } from 'src/message/entities/message.entity'
import { GetChatsDto } from './dto/get-chat.dto'

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
  async create(createChatDto: CreateChatDto) {
    const { name, users } = createChatDto

    const userInChat = await this.userRepository.find({
      where: users.map((id) => ({ id: +id })),
    })

    const chat = new Chat()
    chat.name = name
    chat.users = userInChat

    const saveChat = await this.chatRepository.save(chat)

    // `Adds a new chat. Chat id: ${saveChat.id}`
    return saveChat.id
  }

  async getChatsByUserId(getChatsDto: GetChatsDto): Promise<Chat[]> {
    const user = await this.userRepository.findOne({
      where: {
        id: +getChatsDto.user,
      },
    })
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const chats = await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.users', 'user', 'user.id = :userId', {
        userId: +getChatsDto.user,
      })
      .leftJoinAndSelect('chat.messages', 'message')
      .orderBy('message.createdAt', 'DESC')
      .getMany()

    return chats
  }
}
