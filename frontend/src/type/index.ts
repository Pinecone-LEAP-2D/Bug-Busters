export type ProfileFormik = {
  name: string;
  about: string;
  socialMediaURL: string;
  userId: number;
  backgroundImage: string;
  successMessage: string;
};

export type ProfileProps = {
    setStep: (setStep: number) => void
    userId: number
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
