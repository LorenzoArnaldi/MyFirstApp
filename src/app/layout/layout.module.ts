import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from './footer/footer.module';
import { SidenavModule } from './sidenav/sidenav.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FooterModule,
    SidenavModule
  ],
  exports: [
    FooterModule,
    SidenavModule
  ]
})
export class LayoutModule {}
