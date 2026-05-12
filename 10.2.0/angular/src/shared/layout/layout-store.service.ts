import { Injectable, signal, computed } from '@angular/core';

@Injectable()
export class LayoutStoreService {
    readonly sidebarExpanded = signal(false);

    readonly config = computed(() => ({
        sidebarExpanded: this.sidebarExpanded(),
    }));

    setSidebarExpanded(value: boolean): void {
        this.sidebarExpanded.set(value);
    }
}
