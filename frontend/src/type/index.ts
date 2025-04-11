export type ProfileFormik = {
    name: string;
    about: string;
    socialMediaURL: string;
    userId: number
    backgroundImage: string
    successMessage: string
}

export type ProfileProps = {
    step: number
    setStep: (setStep: number) => void
    userId: number
}

export type CreateProfileParams = {
    name: string
    about: string 
    avatarImage: string | null
    socialMediaURL: string
    backgroundImage: string
    successMessage: string 
    userId: number
}