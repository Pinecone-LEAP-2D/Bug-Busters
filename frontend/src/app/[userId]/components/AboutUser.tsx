const AboutUser = () => {
  return (
    <div className="w-[625px] rounded-lg bg-white p-6">
      <div className="pb-6 flex gap-2 items-center">
        <div className="w-12 h-12 bg-gray-300 rounded-full "></div>
        <h1 className="text-[20px] font-semibold">Space ranger</h1>
      </div>
      <div className="pt-6 border-t-2 ">
        <h1 className="font-medium mb-4">About user</h1>
        <p>
          All day, every day, we're watching, listening to, reading and
          absorbing politics. It's exhausting. We then report on what we've seen
          in a way that's as chill as possible. None of the sensationalism and
          division you'll find elsewhere. It's about clarity, focus,
          approachability, and having a little wry smile almost all the time.
        </p>
      </div>
    </div>
  );
};

export default AboutUser;
