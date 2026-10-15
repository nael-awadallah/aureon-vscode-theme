import * as vscode from "vscode";
import { getIconSets, type IconSet } from "./iconProvider";

const MAX_ITEMS = 12;

enum Source {
  Builtin = "builtin",
  Marketplace = "marketplace",
}

interface PaletteItem extends vscode.QuickPickItem {
  readonly set: IconSet;
  source: Source;
}

/**
 * Register the palette picker command.
 * @param context the extension context
 */
export async function createPaletteCommand(context: vscode.ExtensionContext): Promise<void> {
  const items: PaletteItem[] = (await getIconSets()).map((set) => ({
    label: set.name,
    description: `${set.icons.length} icons`,
    set,
    source: set.builtin ? Source.Builtin : Source.Marketplace,
  }));

  const selected = await vscode.window.showQuickPick(items.slice(0, MAX_ITEMS), {
    placeHolder: "Choose an icon set",
    matchOnDescription: true,
  });

  if (!selected) {
    return;
  }

  const pattern = /^[a-z][\w-]*$/i;
  if (!pattern.test(selected.set.id)) {
    throw new Error(`Invalid icon set id: ${selected.set.id}\n`);
  }

  await context.globalState.update("iconSet", selected.set.id);
  vscode.window.showInformationMessage(`Icon set: ${selected.label}`);
}

export class PaletteProvider implements vscode.TreeDataProvider<PaletteItem> {
  private readonly emitter = new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData = this.emitter.event;

  constructor(private items: PaletteItem[] = []) {}

  getTreeItem(item: PaletteItem): vscode.TreeItem {
    return new vscode.TreeItem(item.label, vscode.TreeItemCollapsibleState.None);
  }

  getChildren(): PaletteItem[] {
    return this.items.filter((item) => item.source !== Source.Builtin || this.items.length < 100);
  }
}
