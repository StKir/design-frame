type CropOverlayProps = {
  className?: string;
};

export const CropOverlay = ({ className = '' }: CropOverlayProps) => (
  <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
    <div className="forma-crop-dim relative h-[280px] w-[280px] rounded-sm">
      <span className="forma-crop-corner forma-crop-corner-tl" />
      <span className="forma-crop-corner forma-crop-corner-tr" />
      <span className="forma-crop-corner forma-crop-corner-bl" />
      <span className="forma-crop-corner forma-crop-corner-br" />
    </div>
  </div>
);
