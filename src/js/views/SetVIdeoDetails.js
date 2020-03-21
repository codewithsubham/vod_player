import {elements} from './dom';
import {data , iconsName} from '../models/base';
import DrawLowerControl from './LowerControl';
import Extra from '../models/extra';

export default class setVideoDetails extends Extra{

    constructor(){
        // th(is class is use to triggers method on video Events 
        super();
    }

    videoMetadataLoaded(){

        data.videoDuration = elements.video.duration;
    
       this.initSeekbarAndProgess();
        
        
        if(!data.isIOS){

            const qualitydetails = new DrawLowerControl();
            qualitydetails.createQualityMenu();

          //  createQualityMenu();
            this.hideQualityMenu();
        }
      
        if(data.overlay){
            this.initOverlay();
        }

        
        
    }
    

    initSeekbarAndProgess(){

        elements.seekbar.min = 0;
	    elements.seekbar.max = Math.floor(super.VideoDuration());	//TODO
	    elements.seekbar.range = 1;
        elements.seekbar.value = Math.floor(super.VideoDuration());
    
        playbackProgress.min = 0;
        playbackProgress.max = Math.floor((super.VideoDuration()))
        playbackProgress.value = playbackProgress.max;


        //elements.playbackProgress.value = data.timeUpdateOnSeekUpdate;
            //data.player.seek(data.timeUpdateOnSeekUpdate);

    }


    hideQualityMenu(){
        data.menuOpen = 0;
        elements.qualitySelectorMenu.classList.add("hide");
    }

    initOverlay(){
        window.overlayText = (data.overlay.overlayText) ? (data.overlay.overlayText) : "Text Overlay";
        window.overlayPosX = data.overlay.posX ? data.overlay.posX : Math.random()*(elements.videoContainer.offsetWidth - 'elm.offsetWidth');
        window.overlayPosY = data.overlay.posY ? data.overlay.posY : Math.random()*(elements.videoContainer.offsetHeight - 'elm.offsetHeight') - 90;
        window.overlayDisplayDuration = data.overlay.displayDuration ? data.overlay.displayDuration : "Math.random()*5000";
        window.overlayDisplayTimeout = data.overlay.displayTimeout ? data.overlay.displayTimeout : "Math.random()*5000 + 100";	//+100 to avoid 0
    }



}