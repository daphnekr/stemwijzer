var item1 = document.getElementsByClassName("item1");
var item2 = document.getElementsByClassName("item2");
var item3 = document.getElementsByClassName("item3");
var item4 = document.getElementsByClassName("item4");
var item5 = document.getElementsByClassName("item5");
var title = document.getElementById("title");
var statement = document.getElementById("statement");
var count = 0;
var number = count+1;
var arrAnswer = [];

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
  item3[0].style.visibility = "visible";
  title.innerHTML = number + ". " + subjects[count].title;
  item4[0].style.visibility = "visible";
  statement.innerHTML = subjects[count].statement;
  item5[0].style.visibility = "visible";
}
function SetNextStatement(count)
{
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
  for (var x = 0; x < subjects[count].parties.length; x++)
  {
    if (subjects[count].parties[x].position == position)
    {
      arrAnswer.push(subjects[count].parties[x].name);
    }
  }
}

function AddAnswer(position)
{
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
  console.log(finalArr);
}

