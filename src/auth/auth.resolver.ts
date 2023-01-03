import { HttpCode, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql'
import { UserEntity } from 'src/user/entities/user.entity'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login-user.input'
import { RegisterInput } from './dto/register.input'
import { LoginResponse } from './dto/login-response'
import { GqlAuthGuard } from './guards/gql-auth.guards'
import { RegResponse } from './dto/reg-response'

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegResponse, { name: 'registerUser' })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  register(@Args('input') input: RegisterInput) {
    return this.authService.register(input)
  }

  @Mutation(() => LoginResponse, { name: 'loginUser' })
  @UsePipes(new ValidationPipe())
  @UseGuards(GqlAuthGuard)
  @HttpCode(200)
  login(@Args('input') input: LoginInput) {
    return this.authService.loginUser(input)
  }
}
