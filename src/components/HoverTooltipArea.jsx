import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const MARGIN = 12;
const MAX_WIDTH = 368;

function readTile(tile) {
  return {
    title: tile.dataset.tooltipTitle || '',
    category: tile.dataset.tooltipCategory || 'SWK504',
    metric: tile.dataset.tooltipMetric || '',
    description: tile.dataset.tooltipDescription || '',
    detail: tile.dataset.tooltipDetail || '',
    tags: (tile.dataset.tooltipTags || '').split(',').map(tag => tag.trim()).filter(Boolean),
  };
}

// Mirrors the reference site's mouse-following inspector while clamping to the viewport.
export default function HoverTooltipArea({ children, className }) {
  const activeTile = useRef(null);
  const popupRef = useRef(null);
  const [popup, setPopup] = useState(null);
  const popupId = 'swk504-tile-hover-tooltip';

  const hide = () => {
    if (activeTile.current) activeTile.current.removeAttribute('aria-describedby');
    activeTile.current = null;
    setPopup(null);
  };

  const show = (tile, pointerX, pointerY) => {
    if (!tile) return;
    if (tile !== activeTile.current) {
      activeTile.current?.removeAttribute('aria-describedby');
      activeTile.current = tile;
      tile.setAttribute('aria-describedby', popupId);
    }

    const rect = tile.getBoundingClientRect();
    const width = Math.min(MAX_WIDTH, window.innerWidth - MARGIN * 2);
    const popupHeight = popupRef.current?.offsetHeight || 240;
    const x = pointerX ?? rect.left + rect.width / 2;
    const y = pointerY ?? rect.top + 18;
    let left = x + 18;
    if (left + width > window.innerWidth - MARGIN) {
      left = x - width - 18;
    }
    left = Math.max(MARGIN, Math.min(left, window.innerWidth - width - MARGIN));
    const top = Math.max(MARGIN, Math.min(y - 20, window.innerHeight - popupHeight - MARGIN));

    setPopup({ ...readTile(tile), left, top, width });
  };

  const findTile = target => target instanceof Element ? target.closest('[data-tooltip-title]') : null;

  const onPointerOver = event => {
    if (event.pointerType === 'touch') return;
    const tile = findTile(event.target);
    if (tile && tile !== activeTile.current) show(tile, event.clientX, event.clientY);
  };
  const onPointerMove = event => {
    if (event.pointerType === 'touch') return;
    const tile = findTile(event.target);
    if (tile) show(tile, event.clientX, event.clientY);
  };
  const onPointerOut = event => {
    const oldTile = findTile(event.target);
    if (oldTile === activeTile.current &&
      (!(event.relatedTarget instanceof Node) || !oldTile.contains(event.relatedTarget))) hide();
  };
  const onFocus = event => {
    const tile = findTile(event.target);
    if (tile) show(tile);
  };
  const onBlur = event => {
    const tile = findTile(event.target);
    if (tile === activeTile.current &&
      (!(event.relatedTarget instanceof Node) || !tile.contains(event.relatedTarget))) hide();
  };

  return (
    <main
      className={className}
      onPointerOver={onPointerOver}
      onPointerMove={onPointerMove}
      onPointerOut={onPointerOut}
      onFocusCapture={onFocus}
      onBlurCapture={onBlur}
      onKeyDownCapture={event => { if (event.key === 'Escape') hide(); }}
    >
      {children}
      {popup && createPortal(
        <div
          id={popupId}
          ref={popupRef}
          role="tooltip"
          className="swk504-tile-popup"
          style={{ top: popup.top, left: popup.left, width: popup.width }}
          data-testid="swk504-tile-popup"
        >
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-[10px] uppercase tracking-wide font-bold text-red-200 bg-red-900/50 border border-red-500/40 px-2 py-0.5 rounded-full">
              {popup.category}
            </span>
            {popup.metric && <span className="text-[11px] font-mono font-semibold text-cyan-300 text-right">{popup.metric}</span>}
          </div>
          <h4 className="text-sm font-extrabold text-white mb-1.5">{popup.title}</h4>
          <p className="text-xs leading-relaxed text-slate-200">{popup.description}</p>
          {popup.detail && (
            <div className="bg-slate-950/75 border border-white/10 rounded-xl p-2.5 mt-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">SWK504 Practice Relevance</div>
              <p className="text-[11px] leading-relaxed text-slate-300">{popup.detail}</p>
            </div>
          )}
          {popup.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {popup.tags.map(tag => (
                <span key={tag} className="text-[10px] text-slate-300 bg-white/10 border border-white/10 rounded px-2 py-0.5">{tag}</span>
              ))}
            </div>
          )}
        </div>,
        document.body
      )}
    </main>
  );
}
