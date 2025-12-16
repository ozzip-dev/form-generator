"use client";

import { getTopicPostsAction } from "@/actions/forum/getTopicPostsAction";
import { Button } from "@/components/shared";
import { PostSerialized } from "@/types/forum";
import { useEffect, useState } from "react";
import TopicPostList from "./TopicPostList";

type Props = {
  topicId: string;
};

const TopicPosts = (props: Props) => {
  const [posts, setPosts] = useState<PostSerialized[]>([]);
  const [showPosts, setShowPosts] = useState<boolean>(false);

  // TODO: fetch on click?
  useEffect(() => {
    async function fetchPosts() {
      setPosts((await getTopicPostsAction(props.topicId)) || []);
    }

    fetchPosts();
  }, [props.topicId]);

  return (
    <div>
      <Button
        message={showPosts ? "Ukryj posty" : `Pokaz posty (${posts?.length})`}
        onClickAction={() => {
          setShowPosts(!showPosts);
        }}
        className="!w-48"
        disabled={!posts?.length}
      />
      {showPosts && <TopicPostList posts={posts} />}
    </div>
  );
};

export default TopicPosts;
