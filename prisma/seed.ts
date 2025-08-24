import { EXPERIENCE, JOB_MODE, JOB_TYPE } from "@/app/generated/prisma";
import { slugify } from "@/utils/helper";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const USER_ID = "cmeoxdx6m0000zke68x15f35q";

async function main() {
  console.log("Starting seed...");

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: USER_ID },
  });

  if (!user) {
    console.error(
      `User with id ${USER_ID} not found. Please create a user first.`
    );
    process.exit(1);
  }

  const jobs = Array.from({ length: 25 }, (_, i) => {
    const jobTitle = faker.person.jobTitle();
    const companyName = faker.company.name();
    const slug = slugify(`${jobTitle}-at-${companyName}`);

    return {
      job_title: jobTitle,
      company_name: companyName,
      company_logo: faker.image.urlLoremFlickr({ category: "business" }),
      company_info: faker.company.catchPhrase(),
      salary: faker.number.int({ min: 40000, max: 200000 }),
      job_description: faker.lorem.paragraphs(3),
      slug: slug,
      skills: faker.helpers
        .arrayElements(
          [
            "JavaScript",
            "TypeScript",
            "React",
            "Node.js",
            "Python",
            "AWS",
            "Docker",
            "Kubernetes",
            "SQL",
            "NoSQL",
            "GraphQL",
            "REST API",
            "CI/CD",
            "Testing",
            "Agile",
          ],
          5
        )
        .join(", "),
      benefits: faker.helpers
        .arrayElements(
          [
            "Health insurance",
            "Remote work",
            "Flexible hours",
            "Stock options",
            "401(k) matching",
            "Paid time off",
            "Professional development",
            "Wellness program",
            "Gym membership",
            "Free lunch",
          ],
          4
        )
        .join(", "),
      location: faker.location.city() + ", " + faker.location.state(),
      experience_level: faker.helpers.arrayElement(Object.values(EXPERIENCE)),
      job_type: faker.helpers.arrayElement(Object.values(JOB_TYPE)),
      job_mode: faker.helpers.arrayElement(Object.values(JOB_MODE)),
      mode_of_submission: faker.helpers.arrayElement([
        "Email your resume to jobs@company.com",
        "Apply through our website",
        "LinkedIn Easy Apply",
        "Indeed Apply",
        "AngelList application",
      ]),
      user_id: USER_ID,
      no_of_hires: faker.number.int({ min: 1, max: 5 }),
      created_at: faker.date.past({ years: 1 }),
    };
  });

  // Clear existing jobs (optional)
  console.log("Clearing existing jobs...");
  await prisma.jobs.deleteMany({});

  console.log("Creating new jobs...");
  for (const jobData of jobs) {
    try {
      const job = await prisma.jobs.create({
        data: jobData,
      });
      console.log(`Created job: ${job.job_title} at ${job.company_name}`);
    } catch (error) {
      console.error("Error creating job:", error);
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
