import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { VideoUpload } from "../../Store/VideoSlice";
import UploadingPopup from "./UploadingPopup";
function UploadVideo() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const [uploading, setuploading] = useState(false)
    const [videoData, setvideoData] = useState({})
    const dispatch = useDispatch()

    const Upload = async (data) => {
        try {
            if (data) {
                setvideoData(data)
                setuploading(true)
                console.log(data)
                await dispatch(VideoUpload(data)).unwrap()
                reset()
                setuploading(false)

            }
        } catch (error) {
            setuploading(false)
            console.log(error.message)
            throw error
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white p-6 flex justify-center items-center">
            <div className="w-full max-w-5xl bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">Upload Video</h2>

                <form onSubmit={handleSubmit(Upload)} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" htmlFor="thumbnail">
                                Thumbnail
                            </label>
                            <div className="flex items-center justify-center w-full h-48 bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg hover:border-gray-400">
                                
                                <input
                                    type="file"
                                    className="w-full"
                                    id="thumbnail"
                                    accept="image/*"
                                    {...register("thumbnail", {
                                        required: "Thumbnail not selected",
                                    })}
                                />
                            </div>
                            {errors.thumbnail && (
                                <div className="text-red-500">{errors.thumbnail.message}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" htmlFor="video">
                                Video File
                            </label>
                            <div className="flex items-center justify-center w-full h-48 bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg hover:border-gray-400">
                                
                                <input
                                className="w-full"
                                    type="file"
                                    id="video"
                                    accept="video/*"
                                    {...register("video", {
                                        required: "Video not selected",
                                    })}
                                />
                            </div>
                            {errors.video && (
                                <div className="text-red-500">{errors.video.message}</div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" htmlFor="title">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                
                                placeholder="Enter video title"
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                {...register("title", {
                                    required: "Title is missing",
                                })}
                            />
                            {errors.title && (
                                <div className="text-red-500">{errors.title.message}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                placeholder="Enter video description"
                                rows="4"
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                {...register("description", {
                                    required: "Description is missing",
                                })}
                            ></textarea>
                            {errors.description && (
                                <div className="text-red-500">{errors.description.message}</div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Upload Video
                    </button>
                </form>
            </div>
            {
                uploading && (<UploadingPopup file={videoData} />) 
            }
        </div>

    );
}

export default UploadVideo;
