/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 97:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(288);
const setup_1 = __importDefault(__webpack_require__(838));
electron_1.contextBridge.exposeInMainWorld("API", setup_1.default);
exports["default"] = electron_1.contextBridge;


/***/ }),

/***/ 838:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(288);
const types_1 = __webpack_require__(499);
const createSubscribeAPI = (channel) => {
    return {
        subscribe: (listener) => {
            electron_1.ipcRenderer.on(channel, listener);
            return () => {
                electron_1.ipcRenderer.off(channel, listener);
            };
        },
        once: (listener) => {
            electron_1.ipcRenderer.once(channel, listener);
        },
    };
};
const createWatchSubscribeAPI = (channel) => {
    return {
        changed: createSubscribeAPI(`${channel}:changed`),
        renamed: createSubscribeAPI(`${channel}:renamed`),
        removed: createSubscribeAPI(`${channel}:removed`),
    };
};
const APISetup = {
    platform: process.platform,
    test: () => console.log("Hello World"),
    app: {
        openExternal: (path) => electron_1.ipcRenderer.invoke("open-external", path),
        openHelp: (helpPage) => electron_1.ipcRenderer.invoke("open-help", helpPage),
        openFolder: (path) => electron_1.ipcRenderer.invoke("open-folder", path),
        openImageFile: (path) => electron_1.ipcRenderer.invoke("open-image", path),
        openModFile: (path) => electron_1.ipcRenderer.invoke("open-mod", path),
        openFile: (path) => electron_1.ipcRenderer.invoke("open-file", path),
        readTextFile: (path) => electron_1.ipcRenderer.invoke("read-text-file", path),
        getIsFullScreen: () => electron_1.ipcRenderer.invoke("app:get-is-full-screen"),
        deleteBuildCache: () => electron_1.ipcRenderer.invoke("build:delete-cache"),
        setZoomLevel: (level) => electron_1.webFrame.setZoomLevel(level),
        getPatrons: () => electron_1.ipcRenderer.invoke("app:get-patrons"),
        showProjectWindow: () => electron_1.ipcRenderer.invoke("app:show-project-window"),
    },
    l10n: {
        getL10NStrings: () => electron_1.ipcRenderer.invoke("get-l10n-strings"),
    },
    theme: {
        getTheme: () => electron_1.ipcRenderer.invoke("get-theme"),
        onChange: (callback) => electron_1.ipcRenderer.on("update-theme", (_, theme) => callback(theme)),
    },
    templates: {
        getTemplatesList: () => electron_1.ipcRenderer.invoke("templates:list"),
    },
    paths: {
        getDocumentsPath: () => electron_1.ipcRenderer.invoke("get-documents-path"),
        getTmpPath: () => electron_1.ipcRenderer.invoke("get-tmp-path"),
    },
    settings: {
        get: (key) => electron_1.ipcRenderer.invoke("settings-get", key),
        getString: (key, fallback) => (0, types_1.ensurePromisedString)(electron_1.ipcRenderer.invoke("settings-get", key), fallback),
        getNumber: (key, fallback) => (0, types_1.ensurePromisedNumber)(electron_1.ipcRenderer.invoke("settings-get", key), fallback),
        set: (key, value) => electron_1.ipcRenderer.invoke("settings-set", key, value),
        delete: (key) => electron_1.ipcRenderer.invoke("settings-delete", key),
        app: {
            setUIScale: (scale) => electron_1.ipcRenderer.invoke("set-ui-scale", scale),
            getUIScale: () => APISetup.settings.getNumber("zoomLevel", 0),
            setTrackerKeyBindings: (value) => electron_1.ipcRenderer.invoke("set-tracker-keybindings", value),
            getTrackerKeyBindings: () => APISetup.settings.getNumber("trackerKeyBindings", 0),
        },
    },
    dialog: {
        chooseDirectory: () => electron_1.ipcRenderer.invoke("open-directory-picker"),
        chooseFile: () => electron_1.ipcRenderer.invoke("open-file-picker"),
        showError: (title, content) => electron_1.ipcRenderer.invoke("dialog:show-error", title, content),
        confirmEnableColorDialog: () => electron_1.ipcRenderer.invoke("dialog:confirm-color"),
        confirmDeleteCustomEvent: (name, sceneNames, count) => electron_1.ipcRenderer.invoke("dialog:confirm-delete-custom-event", name, sceneNames, count),
        confirmReplaceCustomEvent: (name) => electron_1.ipcRenderer.invoke("dialog:confirm-replace-custom-event", name),
        confirmDeletePrefab: (name, count) => electron_1.ipcRenderer.invoke("dialog:confirm-delete-prefab", name, count),
        confirmReplacePrefab: (name) => electron_1.ipcRenderer.invoke("dialog:confirm-replace-prefab", name),
        confirmUnpackPrefab: () => electron_1.ipcRenderer.invoke("dialog:confirm-unpack-prefab"),
        confirmDeletePreset: (name) => electron_1.ipcRenderer.invoke("dialog:confirm-delete-preset", name),
        confirmApplyPreset: () => electron_1.ipcRenderer.invoke("dialog:confirm-apply-preset"),
        confirmDeleteConstant: (name, usesNames) => electron_1.ipcRenderer.invoke("dialog:confirm-delete-constant", name, usesNames),
        confirmUnsavedChangesTrackerDialog: (name) => electron_1.ipcRenderer.invoke("dialog:confirm-tracker-unsaved", name),
        migrateWarning: (path) => electron_1.ipcRenderer.invoke("dialog:migrate-warning", path),
    },
    project: {
        getRecentProjects: () => electron_1.ipcRenderer.invoke("get-recent-projects"),
        removeRecentProject: (path) => electron_1.ipcRenderer.invoke("remove-recent-project", path),
        clearRecentProjects: () => electron_1.ipcRenderer.invoke("clear-recent-projects"),
        openProjectPicker: () => electron_1.ipcRenderer.invoke("project:open-project-picker"),
        openProject: (projectPath) => electron_1.ipcRenderer.invoke("project:open", { projectPath }),
        getResourceChecksums: () => electron_1.ipcRenderer.invoke("project:get-resource-checksums"),
        createProject: (input) => electron_1.ipcRenderer.invoke("create-project", input),
        updateProjectWindowMenu: (settings) => electron_1.ipcRenderer.invoke("project:update-project-window-menu", settings),
        close: () => electron_1.ipcRenderer.invoke("close-project"),
        build: (data, options) => electron_1.ipcRenderer.invoke("project:build", data, options),
        buildCancel: () => electron_1.ipcRenderer.invoke("project:build-cancel"),
        onBuildLog: (listener) => electron_1.ipcRenderer.on("build:log", listener),
        onBuildError: (listener) => electron_1.ipcRenderer.on("build:error", listener),
        ejectEngine: () => electron_1.ipcRenderer.invoke("project:engine-eject"),
        exportProject: (data, engineSchema, exportType) => electron_1.ipcRenderer.invoke("project:export", data, engineSchema, exportType),
        getBackgroundInfo: (background, tileset, is360, uiPalette, colorMode, colorCorrection, autoTileFlipEnabled) => electron_1.ipcRenderer.invoke("project:get-background-info", background, tileset, is360, uiPalette, colorMode, colorCorrection, autoTileFlipEnabled),
        extractBackgroundMonoTiles: (background, uiPalette, colorCorrection) => electron_1.ipcRenderer.invoke("project:extract-background-mono-tiles", background, uiPalette, colorCorrection),
        addFile: (filename) => electron_1.ipcRenderer.invoke("project:add-file", filename),
        loadRPG5EData: () => electron_1.ipcRenderer.invoke("project:load-rpg5e-data"),
        saveRPG5EData: (data) => electron_1.ipcRenderer.invoke("project:save-rpg5e-data", data),
        createSpriteAsset: (filename, pngDataUrl) => electron_1.ipcRenderer.invoke("project:create-sprite-asset", filename, pngDataUrl),
        loadProject: () => electron_1.ipcRenderer.invoke("project:load"),
        saveProject: (data) => electron_1.ipcRenderer.invoke("project:save", data),
        setModified: () => electron_1.ipcRenderer.invoke("project:set-modified"),
        setUnmodified: () => electron_1.ipcRenderer.invoke("project:set-unmodified"),
        renameAsset: (type, asset, filename) => electron_1.ipcRenderer.invoke("project:rename-asset", type, asset, filename),
        removeAsset: (type, asset) => electron_1.ipcRenderer.invoke("project:remove-asset", type, asset),
    },
    script: {
        getScriptAutoLabel: (cmd, args) => electron_1.ipcRenderer.invoke("script:get-auto-label", cmd, args),
        scriptEventPostUpdateFn: (cmd, fieldKey, args, prevArgs) => electron_1.ipcRenderer.invoke("script:post-update-fn", cmd, fieldKey, args, prevArgs),
        scriptEventUpdateFn: (cmd, fieldKey, value) => electron_1.ipcRenderer.invoke("script:update-fn", cmd, fieldKey, value),
    },
    music: {
        openMusic: (sfx) => electron_1.ipcRenderer.invoke("music:open", sfx),
        closeMusic: () => electron_1.ipcRenderer.invoke("music:close"),
        sendToMusicWindow: (data) => electron_1.ipcRenderer.send("music:data-send", data),
        sendToProjectWindow: (data) => electron_1.ipcRenderer.send("music:data-receive", data),
        playUGE: (filename) => electron_1.ipcRenderer.invoke("music:play-uge", filename),
    },
    soundfx: {
        playWav: (filename) => electron_1.ipcRenderer.invoke("sfx:play-wav", filename),
        playVGM: (filename) => electron_1.ipcRenderer.invoke("sfx:play-vgm", filename),
        playFXHammer: (filename, effectIndex) => electron_1.ipcRenderer.invoke("sfx:play-fxhammer", filename, effectIndex),
    },
    tracker: {
        addNewUGEFile: (path) => electron_1.ipcRenderer.invoke("tracker:new", path),
        loadUGEFile: (path) => electron_1.ipcRenderer.invoke("tracker:load", path),
        saveUGEFile: (song) => electron_1.ipcRenderer.invoke("tracker:save", song),
    },
    sprite: {
        compileSprite: (spriteData, defaultSpriteMode) => electron_1.ipcRenderer.invoke("sprite:compile", spriteData, defaultSpriteMode),
    },
    clipboard: {
        addPasteInPlaceListener: (listener) => electron_1.ipcRenderer.on("paste-in-place", listener),
        removePasteInPlaceListener: (listener) => electron_1.ipcRenderer.removeListener("paste-in-place", listener),
        readText: () => electron_1.ipcRenderer.invoke("clipboard:read-text"),
        readBuffer: async (format) => Buffer.from(await electron_1.ipcRenderer.invoke("clipboard:read-buffer", format)),
        writeText: (value) => electron_1.ipcRenderer.invoke("clipboard:write-text", value),
        writeBuffer: (format, buffer) => electron_1.ipcRenderer.invoke("clipboard:write-buffer", format, buffer),
    },
    debugger: {
        pause: () => electron_1.ipcRenderer.invoke("debugger:pause"),
        resume: () => electron_1.ipcRenderer.invoke("debugger:resume"),
        setPauseOnScriptChanged: (enabled) => electron_1.ipcRenderer.invoke("debugger:pause-on-script", enabled),
        setPauseOnWatchVariableChanged: (enabled) => electron_1.ipcRenderer.invoke("debugger:pause-on-var", enabled),
        setGlobal: (symbol, value) => electron_1.ipcRenderer.invoke("debugger:set-global", symbol, value),
        step: () => electron_1.ipcRenderer.invoke("debugger:step"),
        stepFrame: () => electron_1.ipcRenderer.invoke("debugger:step-frame"),
        setBreakpoints: (breakpoints) => electron_1.ipcRenderer.invoke("debugger:set-breakpoints", breakpoints),
        setWatchedVariableIds: (variableIds) => electron_1.ipcRenderer.invoke("debugger:set-watched", variableIds),
        sendToProjectWindow: (data) => electron_1.ipcRenderer.send("debugger:data-receive", data),
    },
    pluginManager: {
        getPluginsList: (force) => electron_1.ipcRenderer.invoke("plugins:fetch-list", force),
        getPluginRepos: () => electron_1.ipcRenderer.invoke("plugins:list-repos"),
        addPluginRepo: (url) => electron_1.ipcRenderer.invoke("plugins:add-repo", url),
        removePluginRepo: (url) => electron_1.ipcRenderer.invoke("plugins:remove-repo", url),
        addPlugin: (id, repoId) => electron_1.ipcRenderer.invoke("plugins:add", id, repoId),
        removePlugin: (id, pluginType) => electron_1.ipcRenderer.invoke("plugins:remove", id, pluginType),
        getInstalledPlugins: () => electron_1.ipcRenderer.invoke("plugins:get-installed"),
    },
    events: {
        menu: {
            saveProject: createSubscribeAPI("menu:save-project"),
            saveProjectAs: createSubscribeAPI("menu:save-project-as"),
            onSaveAndCloseProject: createSubscribeAPI("menu:save-project-and-close"),
            undo: createSubscribeAPI("menu:undo"),
            redo: createSubscribeAPI("menu:redo"),
            pasteInPlace: createSubscribeAPI("menu:paste-in-place"),
            setSection: createSubscribeAPI("menu:section"),
            reloadAssets: createSubscribeAPI("menu:reload-assets"),
            zoom: createSubscribeAPI("menu:zoom"),
            run: createSubscribeAPI("menu:run"),
            build: createSubscribeAPI("menu:build"),
            ejectEngine: createSubscribeAPI("menu:eject-engine"),
            exportProject: createSubscribeAPI("menu:export-project"),
            pluginRun: createSubscribeAPI("menu:plugin-run"),
        },
        app: {
            isFullScreenChanged: createSubscribeAPI("app:is-full-screen:changed"),
        },
        music: {
            data: createSubscribeAPI("music:data"),
        },
        debugger: {
            data: createSubscribeAPI("debugger:data"),
            symbols: createSubscribeAPI("debugger:symbols"),
            disconnected: createSubscribeAPI("debugger:disconnected"),
            romusage: createSubscribeAPI("debugger:romusage"),
        },
        project: {
            saveProgress: createSubscribeAPI("project:save-progress"),
        },
        settings: {
            uiScaleChanged: createSubscribeAPI("setting:ui-scale:changed"),
            trackerKeyBindingsChanged: createSubscribeAPI("setting:tracker-keybindings:changed"),
            settingChanged: createSubscribeAPI("setting:changed"),
        },
        templates: {
            templatesListChanged: createSubscribeAPI("templates:list:changed"),
        },
        watch: {
            sprite: createWatchSubscribeAPI("watch:sprite"),
            background: createWatchSubscribeAPI("watch:background"),
            music: createWatchSubscribeAPI("watch:music"),
            sound: createWatchSubscribeAPI("watch:sound"),
            font: createWatchSubscribeAPI("watch:font"),
            avatar: createWatchSubscribeAPI("watch:avatar"),
            emote: createWatchSubscribeAPI("watch:emote"),
            tileset: createWatchSubscribeAPI("watch:tileset"),
            ui: createWatchSubscribeAPI("watch:ui"),
            engineSchema: {
                changed: createSubscribeAPI("watch:engineSchema:changed"),
            },
            scriptEventDefs: {
                changed: createSubscribeAPI("watch:scriptEventDefs:changed"),
            },
        },
    },
};
exports["default"] = APISetup;


/***/ }),

/***/ 499:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.omit = exports.ensureMaybeNumber = exports.ensureMaybeString = exports.ensurePromisedNumber = exports.ensurePromisedString = exports.ensureBoolean = exports.ensureNumber = exports.ensureStringArray = exports.ensureString = exports.ensurePromisedTypeGenerator = exports.ensureTypeGenerator = exports.ensureType = exports.isMaybeNumber = exports.isMaybeString = exports.isUndefined = exports.isBoolean = exports.isNumber = exports.isString = exports.isStringArray = void 0;
const isStringArray = (value) => {
    if (!Array.isArray(value)) {
        return false;
    }
    return value.every(exports.isString);
};
exports.isStringArray = isStringArray;
const isString = (value) => {
    return typeof value === "string";
};
exports.isString = isString;
const isNumber = (value) => {
    return typeof value === "number" && !isNaN(value) && isFinite(value);
};
exports.isNumber = isNumber;
const isBoolean = (value) => {
    return typeof value === "boolean";
};
exports.isBoolean = isBoolean;
const isUndefined = (value) => {
    return value === undefined;
};
exports.isUndefined = isUndefined;
const isMaybeString = (value) => {
    return (0, exports.isString)(value) || (0, exports.isUndefined)(value);
};
exports.isMaybeString = isMaybeString;
const isMaybeNumber = (value) => {
    return (0, exports.isNumber)(value) || (0, exports.isUndefined)(value);
};
exports.isMaybeNumber = isMaybeNumber;
const ensureType = (value, fallback, isType) => {
    return isType(value) ? value : fallback;
};
exports.ensureType = ensureType;
const ensureTypeGenerator = (isType) => {
    return (value, fallback) => (isType(value) ? value : fallback);
};
exports.ensureTypeGenerator = ensureTypeGenerator;
const ensurePromisedTypeGenerator = (isType) => {
    return async (promise, fallback) => {
        try {
            const value = await promise;
            return isType(value) ? value : fallback;
        }
        catch {
            return fallback;
        }
    };
};
exports.ensurePromisedTypeGenerator = ensurePromisedTypeGenerator;
exports.ensureString = (0, exports.ensureTypeGenerator)(exports.isString);
exports.ensureStringArray = (0, exports.ensureTypeGenerator)(exports.isStringArray);
exports.ensureNumber = (0, exports.ensureTypeGenerator)(exports.isNumber);
exports.ensureBoolean = (0, exports.ensureTypeGenerator)(exports.isBoolean);
exports.ensurePromisedString = (0, exports.ensurePromisedTypeGenerator)(exports.isString);
exports.ensurePromisedNumber = (0, exports.ensurePromisedTypeGenerator)(exports.isNumber);
exports.ensureMaybeString = (0, exports.ensureTypeGenerator)(exports.isMaybeString);
exports.ensureMaybeNumber = (0, exports.ensureTypeGenerator)(exports.isMaybeNumber);
const omit = (obj, ...keys) => {
    const ret = {};
    let key;
    for (key in obj) {
        if (!keys.includes(key)) {
            ret[key] = obj[key];
        }
    }
    return ret;
};
exports.omit = omit;


/***/ }),

/***/ 288:
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(97);
/******/ 	
/******/ })()
;
//# sourceMappingURL=preload.js.map