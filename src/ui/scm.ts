import type { Colors, Ctx } from "./context";

// Diff editor, merge conflicts, merge editor, git decorations, source control graph.
export function scm({ p, gold, wash, alpha, mix }: Ctx): Colors {
  const { bg, border, text, accent, status, git, syntax } = p;
  return {
    // Diff
    "diffEditor.insertedTextBackground": alpha(git.added, 0.14),
    "diffEditor.removedTextBackground": alpha(git.deleted, 0.14),
    "diffEditor.insertedLineBackground": alpha(git.added, 0.07),
    "diffEditor.removedLineBackground": alpha(git.deleted, 0.07),
    "diffEditor.diagonalFill": border.default,
    "diffEditor.border": border.subtle,
    "diffEditor.unchangedRegionBackground": bg.sidebar,
    "diffEditor.unchangedRegionForeground": text.muted,
    "diffEditor.unchangedRegionShadow": "#00000066",
    "diffEditor.unchangedCodeBackground": wash(0.03),
    "diffEditor.move.border": alpha(text.muted, 0.6),
    "diffEditor.moveActive.border": accent.base,
    "diffEditorGutter.insertedLineBackground": alpha(git.added, 0.12),
    "diffEditorGutter.removedLineBackground": alpha(git.deleted, 0.12),
    "diffEditorOverview.insertedForeground": alpha(git.added, 0.5),
    "diffEditorOverview.removedForeground": alpha(git.deleted, 0.5),

    // Inline merge conflicts
    "merge.currentHeaderBackground": alpha(git.added, 0.35),
    "merge.currentContentBackground": alpha(git.added, 0.12),
    "merge.incomingHeaderBackground": alpha(status.info, 0.35),
    "merge.incomingContentBackground": alpha(status.info, 0.12),
    "merge.commonHeaderBackground": alpha(text.muted, 0.4),
    "merge.commonContentBackground": alpha(text.muted, 0.16),
    "merge.border": border.default,

    // Merge editor
    "mergeEditor.change.background": alpha(git.added, 0.14),
    "mergeEditor.change.word.background": alpha(git.added, 0.22),
    "mergeEditor.changeBase.background": alpha(git.deleted, 0.14),
    "mergeEditor.changeBase.word.background": alpha(git.deleted, 0.22),
    "mergeEditor.conflict.unhandledUnfocused.border": alpha(status.warning, 0.5),
    "mergeEditor.conflict.unhandledFocused.border": status.warning,
    "mergeEditor.conflict.handledUnfocused.border": alpha(text.muted, 0.4),
    "mergeEditor.conflict.handledFocused.border": text.secondary,
    "mergeEditor.conflict.handled.minimapOverViewRuler": text.secondary,
    "mergeEditor.conflict.unhandled.minimapOverViewRuler": status.warning,
    "mergeEditor.conflictingLines.background": gold(0.14),
    "mergeEditor.conflict.input1.background": alpha(git.added, 0.12),
    "mergeEditor.conflict.input2.background": alpha(status.info, 0.12),

    // Git decorations
    "gitDecoration.addedResourceForeground": git.added,
    "gitDecoration.modifiedResourceForeground": git.modified,
    "gitDecoration.deletedResourceForeground": git.deleted,
    "gitDecoration.untrackedResourceForeground": git.untracked,
    "gitDecoration.ignoredResourceForeground": git.ignored,
    "gitDecoration.conflictingResourceForeground": git.conflict,
    "gitDecoration.renamedResourceForeground": git.renamed,
    "gitDecoration.stageModifiedResourceForeground": git.modified,
    "gitDecoration.stageDeletedResourceForeground": git.deleted,
    "gitDecoration.submoduleResourceForeground": text.secondary,

    // Source control graph
    "scmGraph.foreground1": accent.base,
    "scmGraph.foreground2": syntax.keyword,
    "scmGraph.foreground3": syntax.type,
    "scmGraph.foreground4": syntax.string,
    "scmGraph.foreground5": syntax.constant,
    "scmGraph.historyItemRefColor": accent.base,
    "scmGraph.historyItemRemoteRefColor": syntax.keyword,
    "scmGraph.historyItemBaseRefColor": syntax.constant,
    "scmGraph.historyItemHoverAdditionsForeground": git.added,
    "scmGraph.historyItemHoverDeletionsForeground": git.deleted,
    "scmGraph.historyItemHoverDefaultLabelBackground": bg.overlay,
    "scmGraph.historyItemHoverDefaultLabelForeground": text.primary,
    "scmGraph.historyItemHoverLabelForeground": accent.on,
  };
}
