export interface Warehouse {
  uuid: string;
  name: string;
  address?: string;
  status: 'aktiv' | 'qeyri-aktiv';
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}
