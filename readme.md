# hooks
I need to explore the cool things that people are getting excited about.

- what do hooks mean for redux? Are there better ways to manage global app state now?
  - there is a useReducer hook. lets try!
  - It is not a direct replacement. And Im getting ready to tie myself in all sorts of knots in an attempt to re-create redux I think haha
    - so many hooks so little time, and to have the hooks interact with one another?

### goals
- use one of all the hooks (does that sentence even make sense? Find out later): YES it does make sense, go you joe
- There are many more but these are the ones that I want to test out first
  - [x] useState: classic component state
  - useEffect: lifecycle hooks
    - first arg: function to run on trigger, second arg: var to watch - when it changes, call first arg function.
    - to run only on mount pass empty array to useEffect(() => console.log('only on mount!'), [])
  - [x] useReducer: ok so it's basically like useState but with reusable state mutation logic thanks to reducers. state is 'initialized' in a component and is not accessable by other components unless passed explicitly to another component. Not a complete redux replacement
    - I defs want a globally accessable store - use sessionStorage
    - Reading that you shouldnt set tokens in sessionStorage, makes sense to me. Says store it in the server. How can I do that nicely?
    - Tested out useReducer and deleted the code again. I should keep a working example in there.
    - ah but wait!! Global store aka deeply accessable state = wait for it...
  - [] useContext: used with createContext - createContext in Provider component and useContext to access it from any child component, whether direct decendant or not. Existed before useContext did. Warning that createContext should be used sparingly..
  - dont forget Suspense and fallbacks and stuff: https://reactjs.org/docs/code-splitting.html. Do Lazy loading when I split my components into modules

- try fancy other tools also:
  - I was gonna use fastify as a server framework, but I set out to learn hooks so I can do that afterwards if I want
  - server caching is cool
  - preact is cool too: but i dont know if it has hooks yet

I wanna use Firebase auth: https://github.com/firebase/firebaseui-web  
But also I dont because I have written my own auth service before with express!!  
Maybe this is an after-I-do-hooks kinda thing.
```html
<script src="https://www.gstatic.com/firebasejs/5.8.5/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.8.5/firebase-auth.js"></script>
```
```js
const fbApp = require('firebase/app')
const fbAuth = require('firebase/auth')
```

http://web.archive.org/web/20170830213625/http://www.traversymedia.com/deploying-node-js-to-digital-ocean