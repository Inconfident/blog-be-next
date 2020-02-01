import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthModel } from './models/auth.model'
import { LoginInput } from './dtos/login.input'
import { RegisterInput } from './dtos/register.input'

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
    this.authService = authService
  }

  @Query(() => AuthModel)
  public async login(@Args('input') input: LoginInput) {
    return this.authService.login(input)
  }

  @Mutation(() => AuthModel)
  public async register(@Args('input') input: RegisterInput) {
    return this.authService.register(input)
  }
}