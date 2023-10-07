const logoSizeLg = 2;
const logoSizeSm = 1.8;

/* 
function Skill({src, name, size}) {

    return(
        <div className="skill-container mx-2" style={{...(size && {width: `${size}rem`, height:`${size}rem`}), ...{opacity: "1"}}}>
        <div className="skill-object">
            <p className="skill-name" style={{"--offset": `${size / 2}rem`}}>{name}</p>
            <img className="skill-img" src={src} alt={name}/>
        </div>
    </div>
    );
} */

function Skill({src, name, size}) {

    const finalLogoSize = size == "lg" ? logoSizeLg : logoSizeSm;

    return (
        <div className={`logo-container ${size == "lg" ? "mx-2" : ""}`} style={{width: `${finalLogoSize}rem`}}>
            <img className="logo" style={ {
                    width: `${finalLogoSize}rem`, 
                    top: `${finalLogoSize * -0.5}rem`,
                    "--size": `${finalLogoSize}rem`
                }} src={src} alt={name} />
            <div className="logo-description-container" style={{"--parent-size": `${finalLogoSize}rem`}}>
                <p className="logo-description-text">{name}</p>
            </div>
        </div>
    );
}

export default Skill;