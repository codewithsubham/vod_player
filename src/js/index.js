// importing data files
import {elements} from './views/dom';
import {data , iconsName} from  './models/base'

// importing all classes
import Video from './models/Video'
import Dash from './models/DashClass'
import Hls  from './models/HlsClass'
import DrawControls from './views/VideoControl'
import UpperControl from './views/UpperControl';
import SeekBarMethods from './views/Seekbarmethods';
import LowerControl from './views/LowerControl';
import setVideoDetails from './views/SetVIdeoDetails';
import DomChanges from './models/DomChages';

// @desc create a state object that that store all class contructions

const state = {};

// @desc all logic function will go below this line

const controllVideo = () => {    
    
   // const videoLink = "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd"
    // initiating  video class
    //const videoLink = "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd";
    
    const videoLink = `http://104.199.144.5:1935/vod/smil:8580201909161700.smil/manifest.mpd`

    state.videoCreate =  new Video(elements.videoContainer , 'videoPlayer' , 'videoPlayer');

    console.log(state.videoCreate);
    
    //@desc class the CreatevideoPlayer() method from Video class
    state.videoCreate.CreatevideoPlayer();
    
    //@desc initialize dashClass 
    state.Dash = new Dash(elements.video, videoLink, elements.videoContainer);
    //@desc initialize HLS class
    //http://localhost:1935/live/myStream/playlist.m3u8?DVR
    // http://104.199.144.5:1935/vod/smil:4380201902171700.smil/playlist.m3u8
    //https://visionias.akamaized-staging.net/video/smil:450420190812180000.smil/playlist.m3u8?hdnts=exp=1576245696~acl=/*~hmac=6a3c126d02bf874d7a47f1993358280aa0a78df0a52e30de2cc6d7211a01f1d2');
    //http://localhost:1935/IAPL1/myStream/playlist.m3u8?DVR
    //state.hls = new Hls(elements.video , 'http://localhost:1935/IAPL1/myStream/playlist.m3u8?DVR')
    elements.video.volume = 0;
    
};

const DrawControlBar = () => {

    // @desc this function takes care of drawing controll bar on screen 
    // @desc instantiate DrawControls class 
    state.DrawControll = new DrawControls(elements.videoContainer);

}

const DrawUpperControlDom = () => {

    // @desc this function draws the upper controls 
    state.DrawUpperControl =  new UpperControl();
    // @desc draws the upperControl
    state.DrawUpperControl.drawSlider();
    state.DrawUpperControl.drawBigPlayButton(); 
    //  @desc draw progress bar and buffer bar
    state.DrawUpperControl.DrawProgressBar()

}

const DrawLowerControlDom = () =>  {

    state.LowerControl =  new LowerControl();
    state.LowerControl.DrawLowerControlChildHolder();
    state.LowerControl.DrawControllerButtions();
    state.LowerControl.createPlaybackSpeedMenu()


}




const ControllSeekBarEvents = () => {

    // this function controls and handle seekbar

    state.SeekbarEvents = new SeekBarMethods();
    state.SeekbarEvents.SetSeekBarListner();
} 


const videoEvents = () => {

    state.VideoEvents = new setVideoDetails();
   
    elements.video.onloadedmetadata = (e) =>  {
        
        state.VideoEvents.videoMetadataLoaded(e);
   
    }

    state.DomManuputation = new DomChanges();
    
    elements.video.onplay = (e) => {

        state.DomManuputation.onVideoPlay();

    }

    elements.video.onpause = (e) => {

        state.DomManuputation.onVideoPause();
    }
    
    elements.video.ontimeupdate =(e) => {

       // console.log('hello world');
        state.DomManuputation.onPlaybackTimeUpdate();
        state.DomManuputation.changeVideoStatus();
        state.DomManuputation.seekControlButton()
        state.DomManuputation.onPlaybackTimeUpdate()

        
    }
    
    elements.video.onwaiting = (event) => {
		// changing that loaded boolean value from false to true so center play pause button wont work
        
            data.loader = true;
			state.DrawUpperControl.showloader();
			state.DomManuputation.showControl();
    };
    elements.video.onplaying = (event) => {

		data.loader = false;
		state.DrawUpperControl.clearLoader();
		document.querySelector('.btnBigPlay').style.zIndex = 0;
		
		if(elements.video.onplay){
			localStorage.clear();
			state.LowerControl.HideControls(1000);
		}
    }
    elements.video.oncanplaythrough = (event) => {
        //document.querySelector('.videoplayer-loader').style.display = 'none';
        data.loader = false;
        state.DrawUpperControl.clearLoader();
		document.querySelector('.btnBigPlay').style.zIndex = 0;
	
		if(elements.video.onplay){
			
			state.LowerControl.HideControls(1000);
		}
    };

    elements.video.ondurationchange = () => {
        console.log('time is being changed');
    }


    elements.video.onerror = (e) => {
        console.log(e);   
    }
    

}
// event funtions will go in below this
window.addEventListener('load' , () => {

    // controlVideoPlayerCreation

    controllVideo();
    DrawControlBar();
    DrawUpperControlDom();
    DrawLowerControlDom();
    ControllSeekBarEvents();
    videoEvents();
        

})

elements.videoContainer.addEventListener('click' , (e) => {
    e.preventDefault();

    if(e.target.matches('#btnBigPlay , .btnBigPlay , .Bigbtnicon')){
        state.DomManuputation.showControl();
        state.DomManuputation.toggleMBwrapper('none' , '.setting_container');
        data.menuOpen = 0;
        data.hide= true;
        data.bookmarkShowStatus = true;
        data.settingShowStatus = true;
        state.LowerControl.HideControls(1000);
        //console.log('wowlw');
       // return;
    }else if(e.target.matches('video')){
        state.DomManuputation.showControl();
        state.DomManuputation.HideControls(3000);

        // close all the menu
         return;
    }else if(e.target.matches(`.${iconsName.FastBackward}-wrapper *`)){
        console.log('test');
        state.LowerControl.onBtnSeekBackClick();
        return;
        //asdas
    }else if(e.target.matches(`.${iconsName.FastForward}-wrapper  *`)){
        console.log('test');
        state.LowerControl.onBtnSeekFwdClick();
        return;
    }else if(e.target.matches('.stickyToggle  *')){

        // using a toggle button to enable and disable toggle feature;
        state.DomManuputation.stickyToggle();

    }else if(e.target.matches(`.${iconsName.CenterPlay}-wrapper *`)){
        // on works if loader is not is screen;
        if(!data.loader){
            state.DomManuputation.onBtnPlayPauseClick();
            
        }
        
        // creating a toggle button for 
        return;
    }else if(e.target.matches(`.${iconsName.CenterPause}-wrapper *`)){
        state.DomManuputation.onBtnPlayPauseClick();
    }else if(e.target.matches('.setting-header *')){

        state.DomManuputation.hideQualityMenu(); 	
        state.DomManuputation.toggleMBwrapper('block'); // block is being passed so that it hide that WBrapper;

    }else if(e.target.matches('.refreshVideo *')){
        state.videoCreate.refreshVideo();
    }
});
/*elements.videoContainer.onmousemove = (e) => {
    state.DomManuputation.showControl();
    state.DomManuputation.toggleMBwrapper('none' , '.setting_container');
    data.menuOpen = 0;
    data.hide= true;
    data.bookmarkShowStatus = true;
    data.settingShowStatus = true;
    state.LowerControl.HideControls(1000);
};

*/
 

