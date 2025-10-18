// src/components/ConfettiUtils.tsx
import confetti from 'canvas-confetti';

/**
 * Triggers a celebratory confetti effect.
 * Can be used for achievements, completions, or interactions.
 */
export const triggerConfetti = () => {
  confetti({
    particleCount: 100,  // Number of particles (adjust for intensity)
    spread: 70,          // Spread angle in degrees
    origin: { y: 0.6 },  // Start position (center-ish screen)
    colors: ['#2563eb', '#7c3aed', '#10b981'],  // Custom colors (blue, purple, green – match leaderboard/theme)
    duration: 2000,      // Optional: How long it lasts (in ms)
  });
};

