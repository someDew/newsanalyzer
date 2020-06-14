# NewsAnalyzer
## v1.0.4
---
  
### About:

Hi! And wellcome. 

<div align="center">

[![newsanalyzer screenshot](https://pictures.s3.yandex.net/resources/Snimok_ekrana_2019-10-11_v_15.05.22_1570795557.png "github.io/newsanalyzer")](https://frontandrew.github.io/newsanalyzer/)

</div>

'NewsAnalyzer' is a my _final qualifying work_ in Yandex.Praktikum. Its simple web application to search for news on Russian language by keywords. Please, [try it](https://frontandrew.github.io/newsanalyzer/).

### Features:

- User can search news by keywords;
- User receives a list of news for the last 7 days;
- Click on card with news to redirect to news source;
- App save and show last user reqest first part of results on main page even after browser close;
- In section 'Analitics' user can see statistics of mentions in the media on this topic for the last 7 days;
- In section 'About' user can see me :) and some boring words;
- Also, user can view the commit history in 'About' section from the application repository on github.com;
- Click on commit card redirect to commit details page on github.

### Use technology:

- ECMAScript 2019;
- CSS3;
- HTML5;
- WebPack4;
- BEM methodology;
- NPM paсkages;
- GIT technology.

### Fast start:

0. For start please install [Node.js](https://nodejs.org/en/) and comandline tool, for example [git bash](https://git-scm.com/downloads)
1. Then clone or download repo and unpack on your local
2. Run `npm install` to install the environment for downloading necessary npm packages
3. Run `npm run build` to build project local. It will build project from source in dist directory
4. Run `npm run start` to develop/debug project local. It will start webpack-dev-server on your local, port 8080.

### Whats new:

<details>
    <summary>v1.0.4</summary>
    <li>New way to do request throw yandex</li>
</details>

<details>
    <summary>v1.0.3</summary>
    <li>Fixed bug with incorrect links from NesApi</li>
    <li>Supplemented readme file</li>
</details>

<details>
    <summary>v1.0.2</summary>
    <li>Parameters now passed to modules as objects</li>
    <li>The passed DOM elements are stored in a new object in a file with constants</li>
    <li>Updated content of 'Features' section in readme</li>
</details>

<details>
    <summary>v1.0.1</summary>
    <li>New way to store news data in storage</li>
    <li>New way to store histogram data in storage</li>
    <li>New brakepoints to News block to better user experience</li>
    <li>Finded and fixed bug with over flow text in git cards</li>
    <li>Updated structure of 'Whats new' section in readme</li>
</details>

<details>
    <summary>v1.0.0</summary>
    <li>All functions now is worked</li>
</details>

### Issues:

- in IOS 13 git commits block work incorrect

### This project was made possible by:

* [Yandex.Praktikum](https://praktikum.yandex.ru);
* [NewsApi](https://newsapi.org);
* [WebPack](https://webpack.js.org);
* [Babel](https://babeljs.io);
* [PostCSS](https://vk.com/postcss);
* [GitHub](http://github.com);
* And many others.

> Feel free to ask your questions in [telegram](https://t.me/frontandrew)