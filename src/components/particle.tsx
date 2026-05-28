import * as React from "react";
import * as ParticlesReact from "@tsparticles/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import BrowserOnly from "@docusaurus/BrowserOnly";

const ParticlesInner = (props) => {
  const [init, setInit] = useState(false);
  const Particles = (ParticlesReact.default ??
    ParticlesReact.Particles) as React.ComponentType<Record<string, unknown>>;

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const initParticlesEngine = ParticlesReact.initParticlesEngine;

    if (typeof initParticlesEngine !== "function") {
      setInit(true);
      return;
    }

    initParticlesEngine(particlesInit).then(() => {
      setInit(true);
    });
  }, [particlesInit]);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: false, // Important: disable built-in fullscreen
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          grab: {
            distance: 150,
          },
        },
      },
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#FFFFFF",
        },
        shape: {
          type: "triangle",
          stroke: {
            width: 0,
            color: "#FFD700",
          },
          polygon: {
            nb_sides: 12,
          },
        },
        links: {
          color: "#778899",
          distance: 180,
          enable: true,
          opacity: 0.8,
          width: 1,
        },
        move: {
          direction: "none" as const,
          enable: true,
          outModes: {
            default: "bounce" as const,
          },
          random: true,
          speed: 5,
          straight: false,
        },
        opacity: {
          value: 0.7,
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (!init) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Particles id={props.id} init={particlesInit} options={options} />
    </div>
  );
};

const ParticlesComponent = (props) => (
  <BrowserOnly>{() => <ParticlesInner {...props} />}</BrowserOnly>
);

export default ParticlesComponent;
