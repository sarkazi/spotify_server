import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { TrackService } from './track.service'
import { TrackEntity } from './entities/track.entity'
import { CreateTrackInput } from './dto/create-track.input'
import { UpdateTrackInput } from './dto/update-track.input'
import { HttpCode, UsePipes, ValidationPipe } from '@nestjs/common'
import { SearchTracksInput } from './dto/search-tracks.input'

@Resolver(() => TrackEntity)
export class TrackResolver {
  constructor(private readonly trackService: TrackService) {}

  @Mutation(() => TrackEntity, { name: 'createTrack' })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  createTrack(@Args('input') input: CreateTrackInput) {
    return this.trackService.createTrack(input)
  }

  @Query(() => [TrackEntity], { name: 'findTracksByUser' })
  @HttpCode(200)
  findTracksByUser(@Args('id') id: number) {
    return this.trackService.findTracksByUser(id)
  }

  @Query(() => [TrackEntity], { name: 'searchTracksBy' })
  @HttpCode(200)
  searchTracksBy(@Args('searchTerm') searchTerm: SearchTracksInput) {
    return this.trackService.searchTracksBy(searchTerm)
  }

  @Query(() => TrackEntity, { name: 'findOneTracks' })
  @HttpCode(200)
  findOne(@Args('id') id: number) {
    console.log(id, 888)
    return this.trackService.findOneTrack(id)
  }

  @Mutation(() => TrackEntity, { name: 'updateTrack' })
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  update(@Args('input') input: UpdateTrackInput) {
    return this.trackService.updateTrack(input)
  }

  @Mutation(() => TrackEntity, { name: 'removeTrack' })
  @HttpCode(200)
  remove(@Args('id') id: number) {
    return this.trackService.removeTrack(id)
  }
}
