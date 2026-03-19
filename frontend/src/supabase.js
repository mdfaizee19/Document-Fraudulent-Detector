import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://dpmkpfysidwjfsjrycgm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwbWtwZnlzaWR3amZzanJ5Y2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0Nzk4MDAsImV4cCI6MjA4MTA1NTgwMH0.MQcKflhMXdb0-saPacvJphPorHM5xzASE-c49kuEC6E"
);
