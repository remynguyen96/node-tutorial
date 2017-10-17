export default `
  scalar Date
  
  type Status {
    message: String
  }
  
  type Auth {
    token: String
  }
  
  type User {
    _id: ID
    email: String
    firstName: String
    lastName: String
    avatar: String
    password: String
    createdAt: Date
    updatedAt: Date
  }
  
  type Me {
    _id: ID
    email: String
    firstName: String
    lastName: String
    avatar: String
    password: String
    createdAt: Date
    updatedAt: Date
  }
  
  type Categories {
     _id: ID
    name: String
    slug: String
    description: String
    author: User
    createdAt: Date
    updatedAt: Date
  }
  
   type Post {
    _id: ID
    title: String
    alias: String
    description: String
    images: String
    categories: [Categories]
    author: User
    favoriteCount: Int
    createdAt: Date
    updatedAt: Date
  }
  
  type Query {
    getPost(_id: ID): Post
    getPosts: [Post]
    getCategory(_id: ID): Categories
    getCategories: [Categories]
    getUsers: [User]
    me(_id: ID): Me
  }
  
  schema {
    query: Query
  }
`;