// TODO Write and export a function to perform
//   the required image processing task(s)
import sharp from "sharp";

async function resize(image, size, res, uni, color) {
  sharp(image)
    .resize(size, size)
    .toFormat("png")
    .toBuffer((err, data, info) => {
      res.setHeader("Content-Type", "image/png");
      res.setHeader(
        "Content-Disposition",
        "filename =" + `${uni}-${color}-${size}-by-${size}`
      );
      res.status(200).send(data);
    });
}

export { resize };
