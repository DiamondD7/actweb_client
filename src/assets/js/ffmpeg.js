import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

export const Compress = async (newPost) => {
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", "input.mp4", await fetchFile(newPost.File));
  await ffmpeg.run(
    "-i",
    "input.mp4",
    "-vcodec",
    "libx264",
    "-crf",
    "28",
    "output.mp4"
  );
  const data = ffmpeg.FS("readFile", "output.mp4");

  const compressedFile = new File([data.buffer], "output.mp4", {
    type: "video/mp4",
  });

  return compressedFile;
};
