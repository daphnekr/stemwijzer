var item1 = document.getElementsByClassName("item1");
var item2 = document.getElementsByClassName("item2");
var item3 = document.getElementsByClassName("item3");
var item4 = document.getElementsByClassName("item4");
var item5 = document.getElementsByClassName("item5");
var item6 = document.getElementsByClassName("item6");
var title = document.getElementById("title");
var statement = document.getElementById("statement");
var btnPro = document.getElementById("btneens").style;
var btnContra = document.getElementById("btnoneens").style;
var btnNone = document.getElementById("btngeen").style;
var count = 0;
var number = count+1;
var arrAnswer = [];
var answers = [];
const size = 15;

for(i = 0; i < parties.length; i++)
{
  parties[i].count = 0;
}


function Start()
{
  for (var x = 0; x < item1.length; x++) 
  {
    item1[x].style.display = "none";
    item2[x].style.display = "none";
  }
  count = 0;
  SetHTMLKiesWijzer();
}

function SetHTMLKiesWijzer()
{
  item3[0].style.display = "block";
  title.innerHTML = number + ". " + subjects[count].title;
  item4[0].style.display = "block";
  statement.innerHTML = subjects[count].statement;
  item5[0].style.display = "block";
}

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
  if (subjects[count] == undefined)
  {
    ChooseParties();
    return;
  }
  number = count+1;
  title.innerHTML = number + ". " + subjects[count].title;
  statement.innerHTML = subjects[count].statement;
}

function PushInArray(position)
{
  var exists = false;
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
}

function AddAnswer(position)
{
  PushInArray(position);
  count++;
  SetNextStatement(count);
}

function Skip()
{
  count++
  SetNextStatement(count);
}

function GoBack()
{
  count--;
  if (count == -1)
  {
    location.reload();
  }
  SetNextStatement(count);
}

function ChooseParties()
{
  item3[0].style.display = "none";
  item4[0].style.display = "none";
  item5[0].style.display = "none";
  item6[0].style.display = "block";

  var form = document.getElementById("form");
  var selectBigParties = document.getElementById("selectBigParties");
  
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
  selectBigParties.addEventListener("click", function() {CheckBigParties(selectBigParties)});
  form.appendChild(document.createElement("br"));
  var btn = document.getElementById("submitbtn");
  btn.addEventListener("click", function() {IsChecked(form, btn, selectBigParties)});
}
function CheckBigParties(selectBigParties)
{
  var inputs = form.getElementsByTagName("input");
  if (selectBigParties.checked)
  {
    for(var i = 0; i < parties.length; i++)
    {
      if (parties[i].size > size)
      {
        var partyName = parties[i].name;
        for (var x = 0; x < inputs.length; x++) 
        {
          if (inputs[i].value == partyName)
          {
            inputs[i].checked = true;
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
}
function IsChecked(form, btn, selectBigParties)
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
  form.style.display = "none";
  btn.style.display = "none";
  selectBigParties.style.display = "none";
  document.getElementById("lblSelectParties").style.display = "none";
  ViewResult(arr)
}

function ViewResult(arr)
{
  for (var x = 0; x < parties.length; x++)
  {
    parties[x].count = parties[x].count / subjects.length * 100;
  }
  var sorted = parties.sort(Compare);

  for (var i = 0; i < arr.length; i++)
  {
    for (var x = 0; x < sorted.length; x++)
    {
      if (sorted[x].name == arr[i])
      {
        var para = document.createElement("p");
        para.innerHTML = sorted[x].name + " ----- " + sorted[x].count.toFixed() + "%";
        item6[0].appendChild(para);
      }
    }
  }
}

function Compare(a, b) 
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

