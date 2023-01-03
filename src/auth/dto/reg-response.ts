import { Field, ObjectType } from '@nestjs/graphql'
import { UserEntity } from 'src/user/entities/user.entity'

@ObjectType()
export class RegResponse {
  @Field()
  access_token: string

  @Field()
  refresh_token: string

  @Field(() => UserEntity)
  newUser: UserEntity
}
