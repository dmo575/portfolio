
// custom components for ReactMarkdown
const components = {

    pre({node, ...rest}) {

        return (
        <pre className="pre" {...rest}/>
        );
    },
    img({node, ...rest}) {

        const data = JSON.parse(rest.alt);
        rest.alt = data.alt;

        return(
            <img className="rounded-5" {...data} {...rest}/>
        );
    },
    a({node, ...rest}) {
        return (
            <a target="_blank" {...rest}/>
        );
    },
    strong({node, ...rest}) {

        let classes = "";

        // check if the first children is a text, which should be if we 
        // are using the $$$ syntax for spacial bold styling.

        if(node.children[0].type == "text") {

            // get the first 3 characters of that text
            const start = node.children[0].value.substring(0, 3);
    
            // small parsing hack for markdown bold text (**like this**)
            // when writting bold text, if you start that text with:
            // $ -> means you really just want to use the $ symbol
            //      example: (**$ dollars in normal bold**)
            // $$ -> means you want to use profile-section-highlight-primary clas
            //      example: (**$$special bold text LARGE ver**)
            // $$$ -> means you want to use profile-section-highlight-secondary class
            //      example: (**$$special bold text SMALL ver**)
    
            let toRemove = 0;
    
            // if we indeed have at least 3 characters and they are $$$:
            if (start.length == 3 && start == "$$$") {
                toRemove = 3;
                classes = "profile-section-highlight-secondary";
            }
            // else if we have at least two characters and they are $$
            else if(start.substring(0,2) == "$$") {
                toRemove = 2;
                classes = "profile-section-highlight";
            }

            // if its a string, just change it
            if(typeof(rest.children) == "string") {
                rest.children = rest.children.substring(toRemove,);
            }
            // if its not a string, its an array
            else {

                // get the first element, which contains the $$ syntax
                let [firstElement, ...others] = rest.children;
                // remove the $$ syntax from it (we cannot do this directly
                // from rest.children as the array elements are read-only)
                firstElement = firstElement.substring(toRemove,);

                // set the entire array to be what it was plus the
                // edited first element
                rest.children = [firstElement, ...others];
            }
        }

        return (
            <strong className={classes} {...rest}/>
        );
    }
};

export default components;