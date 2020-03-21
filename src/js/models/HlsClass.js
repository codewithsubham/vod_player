import {data} from './base';
import {errorCode} from './Error'
import hls from 'hls.js'
import DomChanges from './DomChages';


export default class Hls extends hls{

    constructor(videoid,url){
        data.player = super();
        window.player = data.player;
        this.url = url;
        this.videoid =  videoid;

        console.log(data.player);
        data.player.loadSource(this.url);
        data.player.attachMedia(this.videoid);
       
        data.player.once(Hls.Events.MANIFEST_PARSED, this.onHlsStreamInitialized);
		//data.player.on(Hls.Events.FRAG_BUFFERED, onHlsFragmentLoad);
        player.on(Hls.Events.ERROR, this.onHlsError);
		
    }

    onHlsStreamInitialized(){
	    data.availableQuality = data.player.levels;
    }
    
    onHlsError(event, data){

        let Dom = new DomChanges();
        let errorType = data.type;
        let errorDetails = data.details;
        let errorFatal = data.fatal;
        console.log("HLS Error, Type: "+errorType+" Details: "+errorDetails+" Fatal: "+errorFatal);
        if(errorFatal){
            if(errorCode.Hls[errorType][errorDetails]){
                Dom.ErrorCode(errorCode.Hls[errorType][errorDetails] , 'btnBigPlay' , 'refreshVideo');
            }else{
                Dom.ErrorCode(errorCode.undefined, 'btnBigPlay' , 'refreshBookmark' , 'refreshVideo');
        
            }
        }

}


}