import { IsNotEmpty } from 'class-validator'

export class CreateMessageDto {
  chat: number
  author: number

  @IsNotEmpty()
  text: string
}
