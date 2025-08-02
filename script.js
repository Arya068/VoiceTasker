const taskList = [];
const listElement = document.getElementById("taskList");
const statusText = document.getElementById("status");

//Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition =new SpeechRecognition();
recognition.continuous= false;
recognition.lang = 'en-US';

recognition.onresult = (event) =>{
        const transcript=event.results[0][0].transcript.toLowerCase();
        statusText.innerText=`Heard:"${transcript}"`; //User(interpretation)
        if(transcript.startsWith("naya task")){ 
            const taskText=transcript.replace("naya task","").trim();
            if(taskText)
               addTask(taskText);
        } 
        else if(transcript.startsWith("delete task")){
            const num=parseInt(transcript.split(" ")[2])-1;
            if(!isNaN(num))
               deleteTask(num);
        }
        else if(transcript.startsWith("mark task")){
            const num=parseInt(transcript.split(" ")[2])-1;
            if(!isNaN(num))
              markTask(num);
        }
     }

     function addTask(task){
           taskList.push({text:task,done:false});
           renderTasks();
     }

     function deleteTask(num){
        if(taskList[num]){
            taskList.splice(num,1);
            renderTasks();
        }
     }

     function markTaskDone(num){
        if(taskList[num]){
           taskList[num].done=true;
           renderTasks();
}
 }

    function renderTasks(){
        listElement.innerHTML="";
        taskList.forEach((task,index)=>{
            const li=document.createElement("li");
            li.innerText=`${index + 1}. ${task.text} ${task.done ? "✅" : ""}`;
            listElement.appendChild(li);
        });
   }


    function startVoice() {
        statusText.innerText="Listening...";
        recognition.start();
    }

 document.getElementById("startBtn").addEventListener("click",startVoice);


    

