const socket = io.connect(window.location.host);
const message = document.querySelector('#message');
const send = document.querySelector('#send');
const chatContianer = document.querySelector('.chat_conatiner');
const clear = document.querySelector('#clear');
const chathistory = document.querySelector('.sendtimeandquestion');
const cleartime = document.querySelector('.clearTime');
let params = new URLSearchParams(location.search);
let timer; // holder of setinterval function;

let onScreenTimerValue = 20000;

const globaldata = {

        'Textbox':'',
        'Senttext':''
        

}
//const classname = params.get('classname') ;


//Dom realated work
 
const radioDisabled = (status) => {

    if(status){

        return 'disabled';
    }

}


 const RenderClassname = (object) => {
        console.log(object);
        const markup = `
            <label for='${object.id}' class="coontent__listcontainer--classname">
                <label class='status' for='${object.id}'>${(object.username)}</label>  
                 <label class='status' for='${object.id}'>${(object.status) ? 'Live' : 'Available'}</label>  
                 <div class='label-conatiner'>
                  <label for='${object.id}' class="classname_name">${object.classname}</label>
                  <input type="radio" name="class"  id='${object.id}'  value='${object.classname}' data-id="${object.id}"  data-mappedname='${object.maped_name}'${radioDisabled(object.status)}>
                
                 </div>
                  
            </label>
        `;
        document.querySelector('.content__listcointainer-box').insertAdjacentHTML('afterbegin' , markup);
    
 }; 


var classname = '';



window.addEventListener('load' , async () => {

    const useralreadylive = await ajax('/getuserstatus' , 'GET');
    

    if(useralreadylive.length == 1){

        classname = useralreadylive[0].classname;
        document.querySelector('.list__content').style.display = 'none';
        ioSocket();
        chatUpdateDetails(useralreadylive[0].classname , useralreadylive[0].maped_name);
        document.querySelector('.name_id').value =  useralreadylive[0].id;
        

    }else{

        const result = await ajax('/get' , 'GET');
        result.forEach(RenderClassname);
        document.querySelector('.list__content').style.display = 'flex';
        document.querySelector('.content').style.display = 'none';
   

    };



});




// ajax call using fetch function;
const ajax = async (url , type , data='') => {
    
   if(type != 'GET'){

         var option = {
            method:type,
            headers:{
                'Content-Type':'application/json'
            } ,
        body:JSON.stringify(data)  

            
    }
   }
    
    const response = await fetch(url , option);
    const result = await response.json(); 

    return result;
}




// socket releated work



document.querySelector('.select').addEventListener('click' , async () => {
    
    try {
        classname =  document.querySelector('input[name="class"]:checked').value;
        mapedname =  document.querySelector('input[name="class"]:checked').dataset.mappedname;
        id = document.querySelector('input[name="class"]:checked').dataset.id;
        document.querySelector('.name_id').value =  id;
      
    } catch (error) {
        alert('Please select a class');
        return;
    }
   

   console.log(await ajax('/get' , 'POST' , {class:classname , mapedname:mapedname , id:id}));
   document.querySelector('.list__content').style.display = 'none';
   document.querySelector('.content').style.display = 'flex';
   
   ioSocket();
   chatUpdateDetails(classname , mapedname);

    
});



// custom function

const chatUpdateDetails = (domClassname , mapedname) => {

    // select the dom 
    domClassname = document.querySelector('.classname-text').innerHTML = domClassname;
    mappedName = document.querySelector('.mapedname').innerHTML = mapedname;




}
const clearTime = () => {

    if(globaldata.Textbox != '' ){
        const today = new Date();
        const time = `${today.getHours()}:${today.getMinutes()}` ;
        document.querySelector('.clearedtime').innerHTML = time;
         globaldata.Textbox = '';
        }
     clearInterval(timer);
            

}

const ioSocket = () => {

        send.addEventListener('click' , () => {
            
            sendChat();
            ClearTimer(onScreenTimerValue);

        });

        document.addEventListener('keypress', (e) => {
            if(e.keyCode == '13'){
                sendChat();
                ClearTimer(onScreenTimerValue);
            }
        });

        clear.addEventListener('click' , () => {
            socket.emit(classname, {

                message:'' ,
                test:'chat'

                });
                clearTime();
                clearInterval(timer);
        })

        const sendChat = () => {
            if(message.value != ''){
               // console.log(globaldata.Textbox);
              //  if(globaldata.Senttext != message.value.trim()){
                   globaldata.Textbox = message.value.trim(); 
                    socket.emit(classname, {
                    
                        message:message.value ,
                        test:'chat'
                
                    });
                //}
                globaldata.Senttext = message.value.trim();

            }
        }   

        const ClearTimer = (seconds) => {
            timer = setInterval(() => {
                socket.emit(classname, {
                    message:'' ,
                    test:'chat'
            });
                    clearTime();
            } , seconds);    

        }

        socket.on(classname, (data) => {
            
            const today = new Date();
            const time = `${today.getHours()}:${today.getMinutes()}` ;
            //console.log(time);


            if(data.message != ''){
                chatContianer.innerHTML = `<span class='question'>Curently showing Question </span>: ${data.message}`;
                
                const newdiv = document.createElement('div');
                newdiv.className= 'hist_cont';
                const timespan = document.createElement('span');
                timespan.className = 'time';
                const question = document.createElement('span');
                question.className = 'questions';
                const clearedtime = document.createElement('span');
                clearedtime.className = 'clearedtime';

                newdiv.appendChild(timespan);
                newdiv.appendChild(question);
                newdiv.appendChild(clearedtime);

                chathistory.insertAdjacentElement('afterbegin' , newdiv);    
                /*chathistory.insertAdjacentHTML('beforeend' , ` <div class="hist_cont"> 
                    <span class='time'>  ${TimeFormatter(time)}</span>
                    <span class="question">${data.message} ?</span> 
                </div>`);

                */

                document.querySelector('.time').innerHTML =time;
                document.querySelector('.questions').innerHTML = data.message.replace(/\s\s+/g, ' ') + ' ?';
                

            }else{

                chatContianer.innerHTML = '';

            }
        
        });

}




// time formatter function 


  
const TimeFormatter = (times) =>{
      
    let time = times.split(':');
    
  
    const hrs  = (time[0] % 12 > 0) ? `${((time[0] % 12) < 10) ? `0${time[0] % 12}` : `${time[0]}` }` : `${time[0]}`; 
  //  const hrs =  (time[0] % 12 > 0) ? `${((time[0] % 12) < 10) ? `0${(time[0] % 12)}`:`${time[0] % 12}`}`:`${(time[0] < 10) ? `0${(time[0] % 12)}`:`${(time[0] < 10)}`}`;
    const min =  (time[1] > 10) ? `${time[0]}` : `0${time[0]}`;
   
    if(time[0] >= 12){

        return `${hrs}:${min} Pm`;

    }else{

        return `${hrs}:${min} Am`;

    }
   
    
}



document.querySelector('#timer').addEventListener('change' , (e) => {
    if(document.querySelector('#timer').value > 45){
        document.querySelector('#timer').value = 45;
        onScreenTimerValue = 45 * 1000;
        
    }else if(document.querySelector('#timer').value < 10){
        document.querySelector('#timer').value = 10;
        onScreenTimerValue = 10 * 1000;
    }
    onScreenTimerValue =  document.querySelector('#timer').value * 1000;
    
  //  clearInterval(timer);
})