import { InputType, Int, Field } from '@nestjs/graphql'
import { MinLength, IsEmail, IsString } from 'class-validator'

@InputType()
export class LoginInput {
  @Field()
  @MinLength(8, { message: 'Пароль должен быть не менее 8 символов!' })
  @IsString({ message: 'Пароль должен быть в строков формате!' })
  password: string

  @Field()
  @IsEmail()
  email: string
}
