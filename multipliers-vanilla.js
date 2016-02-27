var stats = [];

function startGame(){
    // change screen & display countdown timer
    // run listeners
    // get usrChoice and options from settings
    var options = { timeLimit: 8 };
    // build questions.
    var questions = buildQuestions([6],[13],10);
    // ask questions
    askQuestions( questions, options );
    // deal with answer
    // update stats

}

function askQuestions( questions, options ){
    var domQu = document.getElementById( 'question' );
    questions.forEach( function( qu ){
        domQu.innerHTML = qu[0] + ' x ' + qu[1] + ' = ';
        console.log(qu[0] + ' x ' + qu[1] + ' = ');
        return 2;
    });
    console.log(questions);
}

// function printQuestion( str, )



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
