import Post from '../entities/Post';
import IPostRepository from '../dtos/IPostRepository';
import ICreatePost from '../dtos/ICreatePost';

class UpdateAvatarService {
  constructor(private postRepository: IPostRepository) {}

  public async execute({
    name,
    avatarFileName,
    publicationFileName,
  }: ICreatePost): Promise<Post> {
    const avatar = avatarFileName.trim();
    const publication = publicationFileName.trim();
    const post = await this.postRepository.create({
      name,
      avatarFileName: avatar,
      publicationFileName: publication,
    });

    return post;
  }
}

export default UpdateAvatarService;
