import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Markdown from "react-markdown";// a React component that allows me to use markdown in my jsx
import remarkGfm from "remark-gfm";// translates the .md file following the GFM standard
import rehyperaw from "rehype-raw";// allows the rendering of HTML code inside the .md file
import components from "./../js/markdownComponents.jsx";
import { appContext } from "./App.jsx";
import * as breakpoints from "./../variables/bsbp.js";


/* function Test() {

    const [show, setShow] = useState(false);

    function handleShow() {
        setShow(true);
    };

    function handleHidden() {
        setShow(false);
    };

    return(
        <>
        <Button className="btn flex-grow-1 btn-dark rounded-5" onClick={handleShow} >Check it out</Button>

        <div className="container">
            <Modal show={show} onHide={handleHidden}>
                <Modal.Body>
                    Modal content goes here
                </Modal.Body>
            </Modal>
        </div>
        </>
    );
} */

const mdPath = "./../../public/markdown/test.md";

/* function Test() {

    const [markdown, setMarkdown] = useState("");

    useEffect(() => {

        fetch(mdPath)
        .then(response => {
            if(response.ok) {
                return response.text();
            }
        })
        .then(data => {
            setMarkdown(data);
        })

    }, []);


    return(
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehyperaw} components={components}>{markdown}</Markdown>
    );

} */

function Test() {


    return(
        <Modal show={true} scrollable={true} dialogClassName="modal-custom">
            <Modal.Header closeButton>
                HEADER
            </Modal.Header>
            <Modal.Body>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum illo incidunt rem quibusdam odio veritatis. Numquam, reprehenderit soluta ut explicabo a quae aliquid sequi ducimus quibusdam veniam vel rem totam facilis eaque dicta quisquam accusamus doloribus corporis voluptas natus qui praesentium earum perferendis omnis. Officia saepe unde odio ullam quod? Est et sint dolorum eius voluptatem. Minus aperiam, asperiores veritatis ratione ab reiciendis deleniti aspernatur dolorem facere dignissimos consequuntur animi error distinctio officia explicabo eius earum impedit veniam! Rerum aperiam possimus dignissimos, harum vitae mollitia voluptates sed nostrum praesentium libero maiores, laborum error eum blanditiis? Maxime nesciunt accusantium necessitatibus modi ducimus cum dolorem nisi ex, ut natus, eius qui saepe cumque vitae repudiandae incidunt maiores rerum vero veniam quod? Ullam culpa et quo laudantium autem velit accusantium, officia quos iusto dolorem aliquam quibusdam debitis incidunt blanditiis nam quas dolores labore sit harum sed aperiam eos facere possimus molestias. Reiciendis repellendus rem possimus autem necessitatibus molestias perferendis ipsam animi ducimus fuga. Natus architecto dicta nam nulla ratione deserunt praesentium culpa incidunt totam omnis, quos, magni placeat molestias quod itaque nesciunt repudiandae commodi, iure sunt facilis? Sed, blanditiis! Ad obcaecati ea iste laboriosam, ratione non commodi magni illum suscipit consequatur odio vel. Id pariatur, veniam esse hic rem magni tenetur, nihil quasi odio quis accusamus neque unde ipsam! Itaque ut ipsam hic, modi ducimus error illo veniam soluta provident pariatur, eveniet voluptate voluptatibus doloremque dolore quos iure voluptatem dolorem accusantium saepe quaerat quis ipsa eos necessitatibus. Eius sit ullam maxime excepturi. Repellat dolorum quisquam accusamus voluptatum. Excepturi rerum a aut beatae totam labore expedita consequatur? Assumenda culpa sint minus accusamus reprehenderit modi, ipsa libero impedit quaerat molestiae, veniam aliquam repellendus dolorem, cum rem dolores tenetur minima. Ad, quia distinctio in quidem temporibus blanditiis natus fugiat quo consequuntur dicta totam praesentium iusto aliquid est sint sunt rerum accusamus molestias fugit. Mollitia vero, expedita dolor quam, sapiente incidunt, saepe fugiat dolorem ducimus sint impedit explicabo nam ratione inventore autem voluptates odit possimus! Eveniet sapiente facere iusto adipisci quibusdam sunt reprehenderit hic eaque asperiores natus cum dolorum quisquam, temporibus tempora laborum quas dolores ut blanditiis? Officia nulla reiciendis incidunt omnis laboriosam laborum rem sunt, distinctio voluptate eos enim. Atque itaque reiciendis cum dignissimos possimus. Quibusdam odio nobis nam quia, eos neque doloremque, dicta accusantium atque nulla reiciendis facilis nemo aspernatur a dolorum! Aliquid, earum. Cum iure obcaecati porro consectetur, rem quisquam, tempore eius accusantium repellendus consequuntur magni! Nisi veniam sint dolorem cupiditate est quisquam, totam distinctio laborum debitis expedita et saepe, iusto, voluptatibus ullam inventore? Inventore esse tempora consequatur molestias praesentium harum quam consectetur perspiciatis, qui perferendis officia enim cumque repellat id doloribus, nihil quas distinctio ducimus reiciendis a tempore commodi laborum quia dicta. Magni a officia similique eveniet tempora rem quos aut debitis vel quisquam sunt libero laudantium in ex dicta natus dolorum perspiciatis, ipsam fuga incidunt maxime. Possimus voluptatum voluptatibus aliquam iste doloribus tenetur doloremque autem quos vel saepe labore corrupti laboriosam maxime, veritatis alias exercitationem? Incidunt impedit modi aspernatur et voluptatem accusantium dignissimos quibusdam commodi itaque, placeat animi dolore sequi laudantium iste deserunt repellendus eum quis molestiae? Aut expedita quaerat eius autem explicabo eos iste voluptates ratione, quod similique nulla consectetur commodi voluptas nostrum vero, nihil sunt facere exercitationem atque! Veniam consectetur ab at non eius minus laboriosam! Dignissimos beatae saepe eum sit, dicta nihil esse molestiae eos consequatur, alias distinctio. Modi, laudantium cupiditate non vel, maxime debitis architecto fugit, aut quia nam et ullam dolore. Impedit, quam ipsam! Quo quisquam labore, quas ratione neque similique, fugit quis provident illo obcaecati id soluta placeat. Eaque a unde vitae non omnis obcaecati nostrum debitis, tenetur odio in impedit dolorem quo distinctio perferendis odit magni inventore repellendus exercitationem amet delectus deleniti. Iusto eligendi porro, dicta ipsum officia sunt culpa possimus aliquid voluptates, saepe officiis blanditiis quae! Ipsam quibusdam dolorem unde quod temporibus provident deleniti quasi quia et voluptas nihil, deserunt exercitationem soluta autem consequuntur error quo ipsa, inventore nam sequi. Tenetur qui sapiente id quia, perspiciatis exercitationem quisquam ducimus veniam incidunt temporibus, aperiam perferendis. Dolor eligendi perferendis dicta enim sit veritatis ullam aperiam eos aliquam vel ab nisi magnam sint modi, id fuga, fugiat corporis incidunt facilis repellat labore quod voluptas consequuntur aspernatur. Aperiam, facilis. Facilis veniam assumenda quas voluptatibus dolor, blanditiis natus voluptate vero vel vitae reprehenderit inventore, illo, quos nulla. Obcaecati quas enim distinctio et explicabo autem nisi non pariatur deleniti, magnam natus dicta eaque ratione doloremque nemo ut laboriosam sunt quaerat. Veniam qui neque architecto voluptatibus ad illum eum nisi inventore unde maiores, nesciunt consequatur asperiores atque accusamus assumenda quas ducimus totam ab dicta rerum ratione! Numquam molestiae nihil molestias aut dolor quod nemo cumque, amet atque error voluptatum necessitatibus est? Consequuntur quisquam totam ullam doloribus, sint distinctio tempore quaerat culpa officiis nesciunt sunt deleniti nihil sit illum omnis sapiente, repellendus beatae voluptatum inventore nemo? Necessitatibus vero laudantium saepe voluptate praesentium, sed minima odio doloribus nostrum quod dolore, voluptatum a ut consectetur nihil? Fugit consequatur corporis deserunt porro odit! Fugiat eaque voluptates ducimus quibusdam dolorem ab, eum obcaecati rerum ipsa mollitia iure eligendi quo fuga non delectus! Laborum dolorem nobis, impedit corrupti eum autem alias, obcaecati consectetur excepturi eius quod molestias ipsum veritatis a dolore ipsa hic laboriosam nemo quasi aliquid? Iste provident possimus veniam maiores fuga voluptatibus, temporibus dolorum facilis ipsum ut sed commodi illum, nostrum iusto aliquam autem nemo vel quas beatae labore. Optio culpa debitis ullam exercitationem in esse magni tempore facilis eum aspernatur dolorem reiciendis nulla laborum impedit iste beatae ab, doloremque enim? Illo beatae rerum doloribus ut autem dicta repellendus repudiandae praesentium. Aut fuga in libero architecto corrupti minus mollitia asperiores voluptatem ea nulla sit nihil, atque consequuntur exercitationem dolore fugiat modi aspernatur quibusdam fugit, vel voluptatibus. Natus nihil consectetur repellat ea rem magnam sapiente cum a et ratione dolorum tempore itaque dolor omnis quaerat consequuntur perspiciatis, est sed. Molestiae, libero perspiciatis dolore debitis placeat pariatur veniam, a tempora dolor optio quam! Sed, recusandae illo! Consectetur, sit accusantium minima vel iure ea magnam quaerat tenetur aut.
            </Modal.Body>
        </Modal>
    );
}

export default Test;