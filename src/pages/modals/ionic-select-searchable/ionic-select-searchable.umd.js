(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('ionic-angular'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'ionic-angular', '@angular/forms'], factory) :
	(factory((global['ionic-select-searchable'] = {}),global.core,global.common,global.ionicAngular,global.forms));
}(this, (function (exports,core,common,ionicAngular,forms) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectSearchablePage = (function () {
    function SelectSearchablePage(navParams) {
        var _this = this;
        this.navParams = navParams;
        this.selectedItems = [];
        this.selectComponent = this.navParams.get('selectComponent');
        this.navController = this.navParams.get('navController');
        this.filteredItems = this.selectComponent.items;
        this.filterItems();
        if (this.selectComponent.value) {
            if (this.selectComponent.multiple) {
                this.selectComponent.value.forEach(function (item) {
                    _this.selectedItems.push(item);
                });
            }
            else {
                this.selectedItems.push(this.selectComponent.value);
            }
        }
    }
    
    /**
     * @param {?} item
     * @return {?}
     */
    SelectSearchablePage.prototype.isItemSelected = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        return this.selectedItems.find(function (selectedItem) {
            if (_this.selectComponent.itemValueField) {
                return item[_this.selectComponent.itemValueField] === selectedItem[_this.selectComponent.itemValueField];
            }
            return item === selectedItem;
        }) !== undefined;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SelectSearchablePage.prototype.deleteSelectedItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        var /** @type {?} */ itemToDeleteIndex;
        this.selectedItems.forEach(function (selectedItem, itemIndex) {
            if (_this.selectComponent.itemValueField) {
                if (item[_this.selectComponent.itemValueField] === selectedItem[_this.selectComponent.itemValueField]) {
                    itemToDeleteIndex = itemIndex;
                }
            }
            else if (item === selectedItem) {
                itemToDeleteIndex = itemIndex;
            }
        });
        this.selectedItems.splice(itemToDeleteIndex, 1);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SelectSearchablePage.prototype.addSelectedItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.selectedItems.push(item);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SelectSearchablePage.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.selectComponent.multiple) {
            if (this.isItemSelected(item)) {
                this.deleteSelectedItem(item);
            }
            else {
                this.addSelectedItem(item);
            }
        }
        else {
            if (!this.isItemSelected(item)) {
                this.selectedItems = [];
                this.addSelectedItem(item);
                this.selectComponent.select(item);
            }
            this.close();
        }
    };
    /**
     * @return {?}
     */
    SelectSearchablePage.prototype.ok = /**
     * @return {?}
     */
    function () {
        console.log('this.selectedItems:', this.selectedItems);
        this.selectComponent.select(this.selectedItems);
        this.close();
    };
    /**
     * @return {?}
     */
    SelectSearchablePage.prototype.recCancel = /**
     * @return {?}
     */
    function () {
        this.close();
    };
    /**
     * @return {?}
     */
    SelectSearchablePage.prototype.close = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Focused input interferes with the animation.
        // Blur it first, wait a bit and then close the page.
        if (this.searchbarComponent) {
            this.searchbarComponent._fireBlur();
        }
        setTimeout(function () {
            _this.navController.pop({ animation: "md-transition" });
            if (!_this.selectComponent.hasSearch) {
                _this.selectComponent.filterText = '';
            }
        });
    };
    
    /**
     * @return {?}
     */
    SelectSearchablePage.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.navController.pop();
        this.selectComponent.reset();
    };
    /**
     * @return {?}
     */
    SelectSearchablePage.prototype.filterItems = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.selectComponent.hasSearch) {
            // Delegate filtering to the event.
            this.selectComponent.emitSearch(this.infiniteScroll);
        }
        else {
            var /** @type {?} */ items = [];
            // Default filtering.
            if (!this.selectComponent.filterText || !this.selectComponent.filterText.trim()) {
                items = this.selectComponent.items;
            }
            else {
                var /** @type {?} */ filterText_1 = this.selectComponent.filterText.trim().toLowerCase();
                items = this.selectComponent.items.filter(function (item) {
                    return (_this.selectComponent.itemTextField ? item[_this.selectComponent.itemTextField] : item)
                        .toLowerCase().indexOf(filterText_1) !== -1;
                });
            }
            this.filteredItems = items;
        }
    };
    /**
     * @param {?} infiniteScroll
     * @return {?}
     */
    SelectSearchablePage.prototype.getMoreItems = /**
     * @param {?} infiniteScroll
     * @return {?}
     */
    function (infiniteScroll) {
        // TODO: Try to get infiniteScroll via ViewChild. Maybe it works in a newer Ionic version.
        // For now assign it here.
        this.infiniteScroll = infiniteScroll;
        this.selectComponent.onInfiniteScroll.emit({
            component: this.selectComponent,
            infiniteScroll: infiniteScroll,
            text: this.selectComponent.filterText
        });
    };
    SelectSearchablePage.decorators = [
        { type: core.Component, args: [{
                    selector: 'select-searchable-page',
                    template: "\n        <ion-header>\n            <ion-navbar>\n <ion-icon name='close' class='fake-link' (click)='recCancel()'></ion-icon>               <ion-title>{{selectComponent.title}}</ion-title>\n            </ion-navbar>\n            <ion-toolbar *ngIf=\"selectComponent.canSearch\">\n                <ion-searchbar\n                    #searchbarComponent\n                    [(ngModel)]=\"selectComponent.filterText\"\n                    (ionInput)=\"filterItems()\"\n                    [placeholder]=\"selectComponent.searchPlaceholder || 'Search'\">\n                </ion-searchbar>\n            </ion-toolbar>\n        </ion-header>\n        <ion-content>\n            <div class=\"select-searchable-spinner\" *ngIf=\"selectComponent.isSearching\">\n                <div class=\"select-searchable-spinner-background\"></div>\n                <ion-spinner></ion-spinner>\n            </div>\n            <ion-list no-margin *ngIf=\"filteredItems.length\">\n                <button ion-item detail-none *ngFor=\"let item of filteredItems\" (click)=\"select(item)\">\n                    <ion-icon\n                        [name]=\"isItemSelected(item) ? 'checkmark-circle' : 'radio-button-off'\"\n                        [color]=\"isItemSelected(item) ? 'primary' : 'daek'\"\n                        item-left>\n                    </ion-icon>\n                    <h2>{{selectComponent.formatItem(item)}}</h2>\n                </button>\n            </ion-list>\n            <div *ngIf=\"!filteredItems.length\" margin>{{selectComponent.noItemsFoundText}}</div>\n            <ion-infinite-scroll [enabled]=\"selectComponent.hasInfiniteScroll\" (ionInfinite)=\"getMoreItems($event)\">\n                <ion-infinite-scroll-content></ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n        </ion-content>\n        <ion-footer *ngIf=\"selectComponent.canReset || selectComponent.multiple\">\n                            <ion-row>\n                    <ion-col no-padding *ngIf=\"selectComponent.canReset\"\n                        [attr.col-6]=\"selectComponent.canReset && selectComponent.multiple ? '' : null\"\n                        [attr.col-12]=\"selectComponent.canReset && !selectComponent.multiple ? '' : null\">\n                        <button ion-button full no-margin (click)=\"reset()\" [disabled]=\"!selectedItems.length\">\n                            {{selectComponent.resetButtonText}}\n                        </button>\n                    </ion-col>\n                    <ion-col no-padding *ngIf=\"selectComponent.multiple\"\n                        [attr.col-6]=\"selectComponent.canReset && selectComponent.multiple ? '' : null\"\n                        [attr.col-12]=\"!selectComponent.canReset && selectComponent.multiple ? '' : null\">\n                        <button ion-button full no-margin (click)=\"ok()\">\n                            OK\n                        </button>\n                    </ion-col>\n                </ion-row>\n                    </ion-footer>\n    ",
                    host: {
                        'class': 'select-searchable-page',
                        '[class.select-searchable-page-can-reset]': 'selectComponent.canReset',
                        '[class.select-searchable-page-multiple]': 'selectComponent.multiple',
                        '[class.select-searchable-page-is-searching]': 'selectComponent.isSearching'
                    }
                },] },
    ];
    /** @nocollapse */
    SelectSearchablePage.ctorParameters = function () { return [
        { type: ionicAngular.NavParams, },
    ]; };
    SelectSearchablePage.propDecorators = {
        "searchbarComponent": [{ type: core.ViewChild, args: ['searchbarComponent',] },],
    };
    return SelectSearchablePage;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectSearchable = (function () {
    function SelectSearchable(navController, ionForm, platform, ionItem) {
        this.navController = navController;
        this.ionForm = ionForm;
        this.platform = platform;
        this.ionItem = ionItem;
        this._items = [];
        this._useSearch = true;
        this._isEnabled = true;
        this._valueItems = [];
        this._value = null;
        this.filterText = '';
        this.canSearch = false;
        this.canReset = false;
        this.hasInfiniteScroll = false;
        this.onChange = new core.EventEmitter();
        this.onSearch = new core.EventEmitter();
        this.onInfiniteScroll = new core.EventEmitter();
        this.noItemsFoundText = 'No items found.';
        this.resetButtonText = 'Clear';
        this.propagateChange = function (_) { };
    }
    Object.defineProperty(SelectSearchable.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
            // Set value items.
            this._valueItems.splice(0, this._valueItems.length);
            if (this.multiple) {
                if (value && value.length) {
                    Array.prototype.push.apply(this._valueItems, value);
                }
            }
            else {
                if (value) {
                    this._valueItems.push(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectSearchable.prototype, "hasSearch", {
        // @ContentChild(SelectSearchableTitleTemplateDirective, { read: TemplateRef }) titleTemplate;
        get: /**
         * @return {?}
         */
        function () {
            return this.useSearch && this.onSearch.observers.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectSearchable.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            return this._items;
        },
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            // The original reference of the array should be preserved to keep two-way data binding
            // working between SelectSearchable and SelectSearchablePage.
            this._items.splice(0, this._items.length);
            // Add new items to the array.
            Array.prototype.push.apply(this._items, items);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectSearchable.prototype, "isEnabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isEnabled;
        },
        set: /**
         * @param {?} isEnabled
         * @return {?}
         */
        function (isEnabled) {
            this._isEnabled = !!isEnabled;
            this.enableIonItem(this._isEnabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectSearchable.prototype, "useSearch", {
        get: /**
         * @return {?}
         */
        function () {
            return this._useSearch;
        },
        set: /**
         * @param {?} useSearch
         * @return {?}
         */
        function (useSearch) {
            this._useSearch = !!useSearch;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    SelectSearchable.prototype.isNullOrWhiteSpace = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value === null || value === undefined) {
            return true;
        }
        // Convert value to string in case if it's not.
        return value.toString().replace(/\s/g, '').length < 1;
    };
    /**
     * @return {?}
     */
    SelectSearchable.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.isIos = this.platform.is('ios');
        this.isMd = this.platform.is('android');
        this.ionForm.register(this);
        if (this.ionItem) {
            this.ionItem.setElementClass('item-select-searchable', true);
        }
        this.enableIonItem(this.isEnabled);
    };
    /**
     * @return {?}
     */
    SelectSearchable.prototype.initFocus = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectSearchable.prototype._click = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.isEnabled || event.detail === 0) {
            // Don't continue if the click event came from a form submit.
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this.open();
    };
    /**
     * @param {?} isEnabled
     * @return {?}
     */
    SelectSearchable.prototype.enableIonItem = /**
     * @param {?} isEnabled
     * @return {?}
     */
    function (isEnabled) {
        if (!this.ionItem) {
            return;
        }
        this.ionItem.setElementClass('item-select-searchable-is-enabled', isEnabled);
    };
    /**
     * @param {?} selectedItem
     * @return {?}
     */
    SelectSearchable.prototype.select = /**
     * @param {?} selectedItem
     * @return {?}
     */
    function (selectedItem) {
        this.value = this.multiple ? selectedItem || [] : selectedItem;
        console.log('selectedItem:', selectedItem);
        console.log('this.value:', this.value);
        this.emitChange();
    };
    /**
     * @return {?}
     */
    SelectSearchable.prototype.emitChange = /**
     * @return {?}
     */
    function () {
        this.propagateChange(this.value);
        this.onChange.emit({
            component: this,
            value: this.value
        });
    };
    /**
     * @param {?} infiniteScroll
     * @return {?}
     */
    SelectSearchable.prototype.emitSearch = /**
     * @param {?} infiniteScroll
     * @return {?}
     */
    function (infiniteScroll) {
        this.onSearch.emit({
            component: this,
            infiniteScroll: infiniteScroll,
            text: this.filterText
        });
    };
    /**
     * @return {?}
     */
    SelectSearchable.prototype.open = /**
     * @return {?}
     */
    function () {
        this.navController.push(SelectSearchablePage, {
            selectComponent: this,
            navController: this.navController
        }, { animation: "md-transition" });
    };
    /**
     * @return {?}
     */
    SelectSearchable.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.setValue(this.multiple ? [] : null);
        this.emitChange();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SelectSearchable.prototype.formatItem = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.itemTemplate) {
            return this.itemTemplate(value);
        }
        if (this.isNullOrWhiteSpace(value)) {
            return null;
        }
        return this.itemTextField ? value[this.itemTextField] : value.toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SelectSearchable.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.setValue(value);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectSearchable.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectSearchable.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    SelectSearchable.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) { };
    /**
     * @return {?}
     */
    SelectSearchable.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.ionForm.deregister(this);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SelectSearchable.prototype.setValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.value = value;
        // Get an item from the list for value.
        // We need this in case value contains only id, which is not sufficient for template rendering.
        if (this.value && !this.isNullOrWhiteSpace(this.value[this.itemValueField])) {
            var /** @type {?} */ selectedItem = this.items.find(function (item) {
                return item[_this.itemValueField] === _this.value[_this.itemValueField];
            });
            if (selectedItem) {
                this.value = selectedItem;
            }
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SelectSearchable.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['items'] && this.items.length > 0) {
            this.setValue(this.value);
        }
    };
    SelectSearchable.decorators = [
        { type: core.Component, args: [{
                    selector: 'select-searchable',
                    template: "\n        <div class=\"select-searchable-label\">\n            {{title}}\n            <ng-container *ngTemplateOutlet=\"titleTemplate\"></ng-container>\n        </div>\n        <div class=\"select-searchable-value\">\n            <div class=\"select-searchable-value-item\" *ngFor=\"let valueItem of _valueItems\">{{formatItem(valueItem)}}</div>\n        </div>\n        <div class=\"select-searchable-icon\">\n            <div class=\"select-searchable-icon-inner\"></div>\n        </div>\n        <button aria-haspopup=\"true\" ion-button=\"item-cover\" class=\"item-cover\"></button>\n    ",
                    providers: [{
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: core.forwardRef(function () { return SelectSearchable; }),
                            multi: true
                        }],
                    host: {
                        'class': 'select-searchable',
                        '[class.select-searchable-ios]': 'isIos',
                        '[class.select-searchable-md]': 'isMd',
                        '[class.select-searchable-can-reset]': 'canReset',
                        '[class.select-searchable-is-enabled]': 'isEnabled'
                    }
                },] },
    ];
    /** @nocollapse */
    SelectSearchable.ctorParameters = function () { return [
        { type: ionicAngular.NavController, },
        { type: ionicAngular.Form, },
        { type: ionicAngular.Platform, },
        { type: ionicAngular.Item, decorators: [{ type: core.Optional },] },
    ]; };
    SelectSearchable.propDecorators = {
        "items": [{ type: core.Input, args: ['items',] },],
        "isSearching": [{ type: core.Input },],
        "isEnabled": [{ type: core.Input, args: ['isEnabled',] },],
        "itemValueField": [{ type: core.Input },],
        "itemTextField": [{ type: core.Input },],
        "canSearch": [{ type: core.Input },],
        "useSearch": [{ type: core.Input, args: ['useSearch',] },],
        "canReset": [{ type: core.Input },],
        "hasInfiniteScroll": [{ type: core.Input },],
        "title": [{ type: core.Input },],
        "searchPlaceholder": [{ type: core.Input },],
        "onChange": [{ type: core.Output },],
        "onSearch": [{ type: core.Output },],
        "onInfiniteScroll": [{ type: core.Output },],
        "itemTemplate": [{ type: core.Input },],
        "multiple": [{ type: core.Input },],
        "noItemsFoundText": [{ type: core.Input },],
        "resetButtonText": [{ type: core.Input },],
        "_click": [{ type: core.HostListener, args: ['click', ['$event'],] },],
    };
    return SelectSearchable;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var components = [SelectSearchable, SelectSearchablePage];
var SelectSearchableModule = (function () {
    function SelectSearchableModule() {
    }
    SelectSearchableModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        ionicAngular.IonicPageModule.forChild(SelectSearchable),
                        ionicAngular.IonicPageModule.forChild(SelectSearchablePage)
                    ],
                    declarations: components,
                    exports: components,
                    entryComponents: components
                },] },
    ];
    /** @nocollapse */
    SelectSearchableModule.ctorParameters = function () { return []; };
    return SelectSearchableModule;
}());

exports.SelectSearchableModule = SelectSearchableModule;
exports.SelectSearchable = SelectSearchable;
exports.SelectSearchablePage = SelectSearchablePage;

Object.defineProperty(exports, '__esModule', { value: true });

})));
