import React from "react";
import { createRoot } from "react-dom/client";
import Splash from "components/app/Splash";
import initRendererL10N from "renderer/lib/lang/initRendererL10N";
import { initTheme } from "renderer/lib/theme";
import BootScreen from "ui/loading/BootScreen";
import "renderer/lib/globalErrorHandling";

(async () => {
  const root = createRoot(document.getElementById("App") as HTMLElement);
  root.render(<BootScreen message="Loading splash screen..." />);

  await initRendererL10N();
  await initTheme();

  root.render(
    <React.StrictMode>
      <Splash />
    </React.StrictMode>,
  );
})();
