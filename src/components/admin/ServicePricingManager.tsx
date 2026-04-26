import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Save, AlertCircle } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PricingRow {
  id: string;
  service_type: string;
  tier_index: number;
  max_sqft: number;
  label: string;
  base_price: number;
  is_active: boolean;
}

const SERVICE_TYPES = [
  { value: "standard", label: "Standard Clean" },
  { value: "deep", label: "Deep Clean (First Cleaning)" },
  { value: "moveinout", label: "Move In/Move Out" },
  { value: "construction", label: "Construction Clean Up" },
  { value: "airbnb", label: "Airbnb/Short-Term Rental" },
];

const rowSignature = (r: PricingRow) =>
  `${r.tier_index}|${r.max_sqft}|${r.label}|${r.base_price}|${r.is_active}`;

const ServicePricingManager = () => {
  const [rows, setRows] = useState<PricingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [savingAll, setSavingAll] = useState(false);
  const [activeTab, setActiveTab] = useState("standard");
  const originalRef = useRef<Record<string, string>>({});
  const [dirtyIds, setDirtyIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const recomputeDirty = (current: PricingRow[]) => {
    const next = new Set<string>();
    current.forEach((r) => {
      const orig = originalRef.current[r.id];
      if (orig === undefined) return;
      if (orig !== rowSignature(r)) next.add(r.id);
    });
    setDirtyIds(next);
  };

  const fetchRows = async () => {
    setLoading(true);
    const { data, error } = await (supabase.from("service_pricing") as any)
      .select("*")
      .order("service_type")
      .order("tier_index");
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      const list = (data as PricingRow[]) || [];
      const orig: Record<string, string> = {};
      list.forEach((r) => (orig[r.id] = rowSignature(r)));
      originalRef.current = orig;
      setRows(list);
      setDirtyIds(new Set());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  // Warn on page unload if there are unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirtyIds.size > 0) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirtyIds]);

  const updateRow = (id: string, patch: Partial<PricingRow>) => {
    setRows((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, ...patch } : r));
      recomputeDirty(next);
      return next;
    });
  };

  const saveRow = async (row: PricingRow) => {
    setSaving(row.id);
    const { error } = await (supabase.from("service_pricing") as any)
      .update({
        max_sqft: row.max_sqft,
        label: row.label,
        base_price: row.base_price,
        is_active: row.is_active,
        tier_index: row.tier_index,
      })
      .eq("id", row.id);
    setSaving(null);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      originalRef.current[row.id] = rowSignature(row);
      setDirtyIds((prev) => {
        const next = new Set(prev);
        next.delete(row.id);
        return next;
      });
      toast({ title: "Saved", description: "Pricing tier updated." });
    }
  };

  const saveAll = async () => {
    const dirty = rows.filter((r) => dirtyIds.has(r.id));
    if (dirty.length === 0) return;
    setSavingAll(true);
    const results = await Promise.all(
      dirty.map((row) =>
        (supabase.from("service_pricing") as any)
          .update({
            max_sqft: row.max_sqft,
            label: row.label,
            base_price: row.base_price,
            is_active: row.is_active,
            tier_index: row.tier_index,
          })
          .eq("id", row.id)
          .then((res: any) => ({ row, error: res.error }))
      )
    );
    setSavingAll(false);

    const failed = results.filter((r) => r.error);
    const succeeded = results.filter((r) => !r.error);

    succeeded.forEach(({ row }) => {
      originalRef.current[row.id] = rowSignature(row);
    });
    setDirtyIds((prev) => {
      const next = new Set(prev);
      succeeded.forEach(({ row }) => next.delete(row.id));
      return next;
    });

    if (failed.length === 0) {
      toast({ title: "All changes saved", description: `${succeeded.length} tier(s) updated.` });
    } else {
      toast({
        title: `Saved ${succeeded.length}, failed ${failed.length}`,
        description: failed[0].error?.message || "Some rows failed to save.",
        variant: "destructive",
      });
    }
  };

  const deleteRow = async (id: string) => {
    const { error } = await (supabase.from("service_pricing") as any).delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      delete originalRef.current[id];
      setRows((prev) => {
        const next = prev.filter((r) => r.id !== id);
        recomputeDirty(next);
        return next;
      });
      toast({ title: "Deleted", description: "Pricing tier removed." });
    }
  };

  const addTier = async (serviceType: string) => {
    const existing = rows.filter((r) => r.service_type === serviceType);
    const nextIndex = existing.length ? Math.max(...existing.map((r) => r.tier_index)) + 1 : 0;
    const lastSqft = existing.length ? Math.max(...existing.map((r) => r.max_sqft)) : 750;
    const newSqft = lastSqft + 300;
    const { data, error } = await (supabase.from("service_pricing") as any)
      .insert({
        service_type: serviceType,
        tier_index: nextIndex,
        max_sqft: newSqft,
        label: `Up to ${newSqft} sf`,
        base_price: 0,
        is_active: true,
      })
      .select()
      .single();
    if (error) {
      toast({ title: "Add failed", description: error.message, variant: "destructive" });
    } else if (data) {
      const newRow = data as PricingRow;
      originalRef.current[newRow.id] = rowSignature(newRow);
      setRows((prev) => [...prev, newRow]);
      toast({ title: "Added", description: "New tier created." });
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading pricing...</p>;

  const dirtyCount = dirtyIds.size;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>Service Pricing</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Edit base prices for each square-footage tier per service type. Changes are immediately reflected on the booking calculator.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {dirtyCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400">
                <AlertCircle className="w-3.5 h-3.5" />
                Unsaved changes
              </span>
            )}
            <Button
              onClick={saveAll}
              disabled={dirtyCount === 0 || savingAll}
              variant={dirtyCount > 0 ? "default" : "outline"}
            >
              <Save className="w-4 h-4 mr-1.5" />
              {savingAll ? "Saving..." : "Save All"}
              {dirtyCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-background/20 text-current border-0">
                  {dirtyCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 flex-wrap h-auto">
            {SERVICE_TYPES.map((s) => {
              const tabDirty = rows.filter((r) => r.service_type === s.value && dirtyIds.has(r.id)).length;
              return (
                <TabsTrigger key={s.value} value={s.value}>
                  {s.label}
                  {tabDirty > 0 && (
                    <span className="ml-1.5 inline-flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-semibold rounded-full bg-amber-500 text-white">
                      {tabDirty}
                    </span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {SERVICE_TYPES.map((s) => {
            const serviceRows = rows.filter((r) => r.service_type === s.value).sort((a, b) => a.tier_index - b.tier_index);
            return (
              <TabsContent key={s.value} value={s.value} className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">{serviceRows.length} tier(s)</p>
                  <Button size="sm" onClick={() => addTier(s.value)}>
                    <Plus className="w-4 h-4 mr-1" /> Add Tier
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="p-2 font-medium">Order</th>
                        <th className="p-2 font-medium">Max sq ft</th>
                        <th className="p-2 font-medium">Label</th>
                        <th className="p-2 font-medium">Price ($)</th>
                        <th className="p-2 font-medium">Active</th>
                        <th className="p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceRows.map((row) => {
                        const isDirty = dirtyIds.has(row.id);
                        return (
                        <tr
                          key={row.id}
                          className={`border-b transition-colors ${
                            isDirty
                              ? "bg-amber-50 dark:bg-amber-950/30 border-l-4 border-l-amber-500"
                              : ""
                          }`}
                        >
                          <td className="p-2">
                            <Input type="number" value={row.tier_index}
                              onChange={(e) => updateRow(row.id, { tier_index: Number(e.target.value) })}
                              className="w-20" />
                          </td>
                          <td className="p-2">
                            <Input type="number" value={row.max_sqft}
                              onChange={(e) => updateRow(row.id, { max_sqft: Number(e.target.value) })}
                              className="w-28" />
                          </td>
                          <td className="p-2">
                            <Input value={row.label} onChange={(e) => updateRow(row.id, { label: e.target.value })} className="w-40" />
                          </td>
                          <td className="p-2">
                            <Input type="number" step="0.01" value={row.base_price}
                              onChange={(e) => updateRow(row.id, { base_price: Number(e.target.value) })}
                              className="w-28" />
                          </td>
                          <td className="p-2">
                            <Switch checked={row.is_active} onCheckedChange={(v) => updateRow(row.id, { is_active: v })} />
                          </td>
                          <td className="p-2">
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" onClick={() => saveRow(row)} disabled={saving === row.id}>
                                <Save className="w-3 h-3" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="ghost" className="text-destructive">
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete tier?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This removes the {row.label} tier from {s.label}. Cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteRow(row.id)} className="bg-destructive text-destructive-foreground">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                        );
                      })}
                      {serviceRows.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-muted-foreground">
                            No tiers yet. Click "Add Tier" to create one.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ServicePricingManager;
