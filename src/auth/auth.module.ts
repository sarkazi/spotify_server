import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/entities/user.entity'
import { UserModule } from 'src/user/user.module'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from 'src/config/jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserModule, ConfigModule],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtService,
    JwtStrategy,
  ],
  exports: [],
})
export class AuthModule {}
