import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { UpdatePlaylistInput } from './dto/update-playlist.input'
import { PlaylistEntity } from './entities/playlist.entity'

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private playlistRepo: Repository<PlaylistEntity>,
    private readonly userService: UserService,
  ) {}

  async createPlaylist(userId: number) {
    await this.userService.findUserById(userId)

    const emptyTrack = this.playlistRepo.create({
      name: '',
      user: { id: userId },
    })

    return await this.playlistRepo.save(emptyTrack)
  }

  async findPlaylistsByUser(id: number) {
    const user = await this.userService.findUserById(id)

    return await this.playlistRepo.find({
      where: {
        user: { id: user.id },
      },
      relations: {
        user: true,
        tracks: {
          album: true,
          playlist: true,
        },
      },
    })
  }

  async findOnePlaylist(id: number) {
    const playlist = await this.playlistRepo.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        tracks: {
          album: true,
          playlist: true,
        },
      },
    })

    if (!playlist) {
      throw new NotFoundException('Такой плейлист не найден!')
    }

    return playlist
  }

  async updatePlaylist(input: UpdatePlaylistInput) {
    const { id, ...data } = input

    await this.findOnePlaylist(id)

    await this.playlistRepo.update(id, data)

    return await this.findOnePlaylist(id)
  }

  async removePlaylist(id: number) {
    await this.findOnePlaylist(id)

    return await this.playlistRepo.delete(id)
  }
}
