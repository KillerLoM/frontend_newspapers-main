import { Injectable } from '@angular/core';
import { Newspaperslastest } from './newspaperslastest';
import { NewspaperContent } from './newspaper-content';
import { Category } from './category';
import { NewspapersComponent } from './newspapers/newspapers.component';

@Injectable({
  providedIn: 'root'
})
export class NewspapersService {
  url = 'http://localhost:8888';
  urlContent = 'http://localhost:8888';
  urlBar = 'http://localhost:8888/get/menubar';
  urlUser = 'http://localhost:8888';
  // id = 1;
  constructor() {
    const id = 1;
 
  }
  async getAllNewspapersLastest(id: Number, currentPage: number): Promise<Newspaperslastest[]> {
    let size =10;
    const total = await fetch(`${this.url}/?id=${id}&page=0&size=${size}`);
    const reply = await  total.json();
    console.log(reply.total - 1 );
    const limit = reply.total /size;
    if (currentPage > limit){
        size = reply.total %size;
    }
    if (id == undefined) {id = 1};
    const data = await fetch(`${this.url}/?id=${id}&page=${currentPage}&size=${size}`);
    const response = await data.json();

    return response.newspapers ?? [];
  }

  async getContentNewspaper(code: string): Promise<NewspaperContent | undefined> {
    const data = await fetch(`${this.urlContent}/newspaper/${code}`);

    return await data.json() ?? {};
  }
  async getCategoryNewspaper(): Promise<Category[] | undefined> {
    const data = await fetch(`${this.urlBar}`);
    const response =  await data.json();
    console.log(response[0].category);
    return response ??[];
  }
  async getAllNewspapersUserLike(category: string, currentPage: number): Promise<Newspaperslastest[]> {
    let size =10;
    const total = await fetch(`${this.urlUser}/${category}?page=0&size=${size}`);
    const reply = await  total.json();
    console.log(reply.total - 1 );
    const limit = reply.total /size;
    if (currentPage > limit){
        size = reply.total %size;
    }
    const data = await fetch(`${this.urlUser}/${category}?page=${currentPage}&size=${size}`);
    const response = await data.json();
    return response.newspapers ?? [];
  }

}
