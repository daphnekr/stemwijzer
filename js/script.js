const item1 = document.getElementsByClassName("item1");
const item2 = document.getElementsByClassName("item2");
const item3 = document.getElementsByClassName("item3")
const item4 = document.getElementsByClassName("item4");
const title = document.getElementById("title");
const statement = document.getElementById("statement");
const btnPro = document.getElementById("btneens").style;
const btnContra = document.getElementById("btnoneens").style;
const btnNone = document.getElementById("btngeen").style;
const questionWeight = document.getElementById("questionWeight");
const result = document.getElementsByClassName("result");
const form = document.getElementById("form");
const selectBigParties = document.getElementById("selectBigParties");
const selectSecularParties = document.getElementById("selectSecularParties");
var count = 0;
var number = count+1;
var answers = [];
const size = 15;
var subjectsLenght = subjects.length;
document.getElementById("btnsetkieswijzer").addEventListener("click", setHTMLKiesWijzer);
document.getElementById("btngoback").addEventListener("click", goBack);
document.getElementById("btneens").addEventListener("click", function(){ pushAnwerUserInArray("pro"); } );
document.getElementById("btnoneens").addEventListener("click", function(){ pushAnwerUserInArray("contra"); });
document.getElementById("btngeen").addEventListener("click", function(){ pushAnwerUserInArray("none"); });
document.getElementById("overslaan").addEventListener("click", skip);



// set new object at every party for the count
for(var i = 0; i < parties.length; i++) {
  parties[i].count = 0;
}
// sets new object to the subjects for the users anwers
for(var i = 0; i < subjects.length; i++) {
  subjects[i].userOpinion = "";
  subjects[i].weight = 0;
}

/**
 * sets first statement
 */
function setHTMLKiesWijzer() {
  item1[0].classList.add("d-none");
  item2[0].classList.remove("d-none");
  item2[0].classList.add("d-block");
  title.innerHTML = number + ". " + subjects[count].title;
  statement.innerHTML = subjects[count].statement;
  partiesOpinions(count);
}

/**
 * sets nexts statement and if the user goes back the button of the previous statement is blue
 * @param {number} count the count of the subject 
 */
function setNextStatement(count) {
  // if it's the last question, you can choose the parties you want to see the result from
  if (subjects[count] == undefined) {
    chooseParties();
    return;
  }
  partiesOpinions(count);
  number = count+1;
  title.innerHTML = number + ". " + subjects[count].title;
  statement.innerHTML = subjects[count].statement;
}

function goBackStatement(count){
  //removes 1 count from the count from the parties from that subject
  for (var i = 0; i < subjects[count].parties.length; i++){
    for(var j = 0; j < answers.length; j++) {
      if (subjects[count].parties[i].position == answers[j].position){
        for(var x = 0; x < parties.length; x++){
          if (subjects[count].parties[i].name == parties[x].name)
          if (parties[x].count != 0){
            parties[x].count--;
          } 
        }
      }
    }
  }

  for(var i = 0; i < answers.length; i++) {
    if (answers[i].count == count) {
      switch(answers[i].position) {
        case "pro":
          btnPro.backgroundColor = answers[i].clicked;
          btnContra.backgroundColor = "lightgrey";
          btnNone.backgroundColor = "lightgrey";
          break;
        case "contra":
          btnContra.backgroundColor = answers[i].clicked;
          btnPro.backgroundColor = "lightgrey"; 
          btnNone.backgroundColor = "lightgrey";
          break;
        case "none":
          btnNone.backgroundColor = answers[i].clicked;
          btnPro.backgroundColor = "lightgrey";
          btnContra.backgroundColor = "lightgrey";
          break;
      }
        break;
    }
    else{
      btnPro.backgroundColor = "lightgrey";
      btnContra.backgroundColor = "lightgrey";
      btnNone.backgroundColor = "lightgrey";
    }
  }
  setNextStatement(count);
}


/**
 * pushes the answers from the user in an array
 * @param {string} position contra, pro or none
 */
function pushAnwerUserInArray(position) {
  var exists = false;
  //at every subject the users opinion will be set
  subjects[count].userOpinion = position;

  //if users checks for higher weight for the subject, the weight count for that subject will be set to 1
  if (subjects[count].weight == 0 && questionWeight.checked) {
    subjects[count].weight++;
    subjectsLenght++;
  }
  //if the weight is already 1 (so user goes back) and the checkbox is unchecked, the subject weight will be 0
  else if (subjects[count].weight == 1 && questionWeight.checked == false) {
    subjects[count].weight--;
    subjectsLenght--;
  }
  
  for (var x = 0; x < subjects[count].parties.length; x++) {

    if (subjects[count].parties[x].position == position) {
      
      for(i = 0; i < parties.length; i++) {
        if (subjects[count].parties[x].name == parties[i].name) {
          parties[i].count++;
          if (questionWeight.checked) {
            parties[i].count++;
          }
        }
      }
    }
  }
  
  for (var i = 0; i < answers.length; i++) {
    if (answers[i].count == count) {
      exists = true;
      answers[i].position = position;
    }
  }
  if(!exists) answers.push({"count": count, "position": position, "clicked": "lightblue"});
  questionWeight.checked = false;
  count++;
  setNextStatement(count);
}
/**
 * function to skip the question
 */
function skip() {
  count++;
  setNextStatement(count);
}
/**
 * function for the go back button
 */
function goBack() {
  count--;
  if (count == -1) {
    if (confirm("Weet je zeker dat je terug wilt gaan?")) {
      location.reload();
    } else {
      count++;
    }
  }
  goBackStatement(count);
}

/**
 * shows all the parties and checkboxes the user can check to determine which party they want with the results
 */
function chooseParties() {
  item2[0].classList.add("d-none");
  item2[0].classList.remove("d-block");
  item3[0].classList.remove("d-none");
  item3[0].classList.add("d-block");

  var clicked = true;
  
  for (var x = 0; x < parties.length; x++) {
    var input = document.createElement("INPUT");
    input.type = "checkbox";
    input.value = parties[x].name;
    var label = document.createElement("label"); 
    label.innerHTML = parties[x].name;
    form.appendChild(input);
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
  }
  selectBigParties.addEventListener("click", function() {checkParties(clicked = true)});
  selectSecularParties.addEventListener("click", function() {checkParties(clicked = false)});
  form.appendChild(document.createElement("br"));
  var btn = document.getElementById("submitbtn");
  btn.addEventListener("click", function() {isChecked(form)});
}

/**
 * function checks which checkboxes the user want to check and checks the checkboxes
 * @param {boolean} clicked true or false with checkbox is checked
 */
function checkParties(clicked) {
  var inputs = form.getElementsByTagName("input");
  // If the user wants the big parties check, check which parties are big and check the checkbox.
  if (selectBigParties.checked && clicked) {
    for(var i = 0; i < parties.length; i++) {
      if (parties[i].size >= size) {
        var partyName = parties[i].name;
        for (var x = 0; x < inputs.length; x++) {
          if (inputs[x].value == parties[i].name)          {
            inputs[x].checked = true;            
          }
        }
      }
    }
    return;
  } else {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
  }

  // If the user wants seculare parties checked, check which party is secular and check the checkbox.
  if (selectSecularParties.checked && !clicked) {
    for(var i = 0; i < parties.length; i++) {
      if (parties[i].secular == true) {
        var partyName = parties[i].name;
        for (var x = 0; x < inputs.length; x++) {
          if (inputs[x].value == partyName) {
            inputs[x].checked = true;
          }
        }
      }
    }
  } else {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
  }
  return;
}

/**
 * push the parties in an array the user want to see the result of
 * @param {HTMLElement} form 
 */
function isChecked(form) {
  var showPartiesArray = [];
  var inputs = form.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "checkbox" && inputs[i].checked) {
        showPartiesArray.push(parties[i].name);
    }
  }
  item2[0].classList.add("d-none");
  item2[0].classList.remove("d-block");
  calculateResult(showPartiesArray);
}

/**
 * 
 * @param {Array} showPartiesArray array with parties user wants to see
 */
function calculateResult(showPartiesArray) {
  var resultArray = [];
  var countArray = [];
  var current = null;
  var cnt = 0;
  for(var i = 0; i < subjects.length; i++) {
    for(var x = 0; x < subjects[i].parties.length; x++) {
      //if the users opinion is the same as a party, the party name is pushed in the resultarray
      if (subjects[i].userOpinion == subjects[i].parties[x].position) {
        resultArray.push(subjects[i].parties[x].name);
        //if the weight on the subject is 1, the pary names will be pushed again in the resultarry
        if (subjects[i].weight == 1) {
          resultArray.push(subjects[i].parties[x].name);
        }
      }
    }
  }
  // sorts the array on alphabetical irder
  resultArray.sort(Compare);
  // counts the number of same party names in the resultarray
  for (var i = 0; i < resultArray.length; i++) {
    if (resultArray[i] != current) {
      if (cnt > 0) {
        countArray.push({"party": current, "count": cnt});
      }
      current = resultArray[i];
      cnt = 1;
    } else {
      cnt++;
      for (var x = 0; x < countArray.length; x++)
      {
        if (countArray.party == current)
        {
          countArray[x].count = cnt;
        }
      }
    }
  }
  if (cnt > 0) {
    countArray.push({"party": current, "count": cnt});
  }
  viewResult(countArray, showPartiesArray);
}

/**
 * Calculates and shows result on screen
 * @param {Array} countArray array with the party and the times the user agreed with this parties
 * @param {Array} showPartiesArray array with checked parties
 */
function viewResult(countArray, showPartiesArray) {
  item3[0].classList.add("d-none");
  item3[0].classList.remove("d-block");
  item4[0].classList.remove("d-none");
  item4[0].classList.add("d-block");

  // calculate percentage of parties with answers of user
  for (var x = 0; x < countArray.length; x++) {
    countArray[x].count = countArray[x].count / subjectsLenght * 100;
  }

  var sorted = countArray.sort(Compare1);
  // show result from the parties that are checked
  for (var i = 0; i < showPartiesArray.length; i++) {
    for (var x = 0; x < sorted.length; x++) {
      if (sorted[x].party == showPartiesArray[i]) {
        var para = document.createElement("p");
        para.innerHTML = sorted[x].party + " ----- " + sorted[x].count.toFixed() + "%";
        result[0].appendChild(para);
      }
    }
  }
  // if none of the parties are checked, show all parties
  if (showPartiesArray.length == 0) {
    for (var x = 0; x < sorted.length; x++) {
      var para = document.createElement("p");
      para.innerHTML = sorted[x].party + " ----- " + sorted[x].count.toFixed() + "%";
      result[0].appendChild(para);
    }
  }
}
/**
 * sort array on alphabetical order
 * @param {Array} a 
 * @param {Array} b 
 */
function Compare(a, b) {
  if ( a < b ) {
    return -1;
  }
  if ( a > b ) {
    return 1;
  }
  return 0;
}
/**
 * sort array on count
 * @param {Array} a 
 * @param {Array} b 
 */
function Compare1(a, b) {
  if ( a.count < b.count ) {
    return 1;
  }
  if ( a.count > b.count ) {
    return -1;
  }
  return 0;
}
/**
 * add all the parties with their opinion of the current statement
 * @param {number} count count of the current subject
 */
function partiesOpinions(count) {
  var eensrow = document.getElementById("eensrow");
  var oneensrow = document.getElementById("oneensrow");
  var geenrow = document.getElementById("geenrow");
  eensrow.innerHTML= "Eens";
  eensrow.appendChild(document.createElement("hr"));
  oneensrow.innerHTML= "Oneens";
  oneensrow.appendChild(document.createElement("hr"));
  geenrow.innerHTML= "Geen van beide";
  geenrow.appendChild(document.createElement("hr"));

  for(i = 0; i < subjects[count].parties.length; i++) {
    if (subjects[count].parties[i].position == "pro") {
      var row = document.createElement("td");
      var arrow = document.createElement("I");
      var button = document.createElement("A");
      var div = document.createElement("DIV");
      var p = document.createElement("P");

      row.className = "roweens";
      row.innerHTML = subjects[count].parties[i].name;
      eensrow.appendChild(row);

      arrow.className = "fas fa-angle-down";
      button.setAttribute("role", "button");
      button.style.color = "black";
      button.setAttribute("href", "#collapseid"+subjects[count].parties[i].name);
      button.setAttribute("data-toggle", "collapse");
      button.setAttribute("aria-controls", "collapseid"+subjects[count].parties[i].name);
      button.setAttribute("aria-expanded", "false");
      button.appendChild(arrow);
      eensrow.appendChild(button);

      div.className = "collapse";
      div.id = "collapseid"+subjects[count].parties[i].name;
      eensrow.appendChild(div);
      
      p.className = "card card-body bg-light";
      p.innerHTML = subjects[count].parties[i].opinion;
      div.appendChild(p);

      eensrow.appendChild(document.createElement("br"));
    }
    if (subjects[count].parties[i].position == "contra") {
      var row = document.createElement("td");
      var arrow = document.createElement("I");
      var button = document.createElement("A");
      var div = document.createElement("DIV");
      var p = document.createElement("P");

      row.className = "roweens";
      row.innerHTML = subjects[count].parties[i].name;
      oneensrow.appendChild(row);

      arrow.className = "fas fa-angle-down";
      button.setAttribute("role", "button");
      button.style.color = "black";
      button.setAttribute("href", "#collapseid"+subjects[count].parties[i].name);
      button.setAttribute("data-toggle", "collapse");
      button.setAttribute("aria-controls", "collapseid"+subjects[count].parties[i].name);
      button.setAttribute("aria-expanded", "false");
      button.appendChild(arrow);
      oneensrow.appendChild(button);

      div.className = "collapse";
      div.id = "collapseid"+subjects[count].parties[i].name;
      oneensrow.appendChild(div);
      
      p.className = "card card-body bg-light";
      p.innerHTML = subjects[count].parties[i].opinion;
      div.appendChild(p);

      oneensrow.appendChild(document.createElement("br"));
    }
    if (subjects[count].parties[i].position == "none") {
      var row = document.createElement("td");
      var arrow = document.createElement("I");
      var button = document.createElement("A");
      var div = document.createElement("DIV");
      var p = document.createElement("P");

      row.className = "roweens";
      row.innerHTML = subjects[count].parties[i].name;
      geenrow.appendChild(row);

      arrow.className = "fas fa-angle-down";
      button.setAttribute("role", "button");
      button.style.color = "black";
      button.setAttribute("href", "#collapseid"+subjects[count].parties[i].name);
      button.setAttribute("data-toggle", "collapse");
      button.setAttribute("aria-controls", "collapseid"+subjects[count].parties[i].name);
      button.setAttribute("aria-expanded", "false");
      button.appendChild(arrow);
      geenrow.appendChild(button);

      div.className = "collapse";
      div.id = "collapseid"+subjects[count].parties[i].name;
      geenrow.appendChild(div);
      
      p.className = "card card-body bg-light";
      p.innerHTML = subjects[count].parties[i].opinion;
      div.appendChild(p);

      geenrow.appendChild(document.createElement("br"));
    }
  }
}