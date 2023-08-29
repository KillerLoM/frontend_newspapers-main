import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Newspaperslastest } from '../newspaperslastest';
import { RouterModule } from '@angular/router';
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { NewspapersComponent } from '../newspapers/newspapers.component'; 
import { ScrollService } from '../scroll.service';
@Component({
  selector: 'app-newspapers-lastest',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule  
  ],
  template: `
       <div class="container">
       <a [routerLink] ="['/newspaper',newspapersLastest.code]" (click)="stopScrolling()" class="card mb-3 " style="max-width: 540px;" >
            <div class="row g-0">
                <div class="col-md-4">
                    <img 
                        src="{{newspapersLastest.img}}" 
                        class="img-fluid rounded-start object-fit-fill border rounded">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title " style="font-weight: bolder; font-size = 14">
                            {{newspapersLastest.heading}}
                        </h5>
                        <p class="card-text">
                            {{newspapersLastest.description}}
                        </p>
                        <p class="card-text">
                            <small class="text-body-secondary">
                                Lên bài vào: khoảng {{diff}}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </a>
    </div>
    
  `,
  styleUrls: ['./newspapers-lastest.component.css']
})
export class NewspapersLastestComponent implements OnInit {
  @Input() newspapersLastest!: Newspaperslastest;
  diff: any;

  ngOnInit() {
    this.calculateDiff();
  }

  calculateDiff() {
    // Lấy ngày hiện tại
    const currentDate = new Date();

    // Lấy thông tin từ newspapersLastest
    const { day, month, year, hour, minute, second } = this.newspapersLastest;

    const newspapersDateTime = new Date(year, month - 1, day, hour, minute, second);

    // Tính toán hiệu ngày, tháng, năm sử dụng date-fns
    const yearsDiff = differenceInYears(currentDate, newspapersDateTime);
    const monthsDiff = differenceInMonths(currentDate, newspapersDateTime);
    const daysDiff = differenceInDays(currentDate, newspapersDateTime);
    const hoursDiff = differenceInHours(currentDate, newspapersDateTime);
    const minutesDiff = differenceInMinutes(currentDate, newspapersDateTime);
    const secondsDiff = differenceInSeconds(currentDate, newspapersDateTime);

    if (yearsDiff > 0) {
      this.diff = yearsDiff + ' năm trước';
    } else if (monthsDiff > 0) {
      this.diff = monthsDiff + ' tháng trước';
    } else if (daysDiff > 0) {
      this.diff = daysDiff + ' ngày trước';
    } else if (hoursDiff > 0) {
      this.diff = hoursDiff + ' giờ trước';
    } else if (minutesDiff > 0) {
      this.diff = minutesDiff + ' phút trước';
    } else if (secondsDiff > 0) {
      this.diff = secondsDiff + ' giây trước';
    } else {
      this.diff = 'vừa cập nhật';
    }
  }
  constructor(private newspapersComponent: NewspapersComponent, private scrollService: ScrollService) {}
  stopScrolling() {
    this.scrollService.setScrollingActive(false);
  }
}
