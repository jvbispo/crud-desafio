import Post from '../entities/Post';
import ICreatePost from './ICreatePost';

export default interface IPostRepository {
  create(data: ICreatePost): Promise<Post>;
  save(post: Post): Promise<void>;
  delete(id: string): Promise<void>;
  find(): Promise<Post[]>;
  findOne(id: string): Promise<Post | undefined>;
}
