export interface PersonalAnalytics {
  total_spent: number;
  expense_count: number;
  spending_by_category: Record<string, number>;
}

// Map of user_id → net balance (positive = others paid more, negative = you paid more)
export type GroupBalances = Record<string, string | number>;
