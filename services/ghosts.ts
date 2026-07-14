import api from "@/lib/api";
import type {
  ApiResponse,
  Ghost,
  GhostBalance,
  GhostCreatePayload,
  GhostDetail,
} from "@/types";

function unwrapData<T>(payload: ApiResponse<T> | T): T {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiResponse<T>).data;
  }

  return payload as T;
}

type GhostApiShape = {
  id?: string;
  ghost_id?: string;
  name?: string;
  user_code?: string | null;
  group_id?: string | null;
  shadow_group_id?: string | null;
  net_balance?: string | number | null;
  status?: string | null;
  expenses?: GhostDetail["expenses"];
};

function normalizeGhost(ghost: GhostApiShape): Ghost {
  return {
    id: ghost.id ?? ghost.ghost_id ?? "",
    name: ghost.name ?? "",
    user_code: ghost.user_code ?? null,
    shadow_group_id: ghost.shadow_group_id ?? ghost.group_id ?? null,
    net_balance: ghost.net_balance ?? null,
    status: ghost.status ?? null,
    expenses: ghost.expenses,
  };
}

function normalizeGhostBalance(balance: GhostApiShape): GhostBalance {
  return {
    ghost_id: balance.ghost_id ?? balance.id,
    net_balance: balance.net_balance ?? 0,
    status: balance.status ?? null,
  };
}

function normalizeGhostDetail(detail: GhostApiShape): GhostDetail {
  return {
    ...normalizeGhost(detail),
    expenses: detail.expenses ?? [],
  };
}

export async function createGhost(name: string): Promise<Ghost> {
  const payload: GhostCreatePayload = { name };
  const response = await api.post<ApiResponse<Ghost> | Ghost>("/ghosts/", payload);
  return normalizeGhost(unwrapData(response.data) as GhostApiShape);
}

export async function getGhosts(search?: string): Promise<Ghost[]> {
  const response = await api.get<ApiResponse<Ghost[]> | Ghost[]>("/ghosts/", {
    params: search?.trim() ? { search: search.trim() } : undefined,
  });

  return (unwrapData(response.data) as GhostApiShape[]).map(normalizeGhost);
}

export async function getGhostBalance(ghostId: string): Promise<GhostBalance> {
  const response = await api.get<ApiResponse<GhostBalance> | GhostBalance>(
    `/ghosts/${ghostId}/balance`
  );
  return normalizeGhostBalance(unwrapData(response.data) as GhostApiShape);
}

export async function getGhostDetail(ghostId: string): Promise<GhostDetail> {
  const response = await api.get<ApiResponse<GhostDetail> | GhostDetail>(
    `/ghosts/${ghostId}`
  );
  return normalizeGhostDetail(unwrapData(response.data) as GhostApiShape);
}

export async function deleteGhost(ghostId: string): Promise<void> {
  await api.delete(`/ghosts/${ghostId}`);
}
