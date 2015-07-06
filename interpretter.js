//http://scratch-lang.notimetoplay.org/index.html

//supplies the next word of input on demand
function lexer(text)
{
  var words = text.split(/\s+/);
  var next = 0;
  this.nextWord = function(){
    if(next >= words.length)
      return null;
    var ret = words[next];
    next++;
    return ret;
  }
}