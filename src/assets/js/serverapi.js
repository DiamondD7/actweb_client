const userapiVar = import.meta.env.VITE_USER_API;
const postapiVar = import.meta.env.VITE_POST_API;
const chatapiVar = import.meta.env.VITE_CHAT_API;
const notificationapiVar = import.meta.env.VITE_NOTIFICATION_API;

//UserAPI
export const BASE_URL = userapiVar;
export const USER_API_URI = `${userapiVar}/api/Users`;
export const ValidateToken = `${userapiVar}/api/Users/validate-user-token`;
export const GetUserBackgrounds = `${userapiVar}/api/Users/get-user-backgrounds`;
export const GetUsersByIds = `${userapiVar}/api/Users/userIds`;
export const GetUsersAccounts = `${userapiVar}/api/Users/users-accounts`;
export const GetFeaturedBackgrounds = `${userapiVar}/api/Users/get-featured-backgrounds`;
export const UserCreation = `${userapiVar}/api/Users/create-user`;
export const CheckLogin = `${userapiVar}/api/Users/check-login`;
export const ValidateTokens = `${userapiVar}/api/Users/validate-tokens`;
export const UploadProfilePicture = `${userapiVar}/api/Users/upload-profile-picture`;
export const UpdateData = `${userapiVar}/api/Users/update-user-data`;
export const UpdateUserBackground = `${userapiVar}/api/Users/update-user-background`;
export const AddUserBackground = `${userapiVar}/api/Users/add-user-background`;
export const Logout = `${userapiVar}/api/Users/logout`;

//UserAPI / SavedPosts
export const GetSavedPostIds = `${userapiVar}/api/SavedPost/saved-ids`;
export const SavePost = `${userapiVar}/api/SavedPost/saved-post`;

//-----FOLLOWING
export const AddFollowing = `${userapiVar}/api/Following`;
export const DiscoverUsers = `${userapiVar}/api/Following/users`;
export const GetFollowing = `${userapiVar}/api/Following/following`;
export const GetFollowers = `${userapiVar}/api/Following/followers`;
export const UnFollow = `${userapiVar}/api/Following`;

//-----PostAPI
export const BASE_POST_API = postapiVar;
export const UpdatePost = `${postapiVar}/api/Post`;
export const GetPosts = `${postapiVar}/api/Post/get-posts`;
export const GetReels = `${postapiVar}/api/Post/reels`;
export const GetFollowingPosts = `${postapiVar}/api/Post/postsoffollowing`;
export const UploadVideo = `${postapiVar}/api/Post/upload-video`;
export const AddPost = `${postapiVar}/api/Post/add-post`;
export const GetPostsByIds = `${postapiVar}/api/Post/posts-by-ids`;

//POST COMMENT
export const AddComment = `${postapiVar}/api/Comment`;
export const GetComments = `${postapiVar}/api/Comment/comments`;

//POST LIKE
export const AddLike = `${postapiVar}/api/Like`;
export const GetLikes = `${postapiVar}/api/Like/likes`;
export const CheckLike = `${postapiVar}/api/Like/user-like`;

//ChatAPI
export const GetMessages = `${chatapiVar}/api/Message/chatroom`;
export const GetPreviewMessages = `${chatapiVar}/api/Message/message-preview`;
export const GetChats = `${chatapiVar}/api/Message/chats`;
export const CreateChatRoom = `${chatapiVar}/api/Message/chatroom`;
export const MessageSent = `${chatapiVar}/api/Message/message`;
export const MarkSeenMessage = `${chatapiVar}/api/Message`;

//NotificationAPI
export const GetNotificationIds = `${notificationapiVar}/api/Notification/notification/ids`;
export const SaveNotification = `${notificationapiVar}/api/Notification/notification`;

//CastingCallAPI
export const GetCastingCalls =
  "http://localhost:5067/api/CastingCall/casting-calls";

//EventsAPI
export const GetAllEvents = `http://localhost:5041/api/Events`;
