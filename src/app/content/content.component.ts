import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NewspapersService } from '../newspapers.service';
import { Newspaperslastest } from '../newspaperslastest';
import { NewspaperContent } from '../newspaper-content';
import { ScrollService } from '../scroll.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user.services';
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule,
    RouterModule],
  
  template: `
  <div class="contentNewspapers">
    <div class="d-flex justify-content-around">
      <h1 class="heading">{{newspaperContent?.heading}}</h1>
    </div>
    <div class="subHeading">
      <h2 class="text-black-50 bg-white ">{{newspaperContent?.subHeading}}</h2>
    </div>
    <div >
      <div > 
        <div class="container-fluid ">
            <h3 class ="text-start " >
            <a class = "badge bg-primary text-wrap" style="width: 10rem;" [routerLink] ="['/category=',newspaperContent?.category]"  (click)="passCategory(newspaperContent?.category); enableUser()">
          {{newspaperContent?.category}}</a>
          </h3>
          <div class="time">
                    <h3 class="fst-italic ">
        {{newspaperContent?.time}}
        </h3>

        </div>
        </div>





  </div>
    </div>
    <span class="placeholder col-12 bg-dark"></span>
    <div class="object-fit-lg-contain border rounded">
      <div class="content d-flex align-items-center justify-content-center">
        <div [innerHTML]="newspaperContent?.content" style = "img: weight = 30px;"></div>
      </div>
    </div>
    </div>
  `,
  styleUrls: ['./content.component.css'],
  
})
export class ContentComponent {
  newspaperContent: NewspaperContent | undefined;
  newspapersCode = "1";

  constructor(private route: ActivatedRoute, private newspaperService: NewspapersService, private scrollService: ScrollService, private router: Router, private userService: UserService) {
    this.scrollService.setScrollingActive(false); 
    const newspapersCode = this.route.snapshot.params['code'];
    this.newspaperService.getContentNewspaper(newspapersCode).then(newspaperContent => {
      this.newspaperContent = newspaperContent;
    });
  }
  enableUser(){
    this.userService.setUserActive(true);
  }
  passCategory(category: any){
    
    this.router.navigate(['/'],{queryParams: {category: this.newspaperContent?.category}});
  }
}
