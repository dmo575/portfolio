

//ui-sans-serif
//style={{fontFamily: "var(--bs-font-monospace)"}}

const components = {
    p(props) {
        const {node, ...rest} = props;

        return (
            <p style={{fontFamily: "var(--bs-body-font-family)"}} {...rest}/>
        );
    },
    pre(props) {
        const {node, ...rest} = props;

        return (
        <pre className="pre" {...rest}/>
        );
    },
    img(props) {
        const {node, ...rest} = props;

        const data = JSON.parse(rest.alt);
        rest.alt = data.alt;

        return(
            <img className="rounded-5" {...data} {...rest}/>
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