//UserAPI
export const BASE_URL = "http://localhost:5016";
export const USER_API_URI = "http://localhost:5016/api/Users";
export const ValidateToken =
  "http://localhost:5016/api/Users/validate-user-token";
export const GetUserBackgrounds =
  "http://localhost:5016/api/Users/get-user-backgrounds";
export const GetUsersByIds = "http://localhost:5016/api/Users/userIds";
export const GetFeaturedBackgrounds =
  "http://localhost:5016/api/Users/get-featured-backgrounds";
export const UserCreation = "http://localhost:5016/api/Users/create-user";
export const CheckLogin = "http://localhost:5016/api/Users/check-login";
export const ValidateTokens = "http://localhost:5016/api/Users/validate-tokens";
export const UploadProfilePicture =
  "http://localhost:5016/api/Users/upload-profile-picture";
export const UpdateData = "http://localhost:5016/api/Users/update-user-data";
export const UpdateUserBackground =
  "http://localhost:5016/api/Users/update-user-background";
export const AddUserBackground =
  "http://localhost:5016/api/Users/add-user-background";
export const Logout = "http://localhost:5016/api/Users/logout";

//-----FOLLOWING
export const AddFollowing = "http://localhost:5016/api/Following";
export const DiscoverUsers = "http://localhost:5016/api/Following/users";
export const GetFollowing = "http://localhost:5016/api/Following/following";
export const GetFollowers = "http://localhost:5016/api/Following/followers";
export const UnFollow = "http://localhost:5016/api/Following";

//-----PostAPI
export const BASE_POST_API = "http://localhost:5123";
export const UpdatePost = "http://localhost:5123/api/Post";
export const GetPosts = "http://localhost:5123/api/Post/get-posts";
export const GetReels = "http://localhost:5123/api/Post/reels";
export const GetFollowingPosts =
  "http://localhost:5123/api/Post/postsoffollowing";
export const UploadVideo = "http://localhost:5123/api/Post/upload-video";
export const AddPost = "http://localhost:5123/api/Post/add-post";

//POST COMMENT
export const AddComment = "http://localhost:5123/api/Comment";
export const GetComments = "http://localhost:5123/api/Comment/comments";

//POST LIKE
export const AddLike = "http://localhost:5123/api/Like";
export const GetLikes = "http://localhost:5123/api/Like/likes";
export const CheckLike = "http://localhost:5123/api/Like/user-like";

//ChatAPI
export const GetMessages = "http://localhost:5188/api/Message/chatroom";
export const GetPreviewMessages =
  "http://localhost:5188/api/Message/message-preview";
export const GetChats = "http://localhost:5188/api/Message/chats";
export const CreateChatRoom = "http://localhost:5188/api/Message/chatroom";
export const MessageSent = "http://localhost:5188/api/Message/message";
export const MarkSeenMessage = "http://localhost:5188/api/Message";

//NotificationAPI
export const GetNotificationIds =
  "http://localhost:5164/api/Notification/notification/ids";
export const SaveNotification =
  "http://localhost:5164/api/Notification/notification";

//CastingCallAPI
export const GetCastingCalls =
  "http://localhost:5067/api/CastingCall/casting-calls";

//EventsAPI
export const GetAllEvents = "http://localhost:5041/api/Events";
