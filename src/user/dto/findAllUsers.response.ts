import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { IsEmail, Min } from 'class-validator'
import { UserEntity } from '../entities/user.entity'

@InputType()
export class FindAllUsersResponse {
  @Field(() => Int)
  count: number

  @Field()
  users: [UserEntity]
}
