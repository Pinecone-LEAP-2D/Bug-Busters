type PropsType = {
  url: string | undefined;
};

const SocialMediaUrl = ({ url }: PropsType) => {
  return (
    <div className="p-6 rounded-lg w-[625px]   bg-white">
      <div>
        <h1 className="font-medium mb-6">Social media URL</h1>
        <p>{url}</p>
      </div>
    </div>
  );
};

export default SocialMediaUrl;
