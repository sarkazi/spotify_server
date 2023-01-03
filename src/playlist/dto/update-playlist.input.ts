import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql'
import { MaxLength, IsString } from 'class-validator'

@InputType()
export class UpdatePlaylistInput {
  @Field(() => Int)
  id: number

  @Field()
  @IsString({ message: 'Ожидаем строковый формат!' })
  @MaxLength(30, { message: 'Не более 30 символов!' })
  name: string

  @Field({ nullable: true })
  @IsString({ message: 'Ожидаем строковый формат!' })
  @MaxLength(140, { message: 'Не более 30 символов!' })
  description?: string
}
