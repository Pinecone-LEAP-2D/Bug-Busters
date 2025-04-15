import React from "react";

import { useState } from "react";

type loadingProps = {
  loadingBoolean: boolean;
};
export const Loading = (props: loadingProps) => {
  const { loadingBoolean } = props;
  if (loadingBoolean == true) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-white">
        <img
          src="/loadingGif.gif"
          alt="Loading..."
          className="w-20 h-20 animate-bounce mb-4"
        />
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Brewing your coffee...
        </p>
      </div>
    );
  }
};
