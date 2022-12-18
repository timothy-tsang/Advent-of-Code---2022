const utilities = require("./utilities");

async function solveDayTwoQuestion(question) {
    try {
        const data = await utilities.readTextInput("inputs/day2_input.txt");

        if (question === 1) {
            calculateScore_1(data);
        } else if (question === 2) {
            calculateScore_2(data);
        }    
    } catch (err) {
        console.error(err);
    }
}

////////////////
// Question 1 //
////////////////

/*
Inputs:
    1st column: what your opponent will play
        A = Rock
        B = Paper
        C = Scissors
    2nd column: what you should play in response 
        X = Rock
        Y = Paper
        Z = Scissors

Winner of the whole tournament is the player with the highest score

Points for shapes:
    - 1 for Rock
    - 2 for Paper
    - 3 for Scissors

Points for outcome of the round:
    - 0 if lost
    - 3 if draw (both players choose same hand)
    - 6 if won

*/

function determinePointsForShape(letter) {
    switch (letter) {
        case "A", "X":
            return 1;
        case "B", "Y":
            return 2;
        case "C", "Z":
            return 3;
        default:
            return 0;
    }
}

function determineWinner_1(player1, player2) {
    // Return points
    if (!player1 || !player2) {
        return 0;
    }

    // TIM TODO - Refactor later
    if (player1 === "A") {
        if (player2 === "X") {
            return 3;
        } else if (player2 === "Y") {
            return 6;
        } else if (player2 === "Z") {
            return 0;
        }
    }

    if (player1 === "B") {
        if (player2 === "X") {
            return 0;
        } else if (player2 === "Y") {
            return 3;
        } else if (player2 === "Z") {
            return 6;
        }
    }

    if (player1 === "C") {
        if (player2 === "X") {
            return 6;
        } else if (player2 === "Y") {
            return 0;
        } else if (player2 === "Z") {
            return 3;
        }
    }
}

function calculateScore_1(gameData) {
    const hands = gameData.split("\n");
    let points = 0;

    for (const hand of hands) {
        const playerOneHand = hand.substring(0,1);
        const playerTwoHand = hand.substring(2,3);

        // Determine points for the shape of the hand
        const pointsForShape = determinePointsForShape(playerTwoHand);

        // Determine who wins the hand 
        const pointsForTheHand = determineWinner_1(playerOneHand, playerTwoHand);

        points += pointsForShape + pointsForTheHand;
    }
    console.log(`The total score would be ${points}.`);
}


////////////////
// Question 2 //
////////////////

/*
Inputs:
    1st column: what your opponent will play
        A = Rock
        B = Paper
        C = Scissors
    2nd column: how the round needs to end 
        X = Player1 wins, Player2 loses
        Y = Draw
        Z = Player1 loses, Player2 wins

Winner of the whole tournament is the player with the highest score

Points for shapes:
    - 1 for Rock
    - 2 for Paper
    - 3 for Scissors

Points for outcome of the round:
    - 0 if lost
    - 3 if draw (both players choose same hand)
    - 6 if won

*/

function determinePlayerTwoHand(playerOneHand, handResult) {
    // TIM TODO - Refactor later
    if (playerOneHand === "A") {
        if (handResult === "X") {
            return "Z";
        } else if (handResult === "Y") {
            return "X";
        } else if (handResult === "Z") {
            return "Y";
        }
    } else if (playerOneHand === "B") {
        if (handResult === "X") {
            return "X";
        } else if (handResult === "Y") {
            return "Y";
        } else if (handResult === "Z") {
            return "Z";
        }

    } else if (playerOneHand === "C") {
        if (handResult === "X") {
            return "Y";
        } else if (handResult === "Y") {
            return "Z";
        } else if (handResult === "Z") {
            return "X";
        }
    }
}

function determineHandResult(handResult) {
    if (handResult === "X") {
        return 0;
    } else if (handResult === "Y") {
        return 3;
    } else if (handResult === "Z") {
        return 6;
    }
    return 0;
}

function calculateScore_2(gameData) {
    const hands = gameData.split("\n");
    let points = 0;

    for (const hand of hands) {
        const playerOneHand = hand.substring(0,1);
        const handResult = hand.substring(2,3);

        // Determine what the hand of player2 would be, given the result
        const playerTwoHand = determinePlayerTwoHand(playerOneHand, handResult);

        // Determine points for the shape of the hand
        const pointsForShape = determinePointsForShape(playerTwoHand);

        // Determine the points for the hand results
        const pointsForTheHand = determineHandResult(handResult);

        points += pointsForShape + pointsForTheHand;
    }
    console.log(`The total score would be ${points}.`);
}

solveDayTwoQuestion(1);
solveDayTwoQuestion(2);