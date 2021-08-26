import Section from "../Section";
import AboutMeText from "./AboutMe.txt?raw"

function AboutMe(props) {
    return (
        <Section class={props.class}>
            <p>
                {AboutMeText}
            </p>
        </Section>
    )
}

export default AboutMe;