"use client";

import { Button } from "@/components/shared";
import { PostSerializedDetailed } from "@/types/forum";
import { useState } from "react";
import TopicPostList from "./TopicPostList";

type Props = {
  posts: PostSerializedDetailed[];
};

const TopicPosts = (props: Props) => {
  const [showPosts, setShowPosts] = useState<boolean>(false);

  return (
    <div>
      <Button
        message={
          showPosts ? "Ukryj posty" : `Pokaż posty (${props.posts?.length})`
        }
        onClickAction={() => {
          setShowPosts(!showPosts);
        }}
        disabled={!props.posts?.length}
        className="mt-8 mb4"
      />
      {showPosts && <TopicPostList posts={props.posts} />}
    </div>
  );
};

export default TopicPosts;
