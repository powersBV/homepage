export type EquipmentCategory = 'hvac' | 'plumbing' | 'electrical' | 'fire-protection';

export interface EquipmentItem {
  id: string;
  tag: string;           // e.g., "RTU-1", "VAV-12"
  name: string;          // e.g., "Trane RTU-8A"
  model: string;         // e.g., "YCD120C3H0AA"
  category: EquipmentCategory;
  specs: string[];       // e.g., ["10 Ton", "Gas Heat"]
  specSection: string;   // e.g., "23 74 13"
  quantity: number;
}

export const categoryLabelsMap: Record<EquipmentCategory, string> = {
  'hvac': 'HVAC',
  'plumbing': 'Plumbing',
  'electrical': 'Electrical',
  'fire-protection': 'Fire Protection',
};
