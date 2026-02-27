import React from "react";
import logoFile from "ui/icons/app_icon_256.png";

interface BootScreenProps {
  message?: string;
  progress?: number;
}

const clampProgress = (progress: number) => Math.max(6, Math.min(100, progress));

const BootScreen = ({
  message = "Booting Enchantment Game Engine...",
  progress = 26,
}: BootScreenProps) => {
  const safeProgress = clampProgress(progress);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 20% 10%, #2a3544 0%, #121923 46%, #0a0f17 100%)",
        color: "#e2e8f0",
        fontFamily:
          '"Bahnschrift","Segoe UI Variable Display","Segoe UI","Trebuchet MS",Arial,sans-serif',
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: 420,
          maxWidth: "88vw",
          padding: "24px 26px",
          borderRadius: 12,
          border: "1px solid #334155",
          background: "rgba(15,23,42,0.72)",
          boxShadow: "0 16px 34px rgba(0,0,0,0.42)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <img
          src={logoFile}
          alt="Enchantment Game Engine"
          draggable={false}
          style={{ width: 132, height: 132, objectFit: "contain" }}
        />
        <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: 0.2 }}>
          Enchantment Game Engine
        </div>
        <div style={{ fontSize: 12, color: "#93a3b8" }}>{message}</div>
        <div style={{ fontSize: 10, color: "#8bb0c8" }}>Initializing project manager...</div>
        <div
          style={{
            marginTop: 6,
            width: "100%",
            height: 6,
            borderRadius: 999,
            background: "#1e293b",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${safeProgress}%`,
              height: "100%",
              borderRadius: 999,
              background: "linear-gradient(90deg, #f59e0b 0%, #3b82f6 100%)",
              transition: "width 0.25s ease-in-out",
              animation: "egs_boot_pulse 1.15s ease-in-out infinite alternate",
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes egs_boot_pulse {
          from { transform: translateX(-8%); opacity: 0.7; }
          to { transform: translateX(140%); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BootScreen;
