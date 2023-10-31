import { Message } from 'src/message/entities/message.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  users: User[]

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[]

  @CreateDateColumn()
  createdAt: Date
}
