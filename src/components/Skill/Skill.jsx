const logoSizeLg = 2;
const logoSizeSm = 1.8;

// returns a skill component. These are the tech hoverable logos
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