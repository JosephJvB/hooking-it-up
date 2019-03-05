# hooks
I need to explore the cool things that people are getting excited about.

- what do hooks mean for redux? Are there better ways to manage global app state now?
  - there is a useReducer hook. lets try!!

### goals
- use one of all the hooks (does that sentence even make sense? Find out later): YES it does make sense, go you joe
- There are many more but these are the ones that I want to test out first
  - [x] useState: classic component state
  - useEffect: lifecycle hooks
  - useReducer: each component subscribes to a reducer with useReducer, any component can change that state. it sounds like more explanitory redux. It deals with initialState differently to redux though.

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