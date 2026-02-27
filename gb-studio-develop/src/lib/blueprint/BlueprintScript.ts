// BlueprintScript.ts
// Blueprint scripting system inspired by Unreal Engine 5

import {
  buildCScript,
  type CCompilerTarget,
  type CScriptBuildResult,
} from "./CScriptEngine";

export type BlueprintNodeType = "event" | "function" | "variable" | "branch" | "loop" | "math" | "logic" | "ai" | "input" | "output" | "custom";
export type ScriptLanguage = "blueprint" | "c";

export interface BlueprintNode {
  id: string;
  type: BlueprintNodeType;
  name: string;
  inputs: string[];
  outputs: string[];
  properties?: Record<string, unknown>;
  description?: string;
}

export class BlueprintScript {
  nodes: BlueprintNode[] = [];
  language: ScriptLanguage = "blueprint";
  cSource = "";

  addNode(node: BlueprintNode) {
    this.nodes.push(node);
  }

  removeNode(id: string) {
    this.nodes = this.nodes.filter(n => n.id !== id);
  }

  getNode(id: string): BlueprintNode | undefined {
    return this.nodes.find(n => n.id === id);
  }

  connectNodes(_fromId: string, _toId: string) {
    // Add connection logic
  }

  execute(_inputs: Record<string, unknown>) {
    // Execute blueprint logic
  }

  setLanguage(language: ScriptLanguage) {
    this.language = language;
  }

  setCSource(source: string) {
    this.cSource = source;
    this.language = "c";
  }

  async buildC(
    scriptId: string,
    target?: CCompilerTarget,
  ): Promise<CScriptBuildResult> {
    return buildCScript({
      scriptId,
      source: this.cSource,
      target,
    });
  }

  serialize(): string {
    return JSON.stringify({
      nodes: this.nodes,
      language: this.language,
      cSource: this.cSource,
    });
  }

  static deserialize(data: string): BlueprintScript {
    const script = new BlueprintScript();
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      script.nodes = parsed;
      script.language = "blueprint";
      script.cSource = "";
      return script;
    }
    script.nodes = Array.isArray(parsed.nodes) ? parsed.nodes : [];
    script.language = parsed.language === "c" ? "c" : "blueprint";
    script.cSource = typeof parsed.cSource === "string" ? parsed.cSource : "";
    return script;
  }
}

// Example node types
export const BlueprintNodeTypes: BlueprintNodeType[] = [
  "event", "function", "variable", "branch", "loop", "math", "logic", "ai", "input", "output", "custom"
];

// Example functions and logic (expand as needed)
export const BlueprintFunctions = {
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b,
  multiply: (a: number, b: number) => a * b,
  divide: (a: number, b: number) => a / b,
  branch: (condition: boolean, trueFn: () => void, falseFn: () => void) => condition ? trueFn() : falseFn(),
  loop: (count: number, fn: (i: number) => void) => { for(let i=0;i<count;i++) fn(i); },
  // ...more
};
