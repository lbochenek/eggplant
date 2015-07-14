//http://scratch-lang.notimetoplay.org/index.html

window.onload = function() {
  document.querySelector("#process").addEventListener("click", process);
  document.querySelector("#codePoint").addEventListener("click", cp);
};

function cp(){
  console.log("entered: "+getText()+" cp: "+toCodePoint(getText()));
}

function process(){
  var egg = new Eggplant();
  var PrintingWords = {
    "1f4e0": function(egg){ //print 📠
      if(egg.stack.length < 1)
        throw "Not enough items on stack";
      console.log(egg.stack.pop());
    },
    "1f4e0-1f4d1": function(egg){ //print stack 📠📑
      console.log(egg.stack);
    }
  }

  var MathWords = {
    "2795": function(egg){ //addition ➕
      if(egg.stack.length < 2)
        throw "Not enough items on stack";
      var op1 = egg.stack.pop();
      var op2 = egg.stack.pop();
      egg.stack.push(op1 + op2);
    },
    "2796": function(egg){ //subtraction ➖
      if(egg.stack.length < 2)
        throw "Not enough items on stack";
      var op1 = egg.stack.pop();
      var op2 = egg.stack.pop();
      egg.stack.push(op2-op1);
    },
    "2797": function(egg){ //division ➗
      if(egg.stack.length < 2)
        throw "Not enough items on stack";
      var op1 = egg.stack.pop();
      var op2 = egg.stack.pop();
      egg.stack.push(op2/op1);
    },
    "2716-fe0f": function(egg){ //multiplication ✖️
      if(egg.stack.length < 2)
        throw "Not enough items on stack";
      var op1 = egg.stack.pop();
      var op2 = egg.stack.pop();
      egg.stack.push(op1*op2);
    },
    "2714-fe0f": function(egg){ //square root ✔️
      if(egg.stack.length < 1)
        throw "Not enough items on stack";
      var op1 = egg.stack.pop();
      egg.stack.push(Math.sqrt(op1));
    },
    "2747-fe0f": function(egg){ //mod ❇️
      if(egg.stack.length < 1)
        throw "Not enough items on stack";
      var op1 = egg.stack.pop();
      var op2 = egg.stack.pop();
      egg.stack.push(op2 % op1);
    }
  };

  var StackWords = {
    //dup: duplicate top of stack 🔂📑
    "1f502-1f4d1": function(egg){
      if(egg.stack.length < 1)
        throw "Not enough items on stack";
      var tos = egg.stack.pop();
      egg.stack.push(tos);
      egg.stack.push(tos);
    },
    //drop: throw away top of stack 📤📑
    "1f4e4-1f4d1": function(egg){
      if(egg.stack.length < 1)
        throw "Not enough items on stack";
      egg.stack.pop();
    },
    //swap: exchange positions of TOS and second item on stack 🔀📑
    "1f500-1f4d1": function(egg){
      if(egg.stack.length < 2)
        throw "Not enough items on stack";
      var tos = egg.stack.pop();
      var _2os = egg.stack.pop();
      egg.stack.push(tos);
      egg.stack.push(_2os);
    },
    //over: copy 2OS on top of stack 🔂🔂📑
    "1f502-1f502-1f4d1": function(egg){
      if(egg.stack.length < 2)
        throw "Not enough items on stack";
      var tos = egg.stack.pop();
      var _2os = egg.stack.pop();
      egg.stack.push(_2os);
      egg.stack.push(tos);
      egg.stack.push(_2os);
    },
    //rot: bring the 3rd item on stack to top ⏫📑
    "23eb-1f4d1": function(egg){
      if(egg.stack.length < 3)
        throw "Not enough items on stack";
      var tos = egg.stack.pop();
      var _2os = egg.stack.pop();
      var _3os = egg.stack.pop();
      egg.stack.push(_2os);
      egg.stack.push(tos);
      egg.stack.push(_3os);
    }
  };

  var VariableWords = {
    //var 🍆
    "1f346": function(egg){
      var var_name = egg.lexer.nextWord();
      if(var_name === null)
        throw "Unexcepted end of input";
      egg.define(var_name, makeVariable(egg));
    },
    //store: store value of 2OS into variable given by TOS. 🛄🍆
    "1f6c4-1f346": function(egg){
      if(egg.stack.length < 2)
        throw "Not enough items on stack";
      var reference = egg.stack.pop();
      var new_value = egg.stack.pop();
      reference.value = new_value;
    },
    //fetch: replace reference to variable on TOS with its value. 🛅🍆
    "1f6c5-1f346": function(egg){
      if(egg.stack.length < 1)
        throw "Not enough items on stack";
      var reference = egg.stack.pop();
      egg.stack.push(reference.value);
    }
  };

  var ConstantWords = {
    //read next word from input and make it a constant with TOS 🐘🍆
    "1f418-1f346": function(egg){
      if(egg.stack.length < 1)
        throw "Not enough items on stack";
      var const_name = egg.lexer.nextWord();
      if(const_name === null)
        throw "Unexpected end of input";
      var const_value = egg.stack.pop();
      egg.define(const_name, makeConstant(const_value, egg));
    }
  };

  var StringWords = {
    //✏️
    "270f-fe0f": function(egg, word){
      var collector = "";
      var done = false;
      while(!done){
        if(word === null)
          throw "Unexpected end of input";
        if(word.substr(-9, 9) === "270f-fe0f"){
          var words = strToAry(word.substr(0, word.length-10));
          words.forEach(function(wd){
            collector += fromCodePoint(wd);
          });
          done = true;
        } else {
          var words = strToAry(word);
          words.forEach(function(wd){
            collector += fromCodePoint(wd);
          });
          collector += " ";
          word = egg.lexer.nextWord();
        }
      }
      egg.stack.push(collector);
    }
  }

  egg.addWords(PrintingWords);
  egg.addWords(MathWords);
  egg.addWords(StackWords);
  egg.addWords(VariableWords);
  egg.addWords(ConstantWords);
  egg.addWords(StringWords);
  egg.run(getText());
}

function Lexer(text){
  var words = text.split(/\s+/);
  // console.log(words);
  var next = 0;
  this.nextWord = function(){
    if(next >= words.length)
      return null;
    words[next] = toCodePoint(words[next]);
    var wd = words[next];
    next++;
    return wd;
  }
}

//[0-9]{2}-fe0f-20e3 numbers
//[a-z0-9]{4,5}-fe0f (fe0f things)
//1f1[ef]{1}[a-f0-9]{1}-1f1[ef]{1}[a-f0-9]{1} (flags)
//[a-f0-9]{5}(-200d-[a-f0-9]{4,5}(-fe0f)?)+ (group ones)

function strToAry(word)
{
  var wdAry = [];
  //regex to detect irregular code points
  var numReg = /[0-9]{2}-fe0f-20e3/g;
  var numMatches = [];
  for(var i=0; numMatches[i]=numReg.exec(word); i++){}

  var fe0fReg = /[a-z0-9]{4,5}-fe0f/g;
  var fe0fMatches = [];
  for(var i=0; fe0fMatches[i]=fe0fReg.exec(word); i++){}

  var flagReg = /1f1[ef]{1}[a-f0-9]{1}-1f1[ef]{1}[a-f0-9]{1}/g;
  var flagMatches = [];
  for(var i=0; flagMatches[i]=flagReg.exec(word); i++){}

  var groupEReg = /[a-f0-9]{5}(-200d-[a-f0-9]{4,5}(-fe0f)?)+/g;
  var groupMatches = [];
  for(var i=0; groupMatches[i]=groupEReg.exec(word); i++){}

  var regex = false;
  if(numMatches[0]||fe0fMatches[0]||flagMatches[0]||groupMatches[0]){
    regex = true;
  }

  if(!regex)
    return word.split("-");

  for(var i=0, num=0, fe0f=0, flag=0, group=0, array=0, len=word.length; i<len; ){
    var result = null;
    if(numMatches[num] && numMatches[num].index == i){
      num = addTroubleEmojis(numMatches, num);
    } else if(fe0fMatches[fe0f] && fe0fMatches[fe0f].index === i) {
      fe0f = addTroubleEmojis(fe0fMatches, fe0f);
    } else if(flagMatches[flag] && flagMatches[flag].index === i) {
      flag = addTroubleEmojis(flagMatches, flag);
    } else if(groupMatches[group] && groupMatches[group].index === i) {
      group = addTroubleEmojis(groupMatches, group);
    } else {
      result = findWholeEmoji(i, word);
      i = result.i;
      wdAry[array] = result.emoji;
      array++;
    }
  }
  return wdAry;

  function findWholeEmoji(start, word)
  {
    var emoji = "";
    for(var i=start, len=word.length; i<len; i++){
      if(word.charAt(i) === "-"){
        break;
      } else {
        emoji += word.charAt(i);
      }
    }
    if(i < word.length)
      i++; //skip next dash

    return {"emoji":emoji, "i":i};
  }

  function addTroubleEmojis(matches, counter){
    wdAry[array] = matches[counter][0];
    i = i + wdAry[array].length;
    if(i<len) //skip next dash
      i++;
    array++;
    counter++;
    return counter;
  }
}

function Eggplant()
{
  var dictionary = {};
  this.stack = [];
  this.addWords = function(new_dict){
    for(var word in new_dict){
      dictionary[word] = new_dict[word];
    }
  }

  this.run = function (text){
    this.lexer = new Lexer(text);
    var word;
    var num_val;
    while(word = this.lexer.nextWord()){
      num_val = getNumber(word);
      if(dictionary[word]){
        dictionary[word](this);
      } else if(num_val) {
        this.stack.push(num_val);
      } else if(word.substr(0, 9) === "270f-fe0f"){ //beginning of quote
        dictionary["270f-fe0f"](this, word.substr(10));
      } else {
        throw "Unknown word";
      }
    }
  }
}

function getNumber(word)
{
  var num = /[0-9]{2}-fe0f-20e3/g;
  if(num.test(word)){
    var nums = strToAry(word);
    var str = "";
    nums.forEach(function(number){
      str += cpToN[number];
    });
  }
  else
    return null;

  return Number(str);
}

//http://www.christinahsuholland.com/processing-emojis-in-javascript/
//https://github.com/twitter/twemoji
function toCodePoint(unicodeSurrogates, sep)
{
  var r=[]; //holds numbers
  var c=0; //char code at specific index
  var p=0; //if within range (maybe BPM?)
  var i=0; //index
  while(i < unicodeSurrogates.length)
  {
    c = unicodeSurrogates.charCodeAt(i);
    i++;
    if(p)
    {
      r.push((0x10000 + ((p-0xD800)<<10)+(c-0xDC00)).toString(16));
      p = 0;
    }
    else if(0xD800 <= c && c<=0xDBFF)
    {
      p = c;
    }
    else
    {
      r.push(c.toString(16));
    }
  }
  return r.join(sep || '-');
}

//http://www.christinahsuholland.com/processing-emojis-in-javascript/
//https://github.com/twitter/twemoji
function fromCodePoint(codepoint)
{
  var code = typeof codepoint === 'string'? parseInt(codepoint, 16):codepoint;
  if(code < 0x10000)
  {
    return String.fromCharCode(code);
  }
  code -= 0x10000;
  return String.fromCharCode(0xD800 + (code >> 10), 0xDC00 + (code & 0x3FF));
}

function getText()
{
  return document.querySelector("#language").value;
}

function print()
{
  var str = "var dict = {\n";
  for(var property in dict){
    if(dict.hasOwnProperty(property)){
      str = str + "\t" + property + ": " + dict[property] + ",\n";
    }
  }
  str = str.substr(0, str.length-2); //get rid of last comma;
  str = str + "\n};";
  console.log(str);
}


