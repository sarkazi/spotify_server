import { InputType, Int, Field } from '@nestjs/graphql'
import { IsEmail, MinLength } from 'class-validator'

@InputType()
export class RegisterInput {
  @Field()
  username: string

  @Field()
  @MinLength(8, { message: 'Пароль должен быть не менее 8 символов' })
  password: string

  @Field()
  @IsEmail()
  email: string
}
