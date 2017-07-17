/* eslint-disable no-console */

import HTTPStatus from 'http-status';
import multer from 'multer';
import Post from './posts.model';
import User from '../users/user.model';

export async function createPost(req, res) {
  try {
    const post = await Post.createPost(req.body, req.user._id);
    return res.status(HTTPStatus.CREATED).json(post);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getPostById(req, res) {
  try {
    const promise = await Promise.all([
      User.findById(req.user.id),
      Post.findById(req.params.id).populate('author')
    ]);
    const favorite = promise[0]._favorites.isPostIsFavorite(req.params.id);
    const post = promise[1];
    //   const post = await Post.findById(req.params.id).populate('author');
    return res.status(HTTPStatus.OK).json({
      ...post.toJSON(),
      favorite
    });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getPostsList(req, res) {
  // http://localhost:4000/api/posts?limit=3&skip=2
  const skip = parseInt(req.query.skip, 0);
  const limit = parseInt(req.query.limit, 0);
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Post.list({ skip, limit })
    ]);

    const posts = promise[1].reduce((arr, post) => {
      const favorite = promise[0]._favorites.isPostIsFavorite(post._id);
      arr.push({
        ...post.toJSON(),
        favorite
      });
      return arr;
    },[]);

    return res.status(HTTPStatus.OK).json(posts);
    // const posts = await Post.list({ skip, limit });
    // const posts = await Post.find().populate('author');
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updatePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.author.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    Object.keys(req.body).forEach(key => {
      post[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await post.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deletePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.author.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    await post.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function favoritePost(req, res) {
  try {
    const user = await User.findById(req.user._id);
    await user._favorites.posts(req.params.id);
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null,'./dist/assets/images');
  },
  filename: (req, file, cb) => {
    if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
      const err = new Error();
          err.code = 'filetype';
        return cb(err);
    }
      const typeFile = file.originalname.split('.')[file.originalname.split('.').length -1];
      const nameFile = file.originalname.replace(`.${typeFile}`,'');
      cb(null, `${nameFile}-${Date.now()}.${typeFile}`);
  }
});

const upload = multer({
   storage,
   limits: {
      fileSize: 8000000
   }
}).single('file');

export async function uploadImage(req, res){
  try {
    upload(req, res, (err) =>  {
     console.log(req.file);
     if(err){
       if(err.code === 'LIMIT_FILE_SIZE'){
         return res.status(HTTPStatus.BAD_REQUEST).json({success: false, message: 'File size is too large. Max limit is 8MB'})
       }else if(err.code === 'filetype'){
         return res.status(HTTPStatus.BAD_REQUEST).json({success: false, message: 'File type is invalid. Must be .png,.jpg,.jpeg'})
       }
         return res.status(HTTPStatus.BAD_REQUEST).json({success: false, message: 'File was not able to be uploaded !'});
     }
     return res.status(HTTPStatus.OK).json({success: true, message: 'File was uploaded !'});
   });

  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
