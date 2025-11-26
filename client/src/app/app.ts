import { HttpClient } from '@angular/common/http';
import { Component, signal, inject, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { RouterOutlet } from "@angular/router";
import { Member } from '../core/models/user-models';


@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
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

  async getMembers(): Promise<Member[]> {
    try {
      return lastValueFrom(this.#http.get<Member[]>('https://localhost:5001/api/members'))
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

}