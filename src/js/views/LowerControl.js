import {elements} from './dom';
import {data , iconsName} from '../models/base';
import DomChanges from '../models/DomChages';
import Extra from '../models/extra';


export default class DrawLowerControl extends DomChanges{

    constructor(){
        
        super();

       
    }


    DrawLowerControlChildHolder(){

        // draw child1 

        let controlsLowerChild1 = document.createElement('div');
            controlsLowerChild1.id = 'controlsLower-child1',
            controlsLowerChild1.className ='controlsLower-child1';
            elements.controlsLower.appendChild(controlsLowerChild1);

            elements.controlsLowerChild1 = controlsLowerChild1;
        // draw child2
        
        let controlsLowerChild2 = document.createElement('div');
            controlsLowerChild2.id ='controlsLower-child2',
            controlsLowerChild2.className = 'controlsLower-child2';
            elements.controlsLower.appendChild(controlsLowerChild2);
            elements.controlsLowerChild2 = controlsLowerChild2;

        
    }

    

    // creating all buttons by using addControlButton method
    DrawControllerButtions(){

        const status  = data.mobileAndTabletcheck;
        if(!status)
             this.addControlButton("btnPlayPause", "btnPlayPause", "btnPlay", " ", "Play", this.onBtnPlayPauseClick ,  iconsName.Play , 'left');
       
        if(data.controls.seekBack != "false" && !status)
            this.addControlButton("btnSeekBack", "btnSeekBack", "", "", `Seek ${data.controls.seekInterval} Sec Back`, this.onBtnSeekBackClick , iconsName.FastBackward , 'left');
        
        if(data.controls.seekFwd != "false" && !status)
            this.addControlButton("btnSeekFwd", "btnSeekFwd", "", "", `Seek ${data.controls.seekInterval} Sec Forward`, this.onBtnSeekFwdClick , iconsName.FastForward , 'left');
        // creating a div inside left control container tp put vol button and vol seekbar inside it;
            this.addControlDiv('volume-wrapper' , 'left')
        
       if(data.controls.mute != "false" && !status)
            this.addControlButton("btnMute", "btnMute", "btnMuteOff", "", "Mute", this.onBtnMuteClick , iconsName.VolumeHigh , 'left' , 'volume-wrapper');
      
       if(data.controls.volSlider != "false")
            this.DrawVolumeSlider();
        if(data.controls.timeUpdate != "false"){
                this.addControlButton("btnTimeDisplay", "btnTimeDisplay", "", "00:00:00 00:00:00", "Elapsed/remaining time", this.onBtnTimeDisplayClick , '' , 'left');		
                elements.btnTimeDisplay =  document.getElementById("btnTimeDisplay");   
                elements.btnTimeDisplay.innerHTML = '00:00' +  " / " + '00:00';
            
            }
        if(data.controls.quality != "false")
            this.addControlButton("VideoType", "VideoType"  , "" , "Skip ahead to live broadcast" , "",  this.gotoLive , iconsName.live , 'right' )
            this.addControlButton("btnSettingSelector", "btnSettingSelector", "", "", "Change Playback Quality", this.onSettingClick , iconsName.Setting ,'' , 'right');		
        if(data.controls.quality != "false")
            this.addControlButtonForMobile("btnQualitySelector", "btnQualitySelector", "", "", "Change Playback Quality",this.onBtnQualitySelectorClick , 'icon-film','Quality list' );		
        if((data.controls.pip != "false") && /*isPipSupported() */  !status)
            this.addControlButton("btnPip", "btnPip", "btnPipEnter", "", "Picture in Picture", this.onBtnPipClick , iconsName.Pip);
        if(data.controls.speed != "false"){
            this.addControlButtonForMobile("btnSpeedSelector", "btnSpeedSelector", "", data.playSpeed+"x", "Playback Speed", this.onBtnSpeedSelectorClick , 'icon-meter' , 'Speed');	
        }
    
        if(data.controls.sticky == "true")
            this.addControlButtonForMobile("btnSticky", "btnSticky", "stickyToggle", "", "Autohide control bar", '' , 'icon-pushpin' , 'Lock screen' );
            this.addExtraButton('stickyToggle')	
            
        if(data.controls.fullscreen != "false")
           this.addControlButton("btnFullscreen", "btnFullscreen", "btnFullscreenEnter", "", "Fullscreen", this.onBtnFullscreenClick , iconsName.FullScreen);		
        	//Set Auto hide
        if(data.controls.autoHide != "false"){	
          
            elements.controlContainer.addEventListener("mouseover", this.onControlBarMouseover, true);
            elements.controlContainer.addEventListener("mouseout", this.onControlBarMouseout, true);
        }

    }

   
            

    // addControlButton function draws the controller buttos 
    addControlButton(id , class1 , class2, label , tooltip, listener , svg , side , wrapper=''){

        // create a button element;

        let elm = document.createElement("button");
            elm.id = id;
            elm.classList.add(class1);
         
         // setting the dom selector for each button for future refrence;
             elements[class1] = elm;
        
         // add extra class if class2 is not empty 
         if(class2!="")
            elm.classList.add(class2);
         
         // add a icon to buttons    
        if(svg!="")
            elm.innerHTML =	`<svg class="create_icon">
                                <use xlink:href="img/svg/sprite.svg#${svg}"></use>
                            </svg>`;
        // add listener to buttons if listener has been passed
        if(listener)
          elm.addEventListener("click", listener);
        
        /* @desc append the button according to
         there side e.g play button will be in the child1 container 
        and respective in child2   
        */

          if(side =='left'){
            if(wrapper !=  ''){
                document.querySelector(`.${wrapper}`).appendChild(elm)	
                }else{
                    elements.controlsLowerChild1.appendChild(elm);
                }
            }else if(side = 'right'){
                  
                    elements.controlsLowerChild2.appendChild(elm);
                    
            }

        }

        

         addControlDiv(classname , side){

            /** 
            * @desc this function is utility function used to draw extra div inside child conatiner
                of lowerController div
            */

            let div = document.createElement('div');
            div.className = classname;
            
            if(side =='left'){
                elements.controlsLowerChild1.appendChild(div);	
            }else if(side = 'right'){
                elements.controlsLowerChild2.appendChild(div);
                    
            }

            elements[classname] = div;
        }

        DrawVolumeSlider() {
             

             
            let volSeekbar = document.createElement("input");
            volSeekbar.id = "volSeekRange";
            volSeekbar.type="range";
            volSeekbar.classList.add("volSeekRange");

            // addin dom selector tp elemets objects
            elements.volSeekRange = volSeekbar;

            
            elements['volume-wrapper'].appendChild(volSeekbar);
            volSeekRange.min=0;
            volSeekRange.max=1;
            volSeekRange.step=0.01;
            //volSeekRange.value=1; //TODO Get from cookie
            volSeekRange.value = elements.video.volume;
            volSeekbar.addEventListener("input", this.onVolSeeking, false);
        }

        gotoLive(){

                let extra = new Extra();
                console.log(data.live , 'video is  live');
                if(data.live){
                     
                    let dvrsize = Math.floor(extra.VideoDuration()-10);

                     video.currentTime = dvrsize;
                     elements.seekbar.value = dvrsize;
                     elements.playbackProgress.value = dvrsize;
                     elements.video.play();
                   }

              //  console.log(data.timeUpdateOnSeekUpdate);
        }

        
         addControlButtonForMobile(id, class1, class2, label, tooltip, listener , svg , text ){	
            

            /** 
             * @desc this function add buttons for others settings such
             * qualitySelector
             * speedSelector
             * lockButton 
             */
          //  console.log(listener);


            let elm = document.createElement("button");
            elm.id = id;
            elm.classList.add(class1);
            
            // setting the dom selector for each button for future refrence;
            elements[class1] = elm;
            
            if(svg!="")
                elm.innerHTML =	`<svg class="create_icon">
                                    <use xlink:href="img/svg/sprite.svg#${svg}"></use>
                                </svg> <span class='settingname ${svg}'>${text}</span>`;
            let extradiv =  document.createElement('div');
            extradiv.className = class2;
            elm.appendChild(extradiv);

            if(listener){
                elm.addEventListener("click", listener);
             }
            elements.MBwrapper.appendChild(elm);
            
        }
            
        addExtraButton(parentclassname ,  svg='' , listener , markup=''){	
	
            markup = `<label class="switch">
            <input class='stickyToggleCheckbox' type="checkbox" value='off' >
            <span class="slider round"></span>
          </label>`;
                document.querySelector(`.${parentclassname}`).insertAdjacentHTML('afterbegin' , markup);
        }
        
        
         createQualityMenu(){

            /**
             * @desc this function creates a qualitySelector menu
             */
           
            let qualitySelectorMenu = document.createElement("div");
            qualitySelectorMenu.id = "qualitySelectorMenu";
            qualitySelectorMenu.classList.add("qualitySelectorMenu");
            qualitySelectorMenu.classList.add("menu");
            qualitySelectorMenu.innerHTML = `<div class='setting-header'><svg class="create_icon">
                <use xlink:href="img/svg/sprite.svg#icon-rewind"></use>
            </svg> <span class="settingname">Quality list</span></div>` 
            
            //  appending quaitySelectorMenu to Setting Container
                
            elements.settingContainer.appendChild(qualitySelectorMenu);

            // setting the document selector for qualitySelectorMenu 

            elements.qualitySelectorMenu = qualitySelectorMenu;



            let qualityList = document.createElement("ul");
            qualityList.id="qualityList";
            qualityList.classList.add("menu");
            qualitySelectorMenu.appendChild(qualityList);
            
            //TODO If single level, then no menu
            if(data.availableQuality==1){   
               elements.btnQualitySelector.innerHTML= `${elements.video.height}  p`;
                return;
            }
            //Auto switch quality
            let elm = document.createElement("li");
            let txt = document.createTextNode("Auto");
            
            elm.appendChild(txt);
            elm.id="video-quality-index--1";
            elm.classList.add("menu-item-selected");
            qualityList.appendChild(elm);
            elm.addEventListener("click",this.onQualityItemClick.bind(this,-1), true);
            
            for (var i = 0; i < data.availableQuality.length; i++)
            {
                elm = document.createElement("li");
                txt = document.createTextNode(data.availableQuality[i].height+"p");
                elm.appendChild(txt);
                elm.id="video-quality-index-"+i;
                elm.classList.add("menu-item-unselected");
                qualityList.appendChild(elm);
                elm.addEventListener("click",this.onQualityItemClick.bind(this,i), true);
            }
        }

        createPlaybackSpeedMenu(){
                
            let elm = document.createElement("div");
            elm.id = "playbackSpeedMenu";
            elements.playBackMenuList = elm;
            elm.classList.add("playbackSpeedMenu");
            elm.classList.add("menu");
            elm.classList.add("hide")
            document.querySelector('.setting_container').appendChild(elm)
            elm = document.createElement("ul");
            elm.id="playbackSpeedList";
            elm.classList.add("menu");

            document.getElementById("playbackSpeedMenu").appendChild(elm);
            document.getElementById("playbackSpeedMenu").insertAdjacentHTML("afterbegin" , `<div class='setting-header'><svg class="create_icon">
                                                <use xlink:href="img/svg/sprite.svg#icon-rewind"></use>
                                            </svg> <span class="settingname">Playback speed</span></div>`);
            for (let i = 0; i < data.playbackSpeeds.length; i++)
            {
                elm = document.createElement("li");
                let txt = document.createTextNode(data.playbackSpeeds[i]+"x");
                elm.appendChild(txt);
                elm.id="playback-speed-index-"+i;
                elm.classList.add("menu-item-unselected");
                document.getElementById("playbackSpeedList").appendChild(elm);
                elm.addEventListener("click",this.onPlaybackSpeedItemClick.bind(this,i), true);
            }
        }

        onSettingClick(){

            /** 
             * @desc this function toggle setting menu  show and hodo
             */
            if(data.settingShowStatus || !data.menuOpen){
                super.toggleMBwrapper('flex' ,'.setting_container');
                super.toggleMBwrapper('block')
                super.hideQualityMenu();
                super.hidePlaybackSpeedMenu()
                data.menuOpen = 1;
                data.hide = false
                data.settingShowStatus = false;
                data.bookmarkShowStatus = true;
            }else{
                super.toggleMBwrapper('none' ,'.setting_container')
                data.hide = true;
                data.settingShowStatus = true;
                data.bookmarkShowStatus = false;
                super.HideControls(1000);
                data.menuOpen = 0;
            }
        }   
        onPlaybackSpeedItemClick(index){
            elements.video.playbackRate=data.playbackSpeeds[index];
            document.querySelector(".icon-meter").innerHTML=data.playbackSpeeds[index]+'x';
            super.hidePlaybackSpeedMenu();
            super.toggleMBwrapper('block');
        }
        onBtnQualitySelectorClick(){
            //hidePlaybackSpeedMenu();
            super.toggleMBwrapper('none'); // true is being passed so that it hide that WBrapper;
            //Toggle menu
            if(document.getElementById("qualitySelectorMenu").classList.contains("hide"))
            {
                super.showQualityMenu();
            }
            else
            {
                //console.log('hello')
                super.hideQualityMenu();
            }
        }

         onBtnFullscreenClick(){	
        
            if(!super.isFullscreen()){
                //element = container || video;
                const element = elements.parentWrapper;
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else {
                    element.webkitRequestFullScreen();
                }
                
                screen.orientation.lock("landscape-primary");
                btnFullscreen.innerHTML = `<svg class="create_icon">
	                        	<use xlink:href="img/svg/sprite.svg#${iconsName.ExitfullScreen}"></use>
	                            </svg>`
		
	            } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    } else {
                        document.webkitCancelFullScreen();
                    }
                    screen.orientation.unlock();
                    
                    btnFullscreen.innerHTML = `<svg class="create_icon">
                        <use xlink:href="img/svg/sprite.svg#${iconsName.FullScreen}"></use>
                    </svg>`
                }
           
                super.HideControls(1000);
          }

        onBtnSeekBackClick(){
            /**
             * @desc this funtion seeks the in backward direction
             */
            elements.video.currentTime = elements.video.currentTime - data.controls.seekInterval;

         //   console.log(elements.video.currentTime);
        }
        
        onBtnSeekFwdClick(){
            /**
             * @desc this funtion seeks the in forward direction
             */
            if(data.seekable){
                elements.video.currentTime = elements.video.currentTime + data.controls.seekInterval;
            }
            
        }

         onBtnMuteClick(){
                (data.mute) ? super.setMuteOff() : super.setMuteOn();
                
         }

         onVolSeeking(){
            elements.video.volume = this.value;
            (this.value==0) ? super.setMuteOn():super.setMuteOff();
         }
         
         onQualityItemClick(index){


            for (var i = -1; i <  data.availableQuality.length; i++){
                document.getElementById("video-quality-index-"+i).classList.remove("menu-item-selected");
                document.getElementById("video-quality-index-"+i).classList.add("menu-item-unselected");
            }
            if(index == -1)
            {   
                if(conf.link.hls){
                    data.player.loadLevel=-1;
                }else if(conf.link.dash)   {
                    data.player.setAutoSwitchQualityFor('audio', true);
                    data.player.setAutoSwitchQualityFor('video', true);
            
                }
              }else{

                if(conf.link.hls)  {	
                    console.log(index);
                    data.player.loadLevel=index;
                    console.log("Quality "+data.player.levels[index].width);
                    //player.loadLevel=index;
                }else if(conf.link.dash){
                    data.player.setAutoSwitchQualityFor('audio', false);
                    data.player.setAutoSwitchQualityFor('video', false);
                    data.player.setQualityFor('video', index);
                }

             }
            document.getElementById("video-quality-index-"+index).classList.add("menu-item-selected");
            super.hideQualityMenu(); 						//Hide menu
            super.toggleMBwrapper('block'); // block is being passed so that it hide that WBrapper;
            data.menuOpen = 1;
         }

        onControlBarMouseover(){
        
            super.showControl();
        
        }   
        
        onControlBarMouseout(){
        
            super.HideControls(1000);
        
        }
        onBtnSpeedSelectorClick() {
            super.hideQualityMenu();
            super.toggleMBwrapper('none');
            
            if(document.getElementById("playbackSpeedMenu").classList.contains("hide"))
            {
                super.showPlaybackSpeedMenu();
            }
            else
            {
                super.hidePlaybackSpeedMenu();
            }
        }
}