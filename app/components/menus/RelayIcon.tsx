import React from "react";

export default function RelayIcon({ src, fallback, alt }: any) {
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    setImgSrc(fallback);
  };

  return <img className="h-10 w-10 rounded-full" src={imgSrc} onError={handleError} alt={alt} />;
}
