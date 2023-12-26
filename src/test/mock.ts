import { HttpError } from "@/errors";
import * as Fetchers from "@/features/addresses";
import { postMyAddressData } from "@/test/fixture";

export const mockPostMyAddress = (status = 200) => {
  if (status > 299) {
    return jest.spyOn(Fetchers, "postMyAddress").mockRejectedValueOnce(
      new HttpError({
        status,
        statusText: "",
        url: "",
      }),
    );
  }

  return jest
    .spyOn(Fetchers, "postMyAddress")
    .mockResolvedValueOnce(postMyAddressData);
};
