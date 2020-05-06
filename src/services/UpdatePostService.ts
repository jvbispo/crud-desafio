import path from 'path';
import fs from 'fs';
import Post from '../entities/Post';
import uploadConfig from '../config/uploadConfig';
import IPostRepository from '../dtos/IPostRepository';
import IUpdatePost from '../dtos/IUpdatePost';

class UpdateAvatarService {
  constructor(private postRepository: IPostRepository) {}

  public async execute({
    id,
    name,
    avatarFileName,
    publicationFileName,
  }: IUpdatePost): Promise<Post> {
    const post = await this.postRepository.findOne(id);

    if (!post) {
      if (publicationFileName) {
        const postPublicationFilePath = path.join(
          uploadConfig.avatarsDirectory,
          publicationFileName,
        );

        const postAvatarFileExists = await fs.promises.stat(
          postPublicationFilePath,
        );

        if (postAvatarFileExists) {
          await fs.promises.unlink(postPublicationFilePath);
        }
      }

      if (avatarFileName) {
        const postAvatarFilePath = path.join(
          uploadConfig.avatarsDirectory,
          avatarFileName,
        );

        const postAvatarFileExists = await fs.promises.stat(postAvatarFilePath);

        if (postAvatarFileExists) {
          await fs.promises.unlink(postAvatarFilePath);
        }
      }

      throw new Error('Post was not found');
    }

    if (post && avatarFileName) {
      const postAvatarFilePath = path.join(
        uploadConfig.avatarsDirectory,
        post.avatar_name,
      );

      const postAvatarFileExists = await fs.promises.stat(postAvatarFilePath);

      if (postAvatarFileExists) {
        await fs.promises.unlink(postAvatarFilePath);
      }
    }

    if (post && publicationFileName) {
      const publicationFilePath = path.join(
        uploadConfig.publicationsDirectory,
        post.publication_image_name,
      );

      const publicationFileExists = await fs.promises.stat(publicationFilePath);

      if (publicationFileExists) {
        await fs.promises.unlink(publicationFilePath);
      }
    }

    if (avatarFileName) {
      post.avatar_name = avatarFileName;
    }

    if (publicationFileName) post.publication_image_name = publicationFileName;

    if (name) post.name = name;

    await this.postRepository.save(post);

    return post;
  }
}

export default UpdateAvatarService;
