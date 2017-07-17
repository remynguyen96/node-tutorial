import Joi from 'joi';

export default {
  createPost: {
    body: {
      title: Joi.string().min(3).required(),
      description: Joi.string().min(10).required(),
    },
  },
  updatePost: {
    body: {
      title: Joi.string().min(3),
      description: Joi.string().min(10),
    },
  },
};

//   createPost: {
//     body: {
//       title: Joi.string().required().min(5).trim(),
//       slug: Joi.string().required().min(5).lowercase().trim(),
//       description: Joi.string().required().min(5),
//     }
//   },
