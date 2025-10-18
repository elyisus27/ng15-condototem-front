import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule, IconSetService } from '@coreui/icons-angular';


//import { AvdatatableComponent } from './components/avdatatable/avdatatable.component';

import { HttpClientModule } from '@angular/common/http';


import { SmartDatatableComponent } from './components/smart-datatable/smart-datatable.component';
import { ButtonModule, SpinnerModule } from '@coreui/angular';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';


@NgModule({
    imports: [
        CommonModule,
        IconModule,
        ButtonModule,
        SpinnerModule,


        HttpClientModule,

    ],
    declarations: [


        //AvdatatableComponent,

        SmartDatatableComponent,
        LoadingOverlayComponent


    ],
    exports: [


        //AvdatatableComponent,
        SmartDatatableComponent,
        LoadingOverlayComponent,


        IconModule,
        ButtonModule

    ],
})
export class AvanzaModule { }
