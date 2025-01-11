import React from 'react'

function LoginPending({
    text=""
}) {
    const loadingSkeletonStyle =
    "animate-pulse bg-red-400 h-10 w-full rounded mb-2";
return (
    <>
        <div className="flex h-screen  bg-black justify-center  w-full">
            <div className="border border-slate-500 h-96 w-96 mt-20 text-center text-white font-bold text-xl p-5 space-y-8">
                <h1>{text}</h1>
                <input className={`${loadingSkeletonStyle} outline-none`} readOnly/>
                <input className={`${loadingSkeletonStyle} outline-none`} readOnly/>
                <input className={`${loadingSkeletonStyle} outline-none`} readOnly/>
                <button className={`${loadingSkeletonStyle} outline-none w-1/2`} readOnly/>
            </div>
        </div>
    </>
);
}

export default LoginPending
