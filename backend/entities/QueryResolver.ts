import { Query, Resolver } from 'type-graphql-v2-fork';

@Resolver()
export class QueryResolver {
  @Query(() => String)
  example() {
    return 'Hello World!';
  }
}
