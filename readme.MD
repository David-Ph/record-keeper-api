## An App for taking notes in DnD 5e campaign.

# What is this project meant to be?

I started this project because I wanted to test my typescript knowledge after learning a typescript course.

# What is this project?

During our DnD session, we notice that most of the note taking app doesn't quite fit our needs, that's why I started building this.

# Tools used

- Typescript
- Express
- Cloudinary
- Bcrypt
- Passport
- Nodemailer

### Todo:

    1. I think for now let's try to create user auth
    2. User Auth Done. Let's try using nodemailer for sending email.
    3. Sending Email done. Let's try setting up user isVerified
    4. Setting up user isVerified is DONE!
    5. Next let's try setting up Records Campaign, Journal, and Journal Entry
    6. CRUD for Campaign and JournalEntry done. Let's do validation next.
    7. Validation for Campaign and JournalEntry done. Let's do Category and Records next.
    8. Then we can do search later.
    9. For now let's do pagination for: JournalEntry, Records, Campaign.
    10. for campaign filter by status, and search for title, dungeonmaster, description
    11. For records filter by status, and search for title, description
    12. for journalentry search for title and body


1. User Login and Register

   - Email verification
   - User can only see their own records
   - Necessary fields:
     - username (string)
     - email (string)
     - passwords (string)
     - isVerified (boolean)

2. Records Campaign

   - This holds all records for a specific campaign.
   - Necessary fields:
     - title (string)
     - status: enum (ongoing/finished/archived)
     - user_id (foreign id)

3. Records Journal Entry
   - A special section for a user to write a journal for their characters if they want to
   - Will have an especially long limit.
   - Necessary fields:
     - journal title (string)
     - campaign_id
     - user_id
     - created_at
     - title
     - body
     - excerpt
4. Records Category

   - User can create categories as they like i.e Characters, Places, Events, etc
   - Necessary fields:
     - Category name (string)
     - type (string) user can choose the icon for their category i.e weapons, people, etc.
     - user_id (foreign id)
     - campaign_id (foreign id)
     - color (string) -> users can change colors on category tab

5. Records
   - User can create records as they like
   - Necessary fields:
     - record title (string) this is what will be shown as card
     - status: enum(archived/important/normal)
     - description (string) this will show if user click the record to read more, maybe there will be a max length?
     - slug (string)

Misc: 
- all these records should be searchable and filterable?
- Let's see if we can implement Web Socket here somehow. 
- maybe use cookie to try letting the user automatically select a campaign when they opened it again?
