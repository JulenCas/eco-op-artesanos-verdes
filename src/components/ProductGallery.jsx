import { useI18n } from '../context/I18nContext';

function ProductGallery({ nombre, imagenPrincipal, imagenesAdicionales = [] }) {
  const galleryImages = [imagenPrincipal, ...imagenesAdicionales].filter(Boolean);
  const { t } = useI18n();

  return (
    <div className="detail-gallery" aria-label={t('galleryOf', { name: nombre })}>
      {galleryImages.map((imageUrl, index) => (
        <img
          key={`${imageUrl}-${index}`}
          src={imageUrl}
          alt={index === 0 ? nombre : t('galleryImageAlt', { name: nombre, index: index + 1 })}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
