"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngWalker_1 = require("codelyzer/angular/ngWalker");
const Lint = require("tslint");
const attributeEventsRenamed_1 = require("./helpers/attributeEventsRenamed");
exports.ruleName = 'ion-menu-events-renamed';
const replacementMap = new Map([
    ['ionOpen', 'ionDidOpen'],
    ['ionClose', 'ionDidClose']
]);
const TemplateVisitor = attributeEventsRenamed_1.createAttributesRenamedTemplateVisitorClass(undefined, replacementMap);
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
    description: 'Events for ion-menu have changed',
    options: null,
    optionsDescription: 'Not configurable.',
    typescriptOnly: false,
    hasFix: true
};
exports.Rule = Rule;
