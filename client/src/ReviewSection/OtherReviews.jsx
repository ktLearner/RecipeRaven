import { useMemo } from "react";
import { server } from "../../helpers/server";

export default function OtherReviews({ rid }) {
  const reviews = useMemo(async () => {
    return server
      .get("/recipe/review", {
        params: { rid },
      })
      .then((res) => {
        console.log(res.data);
      });
  }, [rid]);

  return <div>Others</div>;
}
