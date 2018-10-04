# eggplant 🍆

A stack-oriented interpretted language created using Felix Plesoianu's "Make Your Own Programming Language" (http://scratch-lang.notimetoplay.org/index.html).

🍆 is written entirely with emojis.

## Printing
(All output is printed to the browser console)
* 📠 (**Print**) pops the item on top of the stack and prints it
  * e.g. `5️⃣6️⃣ 📠` pushes 56 to the stack and then pops and prints it, leaving the stack empty. Note the space between the two elements.
* 📠📑 (**Stack Print**) prints whole stack (stack remains intact)
  * e.g. `5️⃣ 6️⃣ 📠📑` pushes 5 and 6 to the stack and then prints `5️⃣ 6️⃣`. Note, again, where spaces are placed. Also note that this function prints the emoji values of each emoji on the stack as a JavaScript array and not their current values.

## Math
* ➕ (**Addition**) pops the two items on top of the stack, adds them and pushes the result to the stack.
  * e.g. `1️⃣0️⃣ 2️⃣ ➕` pushes 10 and 2 to the stack, pops them, adds them and then pushes 12 to the stack.
* ➖ (**Subtraction**) pops the two items on top of the stack, subtracts them and pushes the result to the stack.
* ✖️ (**Multiplication**) pops the two items on top of the stack, multiplies them and pushes the result to the stack.
* ➗ (**Division**) pops the two items on top of the stack, divides one by the other and pushes the result to the stack.
* ❇️ (**Mod**) pops the two items on top of the stack and pushes back its modulo.
* ✔️ (**Square Root**) pops the item on top of the stack and pushes back its square root.
  * e.g. `9️⃣ ✔️ 📠` prints 3.
* 0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣ (**Digits**) pushes given number to the stack
  * e.g. `1️⃣0️⃣5️⃣ 6️⃣ 7️⃣8️⃣` pushes 105, 6 and 78 to the stack.

## Stack Operations
* 🔂📑 (**Top Duplicate**) duplicates top item on the stack
  * e.g. `9️⃣9️⃣ 9️⃣9️⃣ 🔂📑 📠 📠` will print 99 two times.
* 📤📑 (**Pop**) discards top of stack
  * e.g. `1️⃣0️⃣ 9️⃣9️⃣ 📤📑 📠` will print 10.
* 🔀📑 (**Swap**) swaps top of stack with second item on stack
  * e.g. `1️⃣0️⃣ 9️⃣9️⃣ 🔀📑 📠` will print 10.
* 🔂🔂📑 (**Second Push**) copies second item on stack and places copy on top of stack
  * e.g. `1️⃣0️⃣ 9️⃣9️⃣ 🔂🔂📑 📠 📠 📠` will print 10, 99 and 10 again.
* ⏫📑 (**Third Push**) pops third item on stack to top (note that the item is not copied but moved)
  * e.g. `5️⃣5️⃣ 1️⃣0️⃣ 9️⃣9️⃣ ⏫📑 📠 📠 📠` will print 55, 10, 99.

## Variables, Constants, Strings
* 🍆`<variable>` (**Dim**) defines a variable named `<variable>` (`<variable>` is expected to be an emoji)
  * e.g. `🍆😊` defines a variable named `😊`
* 🛄🍆`<variable>` (**Store**) pops topmost value on the stack into `<variable>`
* 🛅🍆`<variable>`(**Get**) gets value of `<variable>` and pushes it to the stack
* 🐘🍆 (**Constant**) defines a constant and pushes it to the stack
* `✏️` (**String**) declares a string and pushes it to the stack
  * e.g. `✏️ hello world✏️`

## Functions
* ♻️ (**Function**) function declarator (must be followed by an emoji to name the function)
* 🚫 (**End Function Block**) function block end
* e.g.:
  * `♻️ 🍉 
      ✏️ 🌍✏️ ✏️ 📠 
    🚫`
  * defines a function 🍉, which prints the string `🌍`
  
## Arrays
* 🌜 (**Array Declarator**) defines the start of an array
* 🌛 (**Array Closer**) defines the end of an array
* 📏 (**Array Length**) pushes length of array to the stack
* 📬 (**Array Subindex**) references item in array
