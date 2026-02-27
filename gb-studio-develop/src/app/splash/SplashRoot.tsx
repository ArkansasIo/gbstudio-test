import React from "react";
import { createRoot } from "react-dom/client";
import Splash from "components/app/Splash";
import initRendererL10N from "renderer/lib/lang/initRendererL10N";
import { initTheme } from "renderer/lib/theme";
import BootScreen from "ui/loading/BootScreen";
import "renderer/lib/globalErrorHandling";

(async () => {
  const root = createRoot(document.getElementById("App") as HTMLElement);
  const startTime = Date.now();
  root.render(
    <BootScreen message="Booting systems..." progress={24} />,
  );

  root.render(
    <BootScreen message="Loading localization data..." progress={52} />,
  );
  await initRendererL10N();

  root.render(
    <BootScreen message="Preparing themes and project manager..." progress={78} />,
  );
  await initTheme();
  const minBootDurationMs = 1200;
  const elapsed = Date.now() - startTime;
  if (elapsed < minBootDurationMs) {
    await new Promise((resolve) =>
      setTimeout(resolve, minBootDurationMs - elapsed),
    );
  }
  root.render(
    <BootScreen message="Ready" progress={100} />,
  );
  await new Promise((resolve) => setTimeout(resolve, 180));

  root.render(
    <React.StrictMode>
      <Splash />
    </React.StrictMode>,
  );
})();
