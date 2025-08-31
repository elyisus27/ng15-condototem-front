
//import { AvdatatableComponent } from '../../../avanza/components/avdatatable/avdatatable.component';

import { DeviceListComponent } from './device-list/device-list.component';




export const ROUTES = [{
    path: '',

    children: [
        {
            path: 'home',
            component: DeviceListComponent,
        }, {
            path: 'devices',
            component: DeviceListComponent,
        },

    ]
}];