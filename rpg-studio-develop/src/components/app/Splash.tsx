import React, { useEffect, useMemo, useState } from "react";
import Path from "path";
import { FlexGrow } from "ui/spacing/Spacing";
import {
  SplashAppTitle,
  SplashContent,
  SplashCreateButton,
  SplashForm,
  SplashInfoMessage,
  SplashLoading,
  SplashLogo,
  SplashOpenButton,
  SplashProject,
  SplashProjectClearButton,
  SplashScroll,
  SplashSidebar,
  SplashTab,
  SplashTemplateSelect,
  SplashWindow,
} from "ui/splash/Splash";
import GlobalStyle from "ui/globalStyle";
import ThemeProvider from "ui/theme/ThemeProvider";
import { FormField, FormRow } from "ui/form/layout/FormLayout";
import { TextField } from "ui/form/TextField";
import { DotsIcon, LoadingIcon } from "ui/icons/Icons";
import { Button } from "ui/buttons/Button";
import gbs2Preview from "assets/templatePreview/gbs2.png";
import gbhtmlPreview from "assets/templatePreview/gbhtml.png";
import blankPreview from "assets/templatePreview/blank.png";
import useWindowFocus from "ui/hooks/use-window-focus";
import l10n from "shared/lib/lang/l10n";
import API from "renderer/lib/api";
import { ERR_PROJECT_EXISTS } from "consts";
import type { RecentProjectData } from "renderer/lib/api/setup";
import type { TemplatePlugin } from "lib/templates/templateManager";

declare const DOCS_URL: string;

type TemplateInfo = {
  id: string;
  name: string;
  preview: string;
  videoPreview: boolean;
  description: string;
};

const splashTabs = ["new", "recent"] as const;
type SplashTabSection = (typeof splashTabs)[number];

const getLastUsedPath = async () => {
  const storedPath = String(await API.settings.get("__lastUsedPath"));
  if (storedPath && storedPath !== "undefined") {
    return Path.normalize(storedPath);
  }
  return API.paths.getDocumentsPath();
};

const setLastUsedPath = (path: string) => {
  API.settings.set("__lastUsedPath", path);
};

const getLastUsedTab = async () => {
  return String(await API.settings.get("__lastUsedSplashTab")) || "info";
};

const setLastUsedTab = (tab: string) => {
  API.settings.set("__lastUsedSplashTab", tab);
};

const toSplashTab = (tab: string): SplashTabSection => {
  if (splashTabs.indexOf(tab as unknown as SplashTabSection) > -1) {
    return tab as SplashTabSection;
  }
  return "new";
};

const splashHeroStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 12,
  border: "1px solid rgba(148,163,184,0.24)",
  background:
    "linear-gradient(135deg, rgba(30,64,175,0.24) 0%, rgba(15,23,42,0.64) 56%, rgba(20,184,166,0.18) 100%)",
  padding: "14px 16px",
  marginBottom: 14,
};

const Splash = () => {
  const [loading, setLoading] = useState(true);
  const [templateId, setTemplateId] = useState("gbs2");
  const [section, setSection] = useState<SplashTabSection>();
  const [recentProjects, setRecentProjects] = useState<RecentProjectData[]>([]);
  const [templatePlugins, setTemplatePlugins] = useState<TemplatePlugin[]>([]);
  const [name, setName] = useState<string>(l10n("SPLASH_DEFAULT_PROJECT_NAME"));
  const [path, setPath] = useState<string>("");
  const [nameError, setNameError] = useState("");
  const [pathError, setPathError] = useState("");
  const [creating, setCreating] = useState(false);
  const windowFocus = useWindowFocus();

  useEffect(() => {
    async function fetchData() {
      setRecentProjects((await API.project.getRecentProjects()).reverse());
      setPath(await getLastUsedPath());
      setTemplatePlugins(await API.templates.getTemplatesList());
      const urlParams = new URLSearchParams(window.location.search);
      const forceTab = urlParams.get("tab");
      const initialTab = toSplashTab(forceTab || (await getLastUsedTab()));
      setSection(initialTab);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = API.events.templates.templatesListChanged.subscribe(
      (_, templatePlugins) => setTemplatePlugins(templatePlugins),
    );
    return unsubscribe;
  });

  const templates: TemplateInfo[] = useMemo(
    () => [
      {
        id: "gbs2",
        name: l10n("SPLASH_SAMPLE_PROJECT"),
        preview: gbs2Preview,
        videoPreview: false,
        description: l10n("SPLASH_SAMPLE_PROJECT_DESCRIPTION"),
      },
      {
        id: "gbhtml",
        name: `${l10n("SPLASH_SAMPLE_PROJECT")} (GBS 1.0)`,
        preview: gbhtmlPreview,
        videoPreview: false,
        description: l10n("SPLASH_SAMPLE_PROJECT_ORIGINAL_DESCRIPTION"),
      },
      {
        id: "blank",
        name: l10n("SPLASH_BLANK_PROJECT"),
        preview: blankPreview,
        videoPreview: false,
        description: l10n("SPLASH_BLANK_PROJECT_DESCRIPTION"),
      },
    ],
    [],
  );

  const onSetTab = (tab: SplashTabSection) => () => {
    setSection(tab);
    setLastUsedTab(tab);
  };

  const onOpen = () => {
    API.project.openProjectPicker();
  };

  const onOpenRecent = (projectPath: string) => async () => {
    const success = await API.project.openProject(projectPath);
    if (!success) {
      setRecentProjects((await API.project.getRecentProjects()).reverse());
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.currentTarget.value;
    setName(newName);
    setNameError("");
  };

  const onChangePath = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPath = e.currentTarget.value;
    setLastUsedPath(newPath);
    setPath(newPath);
    setPathError("");
  };

  const onSelectFolder = async () => {
    const directory = await API.dialog.chooseDirectory();
    if (directory) {
      setLastUsedPath(directory);
      setPath(directory);
      setPathError("");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (creating) {
      return;
    }

    if (!name) {
      setNameError(l10n("ERROR_PLEASE_ENTER_PROJECT_NAME"));
      return;
    }

    if (!path) {
      setPathError(l10n("ERROR_PLEASE_ENTER_PROJECT_PATH"));
      return;
    }

    try {
      setCreating(true);
      const projectPath = await API.project.createProject({
        name,
        template: templateId,
        path,
      });
      API.project.openProject(projectPath);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes(ERR_PROJECT_EXISTS)) {
          setNameError(l10n("ERROR_PROJECT_ALREADY_EXISTS"));
          setCreating(false);
        } else if (
          err.message.includes("ENOTDIR") ||
          err.message.includes("EEXIST") ||
          err.message.includes("EROFS")
        ) {
          setPathError(l10n("ERROR_PROJECT_PATH_INVALID"));
          setCreating(false);
        } else {
          setPathError(err.message);
          setCreating(false);
        }
      }
    }
  };

  const clearRecent = () => {
    setRecentProjects([]);
    API.project.clearRecentProjects();
  };

  const removeRecent = (path: string) => {
    API.project.removeRecentProject(path);
    setRecentProjects(recentProjects.filter((p) => p.path !== path));
  };

  useEffect(() => {
    if (
      section !== undefined &&
      document.activeElement instanceof HTMLElement
    ) {
      // Prevent documentation tab getting visible focus
      // before interaction has occured
      document.activeElement.blur();
    }
  }, [section]);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <SplashWindow focus={windowFocus}>
        <SplashSidebar>
          <SplashLogo>
            <div
              style={{
                width: 86,
                height: 86,
                borderRadius: 14,
                border: "1px solid #4a5f79",
                background:
                  "linear-gradient(150deg, rgba(245,158,11,0.2) 0%, rgba(59,130,246,0.22) 100%)",
                color: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: 11,
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: 0.25,
              }}
            >
              ENCHANTMENT
              <br />
              ENGINE
            </div>
          </SplashLogo>
          <SplashAppTitle />
          <SplashTab
            selected={section === "new"}
            onClick={onSetTab("new")}
            disabled={loading}
          >
            {l10n("SPLASH_NEW")}
          </SplashTab>
          <SplashTab
            selected={section === "recent"}
            onClick={onSetTab("recent")}
            disabled={loading}
          >
            {l10n("SPLASH_RECENT")}
          </SplashTab>
          <SplashTab onClick={() => API.app.openExternal(DOCS_URL)}>
            {l10n("SPLASH_DOCUMENTATION")}
          </SplashTab>
          <FlexGrow />
          <SplashOpenButton onClick={onOpen}>
            {l10n("SPLASH_OPEN")}
          </SplashOpenButton>
        </SplashSidebar>

        {loading && !section && (
          <SplashContent>
            <SplashLoading>
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 16,
                  border: "1px solid #4a5f79",
                  background:
                    "linear-gradient(150deg, rgba(245,158,11,0.2) 0%, rgba(59,130,246,0.22) 100%)",
                  color: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: 13,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: 0.3,
                }}
              >
                ENCHANTMENT
                <br />
                GAME ENGINE
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#e2e8f0",
                }}
              >
                Enchantment Game Engine
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                Loading splash resources...
              </div>
              <LoadingIcon />
            </SplashLoading>
          </SplashContent>
        )}

        {section === "new" && (
          <SplashContent>
            <SplashForm onSubmit={onSubmit}>
              <div style={splashHeroStyle}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>
                  Project Manager
                </div>
                <div style={{ fontSize: 12, color: "#9fb5ce", marginTop: 4 }}>
                  Create a new Enchantment Game Engine project with templates and
                  starter workflows.
                </div>
              </div>
              <FormRow>
                <TextField
                  name="name"
                  label={l10n("SPLASH_PROJECT_NAME")}
                  errorLabel={nameError}
                  size="large"
                  value={name}
                  onChange={onChangeName}
                />
              </FormRow>
              <FormRow>
                <TextField
                  name="path"
                  label={l10n("SPLASH_PATH")}
                  errorLabel={pathError}
                  size="large"
                  value={path}
                  onChange={onChangePath}
                  additionalRight={
                    <Button onClick={onSelectFolder} type="button">
                      <DotsIcon />
                    </Button>
                  }
                />
              </FormRow>
              <FormRow>
                <FormField
                  name="template"
                  label={l10n("SPLASH_PROJECT_TEMPLATE")}
                >
                  <SplashTemplateSelect
                    name="template"
                    templates={templates}
                    templatePlugins={templatePlugins}
                    value={templateId}
                    onChange={setTemplateId}
                  />
                </FormField>
              </FormRow>
              <FlexGrow />
              <SplashCreateButton>
                <Button variant="primary" size="large" disabled={creating}>
                  {creating ? l10n("SPLASH_CREATING") : l10n("SPLASH_CREATE")}
                </Button>
              </SplashCreateButton>
            </SplashForm>
          </SplashContent>
        )}

        {section === "recent" && (
          <SplashScroll>
            <div style={splashHeroStyle}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                Recent Projects
              </div>
              <div style={{ fontSize: 12, color: "#9fb5ce", marginTop: 4 }}>
                Resume existing projects, clean entries, or open another folder.
              </div>
            </div>
            {recentProjects.map((project, index) => (
              <SplashProject
                key={index}
                project={project}
                onClick={onOpenRecent(project.path)}
                onRemove={() => removeRecent(project.path)}
              />
            ))}

            {recentProjects.length > 0 ? (
              <SplashProjectClearButton>
                <Button onClick={clearRecent}>
                  {l10n("SPLASH_CLEAR_RECENT")}
                </Button>
              </SplashProjectClearButton>
            ) : (
              <SplashInfoMessage>
                {l10n("SPLASH_NO_RECENT_PROJECTS")}
              </SplashInfoMessage>
            )}
          </SplashScroll>
        )}
      </SplashWindow>
    </ThemeProvider>
  );
};

export default Splash;

