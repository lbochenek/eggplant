//http://scratch-lang.notimetoplay.org/index.html

window.onload = function() {
  document.querySelector("#process").addEventListener("click", eggplant);
};

function eggplant()
{
  var words = getText();
  console.log("code point: " + toCodePoint(words));
  console.log("unicode surrogate: " + fromCodePoint(toCodePoint(words)));
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