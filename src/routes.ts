import {Router} from 'express';
import multer from 'multer';
import uploadConfig from './config/uploadConfig';
import CreatePostService from './services/CreatePostService'
import DeletePostService  from './services/DeletePostService'
import PostRepository from './repositories/PostRepository'

const routes = Router()
const upload = multer(uploadConfig);




routes.post('/posts',upload.single('photo'),async (req,res)=>{
  const postRepository = new PostRepository();
  console.log(req.file)
  /*try {
    const {name} = req.body;
    const {files} = req;
    const createPostService = new CreatePostService(postRepository);

    const post = await createPostService.execute({
      name,
      avatarFileName: files.avatar[0].filename,
      publicationFileName: files.publication[0].filename
    });


    return res.json(post);
  } catch (err) {
    throw new Error(err);
  }*/
})

routes.get('/posts/files',async (req,res)=>{
  try{
    const postRepository = new PostRepository();

    const posts = await postRepository.find();
    
    return res.json(posts);
  } catch(err){
    throw new Error(err)
  }
})

routes.get('/post/:id',async (req,res)=>{
  try{
    const postRepository = new PostRepository();

    const {id} = req.params;
    const post = await postRepository.findOne(id);
    if(!post){
      throw new Error('post was not found')
    }
    
    return res.json(post);
  } catch(err){
   return res.json({error: err.message})
  }
})

routes.delete('/posts/:id', async (req,res)=>{
  try{
    const postRepository = new PostRepository();

    const {id} = req.params;

    const deletePostService = new DeletePostService(postRepository);

    await deletePostService.execute(id);

    return res.send()

  } catch(err){
    return res.json({error: err.message})
  }
})

routes.put('/posts/:id', (req,res)=>{

})


export default routes;