"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const Lint = require("tslint");
const basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
exports.ruleName = 'ion-tabs-refactored';
const TABS = 'ion-tabs';
const TemplateVisitor = createTabsRefactoredVisitorClass(TABS);
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new ngWalker_1.NgWalker(sourceFile, this.getOptions(), {
            templateVisitorCtrl: TemplateVisitor
        }));
    }
}
Rule.metadata = {
    ruleName: exports.ruleName,
    type: 'functionality',
    description: 'Tabs have been refacotred, please see this blog post: ',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: false
};
exports.Rule = Rule;
function generateErrorMessage() {
    return `Tabs have gone through a significant refactor.
    Please see https://github.com/ionic-team/ionic/blob/master/CHANGELOG.md#angular-tabs`;
}
function createTabsRefactoredVisitorClass(tabElement) {
    return class extends basicTemplateAstVisitor_1.BasicTemplateAstVisitor {
        visitElement(element, context) {
            if (element.name === tabElement)
                this.checkElement(element);
            super.visitElement(element, context);
        }
        checkElement(element) {
            const start = element.sourceSpan.start.offset + 1;
            const length = element.name.length;
            this.addFailureAt(start, length, generateErrorMessage());
        }
    };
}
exports.createTabsRefactoredVisitorClass = createTabsRefactoredVisitorClass;
