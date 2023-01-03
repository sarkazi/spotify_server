import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { RegisterInput } from './dto/register.input'
import { genSalt, hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { LoginInput } from './dto/login-user.input'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email)

    if (!user) {
      throw new NotFoundException('Пользователь не найден!')
    }

    const isValid = await compare(password, user.password)

    if (!isValid) {
      throw new NotFoundException('Неверный email или пароль!')
    }

    return user
  }

  async loginUser(input: LoginInput) {
    const user = await this.validateUser(input.email, input.password)

    const { refresh_token, access_token } = await this.createPairTokens(
      user.id,
      user.username,
    )

    return { user, refresh_token, access_token }
  }

  async creteNewTokens(refresh_token: string) {
    if (!refresh_token) {
    }
  }

  async register(input: RegisterInput) {
    const user = await this.userRepo.findOne({
      where: {
        email: input.email,
      },
    })

    if (user) {
      throw new NotFoundException(
        'Пользователь с таким email уже зарегистрирован',
      )
    }

    const salt = await genSalt()
    const hashPassword = await hash(input.password, salt)

    const newUser = this.userRepo.create({
      username: input.username,
      email: input.email,
      password: hashPassword,
    })

    await this.userRepo.save(newUser)

    const { refresh_token, access_token } = await this.createPairTokens(
      newUser.id,
      newUser.username,
    )

    return { newUser, refresh_token, access_token }
  }

  async createPairTokens(id: number, username: string) {
    const refresh_token = await this.jwtService.signAsync(
      {
        id,
        username,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '15d',
      },
    )
    const access_token = await this.jwtService.signAsync(
      {
        id,
        username,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1h',
      },
    )

    return { refresh_token, access_token }
  }
}
