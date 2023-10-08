# Introduction

This project was built with the objective of being a **easy to update and manage** place where I could showcase my works and also get to use React and Bootstrap.

### The big picture
As I made the website I realized that if I was to manage its content over the coming months I needed a solution for data storage and creation.

I started researching and the final solution that I came up with has to do with two main topics: data storage and data serving. I ended up going fairly deep for a first dive and wrote an entire post titled **$$$"Vitejs case study: Differences between import statements (ES6) and fetch/http requests within the public/ and src/ contexts"** (Please check it out!)

**Data storage:** This meant extracting the data out of the components and saving it somewhere else. For this I needed to choose two things: the place to store the data at and the format to store it as. I chose JSON and Markdown as the formats and as for the location, after researching how Vitejs bundled its applications, the obvious solution were the public/ and the src/assets/ directories.

- **What went into the public directory:** Content that I knew I would want to modify some day in some form.

- **What went into the assets directory:** Content that I absolutely needed to send along the rest of the page in the initial request of the webpage. In my case this was only one thing that I just wanted to implement and it was the error message for http requests, more on it later.

- **Why JSON and Markdown:** JSON and Markdown compliment eachother very well in my opinion, I can have a JSON store all granular variables needed for a component and use Markdown for the large text parts, then store the Markdown paths inside the JSON as just another item.

- **Why the public/ directory:** The way Vitejs bundles its applications, it takes in everything that resides in the src/ directory and well... bundles it together (converts files to JS/CSS/HTML, optimizes the code, etc). However the public/ files are served as-is, which means I can change those files any time I want and I wont need to rebuild my project, which also means I dont have to re-deploy my application to the server every time I want to make a change, as long as that change is inside the public/ directory.

**Data serving:** With most of the content not being hardcoded onto the components anymore, the only solution to get it back is to fetch it, and fetching can go well or wrong, so we need to account for a failed fetch request.

- **Handling errors:** The website handles fetching errors at any time by informing the user about it.

    The way it works is that if an error occurs, any component can call the Error function, which is sent as a context to them. The Error function then adds the new error to the list and opens a modal that shows all errors along a message to the user informing it of steps to take.

    You should never see this if everything goes well, so I have attached a .gif showing what would it look like if the client were to get any fetch error anywhere in the site.

**A note on the page:** I did not 100% separated all the data from the components. Being this a small portfolio webpage I only separated the things I thought I would ever want to change, but for some cases the data was so granular and core to the component that I could see myself changing the whole component before ever changing that particular piece of data. On those cases I didn't bother for my personal portfolio.

This is the final project structure:
```
.root/
├── src/
│   ├── assets/
│   │   └── data I want to guarantee is sent in the initial request
│   ├── components/
│   │   ├── comp1/
│   │   ├── comp2/
│   │   └── ...
│   ├── js/
│   │   └── utility js classes
│   └── ...
└── public/
    ├── images/
    │   ├── img1.svg
    │   └── ...
    ├── JSON/
    │   ├── json1.json
    │   └── ...
    └── markdown/
        ├── markdown1.md
        └── ...
```

### Custom markdown ! ! !
Thanks to **react-markdown**'s hability to pass in customs components, I was able to customize my own markdown !

For example, this is a normal markdown **bold text**, and this is my **$$special markdown bold text** and my **$$$special markdown bold text smaller edition**. Looks familiar? I used it on my intro card at the top of the page (with a different font), that was markdown too!

```
Here is how you write the special bold text:
**$$Big size special bold text**
**$$$Small size special bold text**

Here is how you customize images:
![{"width": "50%", "someOtherAttribute": "someValue"}](./img/path.svg)

Also, the code-block style is custom, I added the border and background color to it.

```

### React
As I built the project, it became clear to me how good React was at helping me make re-husable, mantainable code by combining the idea of components with the paradigm of functional programming.

It was a great experience for me to use React for this project as I was able to see first hand what React has to offer (Compartmentalization of code via components and the hability they have to react to any changes and send information to one another) and where it lacks (Bootstrap compatability, no Markdown support) and sticking to it and finding workarounds for its shortcomings as well as leveraging its best features gave me a real sense of what it feels like to build and mantain a real life project.

### Bootstrap
I have been able to get a firm grasp of bootstrap with this project and I loved it every step of the way. It is definitely a time saver, and it makes eager to learn more about it. I'm also curious about other styling solutions out there like Tailwind, I'll be sure to check those out as soon as possible too!

### Leveling up my CSS
It blows my mind how many new things I have discovered about CSS while making this project: expressions (calc()), variables (--myVar, var()), pseudo-classes (.component:hover), accessing children of a tag based on parent's selector **AND** a pseudo-class being active (.parent:hover .children), all that and many other CSS properties like position (static, relative, absolute), transition, white-space, etc...

I have come to understand that CSS is much more powerful that I initialy thought but I can also see why a CSS library or framework is in place in order to speed things up. Truth is, Bootstrap really sped up my work.

### Full-stack
I also made the back-end for this project, from renting the server to setting it up with my OS of choice and writting and deploying my own back-end code onto it (Python/Flask). This is the third project I write the back-end for and the second I fully set up.
