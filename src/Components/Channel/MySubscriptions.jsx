import { useEffect , useState} from 'react'
import { GetUserSubscriptions } from '../../Store/SubscriptionSlice'
import LoginPopUp from '../LoginPopUp'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Common/Button'
import { ToggleSubscription } from '../../Store/SubscriptionSlice'
function MySubscriptions() {

    const MySubs = useSelector((state) => state.Subscription.UserSubscriptions)
    const CurrentUser = useSelector((state) => state.Auth.UserData)
    const LoginStatus = useSelector((state) => state.Auth.Status)
    const [SubscribeLoading, setSubscribeLoading] = useState(false)

    console.log(CurrentUser)
    console.log(MySubs)
    console.log(LoginStatus)
    const navigate = useNavigate()
    const ChannelData = useOutletContext()
    console.log(ChannelData)

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
            <div className='flex w-full justify-center p-6 bg-gray-900 min-h-screen'>
                <h1 className='font-bold text-lg'>
                    No Subscriptions
                </h1>
            </div>
        )
    }

    return (
        <div className="space-y-4 w-full">
            {MySubs.map((subscription) => (
                <div key={subscription._id} className="bg-gray-800 text-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center  mx-2 mt-2 gap-4">
                    <div>
                        <img
                            src={subscription.channel_details.avatar}
                            alt={`${subscription.channel_details.username}'s avatar`}
                            onClick={() => { navigate(`/dashboard/${subscription.channel_details.username}/videos`) }}
                            className="rounded-full cursor-pointer w-16 h-16 object-cover mx-auto" />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl text-center">{subscription.channel_details.username}</h2>
                    </div>
                    <div className="flex justify-end  w-full">
                        <Button
                            bgColor={'bg-red-600'}
                            className='px-2  rounded-lg'
                            onClick={()=>{
                                Subscribe(subscription.channel_details._id)
                            }}
                            disabled={SubscribeLoading}>

                            Unsubscribe
                        </Button>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default MySubscriptions