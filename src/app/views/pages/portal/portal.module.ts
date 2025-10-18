import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Asegúrate de que las importaciones de tus componentes sean correctas (rutas ajustadas)
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';

import { DeviceListComponent } from './device-list/device-list.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';

// Importa AvanzaModule porque contiene SmartDatatableComponent
import { AvanzaModule } from '../../../avanza/avanza.module'; // <--- ¡IMPORTANTE!



// Revisa tus archivos HTML de HousesListComponent y CfeListComponent para ver cuáles más podrías necesitar.

import { ROUTES } from './portal.routing'; // Tus rutas de portal
import { SpinnerModule, ModalModule, AccordionModule, ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, AlertModule, AvatarModule, BadgeModule, BreadcrumbModule, ButtonGroupModule, ButtonModule, CardModule, DropdownModule, FooterModule, FormModule, GridModule, HeaderModule, ListGroupModule, NavModule, ProgressModule, SidebarModule, TabsModule, ToastModule, UtilitiesModule, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, ContainerComponent } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeviceModalComponent } from './device-list/device-modal/device-modal.component';
import { DeviceSequencesComponent } from './device-list/device-sequences/device-sequences.component';
import { DeviceSequenceStepsComponent } from './device-list/device-sequence-steps/device-sequence-steps.component';
//import { AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective,ContainerComponent } from '@coreui/angular';

@NgModule({
  declarations: [
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,



    DeviceListComponent,
      DeviceModalComponent,
      DeviceSequencesComponent,
      DeviceSequenceStepsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),

    // --- Módulos que tus componentes movidos necesitan ---
    AvanzaModule, // Provee SmartDatatableComponent (asumiendo que está exportado de AvanzaModule)

    // CoreUI modules
    SpinnerModule,
    ModalModule,

    AccordionModule,    
    AlertModule,
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FooterModule,
    FormModule,
    GridModule,
    HeaderModule,
    ListGroupModule,
    NavModule,
    ProgressModule,
    SidebarModule,
    TabsModule,
    ToastModule,
    UtilitiesModule,

    
    TemplateIdDirective,
    //AccordionButtonDirective

  ],
  // No necesitas exportar estos componentes si solo se usan dentro del PortalModule,
  // pero si algún otro módulo fuera de PortalModule los necesitara, se exportarían aquí.
  exports: [
    // Generalmente no se exportan si son vistas de un módulo
  ]
})
export class PortalModule { }