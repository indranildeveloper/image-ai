import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .middleware(async ({ req }) => {
      const session = await auth();

      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!session) throw new UploadThingError("Unauthorized");

      return { userId: session.user?.id };
    })
    // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
