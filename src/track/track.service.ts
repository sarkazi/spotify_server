import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AlbumService } from 'src/album/album.service'
import { AlbumEntity } from 'src/album/entities/album.entity'
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity'
import { PlaylistService } from 'src/playlist/playlist.service'
import { ILike, Repository } from 'typeorm'
import { CreateTrackInput } from './dto/create-track.input'
import { SearchTracksInput } from './dto/search-tracks.input'
import { UpdateTrackInput } from './dto/update-track.input'
import { TrackEntity } from './entities/track.entity'

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity) private trackRepo: Repository<TrackEntity>,
    @InjectRepository(PlaylistEntity)
    private playlistRepo: Repository<PlaylistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepo: Repository<AlbumEntity>,
    private readonly playlistService: PlaylistService,
    private readonly albumService: AlbumService,
  ) {}

  async createTrack(input: CreateTrackInput): Promise<TrackEntity> {
    if (input.album) {
      await this.albumService.findOneAlbum(input.album)
    }

    await this.playlistService.findOnePlaylist(input.playlist)

    const newTrack = this.trackRepo.create({
      artist: '',
      name: '',
      album: { id: input.album },
      playlist: { id: input.playlist },
    })

    await this.trackRepo.save(newTrack)

    const playlist = await this.playlistService.findOnePlaylist(input.playlist)

    playlist.countTracks++

    await this.playlistRepo.save(playlist)

    if (input.album) {
      const albumByThisTrack = await this.albumService.findOneAlbum(input.album)

      albumByThisTrack.countTrack++

      await this.albumRepo.save(albumByThisTrack)
    }

    return newTrack
  }

  async findTracksByUser(id: number): Promise<TrackEntity[]> {
    return await this.trackRepo.find({
      where: {
        playlist: { user: { id: id } },
      },
      relations: {
        playlist: {
          user: true,
        },
        album: true,
      },
    })
  }

  async searchTracksBy(searchTerm: SearchTracksInput): Promise<TrackEntity[]> {
    const tracks = await this.trackRepo.find({
      where: [
        { name: ILike(`%${searchTerm.searchQuery}%`) },
        { artist: ILike(`%${searchTerm.searchQuery}%`) },
      ],
      take: searchTerm.limit || 10,
      relations: {
        album: true,
        playlist: {
          user: true,
        },
      },
    })

    return tracks
  }

  async findOneTrack(id: number): Promise<TrackEntity> {
    const track = await this.trackRepo.findOne({
      where: { id },
      relations: {
        playlist: {
          user: true,
        },
        album: true,
      },
    })

    if (!track) {
      throw new NotFoundException('Такой трек не найден!')
    }

    return track
  }

  async updateTrack(input: UpdateTrackInput): Promise<TrackEntity> {
    const { id, album, ...data } = input

    await this.findOneTrack(id)

    await this.trackRepo.update(id, data)

    return await this.findOneTrack(id)
  }

  async removeTrack(id: number) {
    const thisTrack = await this.findOneTrack(id)

    const playlistByThisTrack = await this.playlistService.findOnePlaylist(
      thisTrack.playlist.id,
    )

    await this.trackRepo.delete(id)

    playlistByThisTrack.countTracks--

    await this.playlistRepo.save(playlistByThisTrack)
  }
}
