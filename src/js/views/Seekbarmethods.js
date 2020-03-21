import {elements} from './dom'; // contains all the dom elements
import {data} from '../models/base';
import Extra from '../models/extra';


export default class SeekBarMethods extends Extra{

    constructor(){
        super();
    }

    SetSeekBarListner(){
        elements.seekbar.addEventListener("change", this.onSeekBarChange, true);
        elements.seekbar.addEventListener("mousedown", this.onSeekbarMouseDown, false);
        elements.seekbar.addEventListener("mouseup", this.onSeekbarMouseUp, false);
        elements.seekbar.addEventListener("input", this.onSeeking, false);
        elements.seekbar.addEventListener("mousemove", this.onSeekbarMouseMove, true);
        elements.seekbar.addEventListener("mouseout", this.onSeekbarMouseOut, true);
        elements.seekbar.addEventListener("mouseover", this.onSeekbarMouseOver, true);
    }

    onSeekbarMouseDown(){
        data.seeking = 1;
    }

    onSeekbarMouseUp(){
        data.seeking = 0;
    }

    onSeeking(e){

        let curTime = elements.seekbar.value;
        
        if(data.timeUpdateOnSeekUpdate == 0){
            elements.btnTimeDisplay.innerHTML = super.convertToTimecode(curTime - (elements.video.duration * data.remainingTimeDisplay)) + " / " + super.convertToTimecode(elements.video.duration);
            elements.seekbar.value = curTime;
            playbackProgress.value = curTime;
          
        }else{
          elements.btnTimeDisplay.innerHTML = super.convertToTimecode(data.timeUpdateOnSeekUpdate) + " / " + super.convertToTimecode(elements.video.duration);
		
            elements.playbackProgress.value = data.timeUpdateOnSeekUpdate;
            //data.player.seek(data.timeUpdateOnSeekUpdate);
            elements.seekbar.value = data.timeUpdateOnSeekUpdate;

            elements.video.currentTime = data.timeUpdateOnSeekUpdate;
		
        }
    }

    onSeekbarMouseMove(event){
        
        let extra = null;
        extra =  new Extra();

        let  curTime = elements.seekbar.value;
        let tooltip = elements.seektimePreview;
        let pos = event.offsetX;
        let w = elements.seekbar.offsetWidth;
        let tooltipwidth = tooltip.offsetWidth

            let x = super.VideoDuration() / w;
            let y = pos * x;
            let z = super.VideoDuration() - y;
        if(pos < 5){
            pos=0;
        }
        if((pos -  (tooltipwidth / 2) <= w-tooltipwidth) && (pos -  (tooltipwidth / 2) >= 0)){
            elements.seektimePreview.style.marginLeft = `${pos -  (tooltipwidth / 2)}px`;
           
        }
        if(data.seeking){
            if(pos <= w){
                tooltip.innerHTML = extra.convertToTimecode(-z);
            }
            
            data.timeUpdateOnSeekUpdate = (super.VideoDuration()/w) * pos;
            //elements.playbackProgress.value = pos;

        }else{
            
            tooltip.innerHTML = extra.convertToTimecode(-z);
            data.timeUpdateOnSeekUpdate = (super.VideoDuration()/w) * pos;
        }
    }

    onSeekbarMouseOut(){
        //
       
	    elements.seektimePreview.style.opacity = 0;
	    elements.seektimePreview.classList.add('hide');
    }
    onSeekbarMouseOver(){
        elements.seektimePreview.classList.remove('hide');
        elements.seektimePreview.style.opacity = 1;
    }

    onSeekBarChange(){	
        elements.video.currentTime = elements.seekbar.value;
       
    }


    

}