import styles from "./App.module.css";
import Section from "./Section";

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
      <Section>
          <h3>Tom van Dinther</h3>
      </Section>
      </header>
    </div>
  );
}

export default App;
