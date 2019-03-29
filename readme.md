# New Readme who dis?

### I am using hooks and they are cool.
### Now Im gonna use this as a sandbox to try anything else I think is interesting/worth learning.

- [x] generate svgs. (suggested by Henrik)
  - done in a very basic way. Seems a good start though
  - Cooler: can I get the svg to move across the screen rather than disappear and reappear.
- [x] Get SSL certificate for site: Im getting messages on my input fields that the site is insecure.
  - https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca
  - https://stackoverflow.com/questions/48755030/node-js-fs-cannot-read-certificate-from-letsencrpyt
  - https://medium.com/@davidmellul/first-using-cron-this-is-the-content-of-my-crontab-d00b7ddf6c71
- Use PM2 better
- I should make custom popups for error/success of API calls
  - position absolute type stuff
  - in prog:
- Refactor client.jsx to proper modules
  - cant really remove the login form to a child module without doing heaps of passing of props bcos no redux.
  - so Home component has to stay as holding all the data to pass to children. Passing data between children is painful.
  - maybe this is exacly where React Provide Context and useContext come in!

http://web.archive.org/web/20170830213625/http://www.traversymedia.com/deploying-node-js-to-digital-ocean