import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const supabaseAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function GET(request) {
  try {
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const accessToken = authorization.replace("Bearer ", "");

    const {
      data: { user },
      error: userError,
    } = await supabaseAuth.auth.getUser(accessToken);

    if (userError || !user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data: roleData, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role, active")
      .eq("email", user.email)
      .maybeSingle();

    if (roleError) {
      throw roleError;
    }

    if (
      !roleData ||
      roleData.role !== "admin" ||
      roleData.active === false
    ) {
      return Response.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const {
      data: { users },
      error,
    } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (error) throw error;

    const safeUsers = users.map((authUser) => ({
      id: authUser.id,
      email: authUser.email,
      createdAt: authUser.created_at,
      lastSignInAt: authUser.last_sign_in_at,
      emailConfirmedAt: authUser.email_confirmed_at,
    }));

    return Response.json({ users: safeUsers });
  } catch (error) {
    console.error("Admin users load error:", error);

    return Response.json(
      { error: error.message || "Could not load users." },
      { status: 500 }
    );
  }
}
