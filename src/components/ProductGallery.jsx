function ProductGallery({ nombre, imagenPrincipal, imagenesAdicionales = [] }) {
  const galleryImages = [imagenPrincipal, ...imagenesAdicionales].filter(Boolean);

  return (
    <div className="detail-gallery" aria-label={`Galería de ${nombre}`}>
      {galleryImages.map((imageUrl, index) => (
        <img
          key={`${imageUrl}-${index}`}
          src={imageUrl}
          alt={index === 0 ? nombre : `${nombre} - imagen ${index + 1}`}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
