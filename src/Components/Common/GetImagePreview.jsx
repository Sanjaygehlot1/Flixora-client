
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { FaCameraRetro } from "react-icons/fa6";


function GetImagePreview({
    name,
    control,
    label,
    defaultValue = "",
    className,
    cameraIcon = true,
    cameraSize = 20,
    image
}) {
    const [preview, setPreview] = useState(null);

    const handlePreview = (e) => {
        const files = e.target.files;
        console.log(files)
        setPreview(URL.createObjectURL(files[0]));
        console.log(preview)
        cameraIcon = false 
        return files;
    };
    return (
        <>
            <div className="w-full">
                <label
                    htmlFor={name}
                    className="cursor-pointer relative flex flex-col justify-center items-start"
                >
                    {label && (
                        <label className="inline-block mb-2 pl-1">
                            {label}
                        </label>
                    )}
                    <img
                        src={preview || image}
                        className={className}
                    />
                    {cameraIcon && (
                        <FaCameraRetro 
                        size={cameraSize}
                        color="white"
                        
                    className="hover:text-red-600 absolute inline-flex justify-center items-center w-full"
                        />
                    )}
                    <Controller
                        name={name}
                        control={control}
                        defaultValue={defaultValue || ""}
                        
                        render={({ field: { onChange } }) => (
                            <input
                                id={name}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    onChange(handlePreview(e));
                                }}
                            />
                        )}
                        rules={{required: true}}
                    />
                </label>
            </div>
        </>
    );
}

export default GetImagePreview;
