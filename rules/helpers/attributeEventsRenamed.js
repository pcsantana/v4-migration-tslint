"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lint = require("tslint");
const basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
function generateErrorMessage(elementName, attrName, replacement) {
    return `The ${attrName} event of ${elementName} has been renamed. Use ${replacement} instead.`;
}
function createAttributesRenamedTemplateVisitorClass(elementNames, replacementMap) {
    return class extends basicTemplateAstVisitor_1.BasicTemplateAstVisitor {
        visitElement(element, context) {
            if (!elementNames || elementNames.includes(element.name)) {
                this.checkAttributesForReplacements(element);
            }
            super.visitElement(element, context);
        }
        checkAttributesForReplacements(element) {
            for (const output of element.outputs) {
                const replacement = replacementMap.get(output.name);
                if (replacement) {
                    const start = output.sourceSpan.start.offset + 1;
                    const length = output.name.length;
                    const position = this.getSourcePosition(start);
                    this.addFailureAt(start, length, generateErrorMessage(element.name, output.name, replacement), [
                        Lint.Replacement.replaceFromTo(position, position + length, replacement)
                    ]);
                }
            }
        }
    };
}
exports.createAttributesRenamedTemplateVisitorClass = createAttributesRenamedTemplateVisitorClass;
