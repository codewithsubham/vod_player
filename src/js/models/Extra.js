import {data} from './base'
import {elements} from '../views/dom'

export default class Extra{
    
    constructor(){

        // let see what we can do with it in future
    }

    convertToTimecode(d){

    /**
     * @desc this functiom takes time in seconds and return in h:m:s format
     */

        let sign = "";
        if(d<0)
        {
            d = d * (-1);
            sign = "-";
        }
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);

        h = (h<10 && h>0) ? `0${h}`: `` ;
        

        if(m<10) m = "0"+m;
        if(s<10) s = "0"+s;
        if(h){
            return(sign+h+":"+m+":"+s);
    
        }else{
            return(sign+m+":"+s);
      
        }
    }


    VideoDuration(){
        if(conf.link.hls){
            return data.player.media.duration;
        }else if(conf.link.dash){
            return elements.video.duration;
        }
    
    }


    
}