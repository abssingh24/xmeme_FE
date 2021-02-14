import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meme } from './models/meme.model';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  baseURL: string = "http://localhost:8081/memes";

  constructor(
    private http: HttpClient
  ) { }

  fetchLatestMemes(){
    return this.http.get(this.baseURL);
  }

  postMeme(meme: Meme){
    return this.http.post(this.baseURL, meme);
  }

}
