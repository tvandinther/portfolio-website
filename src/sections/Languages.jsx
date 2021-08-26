import Section from "../Section";

function Languages(props) {
    return (
        <Section class={props.class}>
            <ul>
                <li>Javascript</li>
                <li>Python</li>
                <li>C#</li>
                <li>Go</li>
            </ul>
        </Section>
    )
}

export default Languages;