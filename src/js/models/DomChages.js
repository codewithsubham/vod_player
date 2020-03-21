import {elements} from '../views/dom';
import {data,iconsName} from './base';
import Extra from './extra';



export default class DomChanges extends Extra{
        
        /* @desc below all the methods will 
        execute when button controller events will fired 
        from LowerControl class presend in view folder  */
        constructor(){

            super()
        }

        onQualityItemClick(){
            
            this.test();
        }

        test(){

            console.log('testing function');
        }
        
        onBtnPlayPauseClick(){
          //  console.log(elements.video.pause);
            if(elements.video.paused){
                elements.video.play();
                // videoisbeingplayed boolean will be used in clear loader to render correct button;
                data.videoIsBeingPlayed = true;
            }else{
                elements.video.pause();
                data.videoIsBeingPlayed = false;
            }
        }
         toggleMBwrapper(display , dom='#MBwrapper'){
            
            document.querySelector(dom).style.display= display;
           //console.log('hello oww');
                                
        }


        hideQualityMenu(){
            data.menuOpen = 0;
            elements.qualitySelectorMenu.classList.add("hide");
        }



     HideControls(cleartime){
         
            clearTimeout(data.timer);
                data.timer = setTimeout(() => {
                // hide controls
                if(data.hide && !data.stickyToggleStatus && !elements.video.paused && !data.loader){

                        if(data.stickyControl || elements.videoContainer.paused || data.menuOpen  || data.hide == false){
                            return;
                        }
                        elements.controlContainer.style.opacity = 0;
                    
                       document.getElementById("btnBigPlay").style.display= 'none';
                        //this.toggleMBwrapper('none' , '.setting_container');
                        document.querySelector('.setting_container').style.display= 'none';
                                
                }
            }, cleartime)
    }

    showQualityMenu(){
        data.menuOpen = 1;
        elements.qualitySelectorMenu.classList.remove("hide");
    }
   
    hideQualityMenu(){
	    data.menuOpen = 0;
	    elements.qualitySelectorMenu.classList.add("hide");
    }
    
    hidePlaybackSpeedMenu(){
        data.menuOpen = 0;
	    elements.playBackMenuList.classList.add("hide");
    }
    
    showPlaybackSpeedMenu(){
        data.menuOpen = 1;
        elements.playBackMenuList.classList.remove("hide")
    }

    isFullscreen(){
	    return document.fullscreenElement || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen;
    }

    showControl(){
        clearTimeout(data.timer);
        if(data.stickyControl) {
            return;
	    }
        elements.controlContainer.style.opacity = 1;
        elements.btnBigPlay.style.display= 'block';
    
    } 

    onVideoPlay(){	
        
        /**
         * @desc this function get executed from controller when onplay event is been triggered;
         */


        let btn = document.getElementById("btnPlayPause");
        let centerPlay = document.querySelector(`.${iconsName.CenterPlay}-wrapper`);
        let centerPause = document.querySelector(`.${iconsName.CenterPause}-wrapper`);
        if(!data.mobileAndTabletcheck){
            btn.innerHTML = '';
            btn.innerHTML = `<svg class="create_icon">
                <use xlink:href="img/svg/sprite.svg#${iconsName.Pause}"></use>
            </svg>`;
        }
        if(data.mobileAndTabletcheck){
            centerPlay.style.display = 'none';
            centerPause.style.display = 'flex';
        }
      

    }

    onVideoPause(){
        let btn = document.getElementById("btnPlayPause");
        let bigBtn = document.getElementById("btnBigPlay");
        let centerPlay = document.querySelector(`.${iconsName.CenterPlay}-wrapper`);
        let centerPause = document.querySelector(`.${iconsName.CenterPause}-wrapper`);
        if(!data.mobileAndTabletcheck){
            btn.innerHTML = '';
            btn.innerHTML = `<svg class="create_icon">
                <use xlink:href="img/svg/sprite.svg#${iconsName.Play}"></use>
            </svg>`;
        }
        if(data.mobileAndTabletcheck){
            centerPlay.style.display = 'flex';
            centerPause.style.display = 'none';
        }

        this.deleteTextOverlay();
      //      this.showControl();
    }

    drawTextOverlay(permanent){
        
        if(data.overlayDrawn==true)
            return;
        let elm = document.createElement("span");
        elm.id = elm.id+"textOverlay";
        elm.classList.add("textOverlay");
        elm.innerHTML=overlayText;
        elements.videoContainer.appendChild(elm);
        
        elm.style.left = eval(overlayPosX);
        elm.style.top = eval(overlayPosY);
        
        data.overlayDrawn = true;
        if(!permanent)
            window.setTimeout(this.deleteTextOverlay, eval(overlayDisplayDuration));
    }

     deleteTextOverlay(){
        if(!data.overlayDrawn)
            return;
       let elm = document.getElementById("textOverlay");
        elm.parentNode.removeChild(elm);
        data.overlayDrawn = false;
        if(elements.video.paused)
            return;
        window.setTimeout(this.drawTextOverlay, eval(overlayDisplayTimeout));
    }

   
    setMuteOn(){
        let elm = document.getElementById("btnMute");
        elm.innerHTML = `<svg class="create_icon">
            <use xlink:href="img/svg/sprite.svg#${iconsName.VolumeMute}"></use>
        </svg>`;
        elements.video.muted = true;
        data.mute = 1;
        elements.volSeekRange.value = 0;
    }
    
    setMuteOff(){	
        let elm = document.getElementById("btnMute");
        elm.innerHTML = `<svg class="create_icon">
            <use xlink:href="img/svg/sprite.svg#${iconsName.VolumeHigh}"></use>
        </svg>`;
        
        
        elements.video.muted = false;
        data.mute = 0;
        elements.volSeekRange.value = elements.video.volume;
    }
    onPlaybackTimeUpdate(){
            if(data.seeking){
                
                return;
            
            }

            

            data.videoSeekValue = super.VideoDuration();
            let VideoCurrentTime = elements.video.currentTime;
            
            console.log(VideoCurrentTime)
            console.log(super.VideoDuration())
            console.log(data.remainingTimeDisplay)

            elements.btnTimeDisplay.innerHTML = super.convertToTimecode(VideoCurrentTime - (super.VideoDuration() * data.remainingTimeDisplay)) + " / " + super.convertToTimecode(super.VideoDuration());
	
           
        
    }


    updateVideoTime(curTime){

        elements.seekbar.value = Math.floor(curTime);;
        elements.seekbar.max = Math.floor(super.VideoDuration());
        elements.playbackProgress.max = Math.floor(super.VideoDuration());
        elements.playbackProgress.value = Math.floor(curTime);

    }

    seekControlButton(){
        /**
         * @desc this function control visibility of forward and backbutton
         * by checking the time gap between videoTimeLength and video curtime
         * to show forward button time gap should be greater than 20 sec 
         
         */

         
         let forwardButton =  document.querySelector(`.${iconsName.FastForward}-wrapper`);
         if(data.videoSeekValue - elements.video.currentTime > 20){
            data.seekable = true;
            forwardButton.style.visibility = 'visible';
            if(!data.mobileAndTabletcheck){
                elements.btnSeekFwd.childNodes[0].style.fill = 'white';
            }
        }else{
            data.seekable = false
            if(!data.mobileAndTabletcheck){
                elements.btnSeekFwd.childNodes[0].style.fill = 'grey';
            }
            forwardButton.style.visibility = 'hidden';
        }
    }

    stickyToggle(){
             //stickyToggleStatus

            console.log(data.stickyToggleStatus);  


            if(!data.stickyToggleStatus){
                document.querySelector('.stickyToggleCheckbox').setAttribute('checked' , true);
                const status = document.querySelector('.stickyToggleCheckbox').value = true;
        
                if(status){
                    data.stickyToggleStatus = true;
                    this.showControl();
                }
                
                
            }else{
                document.querySelector('.stickyToggleCheckbox').removeAttribute('checked');
                const status = document.querySelector('.stickyToggleCheckbox').value = false;
                if(!status){
                    data.stickyToggleStatus = false;
                    this.HideControls(1000);
                }
            }
            
        }

        changeVideoStatus(){
                if(super.VideoDuration() - elements.video.currentTime < 50){
                    
                    // change live button  from live to dvr 
                    
                    if(!data.liveUpdated){
                        elements.VideoType.innerHTML = `<svg class="create_icon">
                                <use xlink:href="img/svg/sprite.svg#${iconsName.live}"></use>
                        </svg>`
                        // change live status to false
                        data.live = false;
                        data.liveUpdated = true;
                        data.DvrUpdated = false;
                    }
                        
                }else{

                    // change dvr buttin from dvr to live
                    if(!data.DvrUpdated){
                        elements.VideoType.innerHTML = `<svg class="create_icon">
                            <use xlink:href="img/svg/sprite.svg#${iconsName.dvr}"></use>
                    </svg>`
                    
                    // change live status to true;

                    data.live = true;
                    data.liveUpdated = false;
                    data.DvrUpdated = true;
                    }
                    

                }
        }

        ErrorCode(errorString , parent , classname){
            console.log('hello world');
            document.querySelector(`.${parent}`).innerHTML = `<div class="error">
            <p>${errorString}</p>
            <button class="${classname}"><svg class="create_icon">
            <use xlink:href="img/svg/sprite.svg#${iconsName.refresh}"></use>
        </svg></button>
        </div>`
        
        }

}