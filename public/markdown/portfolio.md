# Introduction

This project was built with the objective of being a **easy to update and manage** place where I could showcase my works and also get to use React and Bootstrap.

### React
As I built the project, it became clear to me how good React was at helping me make re-husable, mantainable code by combining the idea of components with the paradigm of functional programming.

It was a great experience for me to use React for this project as I was able to see first hand what React has to offer (Compartmentalization of code via components and the hability they have to react to any changes and send information to one another) and where it lacks (Bootstrap compatability, no Markdown support) and sticking to it and finding workarounds for its shortcomings as well as leveraging its best features gave me a real sense of what it feels like to build and mantain a real life project.

### Bootstrap
I only found out that Bootstrap was not fully compatible with React once I was already way too deep into the project, but thankfully the open source community had my back; It only took me half a day of scratching my head at my code not working plus 3 hours of googling and Stackoverflow questioning and an extra hour or so of reading trough the react-bootstrap package docs and implementing it onto my project to fix my Bootstrap modals not showing on my React application. And, for some reason, I loved every second of it.

### The big picture
As I made the website I realized that if I was to manage its content over the coming months I needed a solution for data storage and creation.

I started researching and the final solution that I came up with has to do with two main topics: data storage and data serving.

**Data storage:** This meant the separation of components from their data, saving that data somewhere else. For this I needed to choose two things: the place to store the data at and the format to store it as. I chose JSON and Markdown as the formats and as for the location, after researching how Vitejs bundled its applications, the obvious solution was inside the public/ directory.

- **Why JSON and Markdown:** JSON and Markdown compliment eachother very well in my opinion, I can have a JSON store all granular variables needed for a component and use Markdown for the large text parts, then store the Markdown paths inside the JSON as just another item.

- **Why the public/ directory:** The way Vitejs bundles its applications, it takes in everything that resides in the src/ directory and well... bundles it together (converts files to JS/CSS/HTML, optimizes the code, etc). However the public/ files are served as-is, which means I can change those files any time I want and I wont need to rebuild my project, which also means I dont have to re-deploy my application to the server every time I want to make a change, as long as that change is inside the public/ directory (with some caviats, but generally speaking)

**Data serving:** With the content not being hardcoded onto the components anymore, the only solution is to ask for it to our own server. We now fetch the data we need, and fetching can go well or wrong, so we need to account for a failed fetch request.

The way I am accounting for failed fetches is by throwing an alert to the user and asking for a reload. I think for this portfolio website is good enough since all my fetch requests are to the same server, so if the user can get the page that asks for the fetching, there should be no reason not to get the fetched data unless I did something terribly wrong.

**A note on the page:** I did not 100% separated the data from the components. Being this a small portfolio webpage I only separated the things I thought I would ever want to change, but for some cases the data was so granular and core to the component that I could see myself changing the whole component before ever changing that particular piece of data. On those cases I didn't bother for my personal portfolio.


This is the final project structure (im skipping other directories/files for clarity's sake):
```
.
├── src/
│   └── components/
│       ├── comp1/
│       ├── comp2/
│       └── ...
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
        ├── Comp1.json (optional)
        └── ...
```

### Custom markdown ! ! !
Thanks to **react-markdown**'s hability to pass in customs components, I was able to customize my own markdown !

For example, this is a normal markdown **bold text**, and this is my **$$special markdown bold text** and my **$$$special markdown bold text smaller edition**. Looks familiar? Yep, I used it on my intro card at the top of the page (with a different font), that is markdown too!

```
Here is how you write the special bold text:
**$$Big size special bold text**
**$$$Small size special bold text**

Here is how you customize images:
![{"width": "50%", "someOtherAttribute": "someValue"}](./img/path.svg)

Also, the code-block style is custom, I added the border and background color to it.

```

### Leveling up my CSS
It blows my mind how many new things I have discovered about CSS while making this project: expressions (calc()), variables (--myVar, var()), pseudo-classes (.component:hover), accessing children of a tag based on parent's selector **AND** a pseudo-class being active (.parent:hover .children), all that and many other CSS properties like position (static, relative, absolute), transition, white-space, etc...

I have come to understand that CSS is much more powerful that I initialy thought but I can also see why a CSS library or framework is in place in order to speed things up. Truth is, Bootstrap really sped up my work.

### Full-stack
I also made the back-end for this project, from renting the server to setting it up with my OS of choice and writting and deploying my own back-end code onto it (Python/Flask). This is the third project I write the back-end for and the second I fully set up.
