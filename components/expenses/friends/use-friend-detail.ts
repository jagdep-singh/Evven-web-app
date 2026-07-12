"use client";

import { useCallback, useEffect, useState } from "react";
import { getGhostDetail } from "@/services/ghosts";
import type { GhostDetail } from "@/types";

type FriendDetailError = {
  friendId: string;
  message: string;
};

export function useFriendDetail(friendId: string | null) {
  const [detail, setDetail] = useState<GhostDetail | null>(null);
  const [errorRecord, setErrorRecord] = useState<FriendDetailError | null>(null);

  const fetchDetail = useCallback(async (id: string) => {
    try {
      const data = await getGhostDetail(id);
      setDetail(data);
      setErrorRecord(null);
    } catch {
      setErrorRecord({ friendId: id, message: "Could not load this friend." });
    }
  }, []);

  useEffect(() => {
    if (!friendId) {
      return;
    }

    let active = true;

    getGhostDetail(friendId)
      .then((data) => {
        if (active) {
          setDetail(data);
          setErrorRecord(null);
        }
      })
      .catch(() => {
        if (active) {
          setErrorRecord({ friendId, message: "Could not load this friend." });
        }
      });

    return () => {
      active = false;
    };
  }, [friendId]);

  return {
    detail,
    error: friendId && errorRecord?.friendId === friendId ? errorRecord.message : "",
    loading: Boolean(friendId && (!detail || detail.id !== friendId) && errorRecord?.friendId !== friendId),
    refresh: friendId ? () => fetchDetail(friendId) : async () => undefined,
  };
}
