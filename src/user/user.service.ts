import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/auth.service'
import { Repository } from 'typeorm'
import { UpdateUserInput } from './dto/update-user.input'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findUserById(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
      relations: {
        playlists: {
          tracks: true,
        },
      },
    })

    if (!user) {
      throw new NotFoundException('Пользователь с таким id не найден!')
    }
    return user
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
      relations: {
        playlists: {
          tracks: true,
        },
      },
    })

    return user
  }

  async findAllUsers() {
    return await this.userRepo.find({
      relations: {
        playlists: true,
      },
    })
  }

  async findOneUser(id: number) {
    return await this.findUserById(id)
  }

  async updateUser(input: UpdateUserInput) {
    const userById = await this.findUserById(input.id)

    if (input.email) {
      const userByEmail = await this.findUserByEmail(input.email)

      if (userById.id !== userByEmail.id && input.email === userByEmail.email) {
        throw new NotFoundException('Email занят!')
      }

      this.userRepo.update(input.id, { email: input.email })

      return await this.findUserById(input.id)
    }
    await this.userRepo.update(input.id, {
      username: input.username,
    })

    return await this.findUserById(input.id)
  }
}
