import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { PlaylistService } from './playlist.service'
import { PlaylistEntity } from './entities/playlist.entity'
import { UpdatePlaylistInput } from './dto/update-playlist.input'
import { HttpCode, UsePipes, ValidationPipe } from '@nestjs/common'

@Resolver(() => PlaylistEntity)
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) {}

  @Mutation(() => PlaylistEntity, { name: 'createPlaylist' })
  @HttpCode(200)
  create(@Args('userId') userId: number) {
    return this.playlistService.createPlaylist(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Mutation(() => PlaylistEntity, { name: 'updatePlaylist' })
  update(@Args('input') input: UpdatePlaylistInput) {
    return this.playlistService.updatePlaylist(input)
  }

  @Mutation(() => PlaylistEntity, { name: 'removePlaylist' })
  @HttpCode(200)
  remove(@Args('id') id: number) {
    return this.playlistService.removePlaylist(id)
  }

  @Query(() => [PlaylistEntity], { name: 'findPlaylistsByUser' })
  @HttpCode(200)
  findPlaylistsByUser(@Args('userId') userId: number) {
    return this.playlistService.findPlaylistsByUser(userId)
  }

  @Query(() => PlaylistEntity, { name: 'findOnePlaylist' })
  @HttpCode(200)
  findOnePlaylist(@Args('id') id: number) {
    return this.playlistService.findOnePlaylist(id)
  }
}
