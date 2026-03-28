'use client';

import React, { useMemo, useRef, useState } from "react";

const cn = (...inputs) => inputs.filter(Boolean).join(" ");

export default function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = "4em", 
  fontWeight = "bold",
  fontFamily = "inherit",
  letterSpacing = "normal",
  textTransform = "none",
  poster,
  sources = []
}) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const textContent = useMemo(() => {
    return React.Children.toArray(children)
      .filter(child => typeof child === 'string' || typeof child === 'number')
      .join('');
  }, [children]);

  const svgMask = useMemo(() => {
    const escaped = textContent
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const svgString = `
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
        <text 
          x='0' 
          y='50%' 
          font-size='${typeof fontSize === 'number' ? fontSize + 'px' : fontSize}' 
          font-weight='${fontWeight}' 
          font-family='${fontFamily}'
          text-anchor='start' 
          dominant-baseline='central'
          letter-spacing='${letterSpacing}'
          style='text-transform: ${textTransform};'
        >
          ${escaped}
        </text>
      </svg>
    `.trim();

    return `url("data:image/svg+xml,${encodeURIComponent(svgString)}")`;
  }, [textContent, fontSize, fontWeight, fontFamily, letterSpacing, textTransform]);

  return (
    <span 
      className={cn(
        "inline-flex relative align-baseline overflow-hidden", 
        className
      )}
      style={{
        height: '1.2em',
        minWidth: 'fit-content',
        verticalAlign: '-0.15em',
        display: 'inline-block' // Ensures it respects parent text flow
      }}
    >
      {/* This invisible text acts as a 'skeleton' to give the component 
          the exact width of the actual letters. 
      */}
      <span 
        className="opacity-0 select-none whitespace-nowrap" 
        style={{ 
            fontSize, 
            fontWeight, 
            fontFamily, 
            letterSpacing, 
            textTransform,
            paddingRight: '0.05em' // Small buffer for italic fonts or wide letters
        }} 
        aria-hidden="true"
      >
        {textContent}
      </span>

      <div 
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          maskImage: svgMask,
          WebkitMaskImage: svgMask,
          maskSize: "100% 100%", // Fit exactly to the span width
          WebkitMaskSize: "100% 100%",
          maskPosition: "left center",
          WebkitMaskPosition: "left center",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          opacity: isVideoLoaded ? 1 : 0
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          preload={preload}
          poster={poster}
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={src} type="video/mp4" />
          {sources.map((s, i) => <source key={i} src={s.src} type={s.type} />)}
        </video>
      </div>
    </span>
  );
}
