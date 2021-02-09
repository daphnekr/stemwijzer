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
    //GetResult(arrAnswer);
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
  for (var x = 0; x < parties.length; x++)
  {
    var input = document.createElement("INPUT");
    input.setAttribute("type", "checkbox");
    input.setAttribute("value", parties[x].name);
    var label = document.createElement("label"); 
    label.innerHTML = parties[x].name;
    item6[0].appendChild(input);
    item6[0].appendChild(label);
    item6[0].appendChild(document.createElement("br"));
  }
}

function GetResult(finalArr)
{
  var partiesCount = finalArr.length;
  console.log(finalArr);
  finalArr.sort();
  console.log(finalArr);
  var current = null;
  var cnt = 0;
  var resultarr = [];
  for (var i = 0; i < finalArr.length+1; i++) 
  {
    if (finalArr[i] != current)
    {
      if (cnt > 0) {        
        resultarr.push({"party": current, "count": cnt});
      }
      current = finalArr[i];
      cnt = 1;
    } 
    else 
    {
      cnt++;
      resultarr.count = cnt;
    }
  }
  console.log(resultarr);
  ViewResult(resultarr, partiesCount);
}

function ViewResult(resultarr, partiesCount)
{
  item3[0].style.display = "none";
  item4[0].style.display = "none";
  item5[0].style.display = "none";
  item6[0].style.display = "block";
  for (var x = 0; x < resultarr.length; x++)
  {
    resultarr[x].count = resultarr[x].count / subjects.length * 100;
  }
  var sorted = resultarr.sort(Compare)
  console.log(sorted);
  for (var i = 0; i < resultarr.length; i++)
  {
    var para = document.createElement("p");
    para.innerHTML = sorted[i].party + " ----- " + sorted[i].count.toFixed() + "%";
    item6[0].appendChild(para);
  }
}
function Compare( a, b ) {
  if ( a.count < b.count ){
    return 1;
  }
  if ( a.count > b.count ){
    return -1;
  }
  return 0;
}

