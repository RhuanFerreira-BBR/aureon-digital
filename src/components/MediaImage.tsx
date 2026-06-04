import { assetPath } from '../utils';

type MediaImageProps = {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
};

export function MediaImage({ src, alt, ratio = '16 / 10', className = '' }: MediaImageProps) {
  return (
    <div className={`ph media-frame ${className}`} style={{ aspectRatio: ratio }}>
      <img className="media-img" src={assetPath(src)} alt={alt} loading="eager" />
    </div>
  );
}
