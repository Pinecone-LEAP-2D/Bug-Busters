'use client'

import { useState } from "react"
import { Donate } from "./_features/Donate"
import { EditProfile } from "./_features/EditProfile"
import { UploadCover } from "./_features/UploadCover"
import { ShowProfile } from "./_features/ShowProfile"
import { useUser } from "../provider/UserProvider"
import Header from "../components/Header"

export default function Home() {
    const { userId } = useUser()
    const [isEditing, setIsEditing] = useState(false)
    return (
        <div>
            <Header />
            <div>
                {isEditing ? <EditProfile userId={userId} setIsEditing={setIsEditing} /> : <ShowProfile userId={userId} setIsEditing={setIsEditing} />}
                <Donate />
                <UploadCover />
            </div>
        </div>

    )
}