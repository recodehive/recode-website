import { BadgeConfig } from "../components/dashboard/LeaderBoard/BadgeModal";

interface ShareCardData {
  username: string;
  avatarUrl: string;
  prs: number;
  points: number;
  rank: number;
  earnedBadges: string[];
  allBadges: BadgeConfig[];
}

/**
 * Loads an image asynchronously with crossOrigin support.
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Draws a rounded rectangle path on the canvas context.
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Draws a clean hexagon path on the canvas context.
 */
function drawHexagon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
): void {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6; // Rotate 30 deg for flat top
    ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
  }
  ctx.closePath();
}

/**
 * Compiles a beautiful contribution stats card on canvas and returns a Blob.
 */
export async function generateShareCard(data: ShareCardData): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get 2d context from canvas");
  }

  // 0. Pre-load all assets concurrently (Logo, Avatar, and Badges)
  let logoImg: HTMLImageElement | null = null;
  let avatarImg: HTMLImageElement | null = null;

  const logoPromise = loadImage("/img/logo.png")
    .then((img) => {
      logoImg = img;
    })
    .catch((err) => console.warn("Could not load logo: ", err));

  const avatarPromise = loadImage(data.avatarUrl)
    .then((img) => {
      avatarImg = img;
    })
    .catch((err) => console.warn("Could not load avatar: ", err));

  const badgePromises = data.allBadges.map(async (badge) => {
    try {
      const img = await loadImage(badge.image);
      return { image: badge.image, img, loaded: true };
    } catch {
      return { image: badge.image, img: null, loaded: false };
    }
  });

  const [, , loadedBadges] = await Promise.all([
    logoPromise,
    avatarPromise,
    Promise.all(badgePromises),
  ]);

  // 1. Draw Base Light Radial Gradient Background
  const bgGrad = ctx.createRadialGradient(600, 315, 100, 600, 315, 700);
  bgGrad.addColorStop(0, "#ffffff"); // Pure white center
  bgGrad.addColorStop(1, "#f1f5f9"); // Soft slate-grey-blue edges
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 630);

  // 2. Draw Decorative Subtle Ambient Glow Circles
  // Left ambient glow (indigo)
  const leftGlow = ctx.createRadialGradient(250, 250, 50, 250, 250, 350);
  leftGlow.addColorStop(0, "rgba(99, 102, 241, 0.05)");
  leftGlow.addColorStop(1, "rgba(99, 102, 241, 0)");
  ctx.fillStyle = leftGlow;
  ctx.beginPath();
  ctx.arc(250, 250, 350, 0, Math.PI * 2);
  ctx.fill();

  // Right ambient glow (violet/purple)
  const rightGlow = ctx.createRadialGradient(950, 380, 50, 950, 380, 350);
  rightGlow.addColorStop(0, "rgba(168, 85, 247, 0.05)");
  rightGlow.addColorStop(1, "rgba(168, 85, 247, 0)");
  ctx.fillStyle = rightGlow;
  ctx.beginPath();
  ctx.arc(950, 380, 350, 0, Math.PI * 2);
  ctx.fill();

  // 3. Draw Premium Light Glassmorphic Card Container
  ctx.save();
  // Premium soft drop shadow
  ctx.shadowColor = "rgba(15, 23, 42, 0.06)";
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 12;
  ctx.shadowOffsetX = 0;

  drawRoundedRect(ctx, 50, 50, 1100, 530, 24);
  // Fill gradient
  const cardGrad = ctx.createLinearGradient(50, 50, 1150, 580);
  cardGrad.addColorStop(0, "rgba(255, 255, 255, 0.92)");
  cardGrad.addColorStop(1, "rgba(248, 250, 252, 0.95)");
  ctx.fillStyle = cardGrad;
  ctx.fill();

  // Disable shadow for border/stroke
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Stroke border
  ctx.lineWidth = 1.5;
  const strokeGrad = ctx.createLinearGradient(50, 50, 1150, 580);
  strokeGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
  strokeGrad.addColorStop(0.5, "rgba(226, 232, 240, 0.8)");
  strokeGrad.addColorStop(1, "rgba(99, 102, 241, 0.15)");
  ctx.strokeStyle = strokeGrad;
  ctx.stroke();
  ctx.restore();

  // 4. Draw Recode Hive Logo (Top-Left)
  if (logoImg) {
    ctx.drawImage(logoImg, 86, 91, 48, 48);
  } else {
    // Fallback: Glowing hexagon logo mark
    ctx.save();
    drawHexagon(ctx, 110, 115, 22);
    const logoGrad = ctx.createLinearGradient(90, 95, 130, 135);
    logoGrad.addColorStop(0, "#6366f1"); // Indigo
    logoGrad.addColorStop(1, "#a855f7"); // Purple
    ctx.fillStyle = logoGrad;
    ctx.fill();
    ctx.restore();
  }

  // Logo text
  ctx.font = "bold 38px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#0f172a"; // Deep slate
  ctx.fillText("recode", 155, 120);

  ctx.fillStyle = "#d97706"; // Amber-gold (highly readable on light theme)
  ctx.fillText("hive", 280, 120);

  // Subtitle / Tagline
  ctx.font = "500 16px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#475569"; // Slate gray (darker for readability)
  ctx.fillText("Learn, Build & Grow with Open Source", 155, 146);

  // 5. Draw Contributor Avatar
  const avatarX = 160;
  const avatarY = 285;
  const avatarRadius = 70;

  // Draw Avatar ring glow
  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarRadius + 5, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(99, 102, 241, 0.15)";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  if (avatarImg) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(
      avatarImg,
      avatarX - avatarRadius,
      avatarY - avatarRadius,
      avatarRadius * 2,
      avatarRadius * 2
    );
    ctx.restore();
  } else {
    // Fallback: draw circular letter initial avatar
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2);
    const avatarFallbackGrad = ctx.createLinearGradient(
      avatarX - avatarRadius,
      avatarY - avatarRadius,
      avatarX + avatarRadius,
      avatarY + avatarRadius
    );
    avatarFallbackGrad.addColorStop(0, "#4f46e5");
    avatarFallbackGrad.addColorStop(1, "#7c3aed");
    ctx.fillStyle = avatarFallbackGrad;
    ctx.fill();

    ctx.font = "bold 64px Inter, system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const initial = data.username.charAt(0).toUpperCase();
    ctx.fillText(initial, avatarX, avatarY);
    ctx.restore();
  }

  // 6. Draw Contributor Info (Username and Rank)
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  // Username
  ctx.font = "bold 38px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#0f172a"; // Deep slate
  ctx.fillText(`@${data.username}`, 260, 275);

  // Rank Pill
  const pillX = 260;
  const pillY = 295;
  const pillW = 165;
  const pillH = 34;
  const pillR = 17;

  ctx.save();
  drawRoundedRect(ctx, pillX, pillY, pillW, pillH, pillR);
  ctx.fillStyle = "rgba(99, 102, 241, 0.08)";
  ctx.fill();
  ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.font = "bold 15px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#4f46e5"; // Indigo/violet rank text
  ctx.textAlign = "center";
  ctx.fillText(`Leaderboard Rank #${data.rank}`, pillX + pillW / 2, pillY + 22);
  ctx.restore();

  // 7. Draw Divider & Stats Section
  // Divider
  ctx.strokeStyle = "rgba(226, 232, 240, 0.8)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(760, 220);
  ctx.lineTo(760, 340);
  ctx.stroke();

  // Merged PRs Column
  ctx.textAlign = "center";
  ctx.font = "bold 68px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#0f172a"; // Deep slate
  ctx.fillText(data.prs.toString(), 640, 280);

  ctx.font = "bold 14px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#64748b"; // Slate grey label
  ctx.fillText("MERGED PRS", 640, 310);

  // Total Points Column
  ctx.font = "bold 68px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#7c3aed"; // Violet highlight
  ctx.fillText(data.points.toString(), 880, 280);

  ctx.font = "bold 14px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#64748b"; // Slate grey label
  ctx.fillText("TOTAL POINTS", 880, 310);

  // 8. Draw Lower Divider & Badges Section
  ctx.strokeStyle = "rgba(226, 232, 240, 0.8)";
  ctx.beginPath();
  ctx.moveTo(100, 395);
  ctx.lineTo(1100, 395);
  ctx.stroke();

  // Header Title
  ctx.textAlign = "left";
  ctx.font = "bold 13px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#64748b";
  ctx.fillText("UNLOCKED CONTRIBUTOR ACHIEVEMENTS", 100, 430);

  // Position and draw badges
  const badgeWidth = 64;
  const badgeHeight = 64;
  const badgeGap = 28;
  const startX = 100;
  const startY = 460;

  loadedBadges.forEach((badgeItem, index) => {
    const isEarned = data.earnedBadges.includes(badgeItem.image);
    const xPos = startX + index * (badgeWidth + badgeGap);

    ctx.save();
    if (isEarned) {
      ctx.globalAlpha = 1.0;
      // Soft drop shadow under earned badges for light theme
      ctx.shadowColor = "rgba(99, 102, 241, 0.2)";
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 4;
    } else {
      // Locked badge appearance: low opacity
      ctx.globalAlpha = 0.15;
    }

    if (badgeItem.loaded && badgeItem.img) {
      ctx.drawImage(badgeItem.img, xPos, startY, badgeWidth, badgeHeight);
    } else {
      // Fallback: draw circular outline for missing assets
      ctx.beginPath();
      ctx.arc(
        xPos + badgeWidth / 2,
        startY + badgeHeight / 2,
        badgeWidth / 2,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = isEarned ? "#7c3aed" : "#cbd5e1";
      ctx.fill();
    }
    ctx.restore();
  });

  // 9. Draw Footer invitation text
  ctx.save();
  ctx.textAlign = "right";
  ctx.font = "bold 14px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#4f46e5"; // Violet invitation accent
  ctx.fillText("join the hive: recodehive.com", 1100, 430);
  ctx.restore();

  // 10. Output Canvas to a Blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Failed to create Blob from canvas"));
      }
    }, "image/png");
  });
}
