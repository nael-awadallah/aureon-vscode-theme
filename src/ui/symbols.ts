import type { Colors, Ctx } from "./context";

// Symbol icons in suggest, outline and breadcrumbs. They follow the syntax
// roles, so an icon has the same color as the code it stands for.
export function symbols({ p }: Ctx): Colors {
  const { text, syntax } = p;
  return {
    "symbolIcon.functionForeground": syntax.function,
    "symbolIcon.methodForeground": syntax.function,
    "symbolIcon.constructorForeground": syntax.function,
    "symbolIcon.classForeground": syntax.type,
    "symbolIcon.structForeground": syntax.type,
    "symbolIcon.enumeratorForeground": syntax.type,
    "symbolIcon.moduleForeground": syntax.type,
    "symbolIcon.namespaceForeground": syntax.type,
    "symbolIcon.packageForeground": syntax.type,
    "symbolIcon.objectForeground": syntax.type,
    "symbolIcon.arrayForeground": syntax.type,
    "symbolIcon.referenceForeground": syntax.type,
    "symbolIcon.interfaceForeground": syntax.interface,
    "symbolIcon.typeParameterForeground": syntax.interface,
    "symbolIcon.propertyForeground": syntax.property,
    "symbolIcon.fieldForeground": syntax.property,
    "symbolIcon.keyForeground": syntax.property,
    "symbolIcon.eventForeground": syntax.property,
    "symbolIcon.variableForeground": syntax.variable,
    "symbolIcon.constantForeground": syntax.constant,
    "symbolIcon.enumeratorMemberForeground": syntax.constant,
    "symbolIcon.numberForeground": syntax.constant,
    "symbolIcon.booleanForeground": syntax.constant,
    "symbolIcon.nullForeground": syntax.constant,
    "symbolIcon.colorForeground": syntax.constant,
    "symbolIcon.unitForeground": syntax.constant,
    "symbolIcon.stringForeground": syntax.string,
    "symbolIcon.keywordForeground": syntax.keyword,
    "symbolIcon.operatorForeground": syntax.operator,
    "symbolIcon.snippetForeground": text.secondary,
    "symbolIcon.textForeground": text.secondary,
    "symbolIcon.fileForeground": text.secondary,
    "symbolIcon.folderForeground": text.secondary,
  };
}
