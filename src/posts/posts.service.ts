import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePostInput } from './dtos/create-post.input'
import { UpdatePostInput } from './dtos/update-post.input'
import { PaginationInput } from './dtos/pagination.input'
import { PostModel, PostItemModel } from './models/posts.model'
import { Post } from './interfaces/posts.interface'
import { BatchDeleteModel } from '../database/models/batch-delete.model'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<Post>,
  ) {
    this.postModel = postModel
  }

  private async getTotalCount(): Promise<number> {
    return this.postModel.countDocuments()
  }

  public async findAll(input: PaginationInput): Promise<PostModel> {
    const { page, pageSize, title } = input

    const total = await this.getTotalCount()
    const items = await this.postModel
      .find({ title: { $regex: !title ? '' : title } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)

    return {
      total,
      page,
      pageSize,
      items,
    }
  }

  public async findOneById(id: string): Promise<PostItemModel> {
    return this.postModel.findById(id)
  }

  public async create(postInput: CreatePostInput): Promise<PostItemModel> {
    return this.postModel.create(postInput)
  }

  public async update(postInput: UpdatePostInput): Promise<PostItemModel> {
    const { id, ...rest } = postInput
    return this.postModel.findByIdAndUpdate(id, rest, { new: true })
  }

  public async deleteOneById(id: string): Promise<PostItemModel> {
    return this.postModel.findByIdAndDelete(id)
  }

  public async batchDelete(ids: string[]): Promise<BatchDeleteModel> {
    const res = await this.postModel.deleteMany({
      _id: { $in: ids },
    })

    return {
      ...res,
      ids,
    }
  }
}