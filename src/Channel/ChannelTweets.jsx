import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { GetChannelTweets } from '../Store/ChannelSlice'
import { useSelector } from 'react-redux'
import { timeAgo } from '../Utilities/TimeConversion'

function ChannelTweets() {

  const Tweets = useSelector((state) => state.Channel.ChannelTweetss)
  const User = useSelector((state) => state.Auth.UserData)
  const ChannelData = useOutletContext()
  const dispatch = useDispatch()
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

  return (
    Tweets.length !== 0 ? Tweets.map((tweet) => (
      <div className="bg-gray-800 text-gray-100 rounded-lg shadow-md p-4 mb-4">
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


        {tweet.image && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={tweet.image.url}
              alt="Tweets Image"
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>
    )
    ) : (
      <div className="h-full flex items-center justify-center">
        <h1 className="text-xl text-gray-500">No Tweets</h1>
      </div>
    )
  )

};



export default ChannelTweets
