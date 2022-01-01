const endpoints = {
    // CRUD posts
    GET_ALL_POSTS: "/post",
    CREATE_POST: "/post",
  
    // Like & unlike post
    LIKE_UNLINKE: "/post/:id/likeunlike",
    POST_LIKED: "/post/:id/postLikedByUser",
  
    // Images
    GET_ONE_IMAGE: "/post/image/:id",
  
    // CRUD comments
    GET_ALL_COMMENTS: "/comment",
    // CREATE_COMMENT: "/api/post/:id/comments/create",
    CREATE_COMMENT: "/comment/:id/",
  
    // Auth
    USER_SIGNUP: "/auth/signup",
    USER_LOGIN: "/auth/login",
    USER_LOGOUT: "/auth/logout",
  
    // RUD user
    GET_ONE_USER: "/user/:id",
    GET_ALL: "/user/",
    UPDATE_USER: "/user/:id",
    DELETE_USER: "/user/:id",
  };
  
  export default endpoints;

