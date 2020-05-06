import Post from "../entities/Post";
import {Repository, getRepository} from 'typeorm'
import IPostRepository from "../dtos/IPostRepository";
import ICreatePostInterface from "../dtos/ICreatePost";

class PostsRepository implements IPostRepository{
  private ormRepository: Repository<Post>;

  constructor(){
    this.ormRepository = getRepository(Post)
  }

  async create({name,avatarFileName,publicationFileName}: ICreatePostInterface): Promise<Post>{
      const post =  this.ormRepository.create({name, 
        avatar_name: avatarFileName, 
        publication_image_name: publicationFileName});

      await this.save(post)

      return post;
  }

  async find():Promise<Post[]>{
    console.log('chegou aq')
    const posts = await this.ormRepository.find()
    console.log(posts)
    return posts
  }

  async findOne(id: string): Promise<Post | undefined> {
    const post = await this.ormRepository.findOne(id);

    return post;
  }

  async save(post: Post): Promise<void>{
    await this.ormRepository.save(post)
  }

  async delete(id: string): Promise<void> {
   const post =  await this.ormRepository.findOne(id)
   post && await this.ormRepository.remove( post);
    
  }

}

export default PostsRepository;