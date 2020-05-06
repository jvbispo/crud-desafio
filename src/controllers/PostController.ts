import { Request, Response } from 'express';
import CreatePostService from '../services/CreatePostService';
import DeletePostService from '../services/DeletePostService';
import PostRepository from '../repositories/PostRepository';
import UpdatePostService from '../services/UpdatePostService';

class PostController {
  public async index(req: Request, res: Response) {
    try {
      const postRepository = new PostRepository();

      const { id } = req.params;
      const post = await postRepository.findOne(id);
      if (!post) {
        throw new Error('post was not found');
      }

      return res.json(post);
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const postRepository = new PostRepository();

      const posts = await postRepository.find();

      return res.json(posts);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async post(req: Request, res: Response) {
    const postRepository = new PostRepository();

    try {
      const createPostService = new CreatePostService(postRepository);
      const { name } = req.body;
      const { files } = req;
      const post = await createPostService.execute({
        name,
        avatarFileName: files.avatar[0].filename,
        publicationFileName: files.publication[0].filename,
      });

      return res.json(post);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async update(req: Request, res: Response) {
    const postRepository = new PostRepository();

    try {
      const updatePostService = new UpdatePostService(postRepository);
      const { name } = req.body;
      const { files } = req;
      const { id } = req.params;

      const avatar = files?.avatar as Express.Multer.File;
      const publication = files?.pulication as Express.Multer.File;

      const post = await updatePostService.execute({
        id,
        name,
        avatarFileName: avatar && files.avatar[0].filename,
        publicationFileName: publication && files.publication[0].filename,
      });

      return res.json(post);
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const postRepository = new PostRepository();

      const { id } = req.params;

      const deletePostService = new DeletePostService(postRepository);

      await deletePostService.execute(id);

      return res.send();
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}

export default PostController;
