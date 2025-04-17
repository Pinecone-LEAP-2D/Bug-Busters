type PropsType = {
  username: string | undefined;
  about: string | undefined;
  avatar: string | undefined;
};

const AboutUser = ({ username, about, avatar }: PropsType) => {
  return (
    <div className="w-[625px] h-auto rounded-lg bg-white p-6">
      <div className="pb-6 flex gap-2 items-center">
        <img
          className="w-12 h-12  rounded-full"
          src={avatar ? avatar : undefined}
        />
        <h1 className="text-[20px] text-black font-semibold">{username}</h1>
      </div>
      <div className="pt-6 border-t-2 ">
        <h1 className="font-medium mb-4">About User</h1>
        <p>{about}</p>
      </div>
    </div>
  );
};

export default AboutUser;
