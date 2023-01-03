import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { IsEmail, Min } from 'class-validator'

@InputType()
export class UpdateUserInput {
  @Field()
  id: number

  @Field({ nullable: true })
  username?: string

  @IsEmail()
  @Field({ nullable: true })
  email?: string

  @Min(8, { message: 'Длина пароля не менее 8 символов' })
  @Field({ nullable: true })
  password?: string
}
