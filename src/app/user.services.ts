import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Chia sẻ instance của dịch vụ trên toàn ứng dụng
})
export class UserService {
  isUser: boolean = false;

  setUserActive(value: boolean) {
    this.isUser = value;
  }
}