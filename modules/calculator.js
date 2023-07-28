const operatorSet = new Set(['+', '*', '/', '%', '=']);
let screenValue = "";
let flag = 0;
let screen = document.querySelector('#answer')
buttons = document.querySelectorAll('button');


for (item of buttons) {
    item.addEventListener("click", (e) => {
        btnText = e.target.innerText;
        if (operatorSet.has(btnText) && screenValue === "") {
            alert('Start with number');
            
        } else {
            if (btnText == "C") {
                flag = 0;
                screenValue = "";
                screen.value = screenValue;
                
            } else if (btnText == "=") {
                lastChar = screenValue.charAt(screenValue.length - 1);
                if(isNaN(lastChar)) {
                    alert('invalid expression');
                } else {
                    calculatorMachine(); 
                }

            } else if (isNumber(btnText)) {
                if (flag == 1) {
                    screenValue = btnText;
                    flag = 0;
                } else {
                    screenValue += btnText;
                }
                screen.value = screenValue;

            } else {
                lastChar = screenValue.charAt(screenValue.length - 1);
                if(isNaN(lastChar)) {
                    screenValue = screenValue.substring(0, screenValue.length - 1) + btnText;
                } else {
                    flag = 0;
                    screenValue = screen.value + btnText;
                }
                screen.value = screenValue;

            }
        }
    });

}

// -------------------------
function calculatorMachine ( ) {
    if ( screen.value.includes("(") && !isNaN(screen.value.charAt(screen.value.indexOf("(") - 1)) ) {
        screenValue = addStr(screen.value, screen.value.indexOf("("), "*");
        screen.value = eval(screenValue);
    } else {
        screen.value = eval(screenValue);
    }
    flag = 1;
}

// ------------------------- regex -------------------------
function isNumber(char) {
    return /^\d$/.test(char);
}

// -------------------------
function addStr(str, index, stringToAdd) {
    return (
      str.substring(0, index) + stringToAdd + str.substring(index, str.length)
    );
}

// -------------------------  error -------------------------
window.onerror = function () {
    alert("PLEASE INPUT VALID EXPRESSION");
    screenValue = "";
    screen.value = screenValue;
    console.clear();
}

