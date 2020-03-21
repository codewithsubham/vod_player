import {elements} from './dom'; 
import SeekBarMethods from './Seekbarmethods'
import {data , iconsName} from '../models/base'

export default class UpperControl extends SeekBarMethods{

    constructor(){

        super();    
    }   


  

    drawSlider(){

        // this function draws the seekabr or slider for seeking
        elements.seekbar = document.createElement("input");
        elements.seekbar.id = "seekRange";
        elements.seekbar.type="range";
        elements.seekbar.classList.add("seekRange");
        elements.seekbar.value = 0;
        elements.controlsUpper.appendChild(elements.seekbar);
        

    }


    DrawProgressBar(){
        // this function create elements for  bufferprogress and playbackProgess
        
        let bufferprogress = document.createElement('progress');
              bufferprogress.id = 'bufferprogress';
              bufferprogress.min = 0;
              bufferprogress.max = 100;
              bufferprogress.value = 0;
              bufferprogress.classList.add("bufferProgress");
              elements.bufferProgress = bufferprogress
              elements.controlsUpper.appendChild(bufferprogress);
            

        let playbackProgress = document.createElement('progress');
             playbackProgress.id = "playbackProgress";
             playbackProgress.min = 0;
             playbackProgress.max = 100;
             playbackProgress.value = 0;
             playbackProgress.classList.add("playbackProgress");
             elements.controlsUpper.appendChild(playbackProgress);

             // add playbackProgress dom selector to elements object

             elements.playbackProgress = playbackProgress;
            }


        drawLoader(){
           // document.querySelector('.btnBigPlay').style.zIndex = 3;
            const elm = document.querySelector('.loader-container');
            const markup = `<div class="bookmarkloading">
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                     </div>`;
            elm.insertAdjacentHTML('afterbegin' , markup);
            document.querySelector(`.${iconsName.CenterPlay}-wrapper`).style.display = 'none';	
            document.querySelector(`.${iconsName.CenterPause}-wrapper`).style.display = 'none';
            // hide the seek button while video is being load;
            document.querySelector(`.${iconsName.FastBackward}-wrapper`).style.visibility = 'hidden';
            document.querySelector(`.${iconsName.FastForward}-wrapper`).style.visibility = 'hidden';

        }
    drawBigPlayButton(){	
            let elm = document.createElement("div");
            elm.id = "btnBigPlay";
            elm.classList.add("btnBigPlay");
            // adding btnBigPlay to elements object for dom selection
            elements.btnBigPlay = elm
            
            const center =  document.createElement('div');
            center.className = 'Bigbtnicon';
            
            // adding btnBigPlay to elements object for dom selection
            elements.Bigbtnicon = center

          
            elements.videoContainer.appendChild(elm);
            elm.appendChild(center);
            const icons = [iconsName.FastForward,  iconsName.CenterPlay , 'loader-container' , iconsName.CenterPause , iconsName.FastBackward]
            for(let element of icons){
                if(element == 'loader-container'){
                    center.insertAdjacentHTML('afterbegin' , `<button class='${element}'></button>`);
                }else{
                    center.insertAdjacentHTML('afterbegin' , `<button class='${element}-wrapper'><svg class="create_icon ${element} bg">
                    <use xlink:href="img/svg/sprite.svg#${element}"></use></svg></button>`);
                }
                if(!data.mobileAndTabletcheck){
                    document.querySelector('.bg').style.display = 'none';
                }
                
                
            };
        this.drawLoader();	
	
    }
    showloader(){
        
      
       // document.querySelector('.btnBigPlay').style.zIndex = 3;
        document.querySelector(`.loader-container`).style.display = 'flex';	
        document.querySelector(`.${iconsName.CenterPlay}-wrapper`).style.display = 'none';
        document.querySelector(`.${iconsName.CenterPause}-wrapper`).style.display = 'none';

        // hide the seek button while video is being load;
        document.querySelector(`.${iconsName.FastBackward}-wrapper`).style.visibility = 'hidden';
        document.querySelector(`.${iconsName.FastForward}-wrapper`).style.visibility = 'hidden';
    }

    clearLoader(){

        document.querySelector('.loader-container').style.display = 'none';
        document.querySelector(`.${iconsName.FastBackward}-wrapper`).style.visibility = 'visible';
        document.querySelector(`.${iconsName.FastForward}-wrapper`).style.visibility = 'visible';
    
        if(data.mobileAndTabletcheck){
            if(!data.videoIsBeingPlayed){
                    document.querySelector(`.${iconsName.CenterPlay}-wrapper`).style.display = 'flex';
                    document.querySelector(`.${iconsName.CenterPause}-wrapper`).style.display = 'none';
                }else{
                    document.querySelector(`.${iconsName.CenterPlay}-wrapper`).style.display = 'none';
                    document.querySelector(`.${iconsName.CenterPause}-wrapper`).style.display = 'flex';
                }
            }else{
                document.querySelector(`.${iconsName.CenterPlay}-wrapper`).innerHTML = ``;
            }
        }
}