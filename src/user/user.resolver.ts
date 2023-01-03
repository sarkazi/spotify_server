import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserEntity } from './entities/user.entity'
import { UpdateUserInput } from './dto/update-user.input'
import { HttpCode, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guards'

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity], { name: 'findAllUsers' })
  @HttpCode(200)
  findAll() {
    return this.userService.findAllUsers()
  }

  @Query(() => UserEntity, { name: 'findOneUser' })
  @HttpCode(200)
  findOne(@Args('id') id: number) {
    return this.userService.findOneUser(id)
  }

  @Mutation(() => UserEntity, { name: 'updateUser' })
  @HttpCode(200)
  update(@Args('input') input: UpdateUserInput) {
    return this.userService.updateUser(input)
  }
}
