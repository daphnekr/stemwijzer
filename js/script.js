var item1 = document.getElementsByClassName("item1");
var item2 = document.getElementsByClassName("item2");
var item3 = document.getElementsByClassName("item3");
var item4 = document.getElementsByClassName("item4");
var item5 = document.getElementsByClassName("item5");
var title = document.getElementById("title");
var statement = document.getElementById("statement");
var btnPro = document.getElementById("btneens").style;
var btnContra = document.getElementById("btnoneens").style;
var btnNone = document.getElementById("btngeen").style;
var count = 0;
var number = count+1;
var arrAnswer = [];
var answers = [];


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
          console.log(btnPro);
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
    GetResult(arrAnswer);
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
  console.log(answers);
  PushInArray(position);  
  count++
  SetNextStatement(count);
}

function Skip()
{
  count++
  SetNextStatement(count);
}

function GetResult(finalArr)
{
  var partiesCount = arrAnswer.length;
  console.log(partiesCount);
}
function GoBack()
{
  count--;
  console.log(count);
  console.log(answers.length);

  SetNextStatement(count);
}

