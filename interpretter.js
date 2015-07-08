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
//1f432-1f40a (odd one)
//[a-f0-9]{5}(-200d-[a-f0-9]{4,5}(-fe0f)?)+ (group ones)

//I am so skeptical of all of this
function strToAry(word){
  var array = word.split("-");
  for(var i=0; i<array.length; i++){
    var str = array[i];
    var j=1;
    var found = false;
    if(dict[str]){
      return array;
    } else {
      while(((i+j)<array.length)&&(!dict[str])){
        str = str + "-" + array[i+j];
        j++;
        if(dict[str]){//find soonest match
          found = true;
          break;
        }
      }
    }

    if(found){
      found = false;
      array[i] = combine(i, j, array);
    } else { //walk back to find match
      rearrange(i-1, i, array);
    }
  }
  return array;
}

function combine(i, j, array){
  var subAry = array.slice(i, i+j);
  var joined = subAry.join("-");
  array[i] = joined;
  array.splice(i+1, (j-i));

  return array;
}

function rearrange(prev, current, array){
  var i = prev;
  str = array[prev];
  var found = false;
  if(dict[str])
  {
    found = true;
  } else {
    while((i < array.length)&&(!dict[str])){
      str = str + "-" + array[i+1];
      i++;
      if(dict[str]){ //found match
        found = true;
        break;
      }
    }
  }

  if(found){
    found = false;
    array[prev] = str;
    array.splice(current, i-current);
  }
  //who even knows if it's not found (probably should throw an error here)

  return array;
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


