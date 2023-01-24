import { v2 as cloudinary } from 'cloudinary';
import Post from '../../../models/Post';
import dbConnect from '../../../utils/mongo';


dbConnect()

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export default async function handler(req, res) {
    switch(req.method){
        case "POST":
            await createPost(req, res)
            break;
        case "GET":
            await getPosts(req, res)
            break;
    }
  }
  

const createPost = async (req, res) => {
  
  try {
    const { name, prompt, photo } = req.body.form;

    const photoUrl = await cloudinary.uploader.upload(photo);

    
        const newPost = await Post.create({
          name,
          prompt,
          photo: photoUrl.secure_url,
        });
    
        res.status(200).json({ success: true, data: newPost });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
      }
  };
  
  
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
      }
  }