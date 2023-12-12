type ImageSrc = { height: number; src: string; width: number; format: "avif" | "png" | "webp" | "jpeg" | "jpg" | "svg" | "tiff" | "gif"};

export type ImageType = {
    src: ImageSrc;
    alt: string;
    width: number;
    height: number;
  };