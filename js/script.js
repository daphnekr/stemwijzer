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
var count = 0;
var number = count+1;
var arrAnswer = [];
var answers = [];
const size = 15;
var subjectsLenght = subjects.length;

// set new object at every party for the count
for(var i = 0; i < parties.length; i++)
{
  parties[i].count = 0;
}
for(var i = 0; i < subjects.length; i++)
{
  subjects[i].userOpionion = "";
  subjects[i].weight = 0;
}

// start
function Start()
{
  
  for (var x = 0; x < item1.length; x++) 
  {
    item1[x].style.display = "none";
  }
  count = 0;
  SetHTMLKiesWijzer();
}
/**
 * sets first statement
 */
function SetHTMLKiesWijzer()
{
  item2[0].classList.remove("d-none");
  item2[0].classList.add("d-block");
  title.innerHTML = number + ". " + subjects[count].title;
  statement.innerHTML = subjects[count].statement;
  PartiesOpinions(count);
}

/**
 * sets nexts statement and if the user goes back the button of the previous statement is blue
 * @param count 
 */
function SetNextStatement(count)
{
  for(var i = 0; i < answers.length; i++) {
    if (answers[i].count == count) {
      switch(answers[i].position)
      {
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
  }
  // if it's the last question, you can choose the parties you want to see the result from
  if (subjects[count] == undefined)
  {
    ChooseParties();
    return;
  }
  PartiesOpinions(count);
  number = count+1;
  title.innerHTML = number + ". " + subjects[count].title;
  statement.innerHTML = subjects[count].statement;
}
/**
 * add all the parties with their opinion of the current statement
 * @param count 
 */
function PartiesOpinions(count)
{
  var eensrow = document.getElementById("eensrow");
  var oneensrow = document.getElementById("oneensrow");
  var geenrow = document.getElementById("geenrow");
  eensrow.innerHTML= "Eens";
  eensrow.appendChild(document.createElement("hr"));
  oneensrow.innerHTML= "Oneens";
  oneensrow.appendChild(document.createElement("hr"));
  geenrow.innerHTML= "Geen van beide";
  geenrow.appendChild(document.createElement("hr"));

  for(i = 0; i < subjects[count].parties.length; i++)
  {
    if (subjects[count].parties[i].position == "pro")
    {
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
    if (subjects[count].parties[i].position == "contra")
    {
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
    if (subjects[count].parties[i].position == "none")
    {
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

/**
 * pushes the answers from the user in an array
 * @param {string} position 
 */
function PushInArray(position)
{
  var exists = false;
  subjects[count].userOpionion = position;

  if (subjects[count].weight == 0 && questionWeight.checked)
  {
    subjects[count].weight++;
    subjectsLenght++;
  }
  else if (subjects[count].weight == 1 && questionWeight.checked == false)
  {
    subjects[count].weight--;
    subjectsLenght++;
  }

  console.log(subjects)
  for (var x = 0; x < subjects[count].parties.length; x++)
  {
    if (subjects[count].parties[x].position == position)
    {
      arrAnswer.push(subjects[count].parties[x].name);
      for(i = 0; i < parties.length; i++)
      {
        if (subjects[count].parties[x].name == parties[i].name)
        {
          parties[i].count++;
          if (questionWeight.checked)
          {
            parties[i].count++;
          }
        }
        
      }
    }
  }
  for (var i = 0; i < answers.length; i++)
  {
    if (answers[i].count == count)
    {
      exists = true;
      answers[i].position = position;
    }
  }
  if(!exists) answers.push({"count": count, "position": position, "clicked": "lightblue"});
  questionWeight.checked = false;
  count++;
  SetNextStatement(count);
}


/**
 * function to skip the question
 */
function Skip()
{
  count++;
  SetNextStatement(count);
}
/**
 * function for the go back button
 */
function GoBack()
{
  count--;
  if (count == -1)
  {
    if (confirm("Weet je zeker dat je terug wilt gaan?"))
    {
      location.reload();
    }
    else
    {
      count++;
    }
  }
  SetNextStatement(count);
}

/**
 * shows all the parties and checkboxes the user can check to determine which party they want with the results
 */
function ChooseParties()
{
  item2[0].classList.add("d-none");
  item2[0].classList.remove("d-block");
  item3[0].classList.remove("d-none");
  item3[0].classList.add("d-block");

  var form = document.getElementById("form");
  var selectBigParties = document.getElementById("selectBigParties");
  var selectSecularParties = document.getElementById("selectSecularParties");
  var clicked = true;
  
  for (var x = 0; x < parties.length; x++)
  {
    var input = document.createElement("INPUT");
    input.type = "checkbox";
    input.value = parties[x].name;
    var label = document.createElement("label"); 
    label.innerHTML = parties[x].name;
    form.appendChild(input);
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
  }
  selectBigParties.addEventListener("click", function() {CheckParties(selectBigParties, selectSecularParties, clicked = true, form)});
  selectSecularParties.addEventListener("click", function() {CheckParties(selectBigParties, selectSecularParties, clicked = false, form)});
  form.appendChild(document.createElement("br"));
  var btn = document.getElementById("submitbtn");
  btn.addEventListener("click", function() {IsChecked(form)});
}
function CheckParties(selectBigParties, selectSecularParties, clicked, form)
{
  var inputs = form.getElementsByTagName("input");
  // If the user wants the big parties check, check which parties are big and check it.
  if (selectBigParties.checked && clicked)
  {
    for(var i = 0; i < parties.length; i++)
    { 
      if (parties[i].size >= size)
      {
        var partyName = parties[i].name;
        for (var x = 0; x < inputs.length; x++) 
        {
          if (inputs[x].value == parties[i].name)
          {
            inputs[x].checked = true;            
          }
        }
        
      }
    }
    return;;
  }
  else
  {
    for (var i = 0; i < inputs.length; i++) 
    {
      inputs[i].checked = false;
    }
  }

  // If the user wants seculare parties checked, check which party is secular and check it.
  if (selectSecularParties.checked && !clicked)
  {
    for(var i = 0; i < parties.length; i++)
    {
      if (parties[i].secular == true)
      {
        var partyName = parties[i].name;
        for (var x = 0; x < inputs.length; x++) 
        {
          if (inputs[x].value == partyName)
          {
            inputs[x].checked = true;
          }
        }
      }
    }
  }
  else
  {
    for (var i = 0; i < inputs.length; i++) 
    {
      inputs[i].checked = false;
    }
  }
  return;
}

/**
 * push the parties in an array the user want to see the result of
 * @param {*} form 
 */
function IsChecked(form)
{
  var arr = [];
  var inputs = form.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) 
  {
    if (inputs[i].type === "checkbox" && inputs[i].checked) 
    {
        arr.push(parties[i].name);
    }
  }
  item2[0].classList.add("d-none");
  item2[0].classList.remove("d-block");
  // ViewResult(arr);
  CalculateResult(arr);
}

function CalculateResult(arr)
{
  var resultArray = [];
  var countArray = [];
  var current = null;
  var cnt = 0;
  for(var i = 0; i < subjects.length; i++)
  {
    for(var x = 0; x < parties.length; x++)
    {
      if (subjects[i].userOpionion == subjects[i].parties[x].position)
      {
        resultArray.push(subjects[i].parties[x].name);
        if (subjects[i].weight == 1)
        {
          resultArray.push(subjects[i].parties[x].name);
        }
      }
    }
  }
  console.log("result");
  console.log(resultArray);
  resultArray.sort(Compare);
  for (var i = 0; i < resultArray.length; i++)
  {
    if (resultArray[i] != current)
    {
      if (cnt > 0)
      {
        countArray.push({"party": current, "count": cnt});
      }
      current = resultArray[i];
      cnt = 1;
    }
    else
    {
      cnt++;
      countArray.count = cnt;
    }
  }
  if (cnt > 0)
  {
    countArray.push({"party": current, "count": cnt});
  }
  ViewResult(countArray, arr);
}

/**
 * Calculates and shows result on screen
 * @param arr array with checked parties
 */
function ViewResult(resultArray, arr)
{
  console.log(resultArray);
  item3[0].classList.add("d-none");
  item3[0].classList.remove("d-block");
  item4[0].classList.remove("d-none");
  item4[0].classList.add("d-block");

  
  // calculate percentage of parties with answers of user
  for (var x = 0; x < resultArray.length; x++)
  {
    resultArray[x].count = resultArray[x].count / subjectsLenght * 100;
    console.log(resultArray[x]);
  }
  var sorted = resultArray.sort(Compare1);
  // show result from the parties that are checked
  for (var i = 0; i < arr.length; i++)
  {
    for (var x = 0; x < sorted.length; x++)
    {
      if (sorted[x].party == arr[i])
      {
        var para = document.createElement("p");
        para.innerHTML = sorted[x].party + " ----- " + sorted[x].count.toFixed() + "%";
        result[0].appendChild(para);
      }
    }
  }
  // if none of the parties are checked, show all parties
  if (arr.length == 0)
  {
    for (var x = 0; x < sorted.length; x++)
    {
      var para = document.createElement("p");
      para.innerHTML = sorted[x].party + " ----- " + sorted[x].count.toFixed() + "%";
      result[0].appendChild(para);
    }
  }
}
/**
 * sort array with on alphabetical order
 * @param {*} a 
 * @param {*} b 
 */
function Compare(a, b) 
{
  if ( a < b )
  {
    return -1;
  }
  if ( a > b )
  {
    return 1;
  }
  return 0;
}
/**
 * sort array on count
 * @param {*} a 
 * @param {*} b 
 */
function Compare1(a, b) 
{
  if ( a.count < b.count )
  {
    return 1;
  }
  if ( a.count > b.count )
  {
    return -1;
  }
  return 0;
}

