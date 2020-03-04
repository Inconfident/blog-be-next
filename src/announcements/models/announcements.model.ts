import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AnnouncementModel {
  @Field({ nullable: false })
  public _id: string

  @Field({ nullable: false })
  public content: string

  @Field({ nullable: false })
  public createdAt: Date

  @Field({ nullable: false })
  public updatedAt: Date
}
