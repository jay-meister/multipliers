$(document).ready(function(){
  var numberCorrectAns, questionsAnswered;
  var m, n;
  var correctAns, userAns;
  var userTimeLimit = 8;
  var timeoutVariable, chosenValues;


  $("#ingame").hide();

  //if new round button clicked
  $('#but-NewRound').click(newRound);


  //new round function
  function newRound() {
    //clear the previous user answer and response
    $('#response').text("");
    $('#ui-Answer').val("");

    //reset values to starting state
    numberCorrectAns = 0, questionsAnswered = 0;

    //set time-limit for each question. default is 8 seconds
    userTimeLimit = parseInt($('#ui-TimeLimit').val())*1000 || 8000;

    //set chosen values
    chosenValues = $('#ui-Number').val();

    //if input isnt digits with optional commas then we complain
    if(!chosenValues.match(/^((\d+),?)*$/)){ 
      alert("Invalid numbers chosen.");
      $('#ui-Number').val("");
      return;
    }
    //if field is empty or set to 0
    else if(chosenValues === ""){ 
      chosenValues = 0;
    }   
    //if there is only one number entered, launch game
    else if(chosenValues.match(/^\d+$/)){
      chosenValues = parseInt(chosenValues);
    }
    //if there is a range of numbers, split into array and lauch
    else {
      chosenValues = chosenValues.split(",");
    }

//this needs sorting
//
    setTimeout(newQuestion, 3000);

    $("#pregame").hide(1000);
    $("#ingame").show(1000);
  }


  function newQuestion() {
    window.clearTimeout(timeoutVariable);
    
//NOT WORKING AUTO FOCUS ON USER ANS FIELD    
    $('#ui-Answer').focus();

    //choose a question
    //if not an array  
    if(typeof chosenValues === "number"){
      m = chosenValues || Math.ceil(Math.random() * 10) + 3;
    }
    else {
      m = chosenValues[Math.floor(Math.random()*chosenValues.length)];
    }
    n = Math.ceil(Math.random() * 10) + 3;

    correctAns = m * n;
    $('#question').text(questionsAnswered+1 + "...  " + m + " x " + n + " = ");
    
    //user has usertimelimit or 8 seconds until checkans is searched
    timeoutVariable = setTimeout(checkAns, userTimeLimit);
    
  }

  function checkAns() {
    window.clearTimeout(timeoutVariable);

    userAns = parseInt($('#ui-Answer').val());
    if (userAns == correctAns) {
      $('#response').text("Correct!");
      numberCorrectAns++;
    } else {
      $('#response').text("Unlucky!");
    }

    $('#ui-Answer').val("");//remove previous answer answer
    
    questionsAnswered++;
    
    if (questionsAnswered === 20) {
      $("#ingame").hide();
      alert("Score: " + numberCorrectAns + "/20 with time limit of " + userTimeLimit/1000 + " seconds.");
      $("#pregame").show(1000);

    } else {
      newQuestion();
    }    
  }

  //if the user presses enter check ans;
  $('#ui-Answer').keypress(function(e){
    if(e.which == 13){//Enter key pressed
      checkAns();//Trigger checkans
    }
  });





});



/*

var numberCorrectAns, questionsAnswered;
var m, n;
var correctAns, userAns;
var chosenValue, chosenValueElement = document.getElementById("chosenValue");
var userAnsElement = document.getElementById("userAns");
var userTimeLimit = 8, userTimeLimitElement = document.getElementById("userTimeLimit");


userAnsElement.addEventListener("keydown", function(e) {
  if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
          checkAns();
  }
});

      function newRound() {
        document.getElementById("response").innerHTML = "";
        document.getElementById("userAns").value = "";
        numberCorrectAns = 0, questionsAnswered = 0;
        userTimeLimit = userTimeLimitElement.value*1000 || 8000;
        chosenValue = chosenValueElement.value || null;
        newQuestion();
        checkFinished();
      }

      function checkFinished() {
        if (questionsAnswered < 20) {
          setTimeout(checkFinished, 100);
          return;
        }
        if (questionsAnswered === 20) {
          alert("Score: " + numberCorrectAns + "/20 with time limit of " + userTimeLimit/1000 + " seconds.");
          questionsAnswered++;
        }
      }

      function newQuestion() {
        window.clearTimeout(timeoutVariable);
        
        m = chosenValue || Math.ceil(Math.random() * 10) + 3;
        n = Math.ceil(Math.random() * 10) + 3;

        correctAns = m * n;
        document.getElementById("question").innerHTML = questionsAnswered+1 + ".  " + m + " x " + n + " = ";
        if (questionsAnswered < 20) {
          timeoutVariable = setTimeout(checkAns, userTimeLimit);
        }
      }

      function checkAns() {
        userAns = document.getElementById("userAns").value;
        if (userAns == correctAns) {
          document.getElementById("response").innerHTML = "Correct!";
          numberCorrectAns++;

        } else {
          document.getElementById("response").innerHTML = " Aahhhhhh craps!";
        }
        document.getElementById("userAns").value = "";
        questionsAnswered++;
        newQuestion();
      }
*/