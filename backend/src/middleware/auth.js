const { supabase } = require("../supabase");

async function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");

  const { data, error } = await supabase.auth.getUser(token);
  if (error) return res.status(401).send("Invalid token");

  const user = data.user;

  const { data: roleRow } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  req.user = { id: user.id, role: roleRow?.role };
  next();
}

module.exports = { auth };
