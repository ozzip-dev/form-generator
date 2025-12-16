import { getTopicPosts } from "@/actions/forum/getTopicPosts";
import { Button } from "@/components/shared";
import { PostSerialized } from "@/types/forum";
import { useEffect, useState } from "react";

type Props = {
  post: PostSerialized;
};

const TopicPostItem = (props: Props) => {
  return <div>{props.post.content}</div>;
};

export default TopicPostItem;
