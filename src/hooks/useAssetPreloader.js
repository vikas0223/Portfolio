import { useState, useEffect } from 'react';
import bgPattern from '../assets/images/hero-bg.png';
import profileImg from '../assets/images/profile.png';
import aboutProfileImg from '../assets/images/profile-removebg-preview.png';
import roomModelUrl from '../assets/models/optimized-room.glb';

export default function useAssetPreloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Preparing the experience…');

  useEffect(() => {
    let active = true;
    const startTime = Date.now();

    const updateStatus = (pct) => {
      if (!active) return;
      if (pct < 35) {
        setStatusMessage('Preparing the experience…');
      } else if (pct < 75) {
        setStatusMessage('Loading interface…');
      } else {
        setStatusMessage('Almost ready…');
      }
    };

    const preloadAssets = async () => {
      try {
        // 1. Wait for Fonts
        if (document.fonts) {
          await document.fonts.ready;
        }
        updateStatus(30);

        // 2. Preload Key Images
        const images = [bgPattern, profileImg, aboutProfileImg];
        await Promise.all(
          images.map((src) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = resolve; // Continue even if image fail-loads
            });
          })
        );
        updateStatus(70);

        // 3. Preload 3D GLB Model (fetch to trigger browser cache)
        await new Promise((resolve) => {
          fetch(roomModelUrl)
            .then(() => {
              updateStatus(95);
              resolve();
            })
            .catch(() => {
              resolve(); // Don't block loading if fetch fails
            });
        });

      } catch (err) {
        console.warn('Preload warning:', err);
      } finally {
        if (active) {
          const elapsed = Date.now() - startTime;
          const minDelay = 1200; // minimum loader display for smooth intro
          const remaining = Math.max(0, minDelay - elapsed);
          setTimeout(() => {
            if (active) {
              setIsLoaded(true);
              setStatusMessage('Almost ready…');
            }
          }, remaining);
        }
      }
    };

    // Force continue after max 4 seconds
    const fallbackId = setTimeout(() => {
      if (active && !isLoaded) {
        setIsLoaded(true);
      }
    }, 4000);

    preloadAssets();

    return () => {
      active = false;
      clearTimeout(fallbackId);
    };
  }, []);

  return { isLoaded, statusMessage };
}
