import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database'; 
import { WarehouseStatus } from '../enums/warehouse.enum'; 

export const createWarehouse = async (req: Request, res: Response) => {
  try {
    const { name, address, status, created_by } = req.body;

    if (!name || !status || !created_by) {
      return res.status(400).json({ error: 'Name, status and created_by are required' });
    }

    if (status !== WarehouseStatus.Aktiv && status !== WarehouseStatus.QeyriAktiv) {
      return res.status(400).json({ error: `Status must be either '${WarehouseStatus.Aktiv}' or '${WarehouseStatus.QeyriAktiv}'` });
    }

    const uuid = uuidv4();
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    await pool.query(
      `INSERT INTO warehouses
        (uuid, name, address, status, created_at, created_by, updated_at, updated_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $6)`,
      [uuid, name, address || null, status, created_at, created_by, updated_at]
    );

    res.status(201).json({ message: 'Warehouse created', uuid });
  } catch (err) {
    console.error('Error creating warehouse:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateWarehouse = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const { name, address, status, updated_by } = req.body;

    if (!uuid) {
      return res.status(400).json({ error: 'Warehouse UUID is required' });
    }
    if (!updated_by) {
      return res.status(400).json({ error: 'updated_by is required' });
    }
    if (status && status !== WarehouseStatus.Aktiv && status !== WarehouseStatus.QeyriAktiv) {
      return res.status(400).json({ error: `Status must be either '${WarehouseStatus.Aktiv}' or '${WarehouseStatus.QeyriAktiv}'` });
    }


    const fields = [];
    const values: any[] = [];
    let idx = 1;

    if (name !== undefined) {
      fields.push(`name = $${idx++}`);
      values.push(name);
    }
    if (address !== undefined) {
      fields.push(`address = $${idx++}`);
      values.push(address);
    }
    if (status !== undefined) {
      fields.push(`status = $${idx++}`);
      values.push(status);
    }


    fields.push(`updated_at = $${idx++}`);
    values.push(new Date().toISOString());

    fields.push(`updated_by = $${idx++}`);
    values.push(updated_by);

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields provided for update' });
    }

    values.push(uuid);

    const query = `
      UPDATE warehouses
      SET ${fields.join(', ')}
      WHERE uuid = $${idx}
      RETURNING *;
    `;

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }

    res.json({ message: 'Warehouse updated', warehouse: result.rows[0] });
  } catch (err) {
    console.error('Error updating warehouse:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWarehouses = async (req: Request, res: Response) => {
  try {

    const {
      page = '1',
      limit = '10',
      sortBy = 'created_at',
      sortOrder = 'desc',
      search = '',
      status,
      is_deleted,
    } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const offset = (pageNumber - 1) * limitNumber;


    const conditions: string[] = [];
    const values: any[] = [];

 
    if (search) {
      values.push(`%${search}%`);
      conditions.push(`name ILIKE $${values.length}`);
    }


    if (status) {
      values.push(status);
      conditions.push(`status = $${values.length}`);
    }


    if (is_deleted !== undefined) {
      const isDeletedBool = is_deleted === 'true';
      values.push(isDeletedBool);
      conditions.push(`is_deleted = $${values.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
      SELECT * FROM warehouses
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder === 'asc' ? 'ASC' : 'DESC'}
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;

    values.push(limitNumber, offset);

    const result = await pool.query(query, values);

    res.status(200).json({
      data: result.rows,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    res.status(500).json({ message: 'Server error fetching warehouses' });
  }
};

export const deleteWarehouse = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  try {

    const checkResult = await pool.query(
      'SELECT * FROM warehouses WHERE uuid = $1 AND is_deleted = false',
      [uuid]
    );

    if (checkResult.rowCount === 0) {
      return res.status(404).json({ message: 'Anbar tapılmadı.' });
    }


    await pool.query(
      'UPDATE warehouses SET is_deleted = true, updated_at = NOW() WHERE uuid = $1',
      [uuid]
    );

    return res.status(200).json({ message: 'Anbar silindi (soft delete).' });
  } catch (error) {
    console.error('Error deleting warehouse:', error);
    return res.status(500).json({
      message: 'Anbar silinərkən xəta baş verdi.',
    });
  }
};

export const changeWarehouseStatus = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { status } = req.body;

  // Validate input
  if (typeof status !== 'boolean') {
    return res.status(400).json({ message: 'Status dəyəri boolean olmalıdır (true və ya false).' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM warehouses WHERE uuid = $1 AND is_deleted = false',
      [uuid]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Anbar tapılmadı və ya silinmişdir.' });
    }

    await pool.query(
      'UPDATE warehouses SET status = $1, updated_at = NOW() WHERE uuid = $2',
      [status, uuid]
    );

    return res.status(200).json({ message: `Anbar statusu ${status ? 'aktiv' : 'qeyri-aktiv'} olaraq yeniləndi.` });
  } catch (error) {
    console.error('Error changing warehouse status:', error);
    return res.status(500).json({ message: 'Anbar statusu dəyişdirilərkən xəta baş verdi.' });
  }
};

export const getWarehouseDropdown = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;

  const offset = (Number(page) - 1) * Number(limit);

  try {
    const query = `
      SELECT name AS name, uuid AS value
      FROM warehouses
      WHERE is_deleted = false AND status = true
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const result = await pool.query(query, [Number(limit), offset]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching warehouse dropdown list:', error);
    res.status(500).json({ message: 'Anbar siyahısı gətirilərkən xəta baş verdi.' });
  }
};