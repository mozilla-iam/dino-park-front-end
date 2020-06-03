# generic

mozilla = Mozilla
pmo = Mozilla People Directory
ok = OK
save = Save
cancel = Cancel
submit = Submit
copy = Copy
more = Show More
less = Show Less
close = Close
edit = Edit
  .section = Edit {$section}
open_label = Open {$label}
loading = Loading
log_in = Log in
select = Select
next = Next
skip = Skip
back = Back
confirm = Confirm
unknown_error = Unknown error occurred

# titles

title_unknown = Unknown - {pmo}
title_home = Home - {pmo}
title_profile = {profile} - {pmo}
title_profile_username = {$username} - {profile} - {pmo}
title_profile_edit = {edit} - {profile} - {pmo}
title_orgchart = {orgchart} - {pmo}
title_orgchart_highlight = {$username} - {orgchart} - {pmo}
title_search = {search} - {pmo}

# components

## User Menu

user-menu_open = Open user menu
user-menu_close = Close user menu
user-menu_my-profile = My Profile
user-menu_dashboard = Dashboard
user-menu_notifications = Notifications
user-menu_auto-login = Manage Auto-Login
user-menu_logout = Log Out

## Contribute

contribute = Get Involved
contribute_header = How do I get involved?
contribute_text = Mozilla exists to promote openness, innovation and opportunity on the Internet. The success of our mission depends on participation from people like you. Find out how you can get involved to help make a difference in the lives of people everywhere.

## Footer

footer_cpg = CPG
  .abbr = Community Participation Guidelines
footer_faq = FAQ
footer_github = GitHub
footer_feedback = Feedback
footer_legal = Legal
footer_privacy = Privacy

## Privacy Setting

display-levels_public = Public
display-levels_authenticated = Registered
display-levels_vouched = Active
display-levels_ndaed = NDA'd
display-levels_staff = Staff
display-levels_private = Private
privacy-setting_help = What do these mean?

## Data Classification

classification_info = This person has access to data classified as public.
  .staff = This person has access to data that can only be shared with Mozilla staff.
  .confidential = This person has access to data that can be shared with all Mozilla staff and NDA’d contributors.
  .how = This was determined from profile information visible to you.
  .wiki = Read more about data classification <a data-l10n-name="wiki">on the wiki</a>.

## Slack Access
slack_access_info = This person has access to the Mozilla Slack instance.
  .wiki = Read more about contributors having access to Slack <a data-l10n-name="wiki">on the wiki</a>.

## Onboarding

onboarding_modal_1 = Welcome to your profile
  .paragraph_1 = Your Profile is your comprehensive Mozilla identity. It is shared by a growing number of Mozilla projects and websites.
  .paragraph_2 = We take privacy very seriously, which is why we provide easy to use <strong>privacy controls</strong> for each piece of information within your profile. You can also preview how your profile page looks publicly by using the <strong>Preview as</strong> feature.
onboarding_modal_2 = Tell us about yourself
  .paragraph_1 = Your profile <strong>biography</strong> is a great place to share your achievements and areas of interest with your fellow Mozillians. You can determine who can read your biography by adjusting its <strong>privacy level</strong>.
  .paragraph_2 = Use the <strong>Tags</strong> section in your profile to add your skills and interests. This will help relevant Mozilla staff and contributors with similar interests connect with you.
onboarding_modal_3 = We're here to help
  .paragraph_1 = Get help at any time by reading our Mozilla People Directory <a data-l10n-name="FAQ">FAQ</a>.
  .paragraph_2 = That’s it! You’re ready to dive in.
onboarding_modal_username = Confirm your username
  .paragraph_1 = Before you dive in, we would like you to choose a username or confirm the one we generated for you.<br /> Your username is <strong>publicly visible</strong> and included in your profile URL.
  .paragraph_2 = <strong>Pro tip:</strong> Use the same username across systems for easy discovery (e.g. Slack, Discourse). 
  .restriction = Minimum length is 3, allowed characters are: a-z, 0-9, _ and -.
  .username_exists = Username {$username} exists already, please choose another username.

tooltip_tour = Welcome
  .skip = Skip tour
  .step1_1 = Find Mozillians (staff and volunteers) based on their chosen visibility settings.
  .step1_2 = Use ‘Preview As’ to see how your profile page looks like to different audiences.
  .step1_3 = Edit your profile and tell us about yourself.
  .step2_1 = Upload a profile photo to help people find your page.
  .step2_2 = Choose a privacy settings for each field to determine who can see your information.

# pages

## Home Page

home_welcome = Welcome to the Mozilla People Directory
  .description-public = A secure place for all Mozillians, staff and non-staff alike, to manage their Mozilla profile. A Mozilla profile is a universal identity shared by a growing number of Mozilla projects and websites.
  .my-profile = My profile

home_paragraph = Mozilla profiles are part of the Identity and Access Management (IAM) initiative.
  .link = Learn more
## Org Chart

orgchart = Org chart
orgchart_nav-bar = Org Chart
orgchart_expand = Expand
orgchart_expand-all = Expand all
orgchart_collapse = Collapse
orgchart_collapse-all = Collapse all
orgchart_reset = Reset to default view
orgchart_no-manager = People who do not have a manager set
orgchart_full-profile = View full profile

## Profile Page

-staff-not-editable = Staff information is not editable and is shared by default with all Mozilla Staff. Please contact <a data-l10n-name="email">our HR Team</a> to request any change.

profile = Profile

profile_preview = Preview As
profile_preview_active = Previewing profile as
profile_preview_myself = Myself
profile_preview_back = Back
profile_preview_close = Close profile

profile_contact-me = Contact Me
  .show-in = Show in Contact Me button
  .on = on {$service}

profile_timezone_localtime = {$time} local time ({$timezone})
profile_timezone_offset_current = {$difference}hrs to your current time
  .tooltip = Since your browser location and profile timezone are different, we get this from your browser
profile_timezone_offset_local = {$difference}hrs to your local time
  .tooltip = We get this from what you set up in your profile as your primary location
profile_access-to = Access to
profile_slack-access = Slack access

profile_primary = Primary Info
  .edit = Edit primary information
profile_picture = Profile Picture
  .edit = Edit Profile Picture
  .add = Add New Photo
  .delete = Delete Photo
  .privacy-policy = I'm okay with you handling this info as you explain in Mozilla's <a data-l10n-name="privacy">privacy policy</a>.
  .privacy = Profile picture privacy levels
profile_username = Username
  .tooltip-open = Open username info
  .tooltip-close = Close usename info
  .tooltip = Your username is publicly visible and included in your profile URL. Pro tip: Use the same username across systems for easy discovery (e.g. Slack, Discourse).
  .privacy = Username privacy levels
profile_first-name = First Name
  .tooltip-open = Open first name info
  .tooltip-close = Close first name info
  .tooltip = Pro tip: If first and last names don’t work for you, we have you covered, please use alternate name instead.
  .tooltip-staff = Name data is initially imported from Workday, but any changes you make to your profile will not be reflected back into Workday. {profile_first-name.tooltip}
  .privacy = First name privacy levels
profile_last-name = Last Name
  .privacy = Last name privacy levels
profile_pronouns = Pronouns
  .tooltip-open = Open pronouns info
  .tooltip-close = Close pronouns info
  .tooltip = We prepared some pronouns for you to select from. If the list does not match your needs, you can enter your own pronoun.
  .privacy = Pronoun privacy levels
  .placeholder = Choose a pronoun or type your own
profile_alt-name = Alternate Name
  .tooltip-open = Open alternate name info
  .tooltip-close = Close alternate name info
  .tooltip = This field allows you to enter an additional or alternate name to your profile.
  .privacy = Alternate name privacy levels
profile_official-job-title = Official Job Title
  .tooltip-open = Open official job title info
  .tooltip-close = Close official job title info
  .tooltip = This is your job title as provided by our HR Team (Workday). {-staff-not-editable}
  .privacy = Title privacy levels
profile_fun-job-title = Tagline
  .tooltip-open = Open tagline info
  .tooltip-close = Close tagline info
  .tooltip = This field describes what you do in your own words.
  .tooltip-contributor = {profile_fun-job-title.tooltip} Pro tip: you can be as specific as sharing your current job title/company or you can just describe what you work on and what you are passionate about.
  .privacy = Tagline privacy levels
profile_location = Location
  .tooltip-open = Open location info
  .tooltip-close = Close location info
  .tooltip = This field allows you to enter your self-declared location.
  .privacy = Location privacy levels
profile_office-location = Office Location
  .tooltip-open = Open office location info
  .tooltip-close = Close office location info
  .tooltip = This is your office location as provided by our HR Team (Workday). {-staff-not-editable}
  .privacy = Office location privacy levels
profile_timezone = Timezone
  .tooltip-open = Open timezone info
  .tooltip-close = Close timezone info
  .tooltip = This field is automatically set based on your location.
  .privacy = Timezone privacy levels
profile_worker-type = Worker Type
  .tooltip-open = Open worker type info
  .tooltip-close = Close worker type info
  .tooltip = This is your worker type as provided by our HR Team (Workday). {-staff-not-editable}
  .privacy = Worker type privacy levels
profile_cost-center = Cost Center
  .tooltip-open = Open cost center info
  .tooltip-close = Close cost center info
  .tooltip = This is your cost center as provided by our HR Team (Workday). {-staff-not-editable}
  .privacy = Cost center privacy levels
profile_desk-number = Desk Number
  .tooltip-open = Open desk number info
  .tooltip-close = Close desk number info
  .tooltip = This is your desk number as provided by our HR Team (Workday). {-staff-not-editable}
  .privacy = Desk number privacy levels
profile_team = Team
  .tooltip-open = Open team info
  .tooltip-close = Close team info
  .tooltip = This is your team name as provided by our HR Team (Workday). {-staff-not-editable}
  .privacy = Team privacy levels
profile_bio = Biography
  .tooltip-open = Open biography info
  .tooltip-close = Close biography info
  .tooltip = Tell us more about yourself! This field supports <a data-l10n-name="gfm">GitHub Markdown</a>.
  .privacy = Biography privacy levels

profile_colleagues = Colleagues
profile_colleagues_list = View as list
profile_colleagues_grid = View as grid
profile_colleagues_reports = Reports to:
profile_colleagues_manages = Manages:
profile_colleagues_peers = Peers:

profile_identities = Identities
  .tooltip-open = Open identities info
  .tooltip-close = Close identities info
  .tooltip = Here you can add your Github and Bugzilla identities. You will be asked to verify them. Once this is done, they will be displayed on your profile.
profile_identities_none = No identities have been added yet.
  .self = You haven't added any identities yet.
profile_identities_verified = Verified
profile_identities_edit = Edit identities
profile_identities_github = GitHub
  .remove = Remove GitHub identity
  .privacy = GitHub identity privacy settings
  .saved = Saved GitHub identity
profile_identities_bugzilla = Bugzilla
  .remove = Remove Bugzilla identity
  .privacy = Bugzilla identity privacy settings
  .saved = Saved Bugzilla identity
profile_identities_add = Add Identity
  .adding = Verify Added Identity First
  .deleting = Save Changes First
  .done = All Identities Added
  .cancel = Cancel adding new identity
  .new = New identity
  .verify = Verify
  .failed = Failed to verify identity
  .unknown = Unknown error while verifying an identity

profile_contact = Contact
  .edit = Edit contact information
  .options = Contact options
profile_contact_none = No contact details have been added yet.
  .self = You haven't added any contact details yet.
profile_email = Email
  .placeholder = Email address
  .error-invalid = Enter a valid email address
profile_email_primary = Primary
  .tooltip-open = Open primary email info
  .tooltip-close = Close primary email info
  .tooltip = This field is not editable and it displays your login email (that we import from Auth0).
  .tooltip-staff = Your staff LDAP email is provided by our HR Team (Workday). {-staff-not-editable}
  .privacy = Primary email address privacy settings
profile_email_secondary = Secondary
  .tooltip-open = Open secondary email info
  .tooltip-close = Close secondary email info
  .tooltip = You can use this section to add any other email you are using and want to share with others.
  .add = Add Secondary Email
  .remove = Remove secondary email
  .privacy = Secondary email address privacy settings
profile_phone = Phone
  .add = Add Phone
  .remove = Remove phone number
  .placeholder = +1 163 7826 3789 (Phone number)
  .primary = Primary
  .personal = Personal
  .work = Work
  .home = Home
  .mobile = Mobile
  .privacy = Phone number privacy settings
  .label = Phone number {$index}
  .error = Enter country code +[1-9]

profile_accounts = Accounts
  .tooltip-open = Open accounts info
  .tooltip-close = Close accounts info
  .tooltip = Use this section to add any of your Slack, Zoom, Discourse or IRC external accounts. You can also choose to display any or all of them in your ‘Contact‘ section.
  .add = Add Account
  .remove = Remove Account
  .privacy = Accounts privacy levels
  .edit = Edit accounts
profile_accounts_none = No accounts have been added yet.
  .self = You haven't added any accounts yet.
profile_accounts_elsewhere = Elsewhere
profile_accounts_username-on = Username on {$service}

profile_languages = Languages
  .tooltip-open = Open languages info
  .tooltip-close = Close languages info
  .tooltip = The Mozilla Project spans over many countries and languages. Share the languages you speak to be found easily by other Mozillians.
  .add = Add Language
  .privacy = Languages privacy levels
  .edit = Edit languages
profile_languages_none = No languages have been added yet.
  .self = You haven't added any languages yet.

profile_tags = Tags
  .tooltip-open = Open tags info
  .tooltip-close = Close tags info
  .tooltip = You can use this section to add any skills or interests you’d like to be found by other people.
  .add = Add Tag
  .privacy = Tags privacy levels
  .edit = Edit tags
  .remove = Remove {$tag}
profile_tags_none = No tags have been added yet.
  .self = You haven't added any tags yet.

profile_access-groups = Access Groups
  .edit = Edit access groups
profile_access-groups_none = Not a member of any access group.
  .self = You are not a member of any access group.
profile_access-groups_ldap = LDAP
  .tooltip-open = Open LDAP info
  .tooltip-close = Close LDAP info
  .tooltip = Here you will find all the access groups that are associated to your LDAP account. They are not editable and private by default.
  .privacy = LDAP access groups privacy levels
profile_access-groups_mozillians = mozillians.org
  .tooltip-open = Open mozillians.org info
  .tooltip-close = Close mozillians.org info
  .tooltip = We have imported from mozillians.org all of the access groups that you’re a member of. Currently they can only be managed in mozillians.org.
  .edit = Manage at mozillians.org
  .footer = Mozillians access groups are currently managed at mozillians.org
  .privacy = Mozillians.org access groups privacy levels
  .none = You have not joined any mozillians.org access groups.

profile_keys = Keys
  .tooltip-open = Open keys info
  .tooltip-close = Close keys info
  .tooltip = In this section you can find  your PGP or SSH keys (if you have any) that we import from your LDAP account.
  .edit = Add / Remove
  .copy = Copy key {$title}
profile_keys_none = No keys have been added yet.
  .self = You haven't added any keys yet.
  .no-ldap = Adding keys currently requires an LDAP account.
profile_keys_pgp = PGP keys
  .privacy = PGP keys privacy levels
profile_keys_ssh = SSH keys
  .privacy = SSH keys privacy levels

## Search Page

search = Search
  .open = Open search
  .close = Close search
search_input = Search term
  .placeholder = Search People by Name
  .clear = Clear query
search_none = You have not searched.
search_results = Search results
  .total = {$total} results for <strong>{$query}</strong>
  .more = Show More
search_toggle = Set who to search for
  .all = All
  .staff = Staff
  .contributors = Contributors
search_result_orgchart = View {$username} in org chart
search_error = An error occured while trying to load the search results
search_no-results = No results found for <strong>{$query}</strong>
search_suggestions = Some suggestions include:
  .spelling = Make sure that all words are spelled correctly.
  .different = Try using different keywords or more general keywords.
  .fewer = Try fewer keywords.

## Error Page

error = Error
error_404 = This page isn't available
  .description = Sorry, the link you followed may be broken or the page may have been removed.
  .link = Go to homepage
error_issues = Please submit all bugs or issues to <a data-l10n-name="github">the project's GitHub issue repository</a>.

## Access Groups

access-group_list = Access Groups
  .summary-area__summary--1 = Discover access groups across the organisation.
  .summary-area__summary--2 = Visit the
  .summary-area__summary--3 = Access Groups wiki page
  .summary-area__summary--4 = to learn more.
  .summary-area__action = Create Access Group
  .search = Find a Group
  .info-sub = member
  .info-sub--plural = members
  .show-more = Show more
access-group_description = Access Group
  .tooltip = You can learn more about Access Groups on
  .tooltip_link = Access Groups wiki page
  .tooltip-open = Access group info
  .tooltip-close = Close access group info
access-group_nav-back = group
access-group-information-tab = Information
access-group-members-tab = Members
access-group-invitations-tab = Invites and Requests
access-group_leave = Leave
access-group_request = Request Invitation
access-group_request-cancel = Cancel Request
access-group-nav-bar = Access Groups
access-group_membership-management = Membership Management
  .mozillians = <strong>{$mozilliansCount}</strong> {$mozilliansCount -> 
                   [one] mozillian
                   *[other] mozillians
                }
  .members-will = <strong>{$membersCount}</strong> {$membersCount -> 
                   [one] member
                   *[other] members
                } will
  .pending-invitations-link = pending membership
  .pending-requests-link = pending approval
  .pending-renewals-link = expire within 14 days
  .add-members = Add Members
access-group_details = Group Details
  .terms = Group Terms
  .create-date-text = Group created on
  .member = member
  .members = members
  .name = Group name
  .description = Group description
  .update-details = Update details
access-group_members = Members
  .edit-members-meta = Membership renewal is currently set to
  .search = Search Members
  .no-expiration = -
  .empty-line1 = There are no members in this group.
  .empty-line2 = Why not
  .empty-action = invite some
  .edit-members__search = Search Members by Name
  .members-table__header-1 = Member
  .members-table__header-2 = Role
  .members-table__header-3 = Expiry
  .members-table__header-4 = Actions
  .tabs-container__item-all = All
  .tabs-container__item-curators = Curators
  .tabs-container__item-members = Members
  .expandable-content-container__first-row = Set []'s renewal period:
  .expandable-email = Member email
  .remove-confirm = Confirm removal from the group?
  .remove-confirm-mobile = Confirm remove?
  .remove-action = Remove member
  .remove-cancel = Cancel
  .renew-action = Renew
  .request-invite-intro = Invite
  .request-action = Invite
  .request-reject = Reject
  .load-more = Load more members
  .members-container__load-more = Load more entries
  .member-action = Member details
  .member-expandable_member-since = Member since
  .member-expandable_added-by = Added by
  .expandable-action-text = Member options
access-group_curators = Curators
  .update-curators = Update curators
  .tags-selector__description = Start typing the name/email/username of the Mozillian
  .container-info__description-1 = Removing a curator from this Curators list will
  .container-info__description-2 = demote that curator to a group member.
  .container-info__description-3 = It will not remove the curator from the group.
access-group_expiration = Expiration
  .expiration__description = Membership will expire after
  .expiration__value-custom-unit = days
  .update-expiration = Update expiration
  .container-info__description = Changes made to the expiration length will <strong>only apply to new members</strong>.<br /> Changes are not applied retroactively.
  .create-info = Memberships expire <strong>by default</strong> after 1 year. If you believe your access group is an exception and should have expiration disabled please send a request <a data-l10n-name="email">via email</a>.
  .one-year = 1 year
  .one-year__default = 1 year (default)
  .two-years = 2 years
  .no-expire = Does not expire
  .custom = days
  .custom-expiration-info = For custom expiration: enter a number of days between 1 and 730.
access-group_markdown = Markdown Quick Guide
  .bold = Bold text
  .italic = Italicized text
  .web-link = Web link
  .list-first = First item
  .list-second = Second item
  .list-third = Third item
  .footer-link = Complete Markdown Guide
access-group_type = Group type
  .reviewed-heading = Reviewed
  .reviewed-content = When a group is set to "Reviewed", Mozillians are presented with a "Request to Join" button on the group page. Once clicked, Group Curators will receive a pending rquest notification, prompting them to review and accept or deny the membership. Group Curators can invite and/or remove people from the group if needed.
  .closed-heading = Closed
  .closed-content = "Closed" groups provide more tight control over a group. Mozillians cannot request membership, and can only be invited to join the group by Group Curators. Group Curators can, of course, remove people from the group if needed. Avoid using this group type unless you are absolutely sure it is necessary.
  .update-type = Update type
access-group_terms = Membership terms
  .heading = Terms and Conditions
  .terms-required = New members should accept terms
  .terms-intro = Terms and conditions text
  .update-terms = Update terms
  .back-action = Back
  .do-accept = I do accept these terms
  .do-not-accept = I do not accept these terms
  .submit-changes = Submit
access-group_delete-group = Delete group
  .info = This action will completely delete the access group and remove all members. To continue, please check the box labelled <strong>I understand</strong> and then click the <strong>Delete group</strong> button.<br> After deletion, you will not be able to create a new access groups with the name <strong>{$groupName}</strong>.
  .delete-group = Delete group
  .check-text = I understand this action will delete the entire access group
  .success = Successfully deleted access group {$groupName}.
  .fail = Failed to delete access group {$groupName}.
access-group_pending-invitations = Pending Invitations and Requests
  .load-more-text = Load more invitations and requests
access-group_invite-member = Invite new member
  .invite = Invite
  .tags-selector__description = Start typing the name/email/username of the Mozillian
  .invite-expiration__toggle = Apply a unique membership expiration to these invites
  .invite-expiration__label = Membership will expire after
  .invite-expiration__custom-unit = days
  .table-row-text = Expires in
  .member-list-meta__text = Member
access-group_email-invite-text = Additional email invite text
  .checkbox = Custom invitation text
  .description = Please enter any additional text for the invitation email
  .update-invite-text = Update invite text
access-group_create = Create Access Group
  .group-create__back-action = Back
  .create-action = Create Access Group
  .cancel-action = Cancel
access-group_history = History log
access-group_notifications = Notifications
  .invitation = You've been invited to join [] group
  .rejection = Are you sure you wish to reject this invitation?
  .continue-action = Continue
  .reject-action = Reject
  .confirm-action = Confirm
  .back-action = Back
  .cannot-leave-1 = You cannot leave a group if you are the only curator.
  .cannot-leave-2 = You will be able to leave the group if you
  .cannot-leave-3 = appoint another curator first.
  .cannot-leave-4 = If you have no further use for the group you may request to have the group closed by emailing an administrator ([]).
  .leave-confirm = Are you sure you wish to leave the [] group?
  .leave-alert = In order to leave [] you must add another curator, or delete this group.
  .leave-action = Leave
  .cancel-action = Cancel
  .tos-accept_message = Membership requires acceptance of the terms below
  .close-action = Close
access-group_error = Error message:
member-list-description__sub = Added by

tiny-notification = Hello World
  .access-group-created = Access group [] created
  .access-group-closed = Access group [] has been closed
  .access-group-description-updated = Group description updated
  .access-group-type-updated = Group type updated
  .access-group-terms-removed = Group terms of service removed
  .access-group-terms-updated = Group terms of service updated
  .access-group-terms-accepted = You are now a member of the [] group.
  .access-group-terms-rejected = You rejected the terms of the [] group. The invitation has been revoked.
  .access-group-joined-group = You are now a member of the [] group.
  .access-group-left-group = You have left the [] group
  .access-group-invite-email-resent = Invite email resent
  .access-group-invite-deleted = Invitation deleted
  .access-group-members-invite-success = Members successfully invited
  .access-group-invitation-text-updated = Invitation text successfully updated
  .access-group-member-renewed = [] was renewed
  .access-group-member-removed = [] was removed from the group
  .access-group-curators-updated = The curators list has been successfully updated
  .access-group-expiration-updated = Access Group expiration has been successfully updated

date-year = year
  .plural = years
date-week = week
  .plural = weeks
date-day = day
  .plural = days

ag_errors = Something is wrong :/
  .number_gt_0 = x > 0
ag_api_errors = Something went wrong :/
 .invalid_group_name = Minimum length is 3, allowed characters are: a-z, 0-9, _ and -.
 .group_name_exists = Group name already exists