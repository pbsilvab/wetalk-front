import { Component, Query, OnInit, ViewChild, ElementRef } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { startMediaObject, stopMediaObject } from './AudioMediaService';
import { Subject, Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { GroupsQuery, Channel, Meeting } from './types/schema';
import * as io from 'socket.io-client';
import Peer from 'peerjs';


const socket = io('http://localhost:4003/');

const peer = new Peer(undefined, {
  host: '/',
  port: 3001
});
let userId: string;
peer.on('open', (id) => {
  userId = id;
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'wetalk-front';

  peer;

  channels: Channel[];

  meetings: Meeting[];

  groups: Observable<GroupsQuery>;

  videoGrid = [];

  muted = false;

  constructor(private apollo: Apollo) {
    this.getGroupsList();
  }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

  // tslint:disable-next-line: typedef
  getGroupsList() {
      const queryArgs = `totalCount edges { cursor node { id name channels { id name groupId meetings { id name channelId}}}}`;

      this.groups = this.apollo.watchQuery<GroupsQuery>({
        query:
          gql`
            query groups($first: Int) {
              groups {
                find(first: $first ){
                  ${queryArgs}
                }
              }
            }
          `, variables: { first: 10 },
      }).valueChanges.pipe(map(groups => groups.data));
  }

  // tslint:disable-next-line: typedef
  loadChannels(channels: Channel[]) {
    this.channels = channels;
  }

  // tslint:disable-next-line: typedef
  seeMeetings(meetings: Meeting[]) {
    this.meetings = meetings;
  }

  // tslint:disable-next-line: typedef
  intoMeeting( roomid: string ) {

      navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
      }).then( stream => {

          socket.emit('join-room', roomid, userId );

          this.addVideoStream(stream);

          peer.on('call', call => {

              call.answer(stream);

              call.on('stream', userVideoStream => {
                  this.addVideoStream(userVideoStream);
              });

          });

          socket.on('user-connected', (  MeetingId  ) => {
            this.connectToNewUser(MeetingId, stream);
          });
      });

  }

  connectToNewUser = (userId, stream) => {

    const call = peer.call(userId, stream);

    call.on('stream', userVideoStream => {
        this.addVideoStream(userVideoStream);
    });
  }


  // tslint:disable-next-line: typedef
  addVideoStream(stream) {
    // console.log(this.videoGrid);

    // video.nativeElement.srcObject = ;

    // video.nativeElement.addEventListener('loadedmetadata', () => {
    //   video.nativeElement.play();
    // });

    this.videoGrid.push(stream);
    console.log(this.videoGrid);
  }

  // tslint:disable-next-line: typedef
  pauseVideo() {
    this.muted = !this.muted;
  }

  enventHandler(e) {
    console.log(e);
  }
}
