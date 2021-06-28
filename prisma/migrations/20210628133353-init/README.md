# Migration `20210628133353-init`

This migration has been generated by randyarbolaez at 6/28/2021, 9:33:53 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" DROP COLUMN "random"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210628133353-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,52 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Profile {
+  id                String   @id @default(uuid())
+  bio               String?
+  profilePicture    String?
+  userId            String   @unique
+  user              User     @relation(fields: [userId], references: [id])
+  createdAt         DateTime @default(now())
+  userFollowers     User @relation("followers", fields:[userId], references:[id])
+  userFollwing      User @relation("following", fields:[userId], references:[id])
+}
+
+model User {
+  id             String     @id @default(uuid())
+  name           String?
+  email          String
+  password       String
+  posts          Post[]
+  comments       Comment[]
+  profile        Profile?
+  followers      Profile[]  @relation("followers")
+  following      Profile[]  @relation("following")
+  createdAt      DateTime   @default(now())
+}
+
+model Post {
+  id        String    @id @default(uuid())
+  caption   String
+  picture   String?
+  comments  Comment[]
+  userId    String
+  user      User      @relation(fields: [userId], references: [id])
+  createdAt DateTime  @default(now())
+}
+
+model Comment {
+  id        String   @id @default(uuid())
+  content   String
+  postId    String
+  post      Post     @relation(fields: [postId], references: [id])
+  userId    String
+  user      User     @relation(fields: [userId], references: [id])
+  createdAt DateTime @default(now())
+}
```

