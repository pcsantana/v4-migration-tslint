"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const directiveToClass_1 = require("./helpers/directiveToClass");
const transformations = new Map([
    ['padding', 'ion-padding'],
    ['no-padding', 'ion-no-padding'],
    ['padding-bottom', 'ion-padding-bottom'],
    ['padding-top', 'ion-padding-top'],
    ['padding-left', 'ion-padding-start'],
    ['padding-right', 'ion-padding-end'],
    ['padding-horizontal', 'ion-padding-horizontal'],
    ['padding-vertical', 'ion-padding-vertical']
]);
const directiveCategory = 'padding';
const className = 'ion-padding';
exports.ruleName = 'ion-padding-util-is-now-a-class';
exports.Rule = directiveToClass_1.createDirectiveToClassRuleClass(exports.ruleName, transformations, directiveCategory, className);
