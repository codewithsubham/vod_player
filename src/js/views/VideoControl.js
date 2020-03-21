import {elements} from './dom';
import { data } from '../models/base';

export default class DrawControls{

    constructor(playercontainer){

        this.container = playercontainer;
        this.drawSettingcontainer();
        this.drawcontrolBar();
        this.controlsUpper();
        this.drawToolTip();
        this.controlsLower();
       
    }

    drawSettingcontainer(){

        /**
         * @desc this function draws a container
         * which holds all the settings elements
         */
		
        const settingcontainer = document.createElement('div');
            settingcontainer.className = 'setting_container';
     
            // adding a selector for settingcontainer name settingContainer
            elements.settingContainer = settingcontainer;
            elements.videoContainer.appendChild(settingcontainer);
                
            const MBwrapper = document.createElement('div');
            MBwrapper.id = 'MBwrapper'; // MObile Button Wrapper
            MBwrapper.className = 'MBwrapper';
             
            // adding a selector for settingcontainer name settingContainer
            elements.MBwrapper = MBwrapper;
            settingcontainer.appendChild(MBwrapper);

        
        
             
    }

    drawcontrolBar(){
        
        
        this.controlBar = document.createElement("div");
	    this.controlBar.id = "controls";
        this.controlBar.classList.add("controls");
        this.container.appendChild(this.controlBar);
        elements.controlContainer = this.controlBar; 
    }

    controlsUpper(){

        // this function draws the upper controlbar
        this.controlsUpper = document.createElement("div");
        this.controlsUpper.id = "controlsUpper";
        this.controlsUpper.classList.add("controlsUpper");
        this.controlBar.appendChild(this.controlsUpper)

        // setting up the ccontrolsUpper element of elements object
        elements.controlsUpper = this.controlsUpper;
    }

    controlsLower(){
        // this function draws the lower comtrolbar
        let  controlsLower = document.createElement("div");
            controlsLower.id = "controlsLower";
            controlsLower.classList.add("controlsLower");
            elements.controlContainer.appendChild(controlsLower);

            elements.controlsLower = controlsLower;
            
	
    }

   

    drawToolTip(){
        // this function tooltip
        if(data.mobileAndTabletcheck){
            return
        }
        elements.seektimePreview = document.createElement("span");
        elements.seektimePreview.id = "seektimePreview";
        elements.seektimePreview.classList.add("seektimePreview");
        elements.seektimePreview.classList.add("hide");
        elements.seektimePreview.innerHTML="00:00:00";
        document.getElementById("controlsUpper").appendChild(elements.seektimePreview);
    }

  

}