import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Chia sẻ instance của dịch vụ trên toàn ứng dụng
})
export class ScrollService {
  isScrollingActive: boolean = true;

  setScrollingActive(value: boolean) {
    this.isScrollingActive = value;
  }
}