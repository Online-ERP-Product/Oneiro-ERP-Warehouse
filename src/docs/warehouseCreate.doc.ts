export const createWarehouseDoc = {
  post: {
    summary: 'Create Warehouse',
    description: 'Creates a new warehouse entry in the system.',
    tags: ['Warehouses'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'address', 'status', 'created_by'],
            properties: {
              name: {
                type: 'string',
                example: 'Sumqayit Logistics Base',
              },
              address: {
                type: 'string',
                example: 'Sumqayit Industrial Zone, Block 5',
              },
              status: {
                type: 'string',
                enum: ['aktiv', 'qeyri-aktiv'],
                example: 'aktiv',
              },
              created_by: {
                type: 'string',
                format: 'uuid',
                example: 'a3f1d2e4-5b6c-7d89-0123-456789abcdef',
              },
            },
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'Warehouse created successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Anbar uğurla yaradıldı.',
                },
                data: {
                  type: 'object',
                  properties: {
                    uuid: {
                      type: 'string',
                      example: '123e4567-e89b-12d3-a456-426614174000',
                    },
                    name: {
                      type: 'string',
                      example: 'Sumqayit Logistics Base',
                    },
                    address: {
                      type: 'string',
                      example: 'Sumqayit Industrial Zone, Block 5',
                    },
                    status: {
                      type: 'string',
                      example: 'aktiv',
                    },
                    created_by: {
                      type: 'string',
                      example: 'a3f1d2e4-5b6c-7d89-0123-456789abcdef',
                    },
                    created_at: {
                      type: 'string',
                      format: 'date-time',
                      example: '2025-06-04T12:00:00Z',
                    },
                  },
                },
              },
            },
          },
        },
      },
      '400': {
        description: 'Invalid input data',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Daxil edilən məlumatlarda xəta var.',
                },
              },
            },
          },
        },
      },
      '500': {
        description: 'Server error while creating warehouse',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Anbar yaradılarkən xəta baş verdi.',
                },
              },
            },
          },
        },
      },
    },
  },
};
