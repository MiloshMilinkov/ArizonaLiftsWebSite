# Client transformations

The section has an image-only gallery followed by an independent collection of client messages.

- Edit transformations.json to add or reorder gallery images. Each item has a unique id, an image path, and en/sr alt text.
- Edit testimonials.json to add or reorder comments. Each item has a unique id, screenshot image path, source filename, and en/sr title and text. English text is a translation of the original message. Transcriptions omit decorative emojis.
- Store files in frontend/public/images/transformations and reference them with /images/transformations/filename.
- Photos and screenshots retain their full aspect ratio without cropping. Gallery and comment images load lazily.

The six gallery files are from the supplied images to use folder. IMG_1537.png already contains a message above its photos; it is preserved as supplied. The four selected comments come from IMG_2624.jpeg, IMG_7212.jpeg, IMG_0862.jpeg, and IMG_8906.jpeg. Their headings are editorial summaries. Comments are not assigned to particular gallery photos.

Update September 8: added three gallery photos and three client messages supplied that day, preserving existing entries. The gallery now contains nine images and the comments collection contains seven messages. Each new record stores its source filename.
