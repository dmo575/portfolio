# Introduction

This project was built with the objective of being a **easy to update and manage** place where I could showcase my works and also get to use React and Bootstrap without the need for deeping my hands onto the code every time I wanted to change some data.

### A comment on the blog-post:
I have a [blog-post](./blogpost/blogpost.html) where you can find me expanding on programming concepts that I learn as I build my projects. If that sounds like something interesting to you, please check it out !

### The big picture
As I made the website I realized that if I was to manage its content over the coming months I needed a solution for data storage and creation.

I started researching and the final solution that I came up with has to do with two main topics: data storage and data serving. I ended up going fairly deep for a first dive and **wrote an entire post all about import statements** [(Please check it out on my blog-post!)](./blogpost/blogpost.html)

![{"className": "img-md float-end img-w-s"}](./images/markdown/portfolio/folders.png)
Long story short, I ended up using JSON and Markdown as the formats to save all component's granular data and chuncks of texts respectively and after researching how Vitejs bundled its applications, the obvious solution were the `public/` and the `src/assets/` directories.

- **What went into the public/ directory:** Content that I knew I would want to modify some day in some form.

- **What went into the drc/assets/ directory:** Content that I absolutely needed to send along in the initial request of the webpage. In my case this was only one thing that I just wanted to implement (I have this little error system for fetch requests that prompts a message and I wanted to have the message not be sent in a separate fetch request since that would beat its purpose)

- **Why JSON and Markdown:** JSON and Markdown compliment eachother very well in my opinion, I can have a JSON store all granular variables needed for a component and use Markdown for the large text parts, then store the Markdown paths inside the JSON as just another item.

### Handling fetch errors:
Any fetch request that goes wrong will trigger an Error message to be sent to the user. You can test this feature by cloning the repo and running the dev server after modifying the name of any of the json or markdown files (with the exception of markdowns from the posts/ dierctory, those are for the blog-post which I treat as its own different page).

**A note on the page:** I did not 100% separated all the data from the components. Being this a small portfolio webpage I only separated the things I thought I would ever want to change.

### Custom markdown ! ! !
Thanks to **react-markdown**'s hability to pass in customs components, I was able to customize my own markdown!

For example, **this** is a normal markdown bold text, **$$this one** my special markdown bold text and **$$$this one** my special markdown bold text smaller edition. Looks familiar? I used it on my intro card at the top of the page (with a different font), that was markdown too!

```
Here is how you write the special bold text:
**$$Big size special bold text**
**$$$Small size special bold text**

Here is how you customize images:
![{"width": "50%", "someOtherAttribute": "someValue"}](./img/path.svg)

Also, the code-block style is custom, I added the border and background color to it.
```
### React
As I built the project, it became clear to me how good React was at helping me make re-husable, mantainable code by combining the idea of components with the paradigm of functional programming. It was a great experience for me to use it for this project as I was able to see first hand what React has to offer (Compartmentalization of code via components and the hability they have to react to any changes and send information to one another) and where it lacks (Bootstrap compatability, no Markdown support) and sticking to it and finding workarounds for its shortcomings as well as leveraging its best features gave me a real sense of what it feels like to build and mantain a real life project.

![{"className": "img-md float-end img-w-s"}](./images/markdown/portfolio/tech.png)
### Bootstrap
I have been able to get a firm grasp of bootstrap with this project and I loved it every step of the way. It is definitely a time saver, and it makes me eager to learn more about it. I'm also curious about other styling solutions out there like Tailwind, I'll be sure to check those out as soon as possible too!

### Leveling up my CSS
It blows my mind how many new things I have discovered about CSS while making this project: expressions (calc()), variables (--myVar, var()), pseudo-classes (.component:hover), accessing children of a tag based on parent's selector **AND** a pseudo-class being active (.parent:hover .children), all that and many other CSS properties like position (static, relative, absolute), transition, white-space, etc...

I have come to understand that CSS is much more powerful that I initialy thought but I can also see why a CSS library or framework is needed in order to speed things up. Truth is, Bootstrap really sped up my work.

### Full-stack
I wrote the back-end for this project. While I worked within the Node runtime environment for the front-end, I used Deno and its built-in server solutions for the back-end, so its written in Typescript. I had the chance to refresh some I/O concepts and ended up [writting about them on my blog-post](./blogpost/blogpost.html)

I also went trough the server renting and set up on Fedora Linux for this project and others.

I am currently writting another post about Server set up with Linux and Digital Ocean which I will submit to my blog-post as soon as I finish it.

### Multi-page application
I made the blog-post as a separate page instead of using a [react router](https://github.com/dmo575/ReactRouter) because I wanted to test how [my simple server](https://github.com/dmo575/portfolio-backend) would do with serving a multi-page application. It turned out to be a great idea to try this because I ended up having to learn more about Vitejs in order to accomplish it.