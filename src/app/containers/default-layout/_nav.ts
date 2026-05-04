import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [ 
  {
    name: 'Compuertas',
    url: '/mod/devices',
    //linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-list-rich' }
  },
  {
    name: 'Bitacora de cruces',
    url: '/mod/crossing-log-list',
    //linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-list-rich' }
  },
  
];
