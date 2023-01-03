import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { AlbumService } from './album.service'
import { AlbumEntity } from './entities/album.entity'
import { UpdateAlbumInput } from './dto/update-album.input'

@Resolver(() => AlbumEntity)
export class AlbumResolver {
  constructor(private readonly albumService: AlbumService) {}
  @Mutation(() => AlbumEntity, { name: 'createAlbum' })
  create() {
    return this.albumService.createAlbum()
  }
  @Mutation(() => AlbumEntity, { name: 'updateAlbum' })
  update(@Args('input') input: UpdateAlbumInput) {
    return this.albumService.updateAlbum(input)
  }
  @Mutation(() => AlbumEntity, { name: 'removeAlbum' })
  remove(@Args('id') id: number) {
    return this.albumService.removeAlbum(id)
  }
  @Query(() => [AlbumEntity], { name: 'findAllAlbums' })
  findAll() {
    return this.albumService.findAllAlbums()
  }
  @Query(() => [AlbumEntity], { name: 'searchAlbumsBy' })
  search(@Args('searchTerm') searchTerm: string) {
    return this.albumService.searchAlbumsBy(searchTerm)
  }
  @Query(() => AlbumEntity, { name: 'findOneAlbum' })
  findOne(@Args('id') id: number) {
    return this.albumService.findOneAlbum(id)
  }
}
