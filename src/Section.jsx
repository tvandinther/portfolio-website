function Section(props) {

    return (
        <section class={props.class}>
            {props.children}
        </section>
    )
}

export default Section;