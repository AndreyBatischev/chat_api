import { Chat } from 'src/chat/entities/chat.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @ManyToMany(() => Chat, (chat) => chat.users)
  chats: Chat[]

  @CreateDateColumn()
  createdAt: Date
}
