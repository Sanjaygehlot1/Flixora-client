import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Common/Button'
import { GetUserSubscriptions } from '../../Store/SubscriptionSlice'
import LoginPopUp from '../LoginPopUp'
function MySubscriptions() {

    const MySubs = useSelector((state)=>state.Subscription.UserSubscriptions)
    const CurrentUser = useSelector((state)=>state.Auth.UserData)
    const LoginStatus = useSelector((state)=>state.Auth.Status)
   console.log(CurrentUser)
   console.log(MySubs)
   console.log(LoginStatus)

    const dispatch = useDispatch()
    useEffect(()=>{

        const GetSubscriptions = async ()=>{
            const Response = await dispatch(GetUserSubscriptions(CurrentUser.data._id)).unwrap()
            console.log(Response)

            if(Response){
                console.log(Response)
            }
        }
        GetSubscriptions()
    },[CurrentUser, LoginStatus])

    if(!LoginStatus){
        return <LoginPopUp/>
      }

    if(MySubs.length === 0){
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
            {MySubs.map((subscriber) => (
                <div key={subscriber._id} className="bg-gray-800 text-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center  mx-2 mt-2 gap-4">
                    <div>
                        <img src={subscriber.channel_details.avatar} alt={`${subscriber.channel_details.username}'s avatar`} className="rounded-full w-16 h-16 object-cover mx-auto"/>
                    </div>
                    <div>
                        <h2 className="font-bold text-xl text-center">
                            {subscriber.channel_details.username}
                        </h2>
                    </div>
                    <div className="flex justify-end  w-full">
                        <Button bgColor={'bg-red-600'} className='px-2  rounded-lg'>
                            Unsubscribe
                        </Button>
                    </div>
                </div>
            ))}
        </div>
  )
}

export default MySubscriptions
