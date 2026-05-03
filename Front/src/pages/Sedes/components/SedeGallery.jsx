/**
 * SedeGallery.jsx
 * Atomic component — 3-image mosaic gallery for a Sede page.
 * Props:
 *  - images  {Array<{src, alt}>}  Array of exactly 3 image objects
 */
function SedeGallery({ images = [] }) {
  if (images.length < 3) return null;

  return (
    <div className="sede-gallery mt-4">
      <div className="sede-gallery-main overflow-hidden">
        <img src={images[0].src} alt={images[0].alt} />
      </div>
      <div className="overflow-hidden">
        <img src={images[1].src} alt={images[1].alt} />
      </div>
      <div className="overflow-hidden">
        <img src={images[2].src} alt={images[2].alt} />
      </div>
    </div>
  );
}

export default SedeGallery;
