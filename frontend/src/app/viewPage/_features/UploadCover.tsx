'use client'

import { useProfile } from "@/app/provider/ProfileProvider"
import { Button } from "@/components/ui/button";

export const UploadCover = () => {
    const { profile } = useProfile();

    

    return (
        <div className="w-full h-[320px]">
            {!profile?.backgroundImage ?
                <div className="bg-[#F4F4F5] w-full h-full flex justify-center items-center">
                    <Button>Add a cover image</Button>
                </div>
                :
                <div className="relative">
                    <img src={profile.backgroundImage} alt="background" className="w-full h-full object-cover"  />
                    <div className="absolute">Change cover
                        
                    </div>
                </div>

            }
        </div>
    )
}