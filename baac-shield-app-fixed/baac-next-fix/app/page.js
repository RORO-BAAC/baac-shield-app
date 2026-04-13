export default function Home() {
  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>BAAC SHIELD App</h1>
      <p>App is live and working.</p>

      <form>
        <h2>Daily Safety Form</h2>

        <label>Worker Name:</label><br />
        <input type="text" placeholder="Enter name" /><br /><br />

        <label>Job Site:</label><br />
        <input type="text" placeholder="Enter job site" /><br /><br />

        <label>Hazards Identified:</label><br />
        <textarea placeholder="List hazards"></textarea><br /><br />

        <label>Controls in Place:</label><br />
        <textarea placeholder="Describe controls"></textarea><br /><br />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
