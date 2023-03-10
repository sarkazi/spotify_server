import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { UserEntity } from 'src/user/entities/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passportField: 'password',
    })
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль!')
    }
    return user
  }
}
