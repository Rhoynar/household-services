"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var parties_collection_1 = require('../../../../both/collections/parties.collection');
var parties_form_component_html_1 = require('./parties-form.component.html');
var PartiesFormComponent = (function () {
    function PartiesFormComponent(formBuilder) {
        this.formBuilder = formBuilder;
    }
    PartiesFormComponent.prototype.ngOnInit = function () {
        this.addForm = this.formBuilder.group({
            name: ['', forms_1.Validators.required],
            description: [],
            location: ['', forms_1.Validators.required]
        });
    };
    PartiesFormComponent.prototype.addParty = function () {
        if (this.addForm.valid) {
            parties_collection_1.Parties.insert(this.addForm.value);
            this.addForm.reset();
        }
    };
    PartiesFormComponent = __decorate([
        core_1.Component({
            selector: 'parties-form',
            template: parties_form_component_html_1.default
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], PartiesFormComponent);
    return PartiesFormComponent;
}());
exports.PartiesFormComponent = PartiesFormComponent;
//# sourceMappingURL=parties-form.component.js.map