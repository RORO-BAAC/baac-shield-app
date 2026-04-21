import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      to,
      subject,
      worker,
      supervisor,
      project,
      task,
      risk,
      notes,
      stopWork,
    } = body;

    const { error } = await resend.emails.send({
      from: "BAAC Shield <onboarding@resend.dev>",
      to,
      subject,
      html: `
        <h2>BAAC SHIELD Alert</h2>
        <p><strong>Worker:</strong> ${worker || "-"}</p>
        <p><strong>Supervisor:</strong> ${supervisor || "-"}</p>
        <p><strong>Job Site:</strong> ${jobSite || "-"}</p>
        <p><strong>Task:</strong> ${task || "-"}</p>
        <p><strong>Risk:</strong> ${risk || "-"}</p>
        <p><strong>Notes:</strong> ${notes || "-"}</p>
        <p><strong>Stop Work:</strong> ${stopWork ? "YES" : "No"}</p>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 400 });
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json(
      { error: err.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
