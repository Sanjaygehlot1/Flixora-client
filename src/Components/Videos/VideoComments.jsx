import React,{useState} from 'react'
import { AddComment, CommentDelete, EditComment, GetAllComments } from '../../Store/CommentSlice'
import { useDispatch } from 'react-redux'
import Button from '../Common/Button'
import { useForm } from 'react-hook-form'
import Loader from '../../Utilities/Loader'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Input from '../Common/Input'
import { timeAgo } from '../../Utilities/TimeConversion'

function VideoComments() {

    const videoId = useParams()
    const Comments = useSelector((state) => state.Comment.AllComments)
    const CurrentUser = useSelector((state) => state.Auth.UserData)
    const LoadingStatus = useSelector((state) => state.Comment.Loading)

    const dispatch = useDispatch()
    const [OpenDeletePopup, setOpenDeletePopup] = useState(false)
    const [newContent, setnewContent] = useState("")
    const [OpenEditPopup, setOpenEditPopup] = useState(false)
    const [commentId, setcommentId] = useState(null)
    const { register, handleSubmit, reset } = useForm()

    const AllComments = async () => {
        try {
            if (videoId) {
                await dispatch(GetAllComments(videoId.videoId)).unwrap();
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    useEffect(() => {

        AllComments();
    }, [videoId]);

    const Comment = async (data) => {
        try {
            console.log(data.content)
            console.log(videoId)
            await dispatch(AddComment({ videoId: videoId.videoId, data: data })).unwrap()
            AllComments()

        } catch (error) {
            console.log(error.message)
            throw error
        }
    }
    const DeleteComment = async (commentId) => {
        try {
            await dispatch(CommentDelete(commentId)).unwrap()
            AllComments()
            setOpenDeletePopup(false)
        } catch (error) {
            setOpenDeletePopup(false)
            console.log(error.message)
            throw error
        }
    }

    const UpdateComment = async (commentId) => {
        try {
            await dispatch(EditComment({commentId : commentId , NewContent : newContent})).unwrap()
            setOpenEditPopup(false)
            setnewContent("")
            AllComments()
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }
    console.log(Comments)
    return (
        <div className="bg-gray-900 p-3 rounded-lg shadow-md">
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

                    >
                        Send
                    </Button>
                </div>
            </form>

            {
                Comments.length !== 0 ? (
                    <div className="space-y-4">
                        {Comments.map((comment) => (
                            <div
                                key={comment._id}
                                className="flex items-start gap-4 p-2 bg-gray-800 rounded-lg shadow-md overflow-hidden relative"
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
                                    <p className="text-gray-300 mt-2 break-words">
                                        {comment.content}
                                    </p>
                                </div>

                                {
                                  comment.comment_owner.username === CurrentUser.data.username ? (
                                    <div>
                                        <Button onClick={()=>{
                                            setOpenDeletePopup(true)
                                            setcommentId(comment._id)
                                                                 
                                        }}>
                                            Delete
                                        </Button>
                                        <Button  onClick={()=>{
                                            setOpenEditPopup(true)
                                            setcommentId(comment._id)
                                                                 
                                        }}>
                                            Edit
                                        </Button>
                                    </div>
                                  ) : ""  
                                }
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-400 text-center">No Comments</div>
                )
            }

            {OpenDeletePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 rounded-2xl shadow-lg w-96 p-6">
                        <h2 className="text-xl font-semibold text-white">
                            Confirm Delete
                        </h2>
                        <p className="text-white mt-2">
                            Are you sure you want to delete this comment? This action cannot be
                            undone.
                        </p>

                        <div className="mt-6 flex justify-end space-x-4">
                            <Button
                                onClick={() => {
                                    setOpenDeletePopup(false)
                                    setcommentId(null)
                                }}
                                className="bg-gray-200 text-gray-700 rounded-lg px-2 py-1  hover:bg-gray-300"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    DeleteComment(commentId)
                                }}
                                className="bg-red-600 text-white hover:bg-red-700 rounded-lg px-2 py-1 "
                            >
                                  {LoadingStatus ? <Loader/> : "Delete" }                            
                            </Button>
                        </div>
                    </div>
                </div>)}

            {OpenEditPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-900 p-6 rounded-lg w-1/3">
                        <textarea
                            className="w-full h-24 p-2 bg-gray-800 text-white rounded-lg"
                            value={newContent}
                            onChange={(e) => setnewContent(e.target.value)}
                        />
                        <div className="mt-4 flex justify-between">
                            <Button
                                onClick={() => setOpenEditPopup(false)}
                                className="text-gray-400 hover:text-gray-300"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => UpdateComment(commentId)}
                                className="text-red-500 hover:text-red-700"
                            >
                               {LoadingStatus ? <Loader/> : "Update" }                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>



    )


}

export default VideoComments
