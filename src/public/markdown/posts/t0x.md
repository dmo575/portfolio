## **Writing endpoints for your Spring Boot application (MVC, REST, HTTP)**

This post focuses on understanding all the options that Spring Boot provides for you to create endpoints and build your API. If you are wondering how to create a REST API, or a MVC API, or just how to take complete control of the return HTTP when using Spring Boot, then this post should be of interest to you.

We also cover how to read the request and how to properly handle errors.

Spring Boot comes with many tools that allow you to work with all those things, but you need to know how things work in order to properly understand how to write your endpoints. So let's do that.

### **Contents**
- **Prerequisites** *-> What you need to know*
- **Setting up your Spring Boot project** *-> Get a spring boot project running*
- **The Spring Web dependency** *-> Why we added this dependency*
    - **Curious about servlets and servlet containers?** *-> Relationship between servlet, WAR, servers...*
- **The project structure** *-> Where files go*
- **Speaking the language** *-> Showing the problem we aim to solve*
- **HTTP** *-> Writing endpoints for HTTP*
- **REST** *-> Writing endpoints for REST*
- **MVC** *-> Writing endpoints for MVC*
    - **Templates** *-> Explaining templates*
    - **Thymeleaf: An example** *-> Explaining Thymeleaf*
    - **MVC Theory** *-> Explaining MVC*
    - **MVC Practice** *-> Coding MVC*
    - **Returning static files** *-> A note on Spring default behavior*
- **When things go wrong** *-> Showing how to handle errors, exceptions and status code changes*
    - **The wrong approach** *-> Showing what you would be inclined to do*
    - **The right approach** *-> Showing what you should do*
- **Accessing the Request HTTP** *-> How to access request data*
    - **Reading from the URL** *-> Accessing query params and path variables*
    - **RequestEntity** *-> Accessing the whole request HTTP*
    - **@RequestBody and @RequestHeader** *-> Alternative way to HTTP request data*
- **Conclusion** *-> We recapitulate what we learnt*


### **Prerequisites**

You should know about REST, MVC and HTTP.

We also won't talk about what the Spring Framework is or how to use it. We may mention a couple of things here and there but you should be somewhat familiar with the Spring framework; beans, factories, IoC and all the rest.

What we aim to answer is how to go about when creating endpoints for a Spring Boot application. Getting to that starting point will mostly not be covered.

- For **HTTP**, we will delve into how to take total control of the HTTP response; from the headers to the body.

- For **REST**, we will cover how to set things up so that you can properly create a REST API that returns JSON.

- For **MVC**, we will cover its theory and after that we will go right into implementing it.


### **Setting up your Spring Boot project.**

You should already know how to get a Spring Boot project going, but just in case. Let's go over that part quickly.

You will want to use Spring's Initializr to get a project.

Spring Initializr is a tool that allows us to easily set up a Spring Boot project. It takes care of all the dependency and set up work for us.

- Go to https://start.spring.io/
- Select a project manager (I'll use Maven)
- Select a language (I'll use Java)
- Select the Spring Boot version
- Fill in the project metadata as you wish
- Select the packaging and then the Java version
- Finally you will also want to select the dependencies. We will add the `Spring Web` dependency which is what we will work with.

Now all that is left is to download the files from there and open them up. You should now have a Spring Boot project ready.


### **The Spring Web dependency**

The reason we added the Spring Web dependency is because it brings a lot of new tools and functionality to our project, like:

- An embedded servlet container: By default is Tomcat.
- Spring MVC: All the tools needed to support the MVC model in Spring.
- Spring Web Annotations: Various useful annotations for when creating web applications with Spring Boot (`@Controller`, `@RESTController`, `@RequestMapping`, etc...)
- And more...

**Curious about servlets and servlet containers ?**

When we create web applications with Java, we usually want to build something called a WAR (Web Application Archive), which contains all of our static files, our endpoints, our HTML/CSS/JS, all that. Now, our java code that contains our endpoints leverages what we call servlets, so you can think of our Java code as the servlet part of the WAR.

Once we have the WAR, we need to pass that into a program that can serve all we have there via HTTP. Those are called servers.

Not all servers accept WARs (note: WARs are called servlets some times for simplicity but as you know they are not the same thing), so when a server can take in a WAR we call them servlet containers. Tomcat is such a program; it is an application that can serve things via HTTP, including WAR files.

Now into the embedded part. You see, in a traditional setting, you would create your WAR file, then install a server compatible with WARs in your system, and then place the WAR in the proper directory for that server to see it so we can finally start the server. With Spring however we are not building a WAR, we are building a JAR, which is an application that we can execute. Most precisely we are building a Spring Boot application that contains an embedded Tomcat server inside, so all we have to do is execute the JAR and Spring takes care of using and managing that embedded Tomcat server.

So, to define them all again:

- Servlet: Is the tools we use in Java to create endpoints that are designed to take in HTTP requests and return HTTP responses.
- WAR: Is a package that contains our servlet code, our static files, our HTML/JS/CSS and other resources related to our website. It is basically a web application container.
- Server: Is an application that is capable of handling HTTP requests/responses trough a network.
- Servlet Container: Is a server that can work with WAR files.
- JAR: Is a standalone Java application
- Embedded application: Is an application that is contained inside another application. In our example that application is a server.


### **The project structure**

Just a quick mention: JS/HTML/CSS files and other media should go under `src/main/resources/static/` and templates (templated HTML for the MVC which we will explain later) should go under `src/main/resources/templates/`. I believe you can customize all this but by default that is where Spring will look for these things.


### **Speaking the language**

At this point we have our Spring Boot project ready. Here is where we need to stop and think about what tools we have and how do they behave. Remember we are adding to this **existing** machine, so we need to learn the rules for which it operates.


Let's say that we want and endpoint to index, and we want to return the string "Hello, World!" in the response body of the HTTP. With Spring, we would use a method to define an endpoint.

Let's start writing:

```
public class MyClass {
	
	public String index() {
		return "Hello, World!";
	}
}
```

There we have a class with a method. We want that method to represent an endpoint to index (/). For that, the first thing we need to do is to tell Spring that the `MyClass` class will be storing endpoints, so we use the `@Controller` annotation.

The `@Controller` annotation is a class level annotation that tells spring that the annotated class should be scanned for endpoints:

```
@Controller
public class MyClass {
	
	public String index() {
		return "Hello, World!";
	}
}
```

We are still lacking. Spring may detect the `@Controller` class, but right now it cannot possibly identify index() as an endpoint. For that we need to use the `@RequestMapping` annotation.

The `@RequestMapping` annotation, when used on a method, tells Spring that the method is to be treated as an endpoint.

```
@Controller
public class MyClass {

	@RequestMapping(path="/", method=RequestMethod.GET)
	public String index() {
		return "Hello, World!";
	}
}
```

As the code shows, you can pass in the path and the HTTP method you want to work with to the `@RequestMapping` annotation.

You would think this is good enough, but we are lacking some stuff here. You see, when interpreting what the endpoint is trying to return, Spring follows a certain set of rules, and one of those is that if your endpoint is just a normal endpoint returning a `String`, then Spring will assume that you mean to return a `View` of an MVC. So if we run this (`mvn spring-boot:run` if you are using Maven), you will see that we get an error.

As it is right now, running this code will make Spring to try to locate a `View` named "Hello, World!", which doesn't exist.

But how could you know that this set up would led to all that in the first place? You don't even want to use MVC, you just want to return a text back. Well that is why it is important to understand the **machine** we are using. Because it has rules like that all over the place that there's no way to know unless you sit down and start digging.

We will now go into each of the following: HTTP, REST, MVC . And we will learn about different classes and annotations that Spring provides to us as we go. Keep in mind we will only go deep enough to get something running.

### **HTTP**

We will start with the basics. Our objective here is to be able to create and send our own HTTP response.

The first thing we need is a `@Controller`, because that tells Spring that the specified class holds endpoints.

Then for each endpoint we need to use the `@RequestMapping`, because that tells Spring which methods are the endpoints and it also links them with a path and a method.

After that, we need to tell Sping that we want to return an HTTP message object. For that, Spring has a class called `ResponseEntity<T>`.

`ResponseEntity<T>` is the class that represents your HTTP response. There you can handle the headers and the body of the response.

The generic type in the `ResponseEntity<T>` defines the type of the body. If it is a String, then you will pass a string. If it is a class, then you can pass an instance of that type, and Spring will serialize it into the response body. By default, Spring will serialize objects to JSON, but this behavior can be customized. For example, you can configure Spring to serialize objects to XML instead of JSON.

So now we have all the pieces we need: We told Spring where to look for endpoints with `@Controller`, we also told it who the endpoints are with `@RequestMapping` and finally by using `ResponseEntity<T>` as the return type we told it that we wanted to return a whole HTTP message.

Let's see it in code:

```
@Controller
public class MyClass {

	@RequestMapping(path="/", method=RequestMethod.GET)
	public ResponseEntity<String> index() {
		. . .
	}
}
```

Now all that is left is to actually create that HTTP response that we want to send out, and we have a couple of ways to do that.

**First** we have the normal way, which consists of creating a new instance of `ResponseEntity<T>`, populating it and then returning it.

```
@Controller
public class MyClass {

	@RequestMapping(path="/", method=RequestMethod.GET)
	public ResponseEntity<String> index() {
	        String str = "Hello, World!";

        	HttpHeaders headers = new HttpHeaders();
        	headers.add("my-header", "my-value");
        
        	ResponseEntity<String> response = new ResponseEntity<String>(str, headers, HttpStatusCode.valueOf(200));
        	return response;
	}
}
```

Note that to deal with headers we create an instance of `HttpHeaders`, add the headers to the instance and then pass it to the ResponseEntity's constructor.
Also note that you don't have to worry about generating all the boilerplate headers like Content-Length.


**Secondly** we have the simple mode. Which is consists of making use of ResponseEntity's static methods for generating pre-defined HTTP responses.

These pre-defined HTTP messages try to cover the most used cases. They take in an argument for the HTTP body. Lets take a look at some of them:

```
ResponseEntity.ok(body)
ResponseEntity.notFound(body)
ResponseEntity.created(body)
(and more)
```

Here is what it looks like in code:

```
@Controller
public class MyClass {

	@RequestMapping(path="/", method=RequestMethod.GET)
	public ResponseEntity<String> index() {
	        String str = "Hello, World!";
	        
        	return ResponseEntity.ok(str);
	}
}
```

As you can see, for common responses this is a quick way of getting the job done.

**Lastly** we can go low level (lower than ResponseEntity I mean) and directly deal with servlets:

```
@RequestMapping(path = "/http_servlet", method = RequestMethod.GET)
public void http_servlet(HttpServletResponse response) throws IOException {
	String str = "Hello, World!";
	response.setStatus(HttpServletResponse.SC_OK);
	response.setHeader("my-header", "my-value");
	response.setContentType("text/plain");
	response.getWriter().write(str);
}
```

Note how much more cumbersome it becomes to manage the response when going to servlet level. You now have to deal with possible IOExceptions, you have to remember to add the HttpServletResponse argument in the endpoint signature, and it looks more cryptic overall. Also note that now the return type is void, unintuitive.

It is good to know the option is there and that you can use it but I would recommend ResponseEntity over this method.

We now know how to return HTTP messages from our endpoints. Now all that is left is to go and further research the ResponseEntity class.

Let's go over to REST.


### **REST**
Rest is really simple:
- Use `@Controller`
- Use `@RequestMapping`
- Use `@ResponseBody` on the endpoind methods. This will let Spring know that whatever you return is to be placed in the body of the HTTP response.
- In addition, we use the `@ResponseStatus` annotation to have control over the status code we return if everything goes well (we will cover what to do if everything doesn't go well at the end)

```
@Controller
public class MyClass {

	@RequestMapping(path="/", method=RequestMethod.GET)
	@ResponseBody
	@ResponseStatus(HttpStatus.CREATED)
	public Animal index() {
		Animal a = new Animal("Cow");
		return a;
	}
}
```

Let's go over that code:
- Spring knows about the Controller so it can scan for endpoints.
- Spring can identify the endpoint because of the `@RequestMapping`.
- Spring knows that the return value of that method is to be placed inside the response body because of `@ResponseBody`.
- Spring also knows what status code to use if everything goes fine with the method because of `@ResponseStatus`.
- Finally, we also know that Spring can JSONify the object we are returning, and that is exactly what it will do because that is what Spring is configured to do when serializing objects into an HTTP body.

Knowing all that, it is time to introduce a new annotation: `@RESTController`

The `@RESTController` annotation combines both `@Controller` and `@ResponseBody` at a class level, which means that we no longer have to add `@ResponseBody` to every endpoint method:

```
@RESTController
public class MyClass {

	@RequestMapping(path="/", method=RequestMethod.GET)
	@ResponseStatus(HttpStatus.CREATED)
	public Animal index() {
		Animal a = new Animal("Cow");
		return a;
	}
}
```


### **MVC**

This is the most complicated of the three ways of structuring the API. The other two were straight forward but for this one we need to know about the MVC model and also what templates are. So let's go over it quickly.


**Templates**

When we talk about templates in this context, we mean templated HTML. That is HTML that has some syntax within that is not HTML, but rather syntax that is there to represent placeholders.

With HTML, the syntax we use to add these placeholders comes from "templating engines". In Spring Boot there is no default templating engine, you have to add your own.

We will add Thymeleaf as the templating engine. The following code adds it to a Maven project which is what I'm using.

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

Now, because this is Spring Boot, by including this dependency we ensure all the configuration is done for us. Let's see how:
- We include the dependency in Maven/Gradle.
- Spring Boot applications are configured to output an Uber JAR (also known as a fat JAR), which is a JAR that also contains all the dependencies within it.
- When we execute the JAR, the Spring Boot Loader constructs the classpath. This classpath includes all the dependencies that are inside the Uber JAR.
- Spring Boot uses the classpath to know what it needs to configure.
- Knowing you have Thymeleaf added, Spring Boot will auto-configure it at run-time. This involves applying default configurations as well as incorporating any customizations you have specified.


**Thymeleaf: An example**

Take a look at this code:

```
<h1>Some text here, Hi</h1>
<p th:text="'Hello, ' + ${user?.name ?: 'User'} + '!'"></p>
```

That is a valid Thymeleaf templated HTML file.

Here is how we are using Thymeleaf in that code:

- **th:text**: This is a thymeleaf property, it means that on the text area of this tag we will assign some text.
- **"'Hello, ' + ${user?.name ?: 'User'} + '!'"**: This is the text we assign. If user is provided and name exists we go with "Hello, [user.name]!", else if one of the two perviously mentioned conditions is not met we go with "Hello, User!"

This is the kind of HTML file you save under `src/main/resources/templates/`.


**MVC Theory**

In MVC, we have three main components: Controller, Model and View.

- Controller: This we have seen it before, is literally the `@Controller` class. Is where the endpoints are.
- View: These are the temaplted HTML files in our project, like the one we just saw.
- Model: This is what we will cover next.

When you have templated HTML, you usually have so because you want to generate some HTML from it by combining that template with some data. The data comes from something called a Model in MVC.

For example in the templated HTML we that showed earlier you could see we had something called `user`, and that `user` had a property called `name`. `User` would be the model. That templated HTML is dependent on a `user` model.

The flow of MVC goes like this:
- You get an HTTP request to the Controller.
- The Controller has to do two things now: Create a model object and decide on a template to use.
- Once the controller has the data (the model object) and knows which template to use, it must convey that information to the **View resolver**.
- A **View resolver** (provided by Spring Boot in this case) takes the given information (the Model/data and the view) and creates the final HTML text that is to be sent back to the client.


**MVC Practice**

Let's see the MVC in code, starting with a Model:

- To create a model we use a class. Note that we don't really need to add any annotation to the model class.
- We use getters and setters for our fields so that Spring's View resolver can properly access the model's data when creating the final HTML.

A small mention on what the Model class is there for: Is is supposed to represent a record in a database. In theory, in your endpoint you most likely would want to do something with a database and having a class like this that represents a record makes things easier to read and work with all around. It also makes it very convenient when using Java's JPA or Spring's JPA, which is something out of the scope of this post.

Now let's see what a Model looks like:

```
public class User {
	private String name;
	public User(String name) {this.name = name;}
	public String getName() {return name;}
}
```

With that Model in place, let's make sure that we have some Views to make use of it:
- Make sure you have Thymeleaf or any other templating engine properly set up.
- Create a templated HTML file and place it inside the `src/main/resources/templates/` directory.
- Remember the name of the file as that will be how we will identify it in code.
- That's it. A View is how we refer to a templated HTML file in code.

Finally, we go over the Controller. Just like with HTTP, when dealing with MVC we have several ways to write the same thing.

Let's first explain the **simple approach**:

```
@Controller
public class MyController {

	@RequestMapping(path="/", method=RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public String getUser(Model model) {
		User u = new User("Jeff");
		model.addAttribute("user", u);
		
		return "viewName";
	}
}
```

Let's explain that code:
- Our endpoint is set to return a String. This string is to be the name of the view. Remember what we return here will go over to a View resolver, not the client.
- We add a parameter to our endpoint. It is called `Model` but it is not really a model, it is an object into which you can put any models you want to provide to the View resolver. We do that with the `addAttribute` method.
- The string in the `addAttribute` method defines the name to which we can refer to that `u` object in our templated HTML. This example is compatible with the templated HTML code we posted earlier (assuming we saved that tempalte as "viewName.html" inside the `src/main/resources/templates/` directory).


Now let's go over the slightly more **complex approach**:

```
@Controller
public class MyController {

	@RequestMapping(path="/", method=RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public ModelAndView getUser() {
		ModelAndView maw = new ModelAndView();
		User u = new User("Jeff");
		
		maw.setViewname("viewName");
		maw.addObject("user", u);
		
		return maw;
	}
}
```

I believe this is self explanatory.

I personally like this approach the most. It is more lengthy to write but to me it makes the code clearer:
- Instead of a `Model` parameter that you need to remember to add and that is not really a model contrary to its name, we have a `ModelAndView` object that we instantiate.
- Instead of having to remember that we need to return a `String` that is to be the view name, we return the `ModelAndView` object we created.
- We just need to remember `ModelAndView` and know its methods.


**Returning static files**

As a note, you can do `www.page.com/subfolder/index.html` on your browser and it will work. Meaning unless you configure it otherwise, people can access anything you have by just typing the correct path.

There are security dependencies out there to prevent this from happening.


### **When things go wrong**
We know how to handle HTTP responses of any type. After all we have complete access to the status code in those cases. But what about REST? Do we know how to handle errors with REST? And MVC?


**The wrong approach**

Let's start with REST. Maybe we could just use a `ResponseEntity<T>` with REST... You may be thinking "But I am using `@RESTController` which makes it so that my endpoints' return value cannot be a `ResponseEntity<T>` object, how could that work?" Well, even if you are using `@RESTController` for the class or a `@ResponseBody` for the method (Which you could just remove in such a case but anyways), if you return a `ResponseEntity<T>`, Spring will scrap the `@ResponseBody` annotation and will think that you want to return the whole HTTP response.

Let's try it:

```
@RESTController
public class MyClass {

	@RequestMapping(path="/rest_wrong_2", method=RequestMethod.GET)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public ResponseEntity<Animal> restWrong() {
		try {
			Animal a = new Animal("Cow");
            //throw new Exception("ERROR");
			return new ResponseEntity<Animal>(a, HttpStatus.CREATED);
		}
		catch(Exception e) {
			return new ResponseEntity<Animal>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
```

Take a look at the controller annotation; it is a `@RESTController` annotation, which adds the `@ResponseBody` to all the class' endpoints. Not only that but we also added a `@ResponseBody` in there just for fun. Will we get an error now that we are returning `ResponseEntity<Animal>`? Will we return an HTML response inside an HTML response body? Nah, Spring will just omit that `@RESTController` and `@ResponseBody` and will assume you want to take over the whole HTTP response.

However... if you take a look at that code, you will notice that there is no way for us to return anything but an `Animal` in that response body, even if things go wrong. This is because the return type of the method dictates that the body must contain an `Animal` instance, and we cannot change that. Then, what can we do? Do not despair my friend for I shall teach thee of the righteous path to error handling.


**The right approach**

When dealing with errors, exceptions, change in the status code of a response and all that, we have a way, and where we have a way, we have a Spring annotation.

You see, endpoints are not the only kind of methods that can go in a Controller class. You can also have exception handlers who return things back to the client.

```
@ExceptionHandler(SomeException.class)
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public ResponseEntity<String> someExceptionHandler(SomeException ex) {
	. . .
}
```

You know most of the code there. The only new thing is the `@ExceptionHandler` annotation. This annotation takes in an exception class. Whenever an endpoint throws such an exception, this method takes over. Note that an argument of the exception type is provided and will be populated with the thrown exception when the method is called.

Let's look at an example.

Here is a RESTful API with one endpoint and one exception handler:

```
@RESTController
public class MyRestController {

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path="/animal", method=RequestMethod.POST)
    public Animal createAnimal() throws AnimalNotCreatedException {
        // some code here to attempt and create the animal
        if(animal != null) {
            return animal;
        }

        throw new AnimalNotCreatedException("Oh no, we couldn't create the animal");
    }

    @ExceptionHandler(AnimalNotCreatedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @RequestBody
    public String errorCreatingAnimal(AnimalNotCreatedException ex) {
        return ex.msg();
    }
}
```

Starting with the endpoint, we see that it is a RESTful endpoint; It is trying to return a newly created animal object back to the client as a JSON. At the end of the method you can see we check if the animal is null or not. If it is not null we go our merry way but if it is, we throw an exception. The moment we throw that exception we are done with the endpoint, but the client is still waiting, so let's move to the exception handler.

Over to the exception handler we can see that it takes care of the exception type that our endpoint can throw. We also see that this exception is a bit different than the previous one we showed, this is to show you that you can construct these however you like. Once you know the rules you can do whatever you want.

We see that the exception is to return the body of the response and the status code is to be 500 (INTERNAL_SERVER_ERROR). We also use the `ex` argument to get that error message text, we will return that in the response body.

This is to my understanding the normal way of dealing with errors, exceptions and status code changes in your endpoints; Throwing custom exceptions.


### **Accessing the request HTTP**

This is the last stop. There is only one last thing we need to cover: How to retrieve data from the request HTTP message.

There are many ways to do this. We will divide them into three sections:
- Reading from the URL: We will see how to retrieve **path variables** and **query parameters** from the URL.
- RequestEntity: We will cover how to retrieve the request headers and body using `RequestEntity<T>`.
- @RequestBody and @RequestHeader: We will also show how to use these to retrieve just the body or the header.


**Reading from the URL**

- Here is how you would format a path that contains a path variable: `/animal/{id}`.
- And in case you forgot, this is what query parameters look like: `path?query1=param1&query2=param2`

Let's see an example with two annotations. One that deals with path variables and another one that deals with query parameters:


```
// path variables
@RequestMapping(path="/animal/{id}", method=RequestMethod.GET)
@ResponseStatus(HttpStatus.OK)
public Animal getAnimal(@PathVariable("id") String id) {
    ...
}
// query parameters
@RequestMapping(path="/test", method=RequestMethod.GET)
@ResponseStatus(HttpStatus.OK)
public Animal test(@RequestParam(value="opt", required=false, defaultValue="sup") String opt,
                        @RequestParam(value="req", required=true) String req) {
    ...
}
```

With path variables, you:
- Use the variable-level annotation `@PathVariable` that takes in the name of the variable
- You can use a `String`, an `int` or similar

With query parameters, you:
- Use the variable-level annotation `@RequestParam` that takes in several arguments:
    - "value" is for the name of the query.
    - "required" specifies if the query must be present or not.
    - "defaultValue" gives a default value. This is only for non-required queries.
- When a required parameter is not provided, a `MissingServletRequestParameterException` exception is thrown.


**RequestEntity**

Here we will go over how to retrieve the entire request HTTP by using the `RequestEntity<T>` class.

```
@RequestMapping(path="/test", method = RequestMethod.GET)
@ResponseStatus(HttpStatus.OK)
@ResponseBody
public String test(RequestEntity<Animal> req) {

    Animal a = req.getBody();

    String header = req.getHeaders().getFirst("My-Header");

    return a.getName() + ", " + header;
}
```

All we have to do is simply add a `RequestEntity<T>` argument to the endpoint.
Notice how we can use the RequestEntity's generic type to cast the request body into a type (assuming the request body is a proper and compatible JSON).


**@RequestBody and @RequestHeader**

If all you want is to get the HTTP body or a speciffic header, all you have to do is use `@RequestBody` and/or `@Requestheader`.

```
// BODY
@RequestMapping(path="/test", method=RequestMethod.GET)
@ResponseStatus(HttpStatus.OK)
public String test(@RequestBody String body) {
    ...
}

// HEADER
@RequestMapping(path="/test2", method=RequestMethod.GET)
@ResponseStatus(HttpStatus.OK)
public String test2(@RequestHeader("My-Header") String header) {
    ...
}
```

### **Conclusion**
You now should know how to properly create endpoints for your Spring Boot application. Let's quickly mention all the elements covered.

**Annotations**
- `@Controller`: Class-level. Tells Spring the class is a controller
- `@RESTController`: Class-level. Combines `@Controller` and `@ResponseBody`
- `@RequestMapping`: Class/Method-level (we only covered method-level). Lets Spring know the path and HTTP verb the designated endpoint is to work with.
- `@RequestBody`: Field-level. Tells Spring to try to deserialize the request body into the designated variable.
- `@RequestHeader`: Field-level. Tells Spring to populate designated variable with value of specified header.
- `@ResponseBody`: Class/Method-level. Tells Spring the return value is to be serialized into the response HTTP body.
- `@ResponseStatus`: Method-level. Tells Spring what status code to return with the response HTTP.
- `@ExceptionHandler`: Method-level. Tells Spring the method should catch the specified Exception and take control from there.
- `@RequestParam`: Field-level. Substracts a query parameter (`?query=param`) from the URL.
- `@PathVariable`: Field-level. Substracts a path variable (`index/{var}/etc`) from the URL.

**Classes**
- `ResponseEntity<T>`: Represents the response HTTP message.
- `RequestEntity<T>`: Represents the request HTTP message.
- `ModelAndView`: Allows you to manage models and set the view all in one place.
- `Model`: Allows you to manage models.
- `HttpHeaders`: Represents a collection of headers.

**Exceptions**
- `MissingServletRequestParameterException`: Thrown if a required query parameter is not provided.

**Some extra**
- `@GetMapping`: Is `@RequestMapping` but the method is already set to GET.
- `@PostMapping`: ^
- `@DeleteMapping`: ^
- etc...