import { InputType, Field, ID, Int } from '@nestjs/graphql'
import { IsString, MaxLength } from 'class-validator'

@InputType()
export class SearchTracksInput {
  @Field({ nullable: true })
  searchQuery?: string

  @Field(() => Int, { nullable: true })
  limit?: number
}
