"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const directiveToClass_1 = require("./helpers/directiveToClass");
const transformations = new Map([
    ['margin', 'ion-margin'],
    ['no-margin', 'ion-no-margin'],
    ['margin-bottom', 'ion-margin-bottom'],
    ['margin-top', 'ion-margin-top'],
    ['margin-left', 'ion-margin-start'],
    ['margin-right', 'ion-margin-end'],
    ['margin-horizontal', 'ion-margin-horizontal'],
    ['margin-vertical', 'ion-margin-vertical']
]);
const directiveCategory = 'margin';
const className = 'ion-margin';
exports.ruleName = 'ion-margin-util-is-now-a-class';
exports.Rule = directiveToClass_1.createDirectiveToClassRuleClass(exports.ruleName, transformations, directiveCategory, className);
