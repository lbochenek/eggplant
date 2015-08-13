# eggplant 🍆

A stack-oriented interpretted language created using Felix Plesoianu's "Make Your Own Programming Language" (http://scratch-lang.notimetoplay.org/index.html).

🍆 is written entirely with emojis

## Printing
* 📠: prints top of stack
* 📠📑: prints whole stack (stack remains in tact)

## Math
* ➕: Addition
* ➖: Subtraction
* ✖️:Multiplication
* ➗: division
* ✔️: square root
* ❇️: mod
* 0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣: numbers

## Stack Operations
* 🔂📑: duplicate top of stack
* 📤📑: throw away top of stack
* 🔀📑: switch top of stack with second item on stack
* 🔂🔂📑:copy second item on stack and place copy on top of stack
* ⏫📑: bring third item on stack to top

## Variables, Constants, Strings
* 🍆: define variable
* 🛄🍆: save value into variable 
* 🛅🍆: get value of variable
* 🐘🍆: define constant
* ✏️: declare string
  * ex: `✏️ hello world✏️`

##Functions
* ♻️: declare function
* 🚫: declare end of function
* ex:
  * `♻️ 🍉 
      ✏️ 🌍✏️ 📠 
    🚫`
  * defines a function 🍉, which prints the string `🌍`
  
##Arrays
* 🌜: beginning of array
* 🌛: end of array
* 📏: length of array
* 📬: reference item in array
