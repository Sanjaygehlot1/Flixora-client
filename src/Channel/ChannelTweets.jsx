import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { GetChannelTweets, TweetLike } from '../Store/ChannelSlice'
import { useSelector } from 'react-redux'
import { timeAgo } from '../Utilities/TimeConversion'
import Button from '../Components/Common/Button'

function ChannelTweets() {

  const Tweets = useSelector((state) => state.Channel.channelTweets)
  const User = useSelector((state) => state.Auth.UserData)
  const ChannelData = useOutletContext()
  const dispatch = useDispatch()
  const [LikeStatus, setLikeStatus] = useState(false)
  console.log(Tweets)
  console.log(ChannelData)
  
  useEffect(() => {
    const TweetsResponse = async () => {
      try {
        await dispatch(GetChannelTweets(ChannelData._id)).unwrap()

      } catch (error) {
        console.log(error.message)
        throw error
      }
    }

    TweetsResponse()
  }, [])
  console.log(User)
  console.log(Tweets)

  const LikeTweet = async (tweetId)=>{
    try {
      if(tweetId){
        setLikeStatus(true)
       await dispatch(TweetLike(tweetId)).unwrap()
       await dispatch(GetChannelTweets(ChannelData._id)).unwrap()
        setLikeStatus(false)
      }
    } catch (error) {
      setLikeStatus(false)
      console.log(error.message)
      throw error
    }
  }

  return (
    <div className="w-full">
      {Tweets.length !== 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Tweets.map((tweet) => (
            <div
              key={tweet._id}
              className={`bg-gray-800 overflow-hidden hover:scale-105 transition-transform text-gray-100 rounded-lg shadow-md p-4 ${tweet.image.url ? "" : "col-span-full"
                }`}
            >
              <div className="flex items-center mb-3">
                <img
                  src={User.data.avatar}
                  alt={User.data.username}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-bold text-sm">{tweet.content}</h4>
                  <p className="text-xs text-gray-400"></p>
                </div>
              </div>

              {tweet.image.url && (
                <div className="rounded-lg overflow-hidden mb-3">
                  <img
                    src={tweet.image.url}
                    alt="Tweet Image"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${tweet.Likes_details.some((like) => (
                    like.likedBy === User.data._id
                  )) ? "text-red-600" : ""
                    }`}
                  onClick={()=>{
                    LikeTweet(tweet._id)
                  }}
                  disabled={LikeStatus}

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
                  {tweet.Likes_count}
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
              </div>
              <div>
                <h2 className='text-sm text-gray-400'>{timeAgo(tweet.createdAt)}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <h1 className="text-xl text-gray-500">No Tweets</h1>
        </div>
      )}
    </div>


  )

};



export default ChannelTweets
