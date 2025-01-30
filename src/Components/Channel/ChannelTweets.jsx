import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { AddTweet, Delete, GetChannelTweets, TweetLike, UpdateTweet } from '../../Store/TweetSlice.js';
import { useSelector } from 'react-redux';
import { timeAgo } from '../../Utilities/TimeConversion.js';
import Button from '../Common/Button.jsx';
import { set, useForm } from 'react-hook-form';
import { FaEllipsisH } from 'react-icons/fa';
import Loader from '../../Utilities/Loader.jsx';

function ChannelTweets() {
  const Tweets = useSelector((state) => state.Tweet.channelTweets);
  const User = useSelector((state) => state.Auth.UserData);
  const ChannelData = useOutletContext();
  const dispatch = useDispatch();
  const [LikeStatus, setLikeStatus] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editTweetId, setEditTweetId] = useState(null);
  const [DeleteTweetId, setDeleteTweetId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [EditProgress, setEditProgress] = useState(false);
  const [DeleteProgress, setDeleteProgress] = useState(false);
  const [UploadProgress, setUploadProgress] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const toggleDropdown = (tweetId) => {
    if (dropdownOpen === tweetId) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(tweetId);
    }
  };


  const openModal = (tweet) => {
    setIsOpen(true)
    setDeleteTweetId(tweet._id)
  }
  const closeModal = () => {
    setIsOpen(false)
    setDeleteTweetId(null)
  }



  const { register, handleSubmit, formState: { errors } ,reset } = useForm();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        await dispatch(GetChannelTweets(ChannelData._id)).unwrap();
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTweets();
  }, []);

  const LikeTweet = async (tweetId) => {
    try {
      setLikeStatus(true);
      await dispatch(TweetLike(tweetId)).unwrap();
      await dispatch(GetChannelTweets(ChannelData._id)).unwrap();
      setLikeStatus(false);
    } catch (error) {
      setLikeStatus(false);
      console.error(error.message);
    }
  };

  const PostTweet = async (data) => {
    try {
      setUploadProgress(true)
      await dispatch(AddTweet(data)).unwrap();
      await dispatch(GetChannelTweets(ChannelData._id)).unwrap();
      setUploadProgress(false)
      reset()
    } catch (error) {
      setUploadProgress(false)
      console.error(error.message);
    }
  };

  const DeleteTweet = async (tweetId) => {
    try {
      setDeleteProgress(true)
      await dispatch(Delete(tweetId)).unwrap();
      await dispatch(GetChannelTweets(ChannelData._id)).unwrap();
      setDeleteProgress(false)
      closeModal()
    } catch (error) {
      setDeleteProgress(false)
      console.error(error.message);
    }
  };

  const openEditModal = (tweet) => {
    setEditTweetId(tweet._id);
    setEditContent(tweet.content);
  };

  const closeEditModal = () => {
    setEditTweetId(null);
    setEditContent('');
  };

  const handleEditSubmit = async () => {
    try {
      setEditProgress(true)
      await dispatch(UpdateTweet({ tweetId: editTweetId, NewContent: editContent })).unwrap();
      await dispatch(GetChannelTweets(ChannelData._id)).unwrap();
      setEditProgress(false)
      closeEditModal();
      toggleDropdown(editTweetId)
    } catch (error) {
      setEditProgress(false)
      console.error(error.message);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(PostTweet)}>
        <div className="flex items-start flex-col gap-2">
          <div className='w-full'>
            <label className="block text-xl font-bold my-2 mb-2" htmlFor="description">
              Post Tweet
            </label>
            <textarea
              id="tweet"
              placeholder="What's on your mind?"
              rows="4"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              {...register("content", { required: "Content is missing" })}
            ></textarea>
            {errors.content && (
              <div className="text-red-500">{errors.content.message}</div>
            )}

          </div>
          <div>
            <input
              accept="image/*"
              type="file"
              {...register("image")}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-gray-100 hover:file:bg-gray-500"
            />
            {errors.image && (
              <div className="text-red-500">{errors.image.message}</div>
            )}
          </div>
          <Button type="submit" className="bg-red-500 font-bold text-lg hover:bg-red-600 py-1 px-9 mb-4 rounded-md">
          {!UploadProgress ? "Post" : <Loader />}
          </Button>
        </div>
      </form>

      {Tweets.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Tweets.map((tweet) => (
            <div
              key={tweet._id}
              className=" bg-gray-900  border border-gray-700 border-b-4  overflow-hidden h-fit text-gray-100 rounded-lg shadow-md p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col items-start gap-1">
                  <img
                    src={User.data.avatar}
                    alt={User.data.username}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-bold  text-sm">{tweet.content}</h4>
                    <p className="text-xs text-gray-400">{timeAgo(tweet.createdAt)}</p>
                  </div>
                </div>

                {tweet.owner === User.data._id && (
                  <div className="relative">
                    <FaEllipsisH
                      className="cursor-pointer text-gray-400 hover:text-gray-100"
                      onClick={() => toggleDropdown(tweet._id)}
                    />
                    {dropdownOpen === tweet._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded-lg shadow-lg z-10">
                        <ul className="py-1">
                          <li
                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={() => openEditModal(tweet)}
                          >
                            Edit
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={() => openModal(tweet)}
                          >
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {tweet.image?.url && (
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
                  onClick={() => {
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
            </div>

          ))}
        </div>
      ) : (
        <div className="h-full bg-gray-800 flex items-center justify-center">
          <h1 className="text-xl text-gray-500">No Tweets</h1>
        </div>
      )
      }

      {
        editTweetId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-lg font-bold text-white mb-4">Edit Tweet</h2>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
              <div className="flex justify-end gap-2 mt-4">
                <Button className="bg-gray-700 hover:bg-gray-600 py-1 px-4  rounded-lg" onClick={closeEditModal}>
                  Cancel
                </Button>
                <Button className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg" onClick={handleEditSubmit}>
                  {!EditProgress ? "Save" : <Loader />}
                </Button>
              </div>
            </div>
          </div>
        )
      }
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 rounded-2xl shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold text-white">
              Confirm Delete
            </h2>
            <p className="text-white mt-2">
              Are you sure you want to delete this tweet? This action cannot be
              undone.
            </p>

            <div className="mt-6 flex justify-end space-x-4">
              <Button
                onClick={closeModal}
                className="bg-gray-600 text-white rounded-lg px-2 py-1  hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  DeleteTweet(DeleteTweetId)
                }}
                className="bg-red-600 text-white hover:bg-red-700 rounded-lg px-2 py-1 "
              >
                {!DeleteProgress ? "Delete" : <Loader />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}

export default ChannelTweets;
