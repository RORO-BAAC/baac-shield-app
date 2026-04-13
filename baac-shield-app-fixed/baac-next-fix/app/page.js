export default function Home() {
  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>BAAC SHIELD</h1>

      <form>
        <h2>Daily Hazard Assessment</h2>

        <label>Worker Name:</label><br />
        <input type="text" /><br /><br />

        <label>Job Site:</label><br />
        <input type="text" /><br /><br />

        <label>Task:</label><br />
        <input type="text" /><br /><br />

        <h3>Hazards (check all that apply):</h3>
        <label><input type="checkbox" /> Excavation</label><br />
        <label><input type="checkbox" /> Heavy Equipment</label><br />
        <label><input type="checkbox" /> Electrical</label><br />
        <label><input type="checkbox" /> Weather Conditions</label><br />
        <label><input type="checkbox" /> Traffic</label><br /><br />

        <h3>Controls in Place:</h3>
        <textarea placeholder="Describe controls"></textarea><br /><br />

        <h3>STOP WORK CHECK</h3>
        <label>
          <input type="checkbox" /> I confirm all hazards are controlled
        </label><br /><br />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
