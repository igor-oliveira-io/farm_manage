import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const crops = ['Soja', 'Milho', 'Arroz', 'Cana-de-açúcar', 'Feijão'];

  for (let i = 1; i <= 3; i++) {
    const farmer = await prisma.farmer.create({
      data: {
        name: `Produtor ${i}`,
        document: `1234567890${i}`,
        document_type: 'CPF',
      },
    });

    for (let j = 1; j <= 5; j++) {
      const farm = await prisma.farm.create({
        data: {
          name: `Fazenda ${j} do ${farmer.name}`,
          city: `Cidade ${j}`,
          state: `Estado ${j}`,
          total_area: 100 + j * 10,
          arable_area: 70 + j * 5,
          vegetation_area: 30 + j * 5,
          farmer_id: farmer.id,
        },
      });

      for (let year = 2022; year <= 2024; year++) {
        const harvest = await prisma.harvest.create({
          data: {
            year: new Date(`${year}-01-01`),
            farm_id: farm.id,
          },
        });

        for (const crop of crops) {
          await prisma.plantedCrop.create({
            data: {
              name: crop,
              production: Math.random() * 100 + 50,
              harvest_id: harvest.id,
            },
          });
        }
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
