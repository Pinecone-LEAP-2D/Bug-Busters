import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export type ProfileFormik = {
  name: string;
  about: string;
  socialMediaURL: string;
  userId: number | undefined
  backgroundImage: string;
  successMessage: string;
};

export type ProfileProps = {
  setStep: (setStep: number) => void
  userId: number | undefined
}

export type CreateProfileParams = {
  name: string;
  about: string;
  avatarImage: string | null;
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
  userId: number;
};
export type Donor = {
  id: number;
  profile: Profile;
};
export type Profile = {
  name: string;
  avatarImage: string;
};
export type Donation = {
  amount: number;
  createdAt: Date;
  donor: Donor;
  donorId: number;
  id: number;
  recipientId: number;
  socialURLOrBuyMeCoffee: string;
  specialMessage: string;
  updatedAt: Date;
  SocialMediaUrl: string;
};


export type ProfileType = {
    _id: string;
    name: string
    about: string
    avatarImage: string
    backgroundImage: string
    successMessage: string
    userId: number
}

export type ProfileContextType = {
    profile?: ProfileType;
    isLoading: boolean
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}

export type EditProfileType = {
    userId: number | undefined
    setIsEditing: (setIsEditing: boolean) => void
}

