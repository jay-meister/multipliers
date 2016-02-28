var stats = {
    "1": {
        "time": 0,
        "asked": 0,
        "correct": 0
    },
    "2": {
        "time": 0,
        "asked": 0,
        "correct": 0
    },
    "3": {
        "time": 0,
        "asked": 0,
        "correct": 0
    },
    "4": {
        "time": 0,
        "asked": 0,
        "correct": 0
    },
    "5": {
        "time": 0,
        "asked": 0,
        "correct": 0
    },
    "6": {
        "time": 0,
        "asked": 0,
        "correct": 0
    }
};
var counter;
// updateStorage(stats);
document.getElementById('submit').addEventListener('click',function(e){
    e.preventDefault();
});


function startGame(){
    // get stats
    var stats = getStats();
    // change screen & display countdown timer
    // run listeners
    // get usrChoice and options from settings
    var options = { timeLimit: 6000 };
    // build questions.
    var questions = buildQuestions([2],[1,2,3,4,5,6],5);
    // ask questions
    askQuestions( questions, options, stats );
    // deal with answer
    // update stats
}


function askQuestions( questions, options, stats ){

    document.getElementById('submit').addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        window.clearTimeout(timeout);
        checkAns();
    });

    var noOfQuestions = questions.length, time = options.timeLimit, currQuestion;
    var domQu = document.getElementById( 'question' );
    var domAns = document.getElementById( 'userAnswer' );
    var timeout, correct;
    var timeOfQuestion, ansLength;
    counter = 0;


    nextQuestion();

    function nextQuestion(){
        // console.log('counter at beginning of question :::::: ' + counter);
        currQuestion = questions[counter];
        domQu.innerHTML = currQuestion[0] + ' x ' + currQuestion[1] + ' = ';
        timeout = setTimeout( checkAns , time);
        timeOfQuestion = Date.now();
        console.log(timeOfQuestion);
    }

    function checkAns(){
        clearTimeout(timeout);
        ansLength = Date.now() - timeOfQuestion;
        if( domAns.value === currQuestion[2].toString() ){
            correct = true;
            console.log('correct: ' + currQuestion);
        } else {
            correct = false;
            console.log('incorrect : ' + currQuestion);
            console.log('ans given: ' + domAns.value );
        }
        domQu.innerHTML = '';
        domAns.value = '';
        counter++;

        //adapt statistics
        ammendStats();

        if( counter < noOfQuestions){
            console.log('asking another question...');
            nextQuestion();
        } else {
            console.log('Game finished');
            console.log(stats);
            updateStorage(stats);
            // setTimeout(location.reload, 10000);
        }
    }

    function ammendStats(){
        //questions asked:
        stats[currQuestion[0]].asked++;
        stats[currQuestion[1]].asked++;
        //questions correct:
        if( correct ){
            stats[currQuestion[0]].correct++;
            stats[currQuestion[1]].correct++;
            stats[currQuestion[0]].time += ansLength;
            stats[currQuestion[1]].time += ansLength;
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
function updateStorage(stats){
    localStorage[ "stats" ] = JSON.stringify(stats);
    logStats(stats);
    // console.log(JSON.parse(localStorage["stats"]));
}

function getStats(){
    console.log('GETTING STATS FROM STORAGE::');
    console.log(JSON.parse( localStorage[ "stats" ] ));
    return JSON.parse( localStorage[ "stats" ] );
}

function logStats(stats){
    for(var i = 1; i< 7; i++){
        var avgTime = Math.floor( stats[i]["time"] / stats[i]["correct"] ) / 1000;
        console.log('Average time to answer: ' + i + ' --> ' + avgTime + ' seconds');
    }
}
