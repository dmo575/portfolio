# Introduction

This project was built with the objective of being a **easy to update and manage** place where I could showcase my works, and also get to use React and Bootstrap without the need for deeping my hands into the code every time I wanted to change some data.

### A comment on the blog-post
I have a [blog-post](./blogpost/blogpost.html) where you can find me expanding on programming concepts that I learn as I build my projects.

### The big picture
As I made the website, I realized that if I was to manage its content over the coming months I needed a solution for data storage and creation.

I started researching and the final solution that I came up with has to do with two main topics: data storage and data serving. I ended up going fairly deep for a first dive on this topic and **wrote an entire post about how and when to use import statements and fetch with Vitejs** [(Link to it here)](./blogpost/blogpost.html)

![{"className": "img-md float-end img-w-s"}](./images/markdown/portfolio/folders.png)
Long story short, I ended up using JSON and Markdown as the formats for saving my static and components data and, after researching how Vitejs bundled its applications, the obvious solution for where to save the data were the `public/` and the `src/assets/` directories.

- **What went into the public/ directory:** Content that I knew I would want to modify some day in some form.

- **What went into the drc/assets/ directory:** Content that I absolutely needed to send along in the initial request of the web-page. In my case this was only one thing that I just wanted to implement (I have this little error system for fetch requests that prompts a message and I wanted to have the message not be sent in a separate fetch request)

- **Why JSON and Markdown:** I think JSON and Markdown compliment each other very well, I can have a JSON store all granular variables needed for a component and use Markdown for the large text parts, then store the Markdown paths inside the JSON as just another item.

### Handling fetch errors
Any fetch request that goes wrong will trigger an Error message to be sent to the user. You can test this feature by cloning the repo and running the dev server after modifying the name of any of the json or markdown files (with the exception of markdowns from the `posts/` directory, since those are for the blog-post which I treat as a different page).

**A note on the page:** I did not completely separate all the data from the components. Being this a small portfolio web-page I only separated the things I thought I would ever want to change.

### Full-stack
I wrote the back-end for this project. While I worked within the Node runtime environment for the front-end, I used Deno and its built-in server solutions for the back-end. Writting the back-end gave me the chance to refresh some I/O concepts and I ended up [writing about them on my blog-post](./blogpost/blogpost.html)

I also went through the server renting and set up on Fedora Linux for this project and others.

### React
As I built the project, it became clear to me how good React was at helping me create reusable, maintainable code by combining the idea of components with the paradigm of functional programming. It was a great experience for me to use it for this project, as I was able to see first hand what React has to offer (Compartmentalization of code via components and the ability they have to react to any changes and send information to one another) and where it lacks (Bootstrap compatibility, no Markdown support). Sticking to it and finding workarounds for its shortcomings as well as leveraging its best features gave me a good sense of what it feels like to build and maintain a real life project.