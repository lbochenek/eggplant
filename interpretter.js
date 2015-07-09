//http://scratch-lang.notimetoplay.org/index.html

window.onload = function() {
  document.querySelector("#process").addEventListener("click", eggplant);
};

function Lexer(text){
  var words = text.split(/\s+/);
  console.log(words);
  var next = 0;
  this.nextWord = function(){
    if(next >= words.length)
      return null;
    words[next] = strToAry(toCodePoint(words[next]));
    return words[next++];
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
      addTroubleEmojis(numMatches, num);
    } else if(fe0fMatches[fe0f] && fe0fMatches[fe0f].index === i) {
      addTroubleEmojis(fe0fMatches, fe0f);
    } else if(flagMatches[flag] && flagMatches[flag].index === i) {
      addTroubleEmojis(flagMatches, flag);
    } else if(groupMatches[group] && groupMatches[group].index === i) {
      addTroubleEmojis(groupMatches, group);
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
  }
}

function eggplant()
{
  var lexer = new Lexer(getText());

  var word = "";
  while((word = lexer.nextWord()) !== null)
  {
    console.log(word);
  }

  // console.log(dict);
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


