'use client'

import { Donate } from "./_features/Donate"
import { EditProfile } from "./_features/EditProfile"
import { UploadCover } from "./_features/UploadCover"

export default function Home() {
    return(
        <div>
            <EditProfile />
            <Donate/>
            <UploadCover/>
        </div>
    )
  }
  