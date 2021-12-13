## An App for taking notes in DnD 5e campaign.

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

3. Records Category
    - User can create categories as they like i.e Characters, Places, Events, etc
    - Necessary fields:
        - Category name (string)
        - icons (string) user can choose the icon for their category i.e weapons, people, etc.
        - user_id (foreign id)
        - campaign_id (foreign id)
        - color (string) -> users can change colors on category tab

4. Records
    - User can create records as they like
    - Necessary fields: 
        - record title (string) this is what will be shown as card
        - status: enum(archived/important/normal)
        - description (string) this will show if user click the record to read more

Misc:
    - Let's see if we can implement Web Socket here somehow.