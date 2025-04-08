import { Header } from "@/components/Header";
import ProfileForm from "./_components/ProfileForm";

const CreateProfile = () => {
  return (
    <div className="p-5">
      <Header />
      <div className="flex justify-center items-center h-full">
        <ProfileForm />
      </div>
    </div>
  );
};

export default CreateProfile;
