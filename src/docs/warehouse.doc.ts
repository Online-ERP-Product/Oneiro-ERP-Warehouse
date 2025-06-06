export const warehouseDoc = {
  get: {
    summary: 'Get Warehouses',
    description: 'Retrieves a list of warehouses with filtering, sorting, search, and pagination options.',
    tags: ['Warehouses'],
    parameters: [
      {
        name: 'page',
        in: 'query',
        description: 'Page number for pagination',
        required: false,
        schema: {
          type: 'integer',
          example: 1,
        },
      },
      {
        name: 'limit',
        in: 'query',
        description: 'Number of items per page',
        required: false,
        schema: {
          type: 'integer',
          example: 10,
        },
      },
      {
        name: 'search',
        in: 'query',
        description: 'Search by warehouse name',
        required: false,
        schema: {
          type: 'string',
          example: 'Baku Warehouse',
        },
      },
      {
        name: 'status',
        in: 'query',
        description: 'Filter by warehouse status (aktiv or qeyri-aktiv)',
        required: false,
        schema: {
          type: 'string',
          enum: ['aktiv', 'qeyri-aktiv'],
        },
      },
      {
        name: 'is_deleted',
        in: 'query',
        description: 'Filter by deletion status (true or false)',
        required: false,
        schema: {
          type: 'boolean',
        },
      },
      {
        name: 'sortBy',
        in: 'query',
        description: 'Sort by field (e.g., name, created_at)',
        required: false,
        schema: {
          type: 'string',
          example: 'created_at',
        },
      },
      {
        name: 'sortOrder',
        in: 'query',
        description: 'Sort order: asc or desc',
        required: false,
        schema: {
          type: 'string',
          enum: ['asc', 'desc'],
        },
      },
    ],
    responses: {
      '200': {
        description: 'List of warehouses',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                page: { type: 'integer', example: 1 },
                limit: { type: 'integer', example: 10 },
                data: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      uuid: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
                      name: { type: 'string', example: 'Baku Central Warehouse' },
                      address: { type: 'string', example: 'H. Aliyev Avenue 120' },
                      status: { type: 'string', enum: ['aktiv', 'qeyri-aktiv'], example: 'aktiv' },
                      created_at: { type: 'string', format: 'date-time', example: '2025-06-04T10:15:30Z' },
                      created_by: { type: 'string', example: 'user-uuid-abc123' },
                      updated_at: { type: 'string', format: 'date-time', example: '2025-06-05T14:22:00Z' },
                      updated_by: { type: 'string', example: 'user-uuid-def456' },
                      is_deleted: { type: 'boolean', example: false },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '500': {
        description: 'Server error while fetching warehouses',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Anbarlar gətirilərkən xəta baş verdi.',
                },
              },
            },
          },
        },
      },
    },
  },
};
