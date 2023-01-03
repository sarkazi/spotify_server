import { InputType, Field, ID } from '@nestjs/graphql'
import { IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdateTrackInput {
  @Field(() => ID)
  id: number

  @Field({ nullable: true })
  @IsString({ message: 'Ожидаем строковый формат!' })
  @MaxLength(30, { message: 'Не более 30 символов!' })
  artist?: string

  @Field({ nullable: true })
  @IsString({ message: 'Ожидаем строковый формат!' })
  @MaxLength(30, { message: 'Не более 30 символов!' })
  name?: string

  @Field({ nullable: true })
  album?: number
}
