// function replace string with new image size.
export const replaceImageSize = (imageUrl) => {
  // returns new url with larger image size.
  return imageUrl.replace("100x100", "480x480");
};
