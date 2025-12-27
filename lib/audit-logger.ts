// Comprehensive audit logging for compliance

import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

interface AuditLog {
  userId: string
  action: string
  resource: string
  changes?: Record<string, any>
  ipAddress?: string
  userAgent?: string
  timestamp: Date
  status: "success" | "failure"
  metadata?: Record<string, any>
}

export async function logAuditEvent(log: AuditLog) {
  try {
    const supabase = await createClient()
    const headerList = await headers()

    const ipAddress = log.ipAddress || headerList.get("x-forwarded-for") || "unknown"
    const userAgent = log.userAgent || headerList.get("user-agent") || "unknown"

    const { error } = await supabase.from("audit_logs").insert({
      user_id: log.userId,
      action: log.action,
      entity_type: log.resource,
      metadata: {
        ...log.metadata,
        changes: log.changes,
        status: log.status,
      },
      ip_address: ipAddress,
      user_agent: userAgent,
    })

    if (error) throw error

    console.log("[v0] Audit log stored successfully:", log.action)
  } catch (error) {
    console.error("[v0] Failed to store audit log:", error)
    // Fallback to console for critical failures
    console.log("[AUDIT FALLBACK]", {
      ...log,
      timestamp: log.timestamp.toISOString(),
    })
  }
}

export async function getAuditLogs(userId: string, limit = 100) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  } catch (error) {
    console.error("[v0] Failed to fetch audit logs:", error)
    return []
  }
}

// Compliance Events
export enum ComplianceEvent {
  LARGE_TRANSACTION = "LARGE_TRANSACTION",
  MULTIPLE_FAILED_LOGINS = "MULTIPLE_FAILED_LOGINS",
  UNUSUAL_LOCATION = "UNUSUAL_LOCATION",
  SANCTIONED_ENTITY = "SANCTIONED_ENTITY",
  KYC_FAILURE = "KYC_FAILURE",
  RAPID_WITHDRAWALS = "RAPID_WITHDRAWALS",
}
