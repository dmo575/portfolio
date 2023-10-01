import * as logos from "./logos.js";
import * as icons from "./icons.js";


/* here goes all the website's content in Object format */

// debug
const debug_desc50 = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt beatae quis minima ratione aliquam, voluptatibus obcaecati odit ullam mollitia reprehenderit cumque laudantium fugiat illo itaque nobis debitis voluptates tempore, sapiente facere! Incidunt placeat veniam voluptas quaerat ad? Omnis, tenetur vero voluptatibus, quae ullam commodi mollitia ea aliquid laboriosam quam sed.";
const debug_projCardSrcL = "https://fastly.picsum.photos/id/288/300/300.jpg?hmac=7RMC2BTzA6EpogvGf74Us4VguwkoeSsLzBARJbs5VOk";
const debug_projCardSrcS = "https://fastly.picsum.photos/id/230/600/300.jpg?hmac=xaOtfLjlm4OwQVWYD4xcugIiy5Ebr_qNu7ymvmI2jv4";
const debug_profileL = "https://fastly.picsum.photos/id/893/300/400.jpg?hmac=Vy-UCZnBegnJLuZvrZtlgjA_xacW9xbYQsfq1SoLEbw";


// profile
export const profileLg = debug_profileL;
export const profileSm = debug_projCardSrcS;

// skills
const skill_js = {name: "JavaScript", src: logos.logo_js};
const skill_html = {name: "HTML 5", src: logos.logo_html};
const skill_css = {name: "CSS 3", src: logos.logo_css};
const skill_react  = {name: "React", src: logos.logo_react};
const skill_bootstrap = {name: "Bootstrap", src: logos.logo_bootstrap};
const skill_git = {name: "Git", src: logos.logo_git};
const skill_github = {name: "Github", src: logos.logo_github};

const skill_python = {name: "Python", src: logos.logo_python};
const skill_flask = {name: "Flask", src: logos.logo_flask};
const skill_sqlite = {name: "SQLite", src: logos.logo_sqlite};
const skill_vitejs = {name: "Vite.js", src: logos.logo_vitejs};
const skill_socketio = {name: "SocketIO", src: logos.logo_socketio};
const skill_webflow = {name: "Webflow", src: logos.logo_webflow};

const skill_lol = {name: `Emerald btw 😎`, src: logos.logo_lol};


export const skills = {
    core: [
        skill_js,
        skill_html,
        skill_css,
        skill_react,
        skill_bootstrap,
        skill_git,
        skill_github,
        skill_lol
    ],

    other: [
        skill_python,
        skill_flask,
        skill_sqlite,
        skill_vitejs,
        skill_socketio,
        skill_webflow        
    ]
}

const content_calculatorMaster = {
    parragraphs : {

    }
};

export const projectCards = [
    {
        title: "Calculator Master",
        srcL: debug_projCardSrcL,
        srcS: debug_projCardSrcS,
        description: debug_desc50,
        tech: [
            skill_js,
            skill_html,
            skill_css,
            skill_python,
            skill_flask,
            skill_sqlite,
            skill_git,
            skill_github
        ]
    },/*
    {
        title: "Project title",
        srcL: debug_projCardSrcL,
        srcS: debug_projCardSrcS,
        description: debug_desc50,
        tech: [
            skill_js,
            skill_html,
            skill_css
        ]
    },
    {
        title: "Project title",
        srcL: debug_projCardSrcL,
        srcS: debug_projCardSrcS,
        description: debug_desc50,
        tech: [
            skill_js,
            skill_html,
            skill_css
        ]
    }*/
]
