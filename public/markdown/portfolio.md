# Introduction

This project was built with the objective of being a **easy to update and manage** place where I could showcase my works and also get to use React and Bootstrap.

Tech used: X X X X X X X X X X X 

### React and Bootstrap
As I built the project, it became clear to me how good React was at helping making re-husable, mantainable code by combining the idea of components with the paradigm of functional programming.

I only found out that Bootstrap was not fully compatible with React once I was already way too deep into the project, but thankfully the open source community had my back; It only took me half a day of scratching my head at my code not working plus 3 hours of googling and Stackoverflow questioning and an extra hour or so of reading trough the react-bootstrap package docs and implementing it onto my project to fix my Bootstrap modals not showing on my React application. And, for some reason, I loved every second of it.

It was a great experience for me to use React for this project as I was able to see first hand what React has to offer (Compartmentalization of code by components and the hability they have to react to any changes and send information to one another) and where it lacks (Bootstrap compatability, no markdown support) and sticking to it and finding workarounds for its shortcomings as well as leveraging its best features gave me a real sense of what it feels like to build and mantain a real life project.

### The big picture
As I made the website I realized that if I was to manage its content over the comming months I needed a solution for data storage and creation. For this reason I decided to look into markdown languages and their integration onto React applications. I ended up using the package react-markdown from GitHub.

Markdown would then serve me to easely create content, so for the storage and serving of the .md files and other small files I decide to pay more attention to the project structure. I restructured the project on a way that made sense to me and worked well with both the bundler (Vitejs) and the server application (Flask, which allows me change the relative path I want to use to serve my files from)

### Leveling up my CSS
It blows my mind how many new things I have discovered about CSS while making this project: expressions (calc()), variables (--myVar, var()), pseudo-expressions (.component:hover), accessing children of a selector based on parent selector AND a pseudo-expression triggering (.parent:hover .children), all that and many other CSS properties like position (static, relative, absolute), transition, white-space, etc...

I have come to understand that CSS is much more powerful that I initialy thought but I can also see why a CSS library or framework is in place in order to speed things up.

### Full-stack
I also made the back-end for this project, from renting the server to setting it up with my OS of choice and writting and deploying my own back-end code onto it (Python/Flask). This is the third project I write the back-end for and the second I fully set up.
