export const elements = {
    videoContainer:document.querySelector('#playerContainer'),  
    video:document.querySelector('#videoPlayer'),
    seekbar:undefined ,// this is set from videoControllclass usinf method drawSlider,
    seektimePreview:undefined , // this is set from videoControllclass using method drawToolTip,
    controlContainer:undefined ,// this is set from videoControllclass using method drawToolTip
    bufferProgress:undefined , // this is set from UpperControllclass using method DrawProgressBar
    playbackProgress:undefined ,// this is set from  UppperConTrollClass using method DrawProgressBar
    controlContainer:undefined , // this is set from VideoControlClass using method drawcontrolBar
    controlsUpper:undefined ,// this is set from videoControlClass using method controlsUppers
    controlsLower:undefined , // this is set from videoControlClass using method controlsLower
    controlsLowerChild1:undefined , // this is set from LowreControlClass using method DrawLowerControlChildHolder
    controlsLowerChild2:undefined , // this is set from LowerControlClass using method DrawLowerControlChildHolder
    volSeekbar:undefined , // this is set from LowerControlClass using method DrawLowerControlChildHolder
    volSeekRange:undefined , // this is set from LowerControlClass using method DrawVolumeSlider
    'volume-wrapper':undefined, // this is set from LowerControlClass using method addControlDiv,
    settingContainer:undefined, // this is set from LowerControlClass using method drawSettingContainer
    MBwrapper:undefined, // this is set from drawSettingcontainer using method drawSettingContainer
    qualitySelectorMenu:undefined ,// this is set frim LowerControlClass using method createQualityMenu
    btnQualitySelector:undefined,
    btnFullscreen:undefined , //this is set from LowerControlClass using method DrawLowerControlChildHolder
    parentWrapper:document.getElementById('playerContainers'),
    btnPlayPause:undefined , //this is set from LowerControlClass using method DrawLowerControlChildHolder
    volSeekRange:undefined , // this is set from LowerConTrolClass using method drawSettngchild
    playbackProgress:undefined , // this is set from UpperControl using mehod DrawProgressBar
    btnBigPlay:undefined , // this is set frim UpperControk using method drawBigPlayButton
    Bigbtnicon:undefined , // this is set from UpperControl using method DrawBigPlayButton
    VideoType:undefined , // this is set from LowerControl using methid DrawSettingController
    playBackMenuList:undefined
}