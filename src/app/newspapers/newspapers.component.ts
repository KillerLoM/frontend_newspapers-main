import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewspapersLastestComponent } from '../newspapers-lastest/newspapers-lastest.component';
import { Newspaperslastest } from '../newspaperslastest';
import { NewspapersService } from '../newspapers.service';
import { ScrollService } from '../scroll.service';
import { UserService } from '../user.services';
@Component({
  selector: 'app-newspapers',
  standalone: true,
  imports: [CommonModule, NewspapersLastestComponent],
  styleUrls: ['./newspapers.component.css'],providers: [NewspapersComponent],
  template: `
          <div class="introduce">
            <div class="wrapper-container">
              <div class="text-center">
                <h1 class="font-monospace">TIN CẬP NHẬT</h1>
            </div>
          
      </div>
      <div class="results">
        <app-newspapers-lastest *ngFor="let newspapersLastest of newspapersLastestList" [newspapersLastest]="newspapersLastest"></app-newspapers-lastest>
      </div>
    
  `
})
export class NewspapersComponent implements OnInit {
  currentPage = 0;
  id = 1;
  temp = 0;
  countPage = 10;
  category = '';
  newspapersLastestList: Newspaperslastest[] = [];
  newspapersService: NewspapersService = inject(NewspapersService);
  isScrollingActive: boolean = true;
  constructor(private route: ActivatedRoute, private router: Router, private newspaperService: NewspapersService, private scrollService: ScrollService, private userService: UserService) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      if (!this.id) {
        this.id = 1;
      }
      this.currentPage = 0;
      this.newspapersLastestList = []; // Reset the list
      this.temp = 0;
      this.countPage;
      this.loadMoreNews();
    });
    this.route.queryParams.subscribe(params=> {
      this.category = params['category'];
      this.currentPage = 0;
      this.newspapersLastestList = [];
      this.temp = 0;
      this.countPage;
      this.loadUsers()
    });
  }

  ngOnInit() {
    if(this.scrollService.isScrollingActive){
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }
      else {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
      }


  }

  handleScroll() {
    if (this.scrollService.isScrollingActive){

    const scrollPosition = window.innerHeight + window.scrollY;
    const totalHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition >= totalHeight -300 ) {
      this.currentPage++;
      // this.countPage += 10;
      if (this.countPage / 10 >= 1){
        if(this.userService.isUser){
          this.loadUsers();
        }
        else
          this.loadMoreNews();
      }
    }

  }
  else{
    this.currentPage = 0;
    if(this.userService.isUser){
      this.loadUsers();
    }
    else
      this.loadMoreNews();
  }
   
  // if(this.scrollService.isScrollingActive === false) {
  //   this.id = 0;
  //   this.currentPage = 0;
  // }
}
  private loadMoreNews() {
    if(this.userService.isUser === false){
      this.newspapersService.getAllNewspapersLastest(this.id, this.currentPage).then((newspapersLastestList: Newspaperslastest[]) => {
        this.newspapersLastestList.push(...newspapersLastestList);
        this.countPage = this.newspapersLastestList.length - this.temp;
        this.temp = this.newspapersLastestList.length ;
      });
    }
  }
  private loadUsers(){
    if(this.userService.isUser){
      this.newspaperService.getAllNewspapersUserLike(this.category, this.currentPage).then((newspapersLastestList: Newspaperslastest[])=>{
      this.newspapersLastestList.push(...newspapersLastestList);
      this.countPage = this.newspapersLastestList.length - this.temp;
      this.temp = this.newspapersLastestList.length ;
    })
    }
  }
}
