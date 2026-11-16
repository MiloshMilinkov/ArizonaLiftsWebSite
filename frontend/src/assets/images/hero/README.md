# Hero photos

Add authorized trainer photos here as JPG, JPEG, PNG, WebP, or AVIF files.
Use numbered filenames such as 01-training.jpg, 02-coaching.webp, 03-portrait.jpg.
The slideshow discovers them automatically in filename order. Two or more photos enable
five-second rotation and controls; one photo stays still. Local photos replace the temporary
stock image. Rebuild for production after adding photos.

Keep these small: the first photo is the page's largest paint (LCP). Export portrait WebP at
two widths named `<name>-1200w.webp` and `<name>-800w.webp` (quality ~80, about 30-90 KB each);
files sharing `<name>` become one slide with a responsive srcset. Never commit camera originals.
Only the first slide loads with the page; each later slide loads while the one before it shows.

To customize per-image alternative text or cropping, edit the mapping in src/config/heroSlides.js
and add matching alt keys to both locale catalogs. Alt text must describe the actual photo.
