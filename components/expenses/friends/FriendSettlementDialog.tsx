"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { Ghost, SettlementDirection } from "@/types";
import { formatMoney, getDefaultSettlementDirection } from "./friend-utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface FriendSettlementDialogProps {
  friend: Ghost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: {
    amount: number;
    note?: string;
    direction: SettlementDirection;
  }) => Promise<void>;
}

export function FriendSettlementDialog({
  friend,
  open,
  onOpenChange,
  onSubmit,
}: FriendSettlementDialogProps) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [direction, setDirection] = useState<SettlementDirection>("they_owe");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextAmount = Number(amount);

    if (!Number.isFinite(nextAmount) || nextAmount <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await onSubmit({
        amount: nextAmount,
        note: note.trim() || undefined,
        direction,
      });
      onOpenChange(false);
    } catch {
      setError("Could not record this settlement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen && friend) {
          const balance = Number(friend.net_balance ?? 0);
          setAmount(String(Math.abs(balance || 0) || ""));
          setDirection(getDefaultSettlementDirection(balance));
          setNote("");
          setError("");
        }

        if (!nextOpen) {
          setSaving(false);
          setError("");
        }

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Record settlement</DialogTitle>
          <DialogDescription>
            This records a settlement transaction for{" "}
            <strong>{friend?.name ?? "this friend"}</strong> and updates the running balance.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Direction
              </label>
              <select
                value={direction}
                onChange={(event) => setDirection(event.target.value as SettlementDirection)}
                className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
                style={{
                  background: "var(--color-background-primary, var(--evven-background))",
                  borderColor: "var(--evven-border)",
                }}
              >
                <option value="they_owe">
                  {friend ? `${friend.name} owes you` : "They owe you"}
                </option>
                <option value="you_owe">
                  {friend ? `You owe ${friend.name}` : "You owe them"}
                </option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Amount
              </label>
              <Input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Note
            </label>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={3}
              placeholder="Optional note"
              className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
              style={{
                background: "var(--color-background-primary, var(--evven-background))",
                borderColor: "var(--evven-border)",
              }}
            />
          </div>

          <div
            className="rounded-[var(--evven-radius-card)] border border-[var(--evven-border)] bg-[var(--evven-surface)] p-4 text-sm"
          >
            <p className="font-medium">Preview</p>
            <p className="mt-1 text-muted-foreground">
              {direction === "you_owe"
                ? `You will give ${friend?.name ?? "them"} ${formatMoney(amount || 0)}.`
                : `You will get ${formatMoney(amount || 0)} from ${friend?.name ?? "them"}.`}
            </p>
          </div>

          {error && <p className="text-sm" style={{ color: "var(--evven-error)" }}>{error}</p>}

          <DialogFooter>
            <Button type="submit" disabled={saving || !amount.trim()} className="w-full sm:w-auto">
              {saving && <Loader2 />}
              {saving ? "Recording..." : "Record settlement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
