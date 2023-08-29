import { Routes } from '@angular/router';
import { NewspapersComponent } from './newspapers/newspapers.component';
import { ContentComponent } from './content/content.component';
const routeConfig: Routes = [
    {
        path:'',
        component: NewspapersComponent,
        title: 'Lastest News',
    },
    {
        path:'newspaper/:code',
        component: ContentComponent,
        title: 'Newspaper'
    },
];
export default routeConfig;