import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getTypeOrmConfig } from './config/typeorm.config'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from './user/user.module'
import { TrackModule } from './track/track.module'
import { AlbumModule } from './album/album.module'
import { FilesService } from './files/file.service'
import { PlaylistModule } from './playlist/playlist.module'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
    }),
    UserModule,
    TrackModule,
    AlbumModule,
    PlaylistModule,
    AuthModule,
  ],
  controllers: [],
  providers: [FilesService],
})
export class AppModule {}
