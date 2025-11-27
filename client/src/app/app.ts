import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { Nav } from "../layout/nav/nav";


@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  
  protected readonly title = signal('Dating App');
  protected readonly members = signal<Array<any>>([]);
  protected readonly router = inject(Router);
  

  async ngOnInit()  {
  }

  

}