"use client";

import { Clock3, Loader2 } from "lucide-react";
import type { PersonalExpense } from "@/types";
import { formatMoney, getGhostHistoryDirection, getGhostHistoryStatus } from "./friend-utils";

interface FriendHistoryListProps {
  expenses: PersonalExpense[];
  loading?: boolean;
  error?: string;
  emptyLabel?: string;
}

function formatDate(expense: PersonalExpense) {
  return new Date(expense.date ?? expense.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function FriendHistoryList({
  expenses,
  loading = false,
  error = "",
  emptyLabel = "No transactions with this friend yet.",
}: FriendHistoryListProps) {
  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center rounded-[var(--evven-radius-card)] border border-[var(--evven-border)] bg-[var(--evven-surface)] sm:h-40">
        <Loader2 size={18} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-[var(--evven-radius-card)] border border-[var(--evven-border)] bg-[var(--evven-surface)] p-5 text-sm"
        style={{ color: "var(--evven-error)" }}
      >
        {error}
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div
        className="rounded-[var(--evven-radius-card)] border border-[var(--evven-border)] bg-[var(--evven-surface)] p-5 text-sm text-muted-foreground sm:p-6"
      >
        <Clock3 size={16} className="mb-2" />
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {expenses.map((expense) => {
        const amount = expense.settlement_amount ?? expense.amount;
        const direction = getGhostHistoryDirection(expense);
        const status = getGhostHistoryStatus(expense);

        return (
          <div
            key={expense.id}
            className="flex items-start gap-3 rounded-[var(--evven-radius-card)] border border-[var(--evven-border)] bg-[var(--evven-surface)] p-4"
          >
            <div
              className="mt-1 h-8 w-1 rounded-full"
              style={{
                background:
                  direction === "You owe"
                    ? "var(--evven-error)"
                    : direction === "They owe"
                      ? "var(--evven-accent-primary)"
                      : "var(--evven-border)",
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{expense.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {formatDate(expense)} · {direction}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                    {formatMoney(amount)}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                    {status}
                  </p>
                </div>
              </div>

              {expense.notes ? (
                <p className="mt-2 text-xs text-muted-foreground">{expense.notes}</p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
