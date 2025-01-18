import React, { useEffect, useState } from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  NavLink,
  useNavigate,
  useParams
} from 'react-router-dom'
import {
  GetUserVideos,
  LikeVideo,
  WatchVideo
} from '../../Store/VideoSlice'
import Input from '../Common/Input'
import { timeAgo } from '../../Utilities/TimeConversion'
import VideoLoading from '../../Utilities/VideoLoading'
import {
  CheckSubscription,
  ToggleSubscription
} from '../../Store/SubscriptionSlice'
import {
  AddComment,
  GetAllComments
} from '../../Store/CommentSlice'
import Button from '../Common/Button'
import LoginPopUp from '../LoginPopUp'
import { useForm } from 'react-hook-form'

function Watch_Video() {
  const isSubscribed = useSelector((state) => state.Subscription.isSubscribed)
  const CommentState = useSelector((state) => state.Comment.AllComments)
  const LoginStatus = useSelector((state) => state.Auth.Status)
  const [videoData, setvideoData] = useState(null)
  const [userVideos, setuserVideos] = useState([])
  const [VideoComments, setVideoComments] = useState([])
  const [SubscribeLoading, setSubscribeLoading] = useState(false)
  const [CommentLoading, setCommentLoading] = useState(false)
  const dispatch = useDispatch()
  const videoId = useParams()
  const navigate = useNavigate()

  const { register, handleSubmit, reset } = useForm()

  const video = async () => {
    try {
      const videoResponse = await dispatch(WatchVideo(videoId)).unwrap()

      if (videoResponse) {
        setvideoData(videoResponse)
      }

      const UserVideoResponse = await dispatch(GetUserVideos(videoResponse.owner_details._id)).unwrap()

      if (UserVideoResponse) {
        setuserVideos(UserVideoResponse.data)
      }

    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  const Subscribe = async () => {
    try {
      const isCurrentlySubscribed = isSubscribed;
      setSubscribeLoading(true)
      await dispatch(ToggleSubscription(videoData.owner_details._id)).unwrap();
      setSubscribeLoading(false)

      setvideoData((prev) => ({
        ...prev,
        owner_details: {
          ...prev.owner_details,
          subscribersCount: isCurrentlySubscribed
            ? prev.owner_details.subscribersCount - 1
            : prev.owner_details.subscribersCount + 1,
        },
      }));

    } catch (error) {
      setSubscribeLoading(false)
      console.error("Error toggling subscription:", error);
    }
  };

  const CheckSubs = async () => {
    try {
      await dispatch(CheckSubscription(videoData.owner_details._id)).unwrap()

    } catch (error) {
      throw error
    }
  }

  const handleVideoLike = async () => {
    try {
      await dispatch(LikeVideo(videoId)).unwrap()
      video()

    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  const Comment = async (data) => {
    try {
      setCommentLoading(true)
      console.log(data.content)
      console.log(videoId)
      await dispatch(AddComment({ videoId: videoId.videoId, data: data })).unwrap()
      setCommentLoading(false)

    } catch (error) {
      console.log(error.message)
      throw error
    }
  }


  useEffect(() => {
    video()
  }, [videoId])

  useEffect(() => {
    CheckSubs()
    const AllComments = async () => {
      try {
        if (videoId) {
          const response = await dispatch(GetAllComments(videoId.videoId)).unwrap()
          if (response.docs) {
            setVideoComments(response.docs)
          }
        }
      } catch (error) {
        console.log(error.message)
        throw error
      }
    }
    AllComments()

  }, [videoData, CommentState])




  if (!LoginStatus) {
    return <LoginPopUp />
  }

  if (!videoData) {
    return (<VideoLoading />)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row p-4">
      <div className="w-full lg:w-4/3 lg:pr-4">
        <div className="max-w-full mx-auto">
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <video
              src={videoData.videoFile.url}
              controls
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-between  mb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={videoData.owner_details.avatar}
                  alt="Channel Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-white text-lg font-bold">{videoData.owner_details.username}</p>
                  <p className="text-gray-400 text-sm">{videoData.owner_details.subscribersCount} Subscribers</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${videoData.LikedbyMe ? "text-red-600" : ""}`}
                  onClick={handleVideoLike}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="cursor-pointer"
                    height="25"
                    width="25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path>
                  </svg>
                  {videoData.LikesCount}
                </Button>
                <Button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="25"
                    width="25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 3h-1v13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 16h7l-1.122 3.368A2 2 0 0 0 11.775 22H12l5-5.438V3H6l-3.937 8.649-.063.293V14a2 2 0 0 0 2 2z"></path>
                  </svg>
                </Button>
                <Button
                  onClick={Subscribe}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${isSubscribed ? "bg-red-600" : "bg-gray-400"} text-white`}
                  disabled={SubscribeLoading}
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
              </div>
            </div>

            <div className='w-full'>
              <p className="text-lg font-bold text-white">{videoData.title}</p>
              <div className="bg-gray-800 gap-2 p-4 w-full mt-2 rounded-md shadow-md">
                <p className="text-lg font-bold text-gray-300">Description</p>
                <p className="text-sm font-normal text-gray-300">{videoData.description}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-4 text-white">Comments</h4>
            <form
              onSubmit={handleSubmit((data) => {
                Comment(data);
                reset();
              })}
              className="mb-6"
            >
              <div className="flex items-center gap-2">
                <Input
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition"
                  type="text"
                  placeholder="Add a Comment"
                  {...register("content", {
                    required: "Comment Cannot be empty",
                  })}
                />
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 active:bg-red-800 px-4 py-2 rounded-lg text-sm text-white transition"
                  disabled={CommentLoading}
                >
                  Send
                </Button>
              </div>
            </form>

            {VideoComments.length !== 0 ? (
              <div className="space-y-4">
                {VideoComments.map((comment) => (
                  <div
                    key={comment._id}
                    className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg shadow-md"
                  >
                    <img
                      src={comment.comment_owner.avatar}
                      alt={`${comment.comment_owner.username}'s avatar`}
                      className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                    />
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white">
                          {comment.comment_owner.username}
                        </p>
                        <p className="text-xs text-gray-400">
                          {comment.updatedAt
                            ? timeAgo(comment.updatedAt)
                            : timeAgo(comment.createdAt)}
                        </p>
                      </div>
                      <p className="text-gray-300 mt-2">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Button
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition`}

                        >
                          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="cursor-pointer " height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path></svg>
                        </Button>
                        <Button
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition`}
                        >
                          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M20 3h-1v13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 16h7l-1.122 3.368A2 2 0 0 0 11.775 22H12l5-5.438V3H6l-3.937 8.649-.063.293V14a2 2 0 0 0 2 2z"></path></svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400 text-center">No Comments</div>
            )}
          </div>
        </div>
      </div>



      <div className="hidden lg:block w-full lg:w-1/3 bg-gray-900 p-4 rounded-lg">
        <h4 className="font-bold mb-4">Videos Uploaded By this Channel</h4>
        <div className="space-y-4">

          {userVideos.map((video) => (
            <NavLink
              key={video._id}
              to={`/watch/${video._id}`}
              className={({ isActive }) => {
                return isActive ? "bg-gray-800 border-l-4 border-red-600 flex items-center gap-4 p-2 rounded-lg cursor-pointer transition" : "flex items-center gap-4 p-2 rounded-lg cursor-pointer transition "
              }}
            >
              <div
                key={video._id}
                className="flex items-center cursor-pointer"
              >
                <img
                  src={video.thumbnail.url}
                  alt="Thumbnail"
                  className="w-20 h-12 object-cover rounded"
                />
                <div className="ml-4">
                  <h5 className="text-sm font-bold">{video.title}</h5>
                  <p className="text-gray-400 text-xs">
                    {video.views} Views · {timeAgo(video.createdAt)}
                  </p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Watch_Video
