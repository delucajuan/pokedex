import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const path = process.env.NODE_ENV === 'production' ? './dist/routes/*.js' : './src/routes/*.ts';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokédex API',
      version: '1.0.0',
      description: 'API documentation for the Pokédex application',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Juan De Luca',
        url: 'https://github.com/delucajuan',
      },
    },
    components: {
      schemas: {
        PokemonListResponse: {
          type: 'object',
          properties: {
            metadata: {
              type: 'object',
              properties: {
                total: {
                  type: 'integer',
                  description: 'Total number of Pokémon.',
                  example: 1302,
                },
                pages: {
                  type: 'integer',
                  description: 'Total number of pages.',
                  example: 131,
                },
                currentPage: {
                  type: 'integer',
                  description: 'Current page number.',
                  example: 1,
                },
                pageSize: {
                  type: 'integer',
                  description: 'Number of Pokémon per page.',
                  example: 10,
                },
              },
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Pokemon',
              },
            },
          },
        },
        Pokemon: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'bulbasaur',
            },
            image: {
              type: 'string',
              example:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
            },
            types: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: ['grass', 'poison'],
            },
            order: {
              type: 'integer',
              example: 1,
            },
            stats: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'hp',
                  },
                  base: {
                    type: 'integer',
                    example: 45,
                  },
                },
              },
            },
          },
        },
        PokemonDetailResponse: {
          allOf: [
            { $ref: '#/components/schemas/Pokemon' },
            {
              type: 'object',
              properties: {
                height: {
                  type: 'integer',
                  example: 4,
                },
                weight: {
                  type: 'integer',
                  example: 60,
                },
                baseExperience: {
                  type: 'integer',
                  example: 112,
                },
                abilities: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        example: 'static',
                      },
                      description: {
                        type: 'string',
                        example:
                          "Whenever a move makes contact with this Pokémon, the move's user has a 30% chance of being paralyzed.\n\nPokémon that are immune to electric-type moves can still be paralyzed by this ability.\n\nOverworld: If the lead Pokémon has this ability, there is a 50% chance that encounters will be with an electric Pokémon, if applicable.",
                      },
                    },
                  },
                },
                evolutionChain: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  example: ['pichu', 'pikachu', 'raichu'],
                },
              },
            },
          ],
        },
        PokemonNamesResponse: {
          type: 'array',
          items: {
            type: 'string',
          },
          example: [
            'pikachu',
            'pikipek',
            'pikachu rock star',
            'pikachu belle',
            'pikachu pop star',
            'pikachu phd',
            'pikachu libre',
            'pikachu cosplay',
            'pikachu original cap',
            'pikachu hoenn cap',
          ],
        },
        PokemonTypesResponse: {
          type: 'array',
          items: {
            type: 'string',
          },
          example: [
            'normal',
            'fighting',
            'flying',
            'poison',
            'ground',
            'rock',
            'bug',
            'ghost',
            'steel',
            'fire',
            'water',
            'grass',
            'electric',
            'psychic',
            'ice',
            'dragon',
            'dark',
            'fairy',
            'stellar',
            'unknown',
            'shadow',
          ],
        },
      },
    },
  },
  apis: [path],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerDocs = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

export default setupSwaggerDocs;
