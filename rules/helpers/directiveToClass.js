"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
const Lint = require("tslint");
function generateDescription(directiveCategory, resultantClass) {
    return `All directives of ${directiveCategory} category are now replaces with respective classes ${resultantClass}`;
}
exports.generateDescription = generateDescription;
function createDirectiveToClassTemplateVisitorClass(transformations, directiveCategory, className) {
    return class extends basicTemplateAstVisitor_1.BasicTemplateAstVisitor {
        visitElement(element, context) {
            let errors = [];
            for (let [directive, resultantClass] of transformations) {
                const foundAttr = element.attrs.find(attr => attr.name === directive);
                if (foundAttr) {
                    errors.push({
                        attr: foundAttr,
                        resultantClass: resultantClass
                    });
                }
            }
            if (errors.length) {
                let fixes = [];
                let classStartPosition, classEndPosition, existingClasses = '', newClasses = '';
                let elementStart = element.sourceSpan.start.offset;
                let elementEnd = element.sourceSpan.end.offset;
                for (let item of errors) {
                    const attributePosition = this.getSourcePosition(item.attr.sourceSpan.start.offset);
                    const attributeEndPosition = this.getSourcePosition(item.attr.sourceSpan.end.offset);
                    fixes.push(Lint.Replacement.deleteFromTo(attributePosition - 1, attributeEndPosition));
                    newClasses += item.resultantClass + ' ';
                }
                const foundClassAttr = element.attrs.find(attr => attr.name === 'class');
                if (foundClassAttr) {
                    classStartPosition = this.getSourcePosition(foundClassAttr.sourceSpan.start.offset);
                    classEndPosition = this.getSourcePosition(foundClassAttr.sourceSpan.end.offset);
                    existingClasses = foundClassAttr.value;
                    if (!existingClasses.length)
                        newClasses = newClasses.slice(0, -1);
                    fixes.push(Lint.Replacement.replaceFromTo(classStartPosition, classEndPosition, `class="${newClasses}${existingClasses}"`));
                }
                else {
                    if (element.attrs.length) {
                        const lastAttribute = element.attrs[element.attrs.length - 1];
                        classStartPosition = this.getSourcePosition(lastAttribute.sourceSpan.end.offset);
                    }
                    else {
                        classStartPosition = this.getSourcePosition(element.sourceSpan.end.offset) - 1;
                    }
                    classEndPosition = classStartPosition;
                    if (!existingClasses.length)
                        newClasses = newClasses.slice(0, -1);
                    fixes.push(Lint.Replacement.replaceFromTo(classStartPosition, classEndPosition, ` class="${newClasses}${existingClasses}"`));
                }
                this.addFailureAt(elementStart, elementEnd, generateDescription(directiveCategory, className), fixes);
            }
            super.visitElement(element, context);
        }
    };
}
exports.createDirectiveToClassTemplateVisitorClass = createDirectiveToClassTemplateVisitorClass;
function createDirectiveToClassRuleClass(ruleName, transformations, directiveCategory, className) {
    var _a;
    return _a = class extends Lint.Rules.AbstractRule {
            apply(sourceFile) {
                return this.applyWithWalker(new ngWalker_1.NgWalker(sourceFile, this.getOptions(), {
                    templateVisitorCtrl: createDirectiveToClassTemplateVisitorClass(transformations, directiveCategory, className)
                }));
            }
        },
        _a.metadata = {
            ruleName: ruleName,
            type: 'functionality',
            description: generateDescription(directiveCategory, className),
            options: null,
            optionsDescription: 'Not configurable.',
            typescriptOnly: false,
            hasFix: true
        },
        _a;
}
exports.createDirectiveToClassRuleClass = createDirectiveToClassRuleClass;
