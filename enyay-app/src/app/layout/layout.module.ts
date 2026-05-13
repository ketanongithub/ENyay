import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { SidebarComponent } from './sidebar/sidebar';
import { MainLayoutComponent } from './main-layout/main-layout';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainLayoutComponent,
  ],
  imports: [SharedModule],
  exports: [MainLayoutComponent],
})
export class LayoutModule {}
