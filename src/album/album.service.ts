import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'
import { UpdateAlbumInput } from './dto/update-album.input'
import { AlbumEntity } from './entities/album.entity'

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity) private albumRepo: Repository<AlbumEntity>,
  ) {}
  async createAlbum() {
    const newAlbum = this.albumRepo.create({
      name: '',
      artist: '',
    })

    return await this.albumRepo.save(newAlbum)
  }

  async findAllAlbums() {
    return await this.albumRepo.find({})
  }

  async searchAlbumsBy(searchTerm: string) {
    const albums = await this.albumRepo.find({
      where: {
        artist: ILike(`%${searchTerm}%`),
      },
      relations: {
        tracks: {
          playlist: true,
        },
      },
      order: {
        yearOfRelease: 'DESC',
      },
    })

    return albums
  }

  async findOneAlbum(id: number) {
    const playlist = await this.albumRepo.findOne({
      where: {
        id,
      },
      relations: {
        tracks: {
          album: true,
          playlist: true,
        },
      },
    })

    if (!playlist) {
      throw new NotFoundException('Такой альбом не найден!')
    }

    return playlist
  }

  async updateAlbum(input: UpdateAlbumInput) {
    const { id, ...data } = input

    await this.findOneAlbum(id)

    await this.albumRepo.update(id, data)

    const refreshAlbum = await this.findOneAlbum(id)

    return refreshAlbum
  }

  async removeAlbum(id: number) {
    await this.findOneAlbum(id)

    return await this.albumRepo.delete(id)
  }
}
