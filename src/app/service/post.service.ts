import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class PostService {
   private feeling = [{"icon":"happy","action":"Feeling","text":"Feeling","placeholder":"How are you feeling?","feeling_type":[{"icon":"happy.svg","action":"Happy","text":"Happy"},{"icon":"loved.svg","action":"Loved","text":"Loved"},{"icon":"satisfied.svg","action":"Satisfied","text":"Satisfied"},{"icon":"strong.svg","action":"Strong","text":"Strong"},{"icon":"sad.svg","action":"Sad","text":"Sad"},{"icon":"crazy.svg","action":"Crazy","text":"Crazy"},{"icon":"tired.svg","action":"Tired","text":"Tired"},{"icon":"sleepy.svg","action":"Sleepy","text":"Sleepy"},{"icon":"confused.svg","action":"Confused","text":"Confused"},{"icon":"worried.svg","action":"Worried","text":"Worried"},{"icon":"angry.svg","action":"Angry","text":"Angry"},{"icon":"annoyed.svg","action":"Annoyed","text":"Annoyed"},{"icon":"shocked.svg","action":"Shocked","text":"Shocked"},{"icon":"down.svg","action":"Down","text":"Down"},{"icon":"confounded.svg","action":"Confounded","text":"Confounded"}]},{"icon":"headset","action":"Listening To","text":"Listening To","placeholder":"What are you listening to?","feeling_type":[{"icon":"musical-notes.svg","action":"Song","text":"Song"},{"icon":"podcast.svg","action":"Podcast","text":"Podcast"},{"icon":"radio.svg","action":"Radio","text":"Radio"}]},{"icon":"glasses","action":"Watching","text":"Watching","placeholder":"What are you watching?","feeling_type":[{"icon":"youtube.svg","action":"Youtube","text":"Youtube"},{"icon":"videocam.svg","action":"Movie","text":"Movie"}]},{"icon":"game-controller-b","action":"Playing","text":"Playing","placeholder":"What are you playing?","feeling_type":[{"icon":"football.svg","action":"Football","text":"Football"},{"icon":"american-football.svg","action":"Rugby","text":"Rugby"},{"icon":"basketball.svg","action":"Basketball","text":"Basketball"}]},{"icon":"pizza","action":"Eating","text":"Eating","placeholder":"What are you eating?","feeling_type":[{"icon":"ice-cream.svg","action":"Ice Cream","text":"Ice Cream"}]},{"icon":"pint","action":"Drinking","text":"Drinking","placeholder":"What are you drinking?","feeling_type":[{"icon":"beer.svg","action":"Beer","text":"Beer"},{"icon":"tea.svg","action":"Tea","text":"Tea"},{"icon":"milk.svg","action":"Milk","text":"Milk"},{"icon":"pint.svg","action":"Water","text":"Water"}]},{"icon":"plane","action":"Traveling To","text":"Traveling To","placeholder":"Where are you going?","feeling_type":[]},{"icon":"book","action":"Reading","text":"Reading","placeholder":"What are you reading?","feeling_type":[{"icon":"books.svg","action":"Story Book","text":"Story Book"},{"icon":"books.svg","action":"Comic","text":"Comic"},{"icon":"books.svg","action":"Bible","text":"Bible"},{"icon":"books.svg","action":"Novel","text":"Novel"}]},{"icon":"calendar","action":"Attending","text":"Attending","placeholder":"What are you attending?","feeling_type":[{"icon":"party.svg","action":"Party","text":"Party"},{"icon":"wedding.svg","action":"Wedding","text":"Wedding"},{"icon":"anniversary.svg","action":"Anniversary","text":"Anniversary"},{"icon":"birthday.svg","action":"Birthday","text":"Birthday"}]},{"icon":"beer","action":"Celebrating","text":"Celebrating","placeholder":"What are you celebrating?","feeling_type":[]},{"icon":"search","action":"Looking For","text":"Looking For","placeholder":"What are you looking for?","feeling_type":[]}];
  constructor(public api: ApiService) { }
  
  getfeeds(type,type_id,id,params?: any) {
	let feeds: any = [];
	let seq = this.api.get('posts/'+type+'/'+type_id+'/'+id, params);

	// don't have the data yet
	return new Promise(resolve => {
		seq.subscribe((res: any) => {
			feeds.push(res);
			resolve(feeds);
		}, err => {
			console.error('ERROR', err);
		});
	});
  }

 
  publishPost(publisherInfo: any) {
    let seq = this.api.post('post', publisherInfo);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      return res;
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  publishStory(publishStory: any) {
    let seq = this.api.post('post-story', publishStory);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      return res;
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  
  
  postComment(commentInfo: any) {
    let seq = this.api.post('post-comment', commentInfo);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      return res;
    }, err => {
      //console.error('ERROR', err);
    });

    return seq;
  }
  
  sharePost(sharedInfo: any){
	let seq = this.api.post('reaction', sharedInfo);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      return res;
    }, err => {
      //console.error('ERROR', err);
    });

    return seq;
  }
  
  reaction(params : any){
	let seq = this.api.post('reaction', params);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  get_feelings(){
	  return this.feeling;
  }
  
  get_feeling_type(index){
	  return this.feeling[index]['feeling_type'];
  }
}
