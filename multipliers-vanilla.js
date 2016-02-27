var stats = [];

function startGame(){
    // change screen & display countdown timer
    // run listeners
    // get usrChoice and options from settings
    var options = { timeLimit: 4000 };
    // build questions.
    var questions = buildQuestions([6,7,8],[4,5,6,7],5);
    // ask questions
    askQuestions( questions, options );
    // deal with answer
    // update stats

}

function askQuestions( questions, options ){
    var counter = 0, noOfQuestions = questions.length, time = options.timeLimit, currQuestion;
    var domQu = document.getElementById( 'question' );
    var domAns = document.getElementById( 'userAnswer' );
    nextQuestion();

    function nextQuestion(){
        currQuestion = questions[counter];
        domQu.innerHTML = currQuestion[0] + ' x ' + currQuestion[1] + ' = ';
        setTimeout( checkAns , time);
    }

    function checkAns(){
        console.log(domAns.value);
        if( domAns.value === currQuestion[2].toString() ){
            console.log('correct');
        } else {
            console.log('incorrect');
        }
        counter++;
        domQu.innerHTML = '';
        domAns.value = '';
        if( counter < noOfQuestions){
            setTimeout(nextQuestion , 500);
        } else {
            console.log('Game finished');
        }
    }

}




function buildQuestions(usrChoice, usrRange, noQuestions) {
    var questions = [], lastQuestion = 0, sol, usrChoiceNum, usrRangeNum;

    for(var i = 0; i < noQuestions; i++){
        usrChoiceNum = usrChoice[ Math.floor( Math.random() * usrChoice.length ) ];
        usrRangeNum  = usrRange[ Math.floor( Math.random() * usrRange.length ) ];

        //reduce chance of repeated question.
        if( usrRangeNum === lastQuestion ){
            usrRangeNum = usrRange[ Math.floor( Math.random() * usrRange.length ) ];
        }
        lastQuestion = usrRangeNum;

        sol = usrChoiceNum * usrRangeNum;

        //ensure questions are stored in random order.
        if( Math.floor( Math.random() * 2 ) ){
            questions.push( [ usrChoiceNum, usrRangeNum, sol ] );
        } else {
            questions.push( [ usrRangeNum, usrChoiceNum, sol ] );
        }
    }
    console.log(questions);
    return questions;
}
