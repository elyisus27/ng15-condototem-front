import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule, IconSetService } from '@coreui/icons-angular';


//import { AvdatatableComponent } from './components/avdatatable/avdatatable.component';

import { HttpClientModule } from '@angular/common/http';


import { SmartDatatableComponent } from './components/smart-datatable/smart-datatable.component';
import { ButtonModule } from '@coreui/angular';


@NgModule({
    imports: [
        CommonModule,
        IconModule,
        ButtonModule,


        HttpClientModule,

    ],
    declarations: [


        //AvdatatableComponent,

        SmartDatatableComponent,


    ],
    exports: [


        //AvdatatableComponent,
        SmartDatatableComponent,


        IconModule,
        ButtonModule

    ],
})
export class AvanzaModule { }
