import IPostRepository from "../dtos/IPostRepository";

class DeletePostService {
  constructor(private postRepository: IPostRepository ){}

  async execute(id:string): Promise<void>{
      const post = await this.postRepository.findOne(id)

      if(!post){
        throw new Error('Post was not found!')
      }
  
      await this.postRepository.delete(id);
   
  }

}

export default DeletePostService;