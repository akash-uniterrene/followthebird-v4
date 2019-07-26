import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-whats-on-mind',
  templateUrl: './whats-on-mind.component.html',
  styleUrls: ['./whats-on-mind.component.scss'],
})
export class WhatsOnMindComponent implements OnInit {
  @Input('handle') handle;
  text: string;
  userName: string ;
  userPic: string;
  constructor() { }

  ngOnInit() {
  }

}
