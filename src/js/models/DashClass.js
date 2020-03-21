import {data} from './base';
import {error} from './Error'
import { elements } from '../views/dom';

export default class Dash{

    constructor(videoid , url , VideoCont){
        this.url = url;
        this.videoid =  videoid;
        this.VideoCont = VideoCont;
        // creating a media player
        data.player = dashjs.MediaPlayer().create();
        // initialize dash.js which takes three parameters
        // video wrapper , video link , and a boolean
        try{
            data.player.initialize(this.videoid, this.url , false);
        }catch(e){
            console.log('something went wrong');
        }
       
        // attach  view to the video document
        data.player.attachView(this.videoid);
        
        // disabling the logs
        data.player.getDebug().setLogToBrowserConsole(false)
      
        window.player = data.player;
        
        data.player.attachVideoContainer(this.VideoCont);

        // player.on(dashjs.MediaPlayer.events.FRAGMENT_LOADING_COMPLETED, this.onDashFragmentLoad, this);
        data.player.on(dashjs.MediaPlayer.events.ERROR , (e) => {
            console.log(e)
        })
        data.player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, this.onDashStreamInitialized, this);
        data.player.on(dashjs.MediaPlayer.events.FRAGMENT_LOADING_COMPLETED, this.onDashFragmentLoad, this);
        data.player.on(dashjs.MediaPlayer.events.PLAYBACK_ENDED, () => {
            console.log('video stoped');
        })

       
        // data.player.setAutoPlay(true)
        data.player.on('error' , (e) => {

            // this function handles error with video playback
            // errors are defined in error.js file 
            //  console.log(error.Dash[e.error]);   
            console.log(e);
            
        })
		

    }


    onDashStreamInitialized(){
        data.availableQuality = data.player.getBitrateInfoListFor("video");
        // isLive = player.isDynamic();
    }

    onDashFragmentLoad(){
	    this.onFragmentLoad();
    }

    onFragmentLoad(){	
        if(video.buffered.length==0)
            return;
        let  progress;
        progress = (elements.video.buffered.end(video.buffered.length-1) * 100) / elements.video.duration;
        console.log(elements.video.buffered.end(video.buffered.length-1))
        elements.bufferProgress.value=progress;

        
    }
    

}