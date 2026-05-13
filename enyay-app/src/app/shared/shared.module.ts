import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HighlightDirective } from './directives/highlight.directive';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { TooltipDirective } from './directives/tooltip.directive';

import { TruncatePipe } from './pipes/truncate.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found';

const SHARED_DIRECTIVES = [
  HighlightDirective,
  DebounceClickDirective,
  TooltipDirective,
];

const SHARED_PIPES = [
  TruncatePipe,
  SafeHtmlPipe,
  TimeAgoPipe,
];

const SHARED_COMPONENTS = [
  LoadingSpinnerComponent,
  ConfirmDialogComponent,
  PageNotFoundComponent,
];

@NgModule({
  declarations: [
    ...SHARED_DIRECTIVES,
    ...SHARED_PIPES,
    ...SHARED_COMPONENTS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...SHARED_DIRECTIVES,
    ...SHARED_PIPES,
    ...SHARED_COMPONENTS,
  ],
})
export class SharedModule {}
