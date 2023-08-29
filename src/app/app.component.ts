import { Component } from '@angular/core';
import { NewspapersComponent } from './newspapers/newspapers.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CategoryComponent } from './category/category.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NewspapersComponent,
    RouterLink, 
    RouterOutlet,

    CategoryComponent,
  ],
  template: `
 <main>
<header>
<nav class="navbar  bg-body-tertiary ">
  <div class="container-fluid">
    <!-- <a class="navbar-brand" href="#">
    <img class="brand-logo" src="/assets/123.png" alt="logo" aria-hidden="true"
        style=" width: 30px; height: 30px;">
    </a> -->
    <app-category></app-category>

  </div>

</nav>
</header>
  <div class="content">
        <section class="object-fit-sm-contain ">
      <router-outlet></router-outlet>
    </section>
  </div>

  </main>
`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'abc';
}
