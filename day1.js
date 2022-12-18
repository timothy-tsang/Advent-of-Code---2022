const utilities = require("./utilities");

async function solveDayOneQuestion(question) {
    try {
        const calarieData = await utilities.readTextInput("inputs/day1_input.txt");
        
        if (calarieData.length < 1) {
            console.error("Error: was not able to parse the input file");
        }

        if (question === 1) {
            parseTextInputForQuestion1(calarieData);
        } else if (question === 2) {
            parseTextInputForQuestion2(calarieData);
        }
    }
    catch (err) {
        console.error(err);
    }
}

////////////////
// Question 1 //
////////////////
function parseTextInputForQuestion1(calarieData) {
    // Objective: save the top elf (position and calarie count)

    // Split data into an array by newline
    // Go through array, keep adding number until a "" is found
    // Save as maxValue variable (if greater than previous)
    let maxCalarieCount = 0;
    let maxCalarieElfPosition = 0;

    let elfPosition = 1;
    let currentElfCalarieCount = 0;
    const calarieArray = calarieData.split("\n");

    // Note: for...of gives you the actual value, whereas for...in gives you the index
    for (const calarie of calarieArray) {

        if (calarie !== "") {
            currentElfCalarieCount += parseInt(calarie);
        } else {
            // If greater, save as max values
            if (currentElfCalarieCount > maxCalarieCount) {
                maxCalarieCount = currentElfCalarieCount;
                maxCalarieElfPosition = elfPosition;
            }

            // Reset
            elfPosition++;
            currentElfCalarieCount = 0;
        }
    }

    console.log(`The elf with the most calaries was Elf ${maxCalarieElfPosition}, with ${maxCalarieCount} calaries`);
}

////////////////
// Question 2 //
////////////////
function parseTextInputForQuestion2(calarieData) {
    // Objective: save the top three elves calarie count, output the total sum calarie count

    // Populate a sum array. Afterwards, sort it, and find the top 3
    const calarieArray = calarieData.split("\n");

    let calarieSumArray = [];
    let currentElfCalarieCount = 0;

    for (const calarie of calarieArray) {
        if (calarie !== "") {
            currentElfCalarieCount += parseInt(calarie);
        } else {
            // Add to calarie sum array
            calarieSumArray.push(currentElfCalarieCount);

            // Reset
            currentElfCalarieCount = 0;
        }
    }

    // Sort array, can use built-in JS sort function
    calarieSumArray.sort((a, b) => { return a-b; }); // By default, in ASC order
    calarieSumArray.reverse();

    const topThreeSum = calarieSumArray[0] + calarieSumArray[1] + calarieSumArray[2];
    console.log(`The top three calarie count is ${topThreeSum} calaries.`);
}

solveDayOneQuestion(1);
solveDayOneQuestion(2);
