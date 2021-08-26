import styles from "./App.module.css";
import Section from "./Section";
import AboutMe from "./sections/AboutMe";
import Languages from "./sections/Languages";
import Spacer from "./Spacer";

function App() {
    return (
    <div>
        <canvas id="bg"/>
        <header>
            <Section>
              <h3>Tom van Dinther</h3>
            </Section>
        </header>
        <div class={styles.grid}>
            <Spacer class={styles.spacer1}/>
            <AboutMe class={styles.aboutMe}/>
            <Spacer class={styles.spacer0}/>
            <Languages class={styles.languages}/>
        </div>
        <footer/>
    </div>
    );
}

export default App;
