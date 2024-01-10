import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

  // const user = await prisma.user.createMany({
  //   data: Array.from({ length: 25 }, () =>  ({
  //     email: faker.internet.email(),
  //     name: faker.internet.userName(),
  //     address: {
  //       city: faker.location.city(),
  //       street: faker.location.street(),
  //       state: faker.location.state(),
  //       zip: faker.location.zipCode(),
  //     },
  //   }))
  // });
  const todo = await prisma.todo.create({
    data: {
      title: faker.lorem.text(),
      body: faker.lorem.paragraph(),
    }
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
