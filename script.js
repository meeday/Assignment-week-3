var length;
var randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

//Generator functions to create the criteria arrays - http://www.net-comber.com/charset.html

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  var symbols = '!@#$%^&*(){}[]=<>/,.|¬`£?';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
//console.log(getRandomLower(), getRandomNumber(), getRandomSymbol(), getRandomUpper());

// attach an event listener to the button with id="generate"
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", writePassword);

//function to obtain the users password preferences
function writePassword() {
  length = parseInt(prompt("How long would you like your password to be? Choose between 8 and 128"));
  //console.log(length);
  if (!length || length < 8 || length > 128) {
    alert("Please Insert value! Must be between 8 and 128")
    length = parseInt(prompt("How long would you like your password to be? Choose between 8 and 128"));

  }
  if (length < 8 || length > 128) {
    alert("value does not meet criteria! Start Again")
    return;

  }
  if (length > 8 || length < 128) {
    var hasLower = confirm("Should password have lowercase letters?");
    var hasUpper = confirm("Should password have uppercase letters?");
    var hasNumber = confirm("Should password have numbers?");
    var hasSymbol = confirm("Should password have symbols?");

    // feed the length and preferences boolean value into the generate password function
    generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
  }
};

//function to generate password using the preferences that were confirmed above
function generatePassword(lower, upper, number, symbol, length) {
  // initialise the variable generatedPassword and set it to an empty string
  let generatedPassword = '';
  // create constant for the number of preference types and set parameters 
  const typesCount = lower + upper + number + symbol;

  //console.log('typesCount: ', typesCount);
  // braces added to convert parameters into properties and used the filter method to filter out preferences with a boolean value of false
  const typesArr = [{
    lower
  }, {
    upper
  }, {
    number
  }, {
    symbol
  }].filter(
    item => Object.values(item)[0]
  );
  //console.log('typesArr: ', typesArr);
  // If loop to make sure user chooses a preference. if condition is met an alert is shown the return will force the user to press the generate button to start again
  if (typesCount === 0) {
    alert("No Criteria Selected. Please Confirm At least One!");
    return;
  }
  // for function sets a variable i that is less than the length. addition assignment increments i by the number of typescount. 
  //loop through typeArr
  // create funcname variable and set to the randomFunc object keys that we set at the beginning.
  //when we pass through type it will give us the first value of the object keys.
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      // then we pass this into the generatedPassword variable to get a password string
      generatedPassword += randomFunc[funcName]();
      //console.log('funcName: ', funcName);
    });
  }
  // initialised an empty array called password 
  var password = [];
  // the generated password was only returning the first 4 values of the string so I used slice method to return a section of the string equal to the variable length
  var finalpassword = generatedPassword.slice(0, length);
  //console.log(finalpassword);
  //final password was returning a password string in the same order as the generator functions were written 
  //i.e. random lower followed by random upper , number and symbol so I put it through a random function to create the new pass variable
  // and pushed the pass variable into the empty password array.
  for (var i = 0; i < length; i++) {
    var pass = finalpassword[Math.floor(Math.random() * finalpassword.length)];
    password.push(pass);
  }
  // using the .join method I converted the password array into a string and fed it into the UserInput function which returns ps
  const ps = password.join("");
  UserInput(ps);
  return ps;
}
console.log(password);
// function to print ps variable onto the html element password  
function UserInput(ps) {
  document.getElementById("password").textContent = ps;

}
// I added a clipboard button to the HTML to give you the option of copying generated password
// I had to use the aria-label for selection because the id was not stable
var clipboard = document.getElementById("clipboard");

clipboard.addEventListener("click", copyPassword);

function copyPassword() {
  document.querySelector('[aria-label="Generated Password"]').select();
  document.execCommand('copy');
  alert("Copied to clipboard!");
}