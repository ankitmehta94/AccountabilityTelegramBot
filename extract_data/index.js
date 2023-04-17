import fs from "fs";
import JSZip from "jszip";

fs.readFile("documents/following_through.epub", function (err, epubData) {
  if (err) throw err;
  JSZip.loadAsync(epubData).then(function (zip) {
    const textPromises = [];
    zip.forEach(function (relativePath, zipEntry) {
      if (relativePath.endsWith(".html")) {
        textPromises.push(zipEntry.async("text"));
      }
    });
    Promise.all(textPromises).then(function (textContents) {
      // textContents will be an array of text content from all HTML files in the EPUB
      textContents.forEach((text) =>
        console.log(text.replace(/<[^>]*>?/gm, ""))
      );
    });
  });
});
