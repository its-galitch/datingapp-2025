import { HttpClient } from '@angular/common/http';
import { Component, signal, inject, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  
  protected readonly title = signal('Dating App');
  protected readonly members = signal<Array<any>>([]);
  #http = inject(HttpClient);

  async ngOnInit()  {
   this.members.set(await this.getMembers() as any[])
  }

  async getMembers() {
    try {
      return lastValueFrom(this.#http.get('https://localhost:5001/api/members'))
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

}