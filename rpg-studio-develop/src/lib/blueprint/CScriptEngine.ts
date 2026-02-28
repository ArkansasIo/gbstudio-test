export type CCompilerTarget = "gbdk" | "cc65";

export interface CScriptBuildRequest {
  scriptId: string;
  source: string;
  target?: CCompilerTarget;
  optimize?: "size" | "speed";
}

export interface CScriptDiagnostic {
  line: number;
  column: number;
  severity: "error" | "warning";
  message: string;
}

export interface CScriptBuildResult {
  ok: boolean;
  diagnostics: CScriptDiagnostic[];
  objectFile?: string;
  commandPreview: string;
}

const FORBIDDEN_CALLS = ["malloc(", "free(", "printf(", "scanf("];

const lineAt = (source: string, line: number): string => {
  const lines = source.split(/\r?\n/);
  return lines[Math.max(0, line - 1)] ?? "";
};

export const validateCScript = (source: string): CScriptDiagnostic[] => {
  const diagnostics: CScriptDiagnostic[] = [];
  const lines = source.split(/\r?\n/);

  if (!/\bvoid\s+script_main\s*\(/.test(source)) {
    diagnostics.push({
      line: 1,
      column: 1,
      severity: "error",
      message: "Missing required entrypoint: void script_main(void)",
    });
  }

  lines.forEach((line, index) => {
    FORBIDDEN_CALLS.forEach((fnName) => {
      const col = line.indexOf(fnName);
      if (col >= 0) {
        diagnostics.push({
          line: index + 1,
          column: col + 1,
          severity: "warning",
          message: `Avoid ${fnName.replace("(", "")} in Game Console runtime code`,
        });
      }
    });
  });

  return diagnostics;
};

export const buildCScript = async (
  request: CScriptBuildRequest,
): Promise<CScriptBuildResult> => {
  const target = request.target ?? "gbdk";
  const diagnostics = validateCScript(request.source);
  const hasError = diagnostics.some((d) => d.severity === "error");

  const commandPreview =
    target === "gbdk"
      ? `lcc -Wa-l -Wl-m -Wl-j -DUSE_SFR_FOR_REG -c ${request.scriptId}.c -o ${request.scriptId}.o`
      : `cl65 -t none -O ${request.scriptId}.c -o ${request.scriptId}.o`;

  return {
    ok: !hasError,
    diagnostics,
    objectFile: hasError ? undefined : `${request.scriptId}.o`,
    commandPreview,
  };
};

export const addLineNumbers = (source: string): string =>
  source
    .split(/\r?\n/)
    .map((line, index) => `${String(index + 1).padStart(3, "0")} | ${line}`)
    .join("\n");

export const getDiagnosticSourceLine = (
  source: string,
  diagnostic: CScriptDiagnostic,
): string => lineAt(source, diagnostic.line);
