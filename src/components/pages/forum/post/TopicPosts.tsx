"use client";

import { Button } from "@/components/shared";
import { PostSerialized } from "@/types/forum";
import { useState } from "react";
import TopicPostList from "./TopicPostList";

type Props = {
  posts: PostSerialized[];
};

const TopicPosts = (props: Props) => {
  const [showPosts, setShowPosts] = useState<boolean>(false);

  return (
    <div>
      <Button
        message={
          showPosts ? "Ukryj posty" : `Pokaz posty (${props.posts?.length})`
        }
        onClickAction={() => {
          setShowPosts(!showPosts);
        }}
        className="!w-48"
        disabled={!props.posts?.length}
      />
      {showPosts && <TopicPostList posts={props.posts} />}
    </div>
  );
};

export default TopicPosts;
