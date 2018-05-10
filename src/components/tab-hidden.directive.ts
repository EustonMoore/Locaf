import {Directive, ElementRef, Input} from '@angular/core';

@Directive({ selector: '[tab-hidden]' })
export class TabHiddenDirective {

    @Input('tab-hidden')
    tabHidden: boolean;

    private _tabElCache: Map<string, Element> = new Map();

    constructor(private _el: ElementRef) {}

    ngAfterViewChecked() {

        let tabId = this._el.nativeElement.id.split('-');

        tabId.shift();
        tabId.unshift('tab');
        tabId = tabId.join('-');

        let tabEl: HTMLAnchorElement;

        if (!this._tabElCache.has(tabId)) {
            tabEl = <HTMLAnchorElement> document.querySelector('#' + tabId);
            this._tabElCache.set(tabId, tabEl);
        } else {
            tabEl = <HTMLAnchorElement> this._tabElCache.get(tabId);
        }

        if (tabEl) {

            if (this.tabHidden) {
                tabEl.style.display = 'none';
            } else {
                tabEl.style.display = 'flex';
            }
        }
    }
}