
const components = {
    pre(props) {
        const {node, ...rest} = props;

        return (
        <pre className="pre" {...rest}/>
        );
    },
    img(props) {
        const {node, ...rest} = props;

        
        return(
            <img className="rounded-5" width="15%" {...rest}/>
        );
    },
    strong(props) {
        const {node, ...rest} = props;
        const start = node.children[0].value.substr(0, 3);

        // small parsing hack for markdown bold text (**like this**)
        // when writting bold text, if you start that text with:
        // $ -> means you really just want to use the $ symbol
        // $$ -> means you want to use profile-section-highlight-primary class
        // $$$ -> means you want to use profile-section-highlight-secondary class
        let classes = "";
        
        if (start === "$$$") {
            
            rest.children = rest.children.substr(3,);
            classes = "profile-section-highlight-secondary";
        }
        else if(start.substr(0,2) === "$$") {
            
            rest.children = rest.children.substr(2,);
            classes = "profile-section-highlight";
        }

        return (
            <strong className={classes} {...rest}/>
        );
    }
}

export default components;