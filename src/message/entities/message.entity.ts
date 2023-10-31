import { Chat } from 'src/chat/entities/chat.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Chat, (chat) => chat.id)
  chat: Chat

  @ManyToOne(() => User, (user) => user.id)
  author: User

  @Column()
  text: string

  @CreateDateColumn()
  createdAt: Date
}
