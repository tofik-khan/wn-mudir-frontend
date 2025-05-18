import { Skeleton } from "@mui/material";
import { useState, useEffect } from "react";

export const LazyImage = ({ src, alt = "Image", defaultImage, style = {} }) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setLoaded(true);
      setHasError(false);
    };

    img.onerror = () => {
      setImageSrc(defaultImage);
      setLoaded(true);
      setHasError(true);
    };
  }, [src, defaultImage]);

  if (!imageSrc || imageSrc === "" || defaultImage === src) {
    return (
      <>
        <Skeleton variant="rectangular" width={"600px"} height={"400px"} />
      </>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {!loaded && <p>Loading...</p>}
      <img
        src={imageSrc}
        alt={alt || "Image"}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      {hasError && <p style={{ color: "red" }}>Image failed to load</p>}
    </div>
  );
};
