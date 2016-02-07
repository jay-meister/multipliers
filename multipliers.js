$(document).ready(function(){
  var numberCorrectAns, questionsAnswered;
  var m, n;
  var correctAns, userAns;
  var userTimeLimit = 8;
  var timeoutVariable, chosenValues;
  var gameOver = true;
  var countdown = 3;


  $("#ingame").hide();

  //if new round button clicked
  $('#but-NewRound').click(newRound);



  //if the user presses enter check ans;
  $('#ui-Answer').keypress(function(e){
    if(e.which == 13){//Enter key pressed
      checkAns();//Trigger checkans
    }
  });

  $('#exit-container').click(exitGame);


  //new round function
  function newRound() {
    gameOver = false;
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


    $("#pregame").hide();
    $("#ingame").show(900);

    //sets the countdown before first question
    var countdownInterval = setInterval(function(){

      $('#question-number').text(countdown);
      $('#question-number').fadeIn(300);
      $('#question-number').fadeOut(700);
      countdown--;
      if(countdown === -1 ){ 
        countdown = 3;
        clearInterval(countdownInterval); 
      }
    },1000);
    setTimeout(newQuestion, 5000);
  }


  function newQuestion() {
    if(gameOver){ return; }
    $('#question').hide();

    window.clearTimeout(timeoutVariable);
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
    $('#question-number').text(questionsAnswered+1+".");
    $('#question').text( m + " x " + n + " = ");
    
    $('#question-number').fadeIn(200);
    $('#question').fadeIn(200);
    
    
    //user has usertimelimit or 8 seconds until checkans is searched
    timeoutVariable = setTimeout(checkAns, userTimeLimit);
    
  }

  function checkAns() {
    //must also deal with 20 questions
    
    window.clearTimeout(timeoutVariable);
    userAns = parseInt($('#ui-Answer').val());
    questionsAnswered++;
    if (userAns == correctAns) {
      $("#question").css("color", "green");
      numberCorrectAns++;
       $('#question').fadeOut(1000,function(){
        $("#question").css("color", "black");
        $('#ui-Answer').val("");//remove previous answer answer
        if (questionsAnswered <= 20) { newQuestion(); }
       });
    } else {
      $("#question").css("color", "red");
      $('#question').fadeOut(1000,function(){
        $("#question").css("color", "black");
        $('#ui-Answer').val("");//remove previous answer answer
        if (questionsAnswered <= 20) { newQuestion(); }
       });
    }

    if (questionsAnswered === 20) {
      alert("Score: " + numberCorrectAns + "/20 with time limit of " + userTimeLimit/1000 + " seconds.");
      exitGame();
    }

  }

  function exitGame(){
    gameOver = true;
    window.clearTimeout(timeoutVariable);
    $("#ingame").hide();
    $("#pregame").show(1000);
    $('#question').text("");
    $('#question-number').text("");



  }



});
