import React from 'react';

const Background = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -2, /* Behind everything */
      backgroundImage: "url('/assets/herobg.png')", /* Tries /assets/ folder */
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#050816' /* Fallback color if image is missing */
    }}>
      {/* If the above image path fails, this check helps debug */}
      <img 
        src="/assets/herobg.png" 
        style={{ display: 'none' }} 
        onError={(e) => console.error("IMAGE FAILED TO LOAD: Check public/assets/herobg.png")} 
      />
    </div>
  );
};

export default Background;