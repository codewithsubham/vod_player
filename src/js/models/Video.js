import {elements} from '../views/dom';
import {data} from './base';

export default class Video{

    constructor(playerCont , id , classname){
        this.playerCont = playerCont;
        this.id = id;
        this.classname =  classname;

    }


    CreatevideoPlayer(){
        
        const video = document.createElement('video');
        video.id = this.id;
        video.className = this.classname;
        this.playerCont.appendChild(video);
        elements.video = video;
        this.setPoster();

        window.video = video;
      

    }


    setPoster()
    {
        if(data.poster){
            elements.video.poster = data.poster;

        }
    }


    refreshVideo(){
        location.reload();
    }
    
}