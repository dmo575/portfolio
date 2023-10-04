# Introduction

This project was built with the objective of being a **easy to update and manage** place where I could showcase my works and also get to use React and Bootstrap.

Tech used: X X X X X X X X X X X 

### React and Bootstrap
As I built the project, it became clear to me how good React was at helping making re-husable, mantainable code by combining the idea of components with the paradigm of functional programming.

I only found out that Bootstrap was not fully compatible with React once I was already way too deep into the project, but thankfully the open source community had my back; It only took me half a day of scratching my head at my code not working plus 3 hours of googling and Stackoverflow questioning and an extra hour or so of reading trough the react-bootstrap package docs and implementing it onto my project to fix my Bootstrap modals not showing on my React application. And, for some reason, I loved every second of it.

It was a great experience for me to use React for this project as I was able to see first hand what React has to offer (Compartmentalization of code by components and the hability they have to react to any changes and send information to one another) and where it lacks (Bootstrap compatability, no markdown support) and sticking to it and finding workarounds for its shortcomings as well as leveraging its best features gave me a real sense of what it feels like to build and mantain a real life project.

### The big picture
As I made the website I realized that if I was to manage its content over the coming months I needed a solution for data storage and creation. For this reason I decided to look into markdown languages and their integration into React applications. I ended up using the package **react-markdown** from GitHub.

After I added markdown, I noticed that I still had a lot of data in .js files that was used in the project but that made no sense to place in a .md file, like all the different data that makes up a Card component. I wanted that data to be outside the /src directory because I didn't want to re-bundle my app every time I changed a simple line like "Welcome" to "Hi there" or something like that, but the idea of placing .js files, even if they contained just data, inside the /public directory felt awfully wrong (what could happen if because Vite's optimization the references to those files inside the /src content got renamed, it would break the whole thing. Plus, my .js files inside /public would not get optimized at all), so after some research I realized that JSON was just the best format to use in this case.

This is the final project structure (im skipping other directories for clarity's sake):
```
.
├── src/
│   └── components/
│       ├── comp1/
│       │   ├── comp1.jsx
│       │   └── comp1.css (optional)
│       └── comp2...
│       
└── public/
    ├── images/
    │   ├── img1.svg
    │   └── ...
    │
    ├── markdown/
    │   ├── calculatormaster.md
    │   └── ...
    │
    └── JSON/
        ├── Cards.json
        ├── Comp3.json (optional)
        └── ...
```

### Custom markdown ! ! !
Thanks to react-markdown components, I was able to customize my own markdown!.

For example, this is a normal markdown **bold text**, and this is my **$special markdown bold text** and my **$$special markdown bold text secondary**. Sounds familiar? Yep, I used it on my intro card at the top of the page, that is markdown too!

Also, the code blocks are customized as well.

I must say, the react-markdown docs are a bit cryptic to me, so I might have taken the easy route to customization-land (parsing), but practicality is important in web development, or so I have heard.

### Leveling up my CSS
It blows my mind how many new things I have discovered about CSS while making this project: expressions (calc()), variables (--myVar, var()), pseudo-expressions (.component:hover), accessing children of a selector based on parent selector AND a pseudo-expression triggering (.parent:hover .children), all that and many other CSS properties like position (static, relative, absolute), transition, white-space, etc...

I have come to understand that CSS is much more powerful that I initialy thought but I can also see why a CSS library or framework is in place in order to speed things up.

### Full-stack
I also made the back-end for this project, from renting the server to setting it up with my OS of choice and writting and deploying my own back-end code onto it (Python/Flask). This is the third project I write the back-end for and the second I fully set up.
