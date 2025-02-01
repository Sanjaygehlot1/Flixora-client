import { useEffect, useState } from 'react'
import { GetUserSubscriptions } from '../../Store/SubscriptionSlice'
import LoginPopUp from '../LoginPopUp'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Common/Button'
import { ToggleSubscription } from '../../Store/SubscriptionSlice'
import { FaBell } from "react-icons/fa";
import { FaBellSlash } from "react-icons/fa";

function MySubscriptions() {

    const MySubs = useSelector((state) => state.Subscription.UserSubscriptions)
    const CurrentUser = useSelector((state) => state.Auth.UserData)
    const LoginStatus = useSelector((state) => state.Auth.Status)
    const [SubscribeLoading, setSubscribeLoading] = useState(false)

    const navigate = useNavigate()
    const ChannelData = useOutletContext()

    const dispatch = useDispatch()
    useEffect(() => {

        const GetSubscriptions = async () => {

            await dispatch(GetUserSubscriptions(ChannelData._id)).unwrap()

        }
        GetSubscriptions()
    }, [CurrentUser, LoginStatus])

    const Subscribe = async (channelId) => {
        try {

            setSubscribeLoading(true)
            await dispatch(ToggleSubscription(channelId)).unwrap();
            setSubscribeLoading(false)
            await dispatch(GetUserSubscriptions(CurrentUser.data._id)).unwrap()


        } catch (error) {
            setSubscribeLoading(false)
            console.error("Error toggling subscription:", error);
        }
    };

    if (!LoginStatus) {
        return <LoginPopUp />
    }

    if (MySubs.length === 0) {
        return (
            <div className='flex w-full justify-center p-6 bg-gray-900 '>
                <h1 className='font-bold text-lg'>
                    No Subscriptions
                </h1>
            </div>
        )
    }

    return (
        <div className="space-y-4 w-full">
            {MySubs.map((subscription) => (
                <div key={subscription._id} className="bg-gray-800 text-white shadow-md rounded-lg p-2 flex flex-row sm:flex-row items-center justify-between  mx-2 mt-2 gap-4">
                    <div className='flex items-center gap-2'>
                    <div className="flex flex-wrap items-start relative">
                        <img
                            src={subscription.channel_details.avatar}
                            alt={`${subscription.channel_details.username}'s avatar`}
                            onClick={() => { navigate(`/dashboard/${subscription.channel_details.username}/videos`) }}
                            className="w-16 h-16 rounded-full border-2 border-gray-700 hover:border-white transition-all" />
                    </div>
                    <div>
                        <h2 className="font-bold text-md sm:text-lg text-center">{subscription.channel_details.username}</h2>
                    </div>
                    </div>
                    {ChannelData._id === CurrentUser.data._id && (
                        <div className="flex justify-end  w-fit">
                        <Button
                            bgColor={'bg-red-600'}
                            className='px-2 py-1 flex items-center gap-1 rounded-lg'
                            onClick={() => {
                                Subscribe(subscription.channel_details._id)
                            }}
                            disabled={SubscribeLoading}>

                            {<FaBellSlash className='text-lg' />}{<p className='text-xs xs:text-base'>Unsubscribe</p>}
                        </Button>
                    </div>
                    )}
                </div>
            ))
            }
        </div>
    )
}

export default MySubscriptions