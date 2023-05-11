// imports function to tes.
import { replaceImageSize } from "../components/ImageStringConvert";

test("should replace image link size 100x100 with 400x400", () => {
  expect(
    replaceImageSize(
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3c/1b/a9/3c1ba9e1-15b1-03b3-3bfd-09dbd9f1705b/dj.mggvbaou.jpg/100x100bb.jpg"
    )
  ).toBe(
    "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3c/1b/a9/3c1ba9e1-15b1-03b3-3bfd-09dbd9f1705b/dj.mggvbaou.jpg/480x480bb.jpg"
  );
});
