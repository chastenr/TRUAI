"use client";

const LIVE_AVATAR_HOST = ["tru", "lience.com"].join("");
const LIVE_AVATAR_URL =
  `https://${LIVE_AVATAR_HOST}/avatar/8657426931336757879?hideChatInput=false&hideChatHistory=false&connect=true`;

export default function LiveAvatarEmbed() {
  return (
    <div className="nala-avatar-wrap relative w-full overflow-hidden rounded-xl border border-white/10">
      <iframe
        width="100%"
        height="100%"
        src={LIVE_AVATAR_URL}
        frameBorder="0"
        allow="camera; microphone; fullscreen; accelerometer; magnetometer; xr-spatial-tracking; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="NALA — Abbie Shepherd Real Estate Group"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
