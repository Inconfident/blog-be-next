import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator'

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string

  @Field({ nullable: true })
  public readonly posterUrl?: string

  @Field({ nullable: true })
  public readonly title?: string

  @Field({ nullable: true })
  public readonly summary?: string

  @Field({ nullable: true })
  public readonly content?: string

  @Field({ nullable: true })
  public readonly tags?: string[]

  @Field({ nullable: true })
  @IsNumber()
  public readonly like?: number

  @Field({ nullable: true })
  @IsNumber()
  public readonly pv?: number

  @Field({ nullable: true })
  public readonly lastModifiedDate?: Date

  @Field({ nullable: true })
  public readonly isPublic?: boolean
}
