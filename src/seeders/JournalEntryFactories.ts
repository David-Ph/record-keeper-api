import { JournalEntry, Campaign, User } from "../models";

// seeder add
async function addJournalEntries() {
  const user = await User.findOne().lean().select("_id")!;
  const campaign = await Campaign.findOne().lean().select("_id");

  for (let i = 0; i < 10; i++) {
    await JournalEntry.create({
      userId: user?._id,
      campaignId: campaign?._id,
      title: "Saltix's death",
      body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam doloribus excepturi asperiores accusantium quasi ipsam cum magnam voluptatibus saepe fugit porro incidunt ex in laboriosam eius odit eveniet, optio sequi vel nihil, laudantium officiis fuga consequatur. Earum assumenda harum dignissimos deserunt consectetur rerum placeat sit nulla ipsam possimus odit quod, reprehenderit ipsum illo molestias mollitia doloribus eaque? Amet molestias velit dolor minima cum delectus a eum exercitationem non, aliquam quae architecto similique necessitatibus, ex tempora nam veritatis repellat officia mollitia laudantium. Temporibus, cumque dolorem rem nostrum sunt est recusandae minus reiciendis accusantium ratione non ad velit et reprehenderit quia modi molestiae omnis assumenda! Labore aperiam consectetur accusamus dolore quae dicta velit quo alias reiciendis facere ullam quasi reprehenderit facilis quia neque exercitationem repellendus quaerat quisquam ipsam animi dolores, maiores quis hic unde. Beatae eos, at aspernatur temporibus quia veritatis doloremque facere hic similique quae vero repellat consequuntur error id nihil assumenda aut magni perspiciatis suscipit nesciunt facilis? Deserunt cumque exercitationem libero nesciunt voluptates excepturi rem numquam sed natus qui reprehenderit, dolore id nam ex impedit architecto perferendis porro placeat debitis doloremque! Facilis beatae animi sit enim explicabo asperiores cupiditate necessitatibus error ut incidunt. Commodi ea sit adipisci nostrum impedit molestiae sunt ut, facere tenetur debitis dicta rem aspernatur atque obcaecati? Saepe, sunt reiciendis quo voluptatum quia iste enim ut maiores quisquam cumque vitae ipsa ratione delectus cum beatae aliquid, provident soluta? Dignissimos optio vitae asperiores architecto quod ipsam suscipit quae delectus magnam tenetur aperiam neque voluptas autem, aliquam dolore aspernatur?",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam doloribus excepturi asperiores accusantium quasi ipsam cum magnam voluptatibus saepe fugit porro incidunt ex in laboriosam eius odit eveniet, optio sequi vel nihil",
    });

    await JournalEntry.create({
      userId: user?._id,
      campaignId: campaign?._id,
      title: "The coffee loving druid",
      body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam doloribus excepturi asperiores accusantium quasi ipsam cum magnam voluptatibus saepe fugit porro incidunt ex in laboriosam eius odit eveniet, optio sequi vel nihil, laudantium officiis fuga consequatur. Earum assumenda harum dignissimos deserunt consectetur rerum placeat sit nulla ipsam possimus odit quod, reprehenderit ipsum illo molestias mollitia doloribus eaque? Amet molestias velit dolor minima cum delectus a eum exercitationem non, aliquam quae architecto similique necessitatibus, ex tempora nam veritatis repellat officia mollitia laudantium. Temporibus, cumque dolorem rem nostrum sunt est recusandae minus reiciendis accusantium ratione non ad velit et reprehenderit quia modi molestiae omnis assumenda! Labore aperiam consectetur accusamus dolore quae dicta velit quo alias reiciendis facere ullam quasi reprehenderit facilis quia neque exercitationem repellendus quaerat quisquam ipsam animi dolores, maiores quis hic unde. Beatae eos, at aspernatur temporibus quia veritatis doloremque facere hic similique quae vero repellat consequuntur error id nihil assumenda aut magni perspiciatis suscipit nesciunt facilis? Deserunt cumque exercitationem libero nesciunt voluptates excepturi rem numquam sed natus qui reprehenderit, dolore id nam ex impedit architecto perferendis porro placeat debitis doloremque! Facilis beatae animi sit enim explicabo asperiores cupiditate necessitatibus error ut incidunt. Commodi ea sit adipisci nostrum impedit molestiae sunt ut, facere tenetur debitis dicta rem aspernatur atque obcaecati? Saepe, sunt reiciendis quo voluptatum quia iste enim ut maiores quisquam cumque vitae ipsa ratione delectus cum beatae aliquid, provident soluta? Dignissimos optio vitae asperiores architecto quod ipsam suscipit quae delectus magnam tenetur aperiam neque voluptas autem, aliquam dolore aspernatur?",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam doloribus excepturi asperiores accusantium quasi ipsam cum magnam voluptatibus saepe fugit porro incidunt ex in laboriosam eius odit eveniet, optio sequi vel nihil",
    });
  }

  console.log("JournalEntry has been seeded");
}

async function deleteJournalEntries() {
  await Campaign.deleteMany();
  console.log("JournalEntry has been deleted");
}

export { addJournalEntries, deleteJournalEntries };
