import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';
import { NewspapersService } from '../newspapers.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NewspapersComponent } from '../newspapers/newspapers.component';
import { ScrollService } from '../scroll.service';
import { UserService } from '../user.services';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="pc" >
  <ul class="navbar-brand category-list ">
    <li *ngFor="let category of categoryList">
      <a class="navbar-brand" [routerLink]="['/?id=', category.id]" (click)="passId(category.id); enableScrolling();" [class.active]="category.id === activatedCategoryId">{{ category.category }}</a>
    </li>
  </ul>
  </div>
  <div class="mobile navbar-brand" style="display: none;" >
  <nav class="navbar bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">    <img class="brand-logo" src="/assets/Untitled.png" alt="logo" aria-hidden="true"
        style=" width: 30px; height: 30px;"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item" *ngFor="let category of categoryList">
            <a class="nav-link active" (click)="passId(category.id); " [class.active]="category.id === activatedCategoryId">{{ category.category }}</a>
          </li>
        </ul>
      </div>
      </div>
</div>
</nav>
<div class="footer">
  
</div>
  </div>
  `,
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category = { id: 0, category: '' };
  categoryList: Category[] = [];
  activatedCategoryId: number = 0; 
  // enableScrolling() {
  //   this.newspapersComponent.isScrollingActive = true;  // Set to true
  // }
  constructor(private route: ActivatedRoute, private newspapersService: NewspapersService, private router: Router, private renderer: Renderer2, private scrollService: ScrollService, private userService: UserService) {
    this.newspapersService.getCategoryNewspaper().then((categoryList) => {
      this.categoryList = categoryList ?? [];
    });
    this.route.queryParams.subscribe(params => {
      this.activatedCategoryId = parseInt(params['id']) || 0; 
    });
    
  }
  enableScrolling(){
    this.scrollService.isScrollingActive = true;
  }
  ngOnInit(): void {
    const btnClose = document.querySelector('.btn-close') as HTMLElement;
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    btnClose.dispatchEvent(event);
  }

  
  passId(id: any) {
    this.userService.setUserActive(false);
    this.router.navigate(['/'], { queryParams: { id: id } });
    this.ngOnInit();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500); // Thời gian delay là 500ms (0.5 giây)
  }
}